@echo off
if /I "%~1"=="debug" (
	rem Передан в качестве параметр debug
	set DEBUG=
) else (
	rem иначе выводы выбрасываем в NUL
	set DEBUG=^> NUL
)
set OUTPUT=bin
goto begin

rem создание ссылки на файл, с удалением существующей
:link
	if exist %~s2\NUL (
		rem на каталог
		rmdir /s /q "%~1"
		mklink /j "%~1" "%~2"
	) else (
		rem на файл
		call :delete "%~1"
		mklink /h "%~1" "%~2"
	)
goto :eof

rem удаление если файл существует
:delete
	if exist "%~1" del "%~1"
goto :eof

:begin
rem ======================
rem ======================
rem       Hardlinks
rem ======================
rem ======================
echo ====   Hardlinks   ====
mkdir "%OUTPUT%"
rem ==================
rem       Opera
rem ==================

call :link "opera extension\vkpatch.user.js"		vkpatch.user.js
call :link "opera extension\components" 			components
call :link "opera extension\plugins" 				plugins
call :link "opera extension\icons\icon_64.png" 		"resources\icon_64.png"

rem ==================
rem       Chrome
rem ==================

call :link "chrome extension\vkpatch.user.js" 			vkpatch.user.js
call :link "chrome extension\components" 				components
call :link "chrome extension\plugins" 					plugins
call :link "chrome extension\icons\icon_16.png" 		"resources\icon_16.png"
call :link "chrome extension\icons\icon_48.png" 		"resources\icon_48.png"
call :link "chrome extension\icons\icon_128.png" 		"resources\icon_128.png"

rem ==================
rem       Firefox
rem ==================
call :link "firefox extension\content\vkpatch.user.js"			vkpatch.user.js
call :link "firefox extension\content\components" 				components
call :link "firefox extension\content\plugins" 					plugins
call :link "firefox extension\content\icons\icon_48.png"		"resources\icon_48.png"
call :link "firefox extension\content\icons\icon_64.png"		"resources\icon_64.png"

rem ==================
rem         IE
rem ==================
call :link "ie extension\vkpatch.user.js"		vkpatch.user.js

rem ======================
rem ======================
rem       Packaging
rem ======================
rem ======================

rem Извлечение номера версии из файла vkpatch.user.js
rem извлекается из строки вида 
rem vkPatch.version = '11.11.11'
FOR /F "usebackq tokens=2 delims='" %%s IN (`findstr /R /I /C:"^[ 	]*vkPatch.version[ ]*=[ ]*'[0-9a-zA-Z. ]*'" vkpatch.user.js`) do (
	set version=%%s
)

echo.
echo ====   Packaging   ====
rem 7-Zip Command Line Version - http://www.7-zip.org/download.html
echo Версия vkPatch:		%version%
echo.

rem ==================
rem       Opera
rem ==================
echo ===  Opera  === %DEBUG%
call :delete "%OUTPUT%\vkpatch-%version%-opera.oex"
7za a -tzip "%OUTPUT%\vkpatch-%version%-opera.oex" ".\opera extension\*" %DEBUG%
if ERRORLEVEL 0 (
	echo Opera extension		done
) else (
	echo Opera extension		failed !
)
rem Упаковываем в архив
7za a -tzip -w "%OUTPUT%\vkpatch-%version%-opera.zip" "%OUTPUT%\vkpatch-%version%-opera.oex" %DEBUG%

rem ==================
rem       Chrome
rem ==================
rem %chrome% - путь к chrome.exe
echo ===  Chrome  === %DEBUG%
call :delete "%OUTPUT%\vkpatch-%version%-chrome.crx"
if exist "%cd%\vkpatch-chrome-key.pem" (
	rem Есть ключ расширения хром
	echo Ключ vkpatch-chrome-key.pem найден %DEBUG%
	set chrome_key=--pack-extension-key="%cd%\vkpatch-chrome-key.pem"
) else (
	echo Ключ vkpatch-chrome-key.pem не найден !!! %DEBUG%
)
"%chrome%" --pack-extension="%cd%\chrome extension" %chrome_key% --no-message-box
if EXIST "chrome extension.crx" (
	move "chrome extension.crx" "%OUTPUT%\vkpatch-%version%-chrome.crx" %DEBUG%
	echo Chrome extension	done
) else (
	echo Chrome extension	failed !
)

rem ==================
rem       Firefox
rem ==================
echo ===  Firefox  === %DEBUG%
call :delete "%OUTPUT%\vkpatch-%version%-firefox.xpi"
7za a -tzip "%OUTPUT%\vkpatch-%version%-firefox.xpi" ".\firefox extension\*" %DEBUG%
if ERRORLEVEL 0 (
	echo Firefox extension	done
) else (
	echo Firefox extension	failed !
)

echo.
echo Complete 
pause