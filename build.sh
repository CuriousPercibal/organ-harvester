#!/usr/bin/env bash

rm -rf game
rm -rf dist
rm game.zip
npm run build
sed -i 's/\\n//g' dist/main.js
sed -i 's/    //g' dist/main.js
mkdir game
cd game || exit
cp -r ../public .
cp -r ../dist .
cd ..
zip -r game ./game
