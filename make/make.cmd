@echo off

echo ====   Hardlinks   ====

cd ..
rem ==================
rem       Opera
rem ==================

del "opera extension\vkpatch.user.js"
mklink /h 		"opera extension\vkpatch.user.js" 			vkpatch.user.js

del "opera extension\icons\icon_64.png"
mklink /h 		"opera extension\icons\icon_64.png" 		"resources\icon_64.png"

rem ==================
rem       Chrome
rem ==================

del /f /q "chrome extension\vkpatch.user.js"
mklink /h 		"chrome extension\vkpatch.user.js" 			vkpatch.user.js

del "chrome extension\icons\icon_16.png"
mklink /h 		"chrome extension\icons\icon_16.png" 		"resources\icon_16.png"

del "chrome extension\icons\icon_48.png"
mklink /h 		"chrome extension\icons\icon_48.png" 		"resources\icon_48.png"

del "chrome extension\icons\icon_128.png"
mklink /h 		"chrome extension\icons\icon_128.png" 		"resources\icon_128.png"

rem mklink /j 		"chrome extension/resources" 				resources

rem ==================
rem       Firefox
rem ==================
del /f /q "firefox extension\content\vkpatch.user.js"
mklink /h "firefox extension\content\vkpatch.user.js"		vkpatch.user.js

echo.
echo ====   Packaging   ====
rem 7-Zip Command Line Version - http://www.7-zip.org/download.html
del make\vkpatch-opera.oex
7za a -tzip make\vkpatch-opera.oex ".\opera extension\*"
echo Opera extension - done

rem %chrome% - путь к chrome.exe
del make\vkpatch-chrome.crx
if exist "make\vkpatch-chrome-key.pem" (
	rem Есть ключ расширения хром
	%chrome% --pack-extension="%cd%\chrome extension" --pack-extension-key="%cd%\make\vkpatch-chrome-key.pem" --no-message-box
) else (
	rem Ключа нет - создаём новый
	%chrome% --pack-extension="%cd%\chrome extension" --no-message-box
	move "chrome extension.pem" make\vkpatch-chrome-key.pem
)

move "chrome extension.crx" make\vkpatch-chrome.crx
echo Chrome extension - done

echo Done 
cd make
pause