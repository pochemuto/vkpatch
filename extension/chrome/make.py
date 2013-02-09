# -*- coding: utf-8 -*-
from distutils.command.build_ext import extension_name_re
config = {
   "clean": ["icons/", "components/", "plugins/"],
   "include": [
        ("resources/icon_16.png", "icons/icon_16.png"),
        ("resources/icon_48.png", "icons/icon_48.png"),
        ("resources/icon_128.png", "icons/icon_128.png")
        ]
}
import simplejson as json 
import os
                  
chrome_key = "vkpatch-chrome-key.pem"

def pack(include, path, extension_name, output):
   extension_name += ".crx"
   extension_archive = extension_name + ".zip"
   extension_path = output + extension_name

   if os.path.isfile(extension_archive): os.remove(extension_archive)
   # создаем manifest.json
   manifest_template = 'manifest_template.json'
   manifest_template_file = open(os.path.join(target, manifest_template), 'r')
   manifest = json.load(manifest_template_file)
   manifest_template_file.close()
   # пополняем ссылками на подключаемые файлы
   manifest['web_accessible_resources'] = [filepath for filepath in include if filepath.endswith('.js')]
   manifest_file = open('manifest.json', 'w')
   json.dump(manifest, manifest_file , indent=2, sort_keys=False, item_sort_key=False)
   manifest_file.close()
   
   
   # исключяемый файлы из упаковки
   ignore = [manifest_template]
   # упаковываем
   zipdir("chrome extension", extension_archive, includeDirInZip=False, ignore=ignore)
   # подписываем
   sign_crx(extension_archive, chrome_key, extension_path) 
   os.remove(extension_archive)
   return extension_path