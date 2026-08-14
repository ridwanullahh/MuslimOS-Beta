# BirrStack Native Windows Build Script for MuslimOS
# BismiLLAH Ar-Rahman Ar-Raheem.
param([string]$AppName = "MuslimOS", [string]$Version = "1.0.0")
Write-Host "BismiLLAH. Building Windows EXE for $AppName..."
$ProjectDir = "windows-$AppName"
New-Item -ItemType Directory -Force -Path $ProjectDir
Set-Location $ProjectDir
$csprojContent = @"
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net6.0-windows</TargetFramework>
    <UseWindowsForms>true</UseWindowsForms>
    <AssemblyName>$AppName</AssemblyName>
    <Version>$Version</Version>
    <RootNamespace>BirrStack</RootNamespace>
  </PropertyGroup>
  <ItemGroup><PackageReference Include="Microsoft.Web.WebView2" Version="1.0.2739.15" /></ItemGroup>
  <ItemGroup><Content Include="www\**\*" CopyToOutputDirectory="PreserveNewest" /></ItemGroup>
</Project>
"@
Set-Content -Path "BirrStackApp.csproj" -Value $csprojContent
$programContent = @"
using System;
using System.Windows.Forms;
using Microsoft.Web.WebView2.WinForms;
using System.IO;
namespace BirrStack;
static class Program {
    [STAThread]
    static void Main() {
        Application.EnableVisualStyles();
        var form = new Form { Text = "$AppName", Width = 480, Height = 854, StartPosition = FormStartPosition.CenterScreen };
        var webView = new WebView2 { Dock = DockStyle.Fill };
        form.Controls.Add(webView);
        webView.EnsureCoreWebView2Async(null).ContinueWith(t => {
            var wwwPath = Path.Combine(Application.StartupPath, "www");
            webView.CoreWebView2.SetVirtualHostNameToFolderMapping("birrstack.local", wwwPath, Microsoft.Web.WebView2.Core.CoreWebView2HostResourceAccessKind.Allow);
            webView.CoreWebView2.Navigate("https://birrstack.local/index.html");
        });
        Application.Run(form);
    }
}
"@
Set-Content -Path "Program.cs" -Value $programContent
New-Item -ItemType Directory -Force -Path "www"
Copy-Item -Path "..\..\dist\*" -Destination "www" -Recurse -Force
Write-Host "Building..."
dotnet build -c Release
$exePath = "bin\Release\net6.0-windows\$AppName.exe"
if (Test-Path $exePath) {
    $outputPath = "..\..\assets\native\$AppName-$Version.exe"
    Copy-Item -Path $exePath -Destination $outputPath
    Write-Host "EXE built: $outputPath"
} else { Write-Host "Error: Build failed."; exit 1 }
Write-Host "Done. AlhamduliLLAH."
