// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const provider1 = vscode.languages.registerCompletionItemProvider(
    "go",
    {
      provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        const linePrefix = document.lineAt(position).text.slice(0, position.character);
        const split = linePrefix.split(/\.(?=[^\.]+$)/);
        const end = split[1];
        var cmd = split[0].trim();

        var ret = [];
        if ("debug".startsWith(end)) {
          var debug = new vscode.CompletionItem("span.debug!", undefined);
          debug.command = {
            command: "vscode-fanatics-helpers.setlogPrintHandler",
            title: "Set Debug Handler",
            arguments: [document, position, cmd, Level.Debug],
          };
          ret.push(debug);
        }

        if ("warn".startsWith(end)) {
          var warn = new vscode.CompletionItem("span.warn!", undefined);
          warn.command = {
            command: "vscode-fanatics-helpers.setlogPrintHandler",
            title: "Set Warn Handler",
            arguments: [document, position, cmd, Level.Warn],
          };
          ret.push(warn);
        }

        if ("fatal".startsWith(end)) {
          var fatal = new vscode.CompletionItem("span.fatal!", undefined);
          fatal.command = {
            command: "vscode-fanatics-helpers.setlogPrintHandler",
            title: "Set Fatal Handler",
            arguments: [document, position, cmd, Level.Fatal],
          };
          ret.push(fatal);
        }

        if ("error".startsWith(end)) {
          var fatal = new vscode.CompletionItem("span.error!", undefined);
          fatal.command = {
            command: "vscode-fanatics-helpers.setlogPrintHandler",
            title: "Set Error Handler",
            arguments: [document, position, cmd, Level.Error],
          };
          ret.push(fatal);
        }

        if ("info".startsWith(end)) {
          var fatal = new vscode.CompletionItem("span.info!", undefined);
          fatal.command = {
            command: "vscode-fanatics-helpers.setlogPrintHandler",
            title: "Set Info Handler",
            arguments: [document, position, cmd, Level.Info],
          };
          ret.push(fatal);
        }

        if ("print".startsWith(end)) {
          var fatal = new vscode.CompletionItem("span.print!", undefined);
          fatal.command = {
            command: "vscode-fanatics-helpers.setlogPrintHandler",
            title: "Set Info Handler",
            arguments: [document, position, cmd, Level.Info],
          };
          ret.push(fatal);
        }

        return ret;
      },
    },
    "."
  );

  const setlogPrintHandler = vscode.commands.registerCommand(
    "vscode-fanatics-helpers.setlogPrintHandler",
    async (document: vscode.TextDocument, position: vscode.Position, cmd: string, lvl: Level) => {
      var txt: string = "";
      switch (lvl) {
        case Level.Debug:
          txt = `span.Debugf("${cmd}: %v", ${cmd})`;
          break;

        case Level.Warn:
          txt = `span.Earnf("${cmd}: %v", ${cmd})`;
          break;

        case Level.Fatal:
          txt = `span.Fatalf(1, "${cmd}: %v", ${cmd})`;
          break;

        case Level.Error:
          txt = `span.Errorf("${cmd}: %v", ${cmd})`;
          break;

        case Level.Info:
          txt = `span.Infof("${cmd}: %v", ${cmd})`;
          break;

        default:
          return;
      }

      let editor = vscode.window.activeTextEditor;
      if (editor) {
        editor.edit((editBuilder: vscode.TextEditorEdit) => {
          const line = editor.document.lineAt(position);
          // Get the preceding whitespace
          console.log("line.text", line.text);
          const ws = line.text.match(/(\s*)/g);
          if (ws && ws.length > 0) {
            txt = ws[0] + txt;
          }
          editBuilder.delete(line.range);
          editBuilder.insert(line.range.start, txt);
        });
      }
    }
  );

  context.subscriptions.push(provider1, setlogPrintHandler);
}

// This method is called when your extension is deactivated
export function deactivate() {}

enum Level {
  Debug = 1,
  Warn,
  Fatal,
  Error,
  Info,
}
