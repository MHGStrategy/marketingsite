#!/bin/sh
osascript -e 'Tell application "System Events" to display dialog "Enter SSH password for mhgstrategy (ScalaHosting SPanel):" default answer "" with hidden answer' -e 'text returned of result'
