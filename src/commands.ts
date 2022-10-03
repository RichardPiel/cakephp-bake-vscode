import * as vscode from 'vscode';
import * as fs from 'fs';
import { asyncForEach, finalAppLocation } from "./tools";
import { File } from "./file";

const cp = require("child_process");
const stripAnsi = require("strip-ansi");
const directorySeparator = require('path').sep
const outputChannel = vscode.window.createOutputChannel("CakePHP Bake");

export class CommandsProvider {

    constructor(private context: vscode.ExtensionContext) { }

    /**
     * Return list of commands to execute from commands.json
     * 
     * @returns {Command[]}
     */
    public getCommands(): Command[] {

        const commands: Command[] = [];

        const shortcutsData = JSON.parse(
            fs.readFileSync(this.context.asAbsolutePath("commands.json"), "utf8")
        );

        for (const cmd of shortcutsData) {
            commands.push(new Command(cmd.cmdName, cmd.cmd, cmd.successMessage, cmd.args, cmd.options));
        }
        return commands;
    }

    /**
     * Return list of commands to show in QuickPick from package.json
     * 
     * @returns {Array<{ label: string, description: string }>}
     */
    public getListCommands(): Array<{ label: string, description: string }> {

        const meta = require(this.context.asAbsolutePath("package.json"))
        return meta.contributes.commands
            .map((c: { command: string, title: string }, index: number) => {
                return {
                    label: c.command,
                    description: c.title
                }
            });
    }

}

export class Command {

    constructor(
        public cmdName: string,
        public cmd: string,
        public successMessage: string,
        public args?: Array<{
            call: string
            placeholder: string,
            type: string,
            values?: Array<{ label: string }>,
        }>,
        public options?: {
            openFileCreated: boolean;
            forceOverwrite: boolean;
        }
    ) { }

    public async execute(): Promise<void> {

        let config = vscode.workspace.getConfiguration('cakephp.bake')
        let openFileCreatedMode = config.get<string | null>('exec.openFileCreatedMode', 'choice')
        let phpLocation = config.get<string | null>('php.location', 'php')

        let cmd = `${phpLocation} ${finalAppLocation()}${directorySeparator}bin${directorySeparator}cake.php ${this.cmd}`;

        if (this.args) {

            await asyncForEach(this.args, async (argument: {
                call: string
                required: boolean,
                placeholder: string,
                type: string,
                values: Array<{ label: string }>,
            }) => {

                switch (argument.type) {
                    case 'input':
                        const input = await vscode.window.showInputBox({
                            placeHolder: argument.placeholder,
                            validateInput: text => {
                                return text || !argument.required ? null : 'Required!';  // return null if validates
                            }
                        });
                        if (input) {
                            cmd = `${cmd} ${argument.call} ${input}`;
                        }
                        break;
                    case 'pick':
                        const picked = await vscode.window.showQuickPick(argument.values, { placeHolder: argument.placeholder });
                        if (picked) {
                            cmd = `${cmd} ${argument.call} ${picked.label}`;
                        }
                        break;
                }

            })
        }

        if (this.options && this.options.forceOverwrite) {

            const overwrite = await vscode.window.showQuickPick([{ label: 'No', picked: true }, { label: 'Yes' }], { placeHolder: 'Overwrite? (y/N)' });
            if (overwrite) {
                if (overwrite.label === "Yes") {
                    cmd = `${cmd} --force`;
                }
            }
        }

        cp.exec(
            cmd.replace(/\s{2,}/g, ' '),
            {},
            async (err: Error | undefined, stdout: string, stderr: string) => {

                if (err) {
                    vscode.window.showErrorMessage(err.message);
                    outputChannel.appendLine(`${new Date().toLocaleString()}`);
                    outputChannel.appendLine(stdout);
                    outputChannel.show(true);
                    return;
                }
                
                if (stderr) {
                    vscode.window.showErrorMessage(stripAnsi(stderr));
                    
                    return;
                }

                vscode.window.showInformationMessage(this.successMessage);

                if (this.options && this.options.openFileCreated) {

                    if (openFileCreatedMode === 'off') {
                        return;
                    }

                    let getFilesRegexp = new RegExp("\`(?<file>(.*?)\.php)\`", "g");
                    let match = getFilesRegexp.exec(stdout);
                    let files: Array<string> = [];

                    // extract all files path from stdout
                    while (match != null) {
                        files.push(match[1]);
                        match = getFilesRegexp.exec(stdout);
                    }

                    /** 
                     * open only selected files created by command
                     */
                    if (openFileCreatedMode === 'choice') {

                        const filesPickable = files.map((filePath: string, index: number) => {
                            return {
                                label: filePath,
                                picked: index == 0 // first file is picked by default
                            }
                        });

                        const pickedFiles = await vscode.window.showQuickPick(filesPickable, { placeHolder: 'Open file created?', canPickMany: true });
                        if (pickedFiles) {

                            pickedFiles.forEach((picked) => {
                                (new File(picked.label)).open();
                            });


                        }
                    }

                    /** 
                     * open all files created by command
                     */
                    if (openFileCreatedMode === 'all') {

                        files.forEach((filePath: string) => {
                            (new File(filePath)).open();
                        });
                    }
                }
            }
        );
    }
}