/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, commands, ExtensionContext, workspace, Uri, Terminal } from "vscode";
import { commandsList } from "./commands";
import { extractFilenameFromStdout, asyncForEach, getListCommands, getCustomCommands, finalAppLocation } from "./tools";

const cp = require("child_process");
const stripAnsi = require("strip-ansi");
const timeout = 2000;
const fs = require('fs')

let config = workspace.getConfiguration('cakephp.bake')
let phpLocation = config.get<string | null>('php.location', 'php')

const directorySeparator = "/"

export async function activate(context: ExtensionContext) {

	let customCommands = await getCustomCommands()
	context.subscriptions.push(commands.registerCommand(`cakephp.custom.command`, async () => {
		const picked = await window.showQuickPick(customCommands, { placeHolder: 'Please select custom command to execute...' });
		if (picked) {
			let cmd = `${phpLocation} ${finalAppLocation()}${directorySeparator}bin${directorySeparator}cake.php ${picked.label}`;
			let activeTerminals = (<any>window).terminals.length;
			if (activeTerminals > 0) {

				const terminals = <Terminal[]>(<any>window).terminals;
				terminals[0].show();
				terminals[0].sendText(cmd);
			} else {
				const terminal = window.createTerminal(`CakePHP Bake`);
				terminal.show();
				terminal.sendText(cmd);
			}
		}
	}));

	context.subscriptions.push(commands.registerCommand(`cakephp.commands`, async () => {
		const picked = await window.showQuickPick(getListCommands(), { placeHolder: 'Please select command to execute...' });
		if (picked) {
			commands.executeCommand(picked.label);
		}
	}));
	commandsList.forEach(

		function (cmdToExec: {
			cmdName: string;
			cmd: string;
			successMessage: string;
			arguments?: Array<{
				call: string
				placeholder: string,
				type: string,
				values?: Array<{ label: string }>,
			}>;
			options: {
				openFileCreated: boolean;
				forceOverwrite: boolean;
			};
		}) {
			
			context.subscriptions.push(commands.registerCommand(`cakephp.${cmdToExec.cmdName}`, async () => {

				let cmd = `${phpLocation} ${finalAppLocation()}${directorySeparator}bin${directorySeparator}cake.php ${cmdToExec.cmd}`;

				if (cmdToExec.arguments) {

					await asyncForEach(cmdToExec.arguments, async (argument: {
						call: string
						required: boolean,
						placeholder: string,
						type: string,
						values: Array<{ label: string }>,
					}) => {

						switch (argument.type) {
							case 'input':
								const input = await window.showInputBox({ 
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
								const picked = await window.showQuickPick(argument.values, { placeHolder: argument.placeholder });
								if (picked) {
									cmd = `${cmd} ${argument.call} ${picked.label}`;
								}
								break;
						}

					})
				}

				if (cmdToExec.options.forceOverwrite) {

					const overwrite = await window.showQuickPick([{ label: 'No', picked: true }, { label: 'Yes' }], { placeHolder: 'Overwrite? (y/N)' });
					if (overwrite) {
						if (overwrite.label === "Yes") {
							cmd = `${cmd} --force`;
						}
					}
				}

				cp.exec(
					cmd.replace(/\s{2,}/g, ' '),
					{ },
					(err: Error | undefined, stdout: string, stderr: string) => {

						if (err) {
							window.showErrorMessage(stripAnsi(err.message));
						} else if (stderr) {
							window.showErrorMessage(stripAnsi(stderr));
						} else {
							window.showInformationMessage(cmdToExec.successMessage);
							if (cmdToExec.options.openFileCreated) {
								const found = extractFilenameFromStdout(stdout);
								if (found !== null) {
									var path = Uri.parse("file:///" + found);
									if (fs.existsSync(path.fsPath)) {
										workspace.openTextDocument(path).then((doc) => {
											window.showTextDocument(doc);
										});
									} else {
										window.showInformationMessage(`${path} not found!`);
									}
								}
							}
						}
					}
				);
			})
			);
		}
	);
	
	context.subscriptions.push(commands.registerCommand('cakephp-bake.migrationsMigrate', async () => {

		let cmd = `php ${finalAppLocation()}${directorySeparator}bin${directorySeparator}cake.php migrations migrate`;

		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {
			if (stderr) {
				window.showErrorMessage(stripAnsi(stderr));
			} else {
				window.showInformationMessage(
					`Migration(s) successfully migrated!`
				);
			}
		});

	}));
	
}