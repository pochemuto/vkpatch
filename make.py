# -*- coding: utf-8 -*-
from __future__ import print_function
import os
import zipfile
import ctypes
import codecs
import sys
import subprocess
import re


# вывод в нужной кодировке
outf = codecs.getwriter(sys.stdout.encoding)(sys.stdout, errors='replace')
defoutf = sys.stdout
sys.stdout = outf

#
# http://stackoverflow.com/a/792199
#
def zipdir(dirPath=None, zipFilePath=None, includeDirInZip=True):

    if not zipFilePath:
        zipFilePath = dirPath + ".zip"
    if not os.path.isdir(dirPath):
        raise OSError("dirPath argument must point to a directory. "
            "'%s' does not." % dirPath)
    parentDir, dirToZip = os.path.split(dirPath)
    #Little nested function to prepare the proper archive path
    def trimPath(path):
        archivePath = path.replace(parentDir, "", 1)
        if parentDir:
            archivePath = archivePath.replace(os.path.sep, "", 1)
        if not includeDirInZip:
            archivePath = archivePath.replace(dirToZip + os.path.sep, "", 1)
        return os.path.normcase(archivePath)

    outFile = zipfile.ZipFile(zipFilePath, "w",
        compression=zipfile.ZIP_DEFLATED)
    for (archiveDirPath, dirNames, fileNames) in os.walk(dirPath):
        for fileName in fileNames:
            filePath = os.path.join(archiveDirPath, fileName)
            outFile.write(filePath, trimPath(filePath))
        #Make sure we get empty directories as well
        if not fileNames and not dirNames:
            zipInfo = zipfile.ZipInfo(trimPath(archiveDirPath) + "/")
            #some web sites suggest doing
            #zipInfo.external_attr = 16
            #or
            #zipInfo.external_attr = 48
            #Here to allow for inserting an empty directory.  Still TBD/TODO.
            outFile.writestr(zipInfo, "")
    outFile.close()
   
#
# Решения для создания симлинков в windows
# не применяю, потому что требует повышения прав
# http://stackoverflow.com/questions/1447575/symlinks-on-windows
# для хардлинков использовать ctypes.windll.kernel32.CreateHardLinkW
#

def winsymlink(source, link_name):
   source = source.replace("/", "\\")
   link_name = link_name.replace("/", "\\")
   # создаем junction, потому что symlink (/d) требует повышения привелегий
   subprocess.check_output(["mklink", "/j", link_name, source], shell=True)

def winhardlink(source, link_name):
   # создаем hardlink
   source = source.replace("/", "\\")
   link_name = link_name.replace("/", "\\")
   subprocess.check_output(["mklink", "/h", link_name, source], shell=True)
   
def create_link(source, link_name):
   """Создание ссылки на файл или папку"""
   if os.path.isfile(link_name):
      os.remove(link_name)
   elif os.path.isdir(link_name):
      os.removedirs(link_name)
   
   target_dir = os.path.dirname(link_name)
   if not os.path.exists(target_dir):
      os.makedirs(target_dir)
   
   if source is not None and os.path.isdir(source):
      symlink(source, link_name)
   else:
      hardlink(source, link_name)

def get_version():
   """ извлекает версию из скрипта """
   regexp = r"vkPatch\.version\s*=\s*([\"'])(?P<version>[0-9.]+)\1"
   contents = file("vkpatch.user.js").read()
   return re.search(regexp, contents, flags=re.IGNORECASE+re.MULTILINE).group("version")

def include_libs(path, browsers, include_path = True, depth = 0):
   """ читаем файл list.txt и извлекаем имена модулей
   browsers содержим имена браузеров. Возвращает словарь, ключами которого являются имена браузеров,
   а значениями списки модулей
   depth задает глубину поиска подмодулей. Если модули исключен из браузера, подмодули тоже исключаются
   """
   list_name = "list.txt"
   browsers = [x.lower() for x in browsers]
   list_path = path + list_name
   # создаем словарь с пустыми массивами в качестве значений
   result = dict([ [i, [list_path]] for i in browsers ])
   for line in file(list_path):
      line = re.sub(r"#.*", "", line).strip()
      if line == "" : continue
      
      included_browsers = browsers[:]
      pieces = line.split(";")
      module_name = pieces[0].strip() 
      module = module_name + ".js"
      if include_path: module = path + module
      # исключаем браузеры
      if len(pieces) > 1:
         excluded_browsers = pieces[1].lower().split()
         included_browsers = [b for b in included_browsers if b not in excluded_browsers]
          
      for browser in included_browsers:
         result[browser].append(module)
      
      # ищем зависимые библиотеки
      if depth > 0:
         submodules_path = path + module_name + "/"
         if os.path.isfile(submodules_path + list_name):
            sublibs = include_libs(path + module_name + "/", included_browsers, include_path, depth-1)
            result = merge_dicts(result, sublibs)
   return result

# сливаем два словаря, содержащих массивы, в один
def merge_dicts(d1, d2):
   result = d1.copy()
   # делаем копии всех массивов
   for i in result:
      result[i] = result[i][:]
      
   for key, value in d2.items():
      if key not in result:
         result[key] = []
      
      result[key] += value
   
   return result
   
# определяем платформозависимые фукнции
if sys.platform=='win32':
   hardlink = winhardlink
   symlink = winsymlink
else:
   hardlink = os.link
   symlink = os.symlink
   

version = get_version()
print(u"Версия файла:", version)
vkpatch_script = "vkpatch.user.js"

config = {
          "opera": {
                  "target": "opera extension/",
                  "clean": ["icons/", "components/", "plugins/"],
                  "include": [
                            vkpatch_script,
                            ("resources/icon_64.png", "icons/icon_64.png")
                            ]
                  },
          
          "chrome": {
                   "target": "chrome extension/",
                   "clean": ["icons/", "components/", "plugins/"],
                   "include": [
                          vkpatch_script,
                          ("resources/icon_16.png", "icons/icon_16.png"),
                          ("resources/icon_48.png", "icons/icon_48.png"),
                          ("resources/icon_128.png", "icons/icon_128.png")
                          ]
                   },
          
          "firefox": {
                    "target": "firefox extension/content/",
                    "clean": ["icons/", "components/", "plugins/"],
                    "include": [
                           vkpatch_script,
                          ("resources/icon_48.png", "icons/icon_48.png"),
                          ("resources/icon_64.png", "icons/icon_64.png"),
                           ]
                    }
          }

#
# Читаем файлы и собираем ссылки на модули и файлы для создания линков
#
browsers = config.keys()
# извлекаем из конфигов списки подключаемых файлов
includes = dict(zip(browsers, [data["include"] for data in config.values()]))
# пополняем их, читая файлы list.txt в папках
includes = merge_dicts(includes, include_libs("components/", browsers))       
includes = merge_dicts(includes, include_libs("plugins/", browsers, depth=1))

#
# Создаем линки
#
print(u"Создание линков:")
for browser, data in config.items():
   print("   "+browser, end="")
   target_path = data['target']
   for source in includes[browser]:
      if isinstance(source, tuple):
         target = target_path + source[1]
         source = source[0]
      else:
         target = target_path + source
      
      #print source,"=>", target
      create_link(source, target)
      print(".", end="")
      
   print("")
   
raw_input(u"Нажмите любую клавишу для выхода")