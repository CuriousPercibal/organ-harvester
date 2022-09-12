#!/usr/bin/env bash

rm -rf game
rm -rf dist
rm game.zip
npm run build
sed -i 's/\\n//g' dist/main.js
sed -i 's/    //g' dist/main.js
mkdir game
cd game || exit
cp -r ../public/* .
cp -r ../dist/* .
cd ..
zip -r game ./game
s=$(ls -al game.zip | cut -d " " -f 5)
echo -e "\n"

if [ $s -gt 13312 ]
then
  echo -e "\033[1;34mZIP size: \033[1;31m" $s"\13312 bytes\033[0m"
else
  echo -e "\033[1;34mZIP size: \033[1;32m" $s"\13312 bytes\033[0m"
fi
