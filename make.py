# -*- coding: utf-8 -*-
import os
import zipfile
import ctypes
import codecs
import sys
import subprocess
from cgitb import link
kdll = ctypes.windll.LoadLibrary("kernel32.dll")

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
   # создаем junction, потому что symlink (/d) требует повышения привелегий
   subprocess.check_output(["mklink", "/j", link_name, source], shell=True)

def winhardlink(source, link_name):
   # создаем hardlink
   subprocess.check_output(["mklink", "/h", link_name, source], shell=True)
   
if sys.platform=='win32':
   hardlink = winhardlink
   symlink = winsymlink
else:
   hardlink = os.link
   symlink = os.symlink

def createLink(source, link_name):
   """Создание ссылки на файл или папку"""
   if os.path.isfile(link_name):
      os.remove(link_name)
   elif os.path.isdir(link_name):
      os.removedirs(link_name)
   
   if source is not None and os.path.isdir(source):
      symlink(source, link_name)
   else:
      hardlink(source, link_name)
