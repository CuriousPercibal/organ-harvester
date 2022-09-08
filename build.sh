#!/usr/bin/env bash

rm -rf game
rm game.zip
npm run build
mkdir game
cd game || exit
cp -r ../public .
cp -r ../dist .
cd ..
zip -r game ./game
