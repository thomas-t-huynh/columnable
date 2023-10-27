# columnable

Save a minute of your day formatting those long class names.

## Features

Formats highlighted text and breaks each individual class name into their own line.

Highlight any string in the JSX along with the beginning and ending quotes. Columnize using the right click menu or using this hotkey: shift + option + c.

Highlighted strings that are not wrapped in the classNames function call will automatically be wrapped.

## Requirements

No dependancies required, but a usual use case for this extension contains the following libraries:

- classNames
- React

## Extension Settings

Nothing here yet... Maybe a field to set the number of spaces you have in your tabs.

## Known Issues

Waiting to hear back about this.

## Release Notes

First release!

There are a few use cases this extension can format. The following are a few preformatted examples IE:

"class1 class2 class3"

{classNames("class1 class2 class3")}

{classNames("class1 class2 class3", { class4: condtion })}

{classNames(
"class1 class2 class3",
{ class4: condtion }
)}

Highlighting the class strings along with the quote should break them into columns with imperfect formatting.

### 1.0.0

- Breaks long class strings into multiple lines (column) along with the appropriate single quoting, commas, and indentation.
- Activate columnable via right click context menu
- Activate with hotkey: shift + option + c
- Account for 4 different preformatted use cases.

---

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
# columnable
