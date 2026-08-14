#!/bin/bash
# BirrStack Native Android Build Script for MuslimOS
# BismiLLAH Ar-Rahman Ar-Raheem.
set -e
APP_NAME="MuslimOS"
PACKAGE="com.birrstack.muslimos"
VERSION="1.0.0"
VERSION_CODE="1"

echo "BismiLLAH. Building Android APK for $APP_NAME..."
if ! command -v java &> /dev/null; then echo "Error: Java not found. Install JDK 17."; exit 1; fi
if [ ! -d "$ANDROID_HOME" ]; then echo "Error: ANDROID_HOME not set. Install Android SDK."; exit 1; fi

echo "Copying web build..."
rm -rf app/src/main/assets/www/*
cp -r ../../dist/* app/src/main/assets/www/

echo "Building APK..."
chmod +x gradlew
./gradlew assembleRelease

APK_PATH="app/build/outputs/apk/release/app-release-unsigned.apk"
if [ -f "$APK_PATH" ]; then
  cp "$APK_PATH" "../../../../$APP_NAME-$VERSION.apk"
  echo "APK built: $APP_NAME-$VERSION.apk"
else
  echo "Error: APK build failed."; exit 1
fi
echo "Done. AlhamduliLLAH."
