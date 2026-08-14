# Native Build Assets — MuslimOS

> BismiLLAH Ar-Rahman Ar-Raheem.

## Android APK

### Prerequisites
- Android SDK (API 34), JDK 17, Gradle 8.1+

### Build
```bash
cd assets/native/android
./build.sh
```
APK output: `MuslimOS-1.0.0.apk` (repo root)

## Windows EXE

### Prerequisites
- .NET 6 SDK, WebView2 Runtime

### Build
```powershell
cd assets\native\windows
.\build.ps1
```
EXE output: `assets/native/MuslimOS-1.0.0.exe`

## iOS / macOS
Requires macOS + Xcode. Wrap the web build in WKWebView.
