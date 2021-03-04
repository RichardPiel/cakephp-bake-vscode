/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, commands, ExtensionContext, workspace, Uri } from "vscode";
import { bakeCommandsList } from "./commands";
import { classTypes } from "./classTypes";
import { extractFilenameFromStdout, } from "./tools";

const cp = require("child_process");
const stripAnsi = require("strip-ansi");
const timeout = 2000;

const workspacePath = workspace.asRelativePath(
	workspace.workspaceFolders![0].uri
);

export function activate(context: ExtensionContext) {

	bakeCommandsList.forEach(

		function (cmdToExec: {
			cmdName: string;
			humanName: string;
			cmd: string;
			options: {
				prefix: boolean;
				plugin: boolean;
				openFileCreated: boolean;
				forceOverwrite: boolean;
				selectClassType: boolean;
			};
		}) {

			context.subscriptions.push(commands.registerCommand(`cakephp-bake.${cmdToExec.cmdName}`, async () => {

					let cmd = `php ${workspacePath}/bin/cake.php bake ${cmdToExec.cmd}`;

					if (cmdToExec.options.selectClassType) {
						const classType = await window.showQuickPick(classTypes, { placeHolder: 'Please select class type...' });
						if (classType) {
							cmd = `${cmd} ${classType.label}`;
						}
					}

					const model = await window.showInputBox({
						placeHolder: `Please enter ${cmdToExec.humanName} name...`,
					});
					if (model) {
						cmd = `${cmd} ${model}`;
					}

					if (cmdToExec.options.prefix) {
						const prefix = await window.showInputBox({
							placeHolder: "Please enter prefix name or leave empty...",
						});

						if (prefix) {
							cmd = `${cmd} --prefix ${prefix}`;
						}
					}

					if (cmdToExec.options.plugin) {
						const plugin = await window.showInputBox({
							placeHolder: "Please enter plugin name or leave empty...",
						});
						if (plugin) {
							cmd = `${cmd} --plugin ${plugin}`;
						}
					}

					if (cmdToExec.options.forceOverwrite) {
						const overwrite = await window.showInputBox({
							placeHolder: "Overwrite? (y/N)",
							value: "n",
						});

						if (overwrite === "y" || overwrite === "Y") {
							cmd = `${cmd} --force`;
						}
					}

					cp.exec(
						cmd,
						{ timeout: timeout },
						(err: string, stdout: string, stderr: string) => {
							if (stderr) {
								window.showErrorMessage(stripAnsi(stderr));
							} else {

								window.showInformationMessage(
									`${cmdToExec.humanName} file successfully created!`
								);

								// Automatic file opener
								if (cmdToExec.options.openFileCreated) {
									const found = extractFilenameFromStdout(stdout);

									if (found !== null) {
										var openPath = Uri.parse("file:///" + found);
										workspace.openTextDocument(openPath).then((doc) => {
											window.showTextDocument(doc);
										});
									}
								}
							}
						}
					);
				})
			);
		}
	);

}
