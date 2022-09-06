#!/usr/bin/env bash

npm run build
mkdir game
cd game || exit
cp -r ../public .
cp -r ../dist .
cd ..
zip -r game ./game