#!/usr/bin/env bash

rm -rf game
rm -rf dist
rm game.zip
npm run build
sed -i 's/\\n//g' dist/main.js
sed -i 's/    //g' dist/main.js
mkdir game
cd game || exit
cp -r ../assets .
cd assets/buildings || exit
# shellcheck disable=SC2045
for file in $(ls); do
  sed -i 's/    //g' $file
  sed -i 's/\\n//g' $file
done
cd ../..
cd assets/items || exit
# shellcheck disable=SC2045
for file in $(ls); do
  sed -i 's/    //g' $file
  sed -i 's/\\n//g' $file
done
cd ../..
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
