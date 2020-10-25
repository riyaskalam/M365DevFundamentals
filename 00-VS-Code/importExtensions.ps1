foreach ($line in Get-Content .\web-dev-extensions.txt) {
    code --install-extension $line
}