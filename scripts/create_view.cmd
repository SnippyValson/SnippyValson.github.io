@echo off
mkdir %1
cd %1
copy NUL "%1.html"
copy NUL "%1.js"
copy NUL "%1.css"
echo ^<!DOCTYPE html^>>> "%1.html"
echo ^<html lang="en"^>>> "%1.html"
echo ^<head^>>> "%1.html"
echo     ^<meta charset="UTF-8"^>>> "%1.html"
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>>> "%1.html"
echo     ^<title^>Document^</title^>>> "%1.html"
echo ^</head^>>> "%1.html"
echo ^<body^>>> "%1.html"
echo     Body Text>> "%1.html"
echo     ^<script src="%1.js"^>^</script^>>> "%1.html"
echo ^</body^>>> "%1.html"
echo ^</html^>>> "%1.html"
echo import "./%1.css";>> "%1.js"
EXIT /B 0