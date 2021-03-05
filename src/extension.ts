/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, commands, ExtensionContext, workspace, Uri } from "vscode";
import { commandsList } from "./commands";
import { classTypes } from "./classTypes";
import { extractFilenameFromStdout, asyncForEach } from "./tools";

const cp = require("child_process");
const stripAnsi = require("strip-ansi");
const timeout = 2000;

const workspacePath = workspace.asRelativePath(
	workspace.workspaceFolders![0].uri
);

export function activate(context: ExtensionContext) {

	commandsList.forEach(

		function (cmdToExec: {
			cmdName: string;
			cmd: string;
			successMessage: string;
			arguments: any;
			options: {
				openFileCreated: boolean;
				forceOverwrite: boolean;
			};
		}) {

			context.subscriptions.push(commands.registerCommand(`cakephp-bake.${cmdToExec.cmdName}`, async () => {

				let cmd = `php ${workspacePath}/bin/cake.php ${cmdToExec.cmd}`;

				await asyncForEach(cmdToExec.arguments, async (argument: any) => {

					switch (argument.type) {
						case 'input':
							const input = await window.showInputBox({ placeHolder: argument.placeholder });
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

				if (cmdToExec.options.forceOverwrite) {
					const overwrite = await window.showQuickPick([{ label: 'No', picked: true }, { label: 'Yes' }], { placeHolder: 'Overwrite? (y/N)' });
					if (overwrite) {
						if (overwrite.label === "Yes") {
							cmd = `${cmd} --force`;
						}
					}
				}

				// Remove multiple spaces
				cmd = cmd.replace(/\s{2,}/g, ' ');

				cp.exec(
					cmd,
					{ timeout: timeout },
					(err: string, stdout: string, stderr: string) => {
						console.log('stdout : ', stdout)
						console.log('stdout : ', err)
						console.log('stderr : ', stderr)
						if (stderr) {
							window.showErrorMessage(stripAnsi(stderr));
						} else {

							window.showInformationMessage(cmdToExec.successMessage);

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
