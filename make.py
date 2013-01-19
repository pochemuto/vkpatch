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
def zipdir(dirPath=None, zipFilePath=None, includeDirInZip=True, ignore=[]):

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
            relative_path =  trimPath(filePath)
            if not relative_path in ignore: 
                outFile.write(filePath, relative_path)
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

import sys
from array import *
from subprocess import *
def sign_crx(input, key, output):
  """ Подписывает zip-архив, используется для подписи расширений Google Chrome """
  # Cribbed from http://github.com/Constellation/crxmake/blob/master/lib/crxmake.rb
  # and http://src.chromium.org/viewvc/chrome/trunk/src/chrome/tools/extensions/chromium_extension.py?revision=14872&content-type=text/plain&pathrev=14872
  
  # Sign the zip file with the private key in PEM format
  signature = Popen(["openssl", "sha1", "-sign", key, input], stdout=PIPE).stdout.read();
  
  # Convert the PEM key to DER (and extract the public form) for inclusion in the CRX header
  derkey = Popen(["openssl", "rsa", "-pubout", "-inform", "PEM", "-outform", "DER", "-in", key], stdout=PIPE).stdout.read();
  
  out=open(output, "wb");
  out.write("Cr24")  # Extension file magic number
  header = array("l");
  # исправление заголовка на 64х битной системе
  # http://code.google.com/p/crx-packaging/issues/detail?id=3
  if header.itemsize == 8:
    header = array("i")
  header.append(2); # Version 2
  header.append(len(derkey));
  header.append(len(signature));
  header.tofile(out);
  out.write(derkey)
  out.write(signature)
  out.write(open(input).read())
  out.close()

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

def get_extension_name(browser):
   return filenamePattern % {"browser": browser, "version": version}

# определяем платформозависимые фукнции
if sys.platform=='win32':
   hardlink = winhardlink
   symlink = winsymlink
else:
   hardlink = os.link
   symlink = os.symlink

vkpatch_script = "vkpatch.user.js"
debug=False
chrome_path = "C:\Program Files\Google\Chrome\Application\chrome.exe"
output = "bin/"
filenamePattern = "vkpatch-%(version)s-%(browser)s"
version = get_version()
 
def make_opera():
   output_name = output + get_extension_name("opera")
   extension_path = output_name + ".oex"
   archive_name = output_name + ".zip"
   
   if os.path.exists(extension_path): os.remove(extension_path)
   if os.path.exists(archive_name): os.remove(archive_name)
   
   zipdir("opera extension", extension_path, includeDirInZip=False)
   # упаковываем само расширение в zip архив
   archive = zipfile.ZipFile(archive_name, "w", compression=zipfile.ZIP_DEFLATED)
   archive.write(extension_path, os.path.basename(extension_path))
   archive.close()
   return extension_path
   
def make_firefox():
   extension_path = output + get_extension_name("firefox") + ".xpi"
   zipdir("firefox extension", extension_path, includeDirInZip=False)
   return extension_path

def make_chrome():
   chrome_key = "vkpatch-chrome-key.pem"
   fse = sys.getfilesystemencoding()
   
   target = os.path.abspath("chrome extension")
   
   extension_name = get_extension_name("chrome") + ".crx"
   extension_archive = extension_name + ".zip"
   extension_path = output+extension_name

   if os.path.isfile(extension_archive): os.remove(extension_archive)
   # исключяемый файлы из упаковки
   ignore = ['manifest_template.json']
   # упаковываем
   zipdir("chrome extension", extension_archive, includeDirInZip=False, ignore=ignore)
   # подписываем
   sign_crx(extension_archive, chrome_key, extension_path) 
   os.remove(extension_archive)
   return extension_path
   
config = {
          "opera": {
                    "target": "opera extension/",
                    "clean": ["icons/", "components/", "plugins/"],
                    "include": [
                            vkpatch_script,
                            ("resources/icon_64.png", "icons/icon_64.png")
                            ],
                    "make": make_opera
                    },
          
          "chrome": {
                     "target": "chrome extension/",
                     "clean": ["icons/", "components/", "plugins/"],
                     "include": [
                          vkpatch_script,
                          ("resources/icon_16.png", "icons/icon_16.png"),
                          ("resources/icon_48.png", "icons/icon_48.png"),
                          ("resources/icon_128.png", "icons/icon_128.png")
                          ],
                     "make": make_chrome
                   },
          
          "firefox": {
                      "target": "firefox extension/content/",
                      "clean": ["icons/", "components/", "plugins/"],
                      "include": [
                           vkpatch_script,
                          ("resources/icon_48.png", "icons/icon_48.png"),
                          ("resources/icon_64.png", "icons/icon_64.png"),
                           ],
                      "make": make_firefox
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
def make_links():
   print(u"Создание ссылок")
   
   for browser, data in config.items():
      print("   %-12s" % browser, end="")
      target_path = data['target']
      for source in includes[browser]:
         if isinstance(source, tuple):
            target = target_path + source[1]
            source = source[0]
         else:
            target = target_path + source
         
         if debug: print("%-50s => %s" % source, target)
         create_link(source, target)
         print("#", end="")
         
      print("")

#
# Упаковываем
#
def pack():
   print(u"Упаковка расширений")
   if not os.path.isdir(output): os.makedirs(output)
   
   for browser, data in config.items():
      print("   %-12s" % browser, end="")
      extension_path = data["make"]()
      print("done =>", extension_path)

if __name__ == "__main__":
   print(u"Версия файла:", version)
   args = sys.argv[1:]
   all = True
   if len(args)>0:
      all = False
      debug = "debug" in args
   
   if "link" in args or all:
      print()
      make_links()
      
   if "pack" in args or all:
      print()
      pack()
   
   print()
   raw_input(u"Нажмите любую клавишу для выхода...")