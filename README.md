# golang-comments

Adds simple Golang comments for the function, method or type of the line the cursor is on

## Using

Simply type a `.` on a variable and choose from one of the `span.*!` options. Supported commands:

* Debug
* Warn,
* Fatal
* Error
* Info | Print

## Building

``` bash
brew install vsce
pnpm run package
```

## Installing

``` bash
code --install-extension golang-comments-0.0.1.vsix
```
