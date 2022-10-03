import * as vscode from "vscode";
import * as fs from 'fs';

export class File {
    
    public constructor(public path: string) {}

    public open() {

        const path = vscode.Uri.parse("file:///" + this.path);

        if (!fs.existsSync(path.fsPath)) {
            vscode.window.showInformationMessage(`${path} not found!`);
            return;
        }

        vscode.workspace.openTextDocument(path)
            .then((doc) => {
                vscode.window.showTextDocument(doc, { preview: false });
            });
    }
}