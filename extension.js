const vscode = require('vscode');

// single, double, back tick
const validQuotes = ["'", '"', '`'];

let isClassNamesFnWrapped = false;
let isClassNamesAbove = false;
let whiteSpaceCount = 0;

function getSelectionText() {
  const editor = vscode.window.activeTextEditor;
  const selection = editor.selection;
  if (selection && !selection.isEmpty) {
    const selectionRange = new vscode.Range(
      selection.start.line,
      selection.start.character,
      selection.end.line,
      selection.end.character
    );
    const highlighted = editor.document.getText(selectionRange);
    return highlighted;
  }
  return '';
}

function setIsClassNamesFnWrapped() {
  const editor = vscode.window.activeTextEditor;
  const selection = editor.selection;
  isClassNamesAbove = false;
  const classNamesFnCall = new vscode.Range(
    selection.start.line,
    Math.max(selection.start.character - 11, 0),
    selection.start.line,
    selection.start.character
  );

  const text = editor.document.getText(classNamesFnCall);

  isClassNamesFnWrapped = text === 'classNames(';

  if (/\S/.test(text)) {
    return;
  }
  // if it was all whitespace, classNamesFnCall could be one line up.
  isClassNamesFnWrapped = isClassNamesAbove = editor.document
    .lineAt(Math.max(selection.start.line - 1, 0))
    .text.includes('classNames(');
}

function setWhiteSpaceCount() {
  const editor = vscode.window.activeTextEditor;
  const selection = editor.selection;
  whiteSpaceCount = editor.document.lineAt(
    selection.start.line
  ).firstNonWhitespaceCharacterIndex;
}

function formatText(text) {
  let formattedText = text.slice(1, text.length - 1);
  formattedText = formattedText.split(' ');
  const end = formattedText.length - 1;
  const start = 0;
  formattedText = formattedText
    .map(
      (word, i) =>
        `${
          isClassNamesAbove && i == start
            ? '\x20'.repeat(2)
            : '\x20'.repeat(whiteSpaceCount + 2)
        }'${word}'${i === end ? '' : ','}\n`
    )
    .join('');
  return isClassNamesFnWrapped
    ? `${isClassNamesAbove ? '' : '\n'}${formattedText}${'\x20'.repeat(
        whiteSpaceCount
      )}`
    : `{classNames(\n${formattedText}${'\x20'.repeat(whiteSpaceCount)})}`;
}

/**
 * @param {string} text
 */
function injectText(text) {
  const editor = vscode.window.activeTextEditor;
  const selection = editor.selection;
  if (!editor) {
    return;
  }
  const selectionRange = new vscode.Range(
    selection.start.line,
    selection.start.character,
    selection.end.line,
    selection.end.character
  );
  editor.edit((editBuilder) => {
    editBuilder.replace(selectionRange, text);
  });
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'columnable.columnize',
    function () {
      // The code you place here will be executed every time your command is executed
      const selectionText = getSelectionText();
      if (!selectionText) {
        vscode.window.showInformationMessage(
          'Columnable: There was nothing highlighted.'
        );
        return;
      }

      setIsClassNamesFnWrapped();

      setWhiteSpaceCount();

      const isValidText =
        validQuotes.includes(selectionText.at(0)) &&
        validQuotes.includes(selectionText.at(-1));

      if (!isValidText) {
        vscode.window.showInformationMessage(
          'Columnable: Selected string must start and end with single quote, double quote or back tick'
        );
        return;
      }

      vscode.window.showInformationMessage('Columnable: Columnizing!');

      const formattedText = formatText(selectionText);
      injectText(formattedText);
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

/**
 * ! 1. Work on highlight and format.
 * !	- Should work only on strings that start and end with either ` , ", or '
 * ! 2. Add a context menu selection (right click menu)
 * TODO 3. Have it format on save OR not. It's not like we always wanted to break the lines.
 */

module.exports = {
  activate,
  deactivate,
};
