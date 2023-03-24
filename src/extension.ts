import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const initTime = 480; // Default to 8 hours if timer is not set

  let timer = initTime; // 8 hours in seconds

  let statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBar.text = formatTime(timer);
  statusBar.show();

  let timerId = setInterval(() => {
    timer--;
    statusBar.text = formatTime(timer);

    if (timer === 0) {
      clearInterval(timerId);
      vscode.window.showInformationMessage("8 hours have passed!");
    }
  }, 1000);

  const resetTime = vscode.commands.registerCommand("timer.resetTime", () => {
    vscode.window.showInformationMessage("Timer reset");
    timer = initTime;
    statusBar.text = formatTime(timer);
  });

  context.subscriptions.push(statusBar, resetTime);
}

function formatTime(time: number): string {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;
  return `$(watch) ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function deactivate() {
  // do nothing
}
