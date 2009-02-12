@echo off
echo Adding all changes to git
call git add . -A
echo on
call git status
pause
@echo off
set /p desc=Enter a commit description: 
echo Commiting: %1
call git commit -m "%desc%"
echo Status:
@echo on
call git status