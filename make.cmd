@echo off
echo Hardlinks
mklink /h 		"chrome extension/vkpatch.user.js" 			vkpatch.user.js
mklink /h 		"opera extension/vkpatch.user.js" 			vkpatch.user.js
mklink /j 		"chrome extension/resources" 				resources
echo Done 
pause