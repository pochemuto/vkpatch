@echo off
echo Hardlinks
del /f /q "chrome extension\vkpatch.user.js"
mklink /h 		"chrome extension\vkpatch.user.js" 			vkpatch.user.js
del "opera extension\vkpatch.user.js"
mklink /h 		"opera extension\vkpatch.user.js" 			vkpatch.user.js
rem mklink /j 		"chrome extension/resources" 				resources
echo Done 
pause