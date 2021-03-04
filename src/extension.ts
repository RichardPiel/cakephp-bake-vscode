/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, commands, ExtensionContext, workspace, Uri } from "vscode";

import { extractFilenameFromStdout, ansiDetect } from "./tools";

const bakeCommandsList = [
	{
		cmdName: "bakeBehavior",
		humanName: "Behavior",
		cmd: "behavior",
		prefix: true,
		plugin: true,
	},
];

export function activate(context: ExtensionContext) {

	const cp = require("child_process");
	const stripAnsi = require("strip-ansi");
	const timeout = 2000;
	const workspacePath = workspace.asRelativePath(
		workspace.workspaceFolders![0].uri
	);

	commandsList.forEach((value, index) => {
		context.subscriptions.push(
			commands.registerCommand(`cakephp-bake.${value.cmdName}`, async () => {
				const model = await window.showInputBox({
					placeHolder: `Please enter ${value.humanName} name...`,
				});

				let cmd = `php ${workspacePath}/bin/cake.php bake ${value.cmd} ${model}`;

				if (value.prefix) {
					const prefix = await window.showInputBox({
						placeHolder: "Please enter prefix name or leave empty...",
					});

					if (prefix) {
						cmd = `${cmd} --prefix ${prefix}`;
					}
				}

				if (value.plugin) {
					const plugin = await window.showInputBox({
						placeHolder: "Please enter plugin name or leave empty...",
					});
					if (plugin) {
						cmd = `${cmd} --plugin ${plugin}`;
					}
				}

				const overwrite = await window.showInputBox({
					placeHolder: "Overwrite? (y/N)",
					value: "n",
				});

				if (overwrite === "y" || overwrite === "Y") {
					cmd = `${cmd} --force`;
				}

				cp.exec(
					cmd,
					{ timeout: timeout },
					(err: string, stdout: string, stderr: string) => {
						if (stderr) {
							window.showErrorMessage(stripAnsi(stderr));
						} else {
							window.showInformationMessage(
								`${value.humanName} file successfully created!`
							);
						}
					}
				);
			})
		);
	});

	// export function activate(context: ExtensionContext) {

	// 	const cp = require('child_process');
	// 	const stripAnsi = require('strip-ansi');
	// 	const timeout = 2000;
	// 	const workspacePath = workspace.asRelativePath(workspace.workspaceFolders![0].uri);

	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeController', async () => {

	// 		const model = await window.showInputBox({
	// 			placeHolder: 'Please enter model name...'
	// 		});

	// 		const prefix = await window.showInputBox({
	// 			placeHolder: 'Please enter prefix name or leave empty...'
	// 		});

	// 		const plugin = await window.showInputBox({
	// 			placeHolder: 'Please enter plugin name or leave empty...'
	// 		});

	// 		const overwrite = await window.showInputBox({
	// 			placeHolder: 'Overwrite? (y/N)',
	// 			value: 'n'
	// 		});

	// 		let cmd = `php ${workspacePath}/bin/cake.php bake controller ${model}`;

	// 		if (prefix) {
	// 			cmd = `${cmd} --prefix ${prefix}`;
	// 		}

	// 		if (plugin) {
	// 			cmd = `${cmd} --plugin ${plugin}`;
	// 		}

	// 		if (overwrite === 'y' || overwrite === 'Y') {
	// 			cmd = `${cmd} --force`;
	// 		}

	// 		cp.exec(cmd , {"timeout": timeout}, (err: string, stdout: string, stderr: string) => {
	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {
	// 				window.showInformationMessage(
	// 					`Controller file successfully created!`
	// 				);
	// 			}
	// 		});

	// 	}));

	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeCell', async () => {

	// 		const cell = await window.showInputBox({
	// 			placeHolder: 'Please enter cell name...'
	// 		});

	// 		const prefix = await window.showInputBox({
	// 			placeHolder: 'Please enter prefix name or leave empty...'
	// 		});

	// 		const plugin = await window.showInputBox({
	// 			placeHolder: 'Please enter plugin name or leave empty...'
	// 		});

	// 		const overwrite = await window.showInputBox({
	// 			placeHolder: 'Overwrite? (y/N)',
	// 			value: 'n'
	// 		});

	// 		let cmd = `php ${workspacePath}/bin/cake.php bake controller ${cell}`;

	// 		if (prefix) {
	// 			cmd = `${cmd} --prefix ${prefix}`;
	// 		}

	// 		if (plugin) {
	// 			cmd = `${cmd} --plugin ${plugin}`;
	// 		}

	// 		if (overwrite === 'y' || overwrite === 'Y') {
	// 			cmd = `${cmd} --force`;
	// 		}

	// 		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {
	// 				window.showInformationMessage(
	// 					`Cell ${cell} successfully created!`
	// 				);
	// 			}
	// 		});

	// 	}));

	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeModel', async () => {

	// 		const model = await window.showInputBox({
	// 			placeHolder: 'Please enter model name...'
	// 		});

	// 		const plugin = await window.showInputBox({
	// 			placeHolder: 'Please enter plugin name or leave empty...'
	// 		});

	// 		const overwrite = await window.showInputBox({
	// 			placeHolder: 'Overwrite? (y/N)',
	// 			value: 'n'
	// 		});

	// 		let cmd = `php ${workspacePath}/bin/cake.php bake model ${model}`;

	// 		if (plugin) {
	// 			cmd = `${cmd} --plugin ${plugin}`;
	// 		}

	// 		if (overwrite === 'y' || overwrite === 'Y') {
	// 			cmd = `${cmd} --force`;
	// 		}

	// 		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {
	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {
	// 				window.showInformationMessage(
	// 					`Model files successfully created!`
	// 				);
	// 			}
	// 		});

	// 	}));

	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeTemplate', async () => {

	// 		const model = await window.showInputBox({
	// 			placeHolder: 'Please enter model name...'
	// 		});

	// 		const prefix = await window.showInputBox({
	// 			placeHolder: 'Please enter prefix name or leave empty...'
	// 		});

	// 		const plugin = await window.showInputBox({
	// 			placeHolder: 'Please enter plugin name or leave empty...'
	// 		});

	// 		const overwrite = await window.showInputBox({
	// 			placeHolder: 'Overwrite? (y/N)',
	// 			value: 'n'
	// 		});

	// 		let cmd = `php ${workspacePath}/bin/cake.php bake template ${model}`;

	// 		if (prefix) {
	// 			cmd = `${cmd} --prefix ${prefix}`;
	// 		}

	// 		if (plugin) {
	// 			cmd = `${cmd} --plugin ${plugin}`;
	// 		}

	// 		if (overwrite === 'y' || overwrite === 'Y') {
	// 			cmd = `${cmd} --force`;
	// 		}

	// 		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {
	// 				window.showInformationMessage(
	// 					`Template files successfully created!`
	// 				);
	// 			}

	// 		});

	// 	}));

	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeCommand', async () => {

	// 		const command = await window.showInputBox({
	// 			placeHolder: 'Please enter command name...'
	// 		});

	// 		const plugin = await window.showInputBox({
	// 			placeHolder: 'Please enter plugin name or leave empty...'
	// 		});

	// 		const overwrite = await window.showInputBox({
	// 			placeHolder: 'Overwrite? (y/N)',
	// 			value: 'n'
	// 		});

	// 		let cmd = `php ${workspacePath}/bin/cake.php bake command ${command}`;

	// 		if (plugin) {
	// 			cmd = `${cmd} --plugin ${plugin}`;
	// 		}

	// 		if (overwrite === 'y' || overwrite === 'Y') {
	// 			cmd = `${cmd} --force`;
	// 		}

	// 		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {
	// 				window.showInformationMessage(
	// 					`Command ${command} successfully created!`
	// 				);
	// 			}

	// 		});

	// 	}));

	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeBehavior', async () => {

	// 		const command = await window.showInputBox({
	// 			placeHolder: 'Please enter behavior name...'
	// 		});

	// 		const plugin = await window.showInputBox({
	// 			placeHolder: 'Please enter plugin name or leave empty...'
	// 		});

	// 		const overwrite = await window.showInputBox({
	// 			placeHolder: 'Overwrite? (y/N)',
	// 			value: 'n'
	// 		});

	// 		let cmd = `php ${workspacePath}/bin/cake.php bake behavior ${command}`;

	// 		if (plugin) {
	// 			cmd = `${cmd} --plugin ${plugin}`;
	// 		}

	// 		if (overwrite === 'y' || overwrite === 'Y') {
	// 			cmd = `${cmd} --force`;
	// 		}

	// 		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {
	// 				window.showInformationMessage(
	// 					`Behavior ${command} successfully created!`
	// 				);
	// 			}

	// 		});

	// 	}));
	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeTask', async () => {

	// 		const command = await window.showInputBox({
	// 			placeHolder: 'Please enter task name...'
	// 		});

	// 		const plugin = await window.showInputBox({
	// 			placeHolder: 'Please enter plugin name or leave empty...'
	// 		});

	// 		const overwrite = await window.showInputBox({
	// 			placeHolder: 'Overwrite? (y/N)',
	// 			value: 'n'
	// 		});

	// 		let cmd = `php ${workspacePath}/bin/cake.php bake task ${command}`;

	// 		if (plugin) {
	// 			cmd = `${cmd} --plugin ${plugin}`;
	// 		}

	// 		if (overwrite === 'y' || overwrite === 'Y') {
	// 			cmd = `${cmd} --force`;
	// 		}

	// 		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {
	// 				window.showInformationMessage(
	// 					`Task ${command} successfully created!`
	// 				);
	// 			}

	// 		});

	// 	}));

	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeMailer', async () => {

	// 		const command = await window.showInputBox({
	// 			placeHolder: 'Please enter mailer name...'
	// 		});

	// 		const plugin = await window.showInputBox({
	// 			placeHolder: 'Please enter plugin name or leave empty...'
	// 		});

	// 		const overwrite = await window.showInputBox({
	// 			placeHolder: 'Overwrite? (y/N)',
	// 			value: 'n'
	// 		});

	// 		let cmd = `php ${workspacePath}/bin/cake.php bake mailer ${command}`;

	// 		if (plugin) {
	// 			cmd = `${cmd} --plugin ${plugin}`;
	// 		}

	// 		if (overwrite === 'y' || overwrite === 'Y') {
	// 			cmd = `${cmd} --force`;
	// 		}

	// 		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {
	// 				window.showInformationMessage(
	// 					`Mailer ${command} successfully created!`
	// 				);
	// 			}

	// 		});

	// 	}));
	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeFixture', async () => {

	// 		const command = await window.showInputBox({
	// 			placeHolder: 'Please enter fixture name...'
	// 		});

	// 		const plugin = await window.showInputBox({
	// 			placeHolder: 'Please enter plugin name or leave empty...'
	// 		});

	// 		const overwrite = await window.showInputBox({
	// 			placeHolder: 'Overwrite? (y/N)',
	// 			value: 'n'
	// 		});

	// 		let cmd = `php ${workspacePath}/bin/cake.php bake fixture ${command}`;

	// 		if (plugin) {
	// 			cmd = `${cmd} --plugin ${plugin}`;
	// 		}

	// 		if (overwrite === 'y' || overwrite === 'Y') {
	// 			cmd = `${cmd} --force`;
	// 		}

	// 		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {
	// 				window.showInformationMessage(
	// 					`Fixture ${command} successfully created!`
	// 				);
	// 			}

	// 		});

	// 	}));

	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeMiddleware', async () => {

	// 		const command = await window.showInputBox({
	// 			placeHolder: 'Please enter middleware name...'
	// 		});

	// 		const plugin = await window.showInputBox({
	// 			placeHolder: 'Please enter plugin name or leave empty...'
	// 		});

	// 		const overwrite = await window.showInputBox({
	// 			placeHolder: 'Overwrite? (y/N)',
	// 			value: 'n'
	// 		});

	// 		let cmd = `php ${workspacePath}/bin/cake.php bake middleware ${command}`;

	// 		if (plugin) {
	// 			cmd = `${cmd} --plugin ${plugin}`;
	// 		}

	// 		if (overwrite === 'y' || overwrite === 'Y') {
	// 			cmd = `${cmd} --force`;
	// 		}

	// 		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {
	// 				window.showInformationMessage(
	// 					`Middleware ${command} successfully created!`
	// 				);
	// 			}

	// 		});

	// 	}));

	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeComponent', async () => {

	// 		const component = await window.showInputBox({
	// 			placeHolder: 'Please enter component name...'
	// 		});

	// 		const plugin = await window.showInputBox({
	// 			placeHolder: 'Please enter plugin name or leave empty...'
	// 		});

	// 		const overwrite = await window.showInputBox({
	// 			placeHolder: 'Overwrite? (y/N)',
	// 			value: 'n'
	// 		});

	// 		let cmd = `php ${workspacePath}/bin/cake.php bake component ${component}`;

	// 		if (plugin) {
	// 			cmd = `${cmd} --plugin ${plugin}`;
	// 		}

	// 		if (overwrite === 'y' || overwrite === 'Y') {
	// 			cmd = `${cmd} --force`;
	// 		}

	// 		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {
	// 				window.showInformationMessage(
	// 					`Component ${component} successfully created!`
	// 				);
	// 			}

	// 		});

	// 	}));

	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeShell', async () => {

	// 		const shell = await window.showInputBox({
	// 			placeHolder: 'Please enter shell name...'
	// 		});

	// 		const plugin = await window.showInputBox({
	// 			placeHolder: 'Please enter plugin name or leave empty...'
	// 		});

	// 		const overwrite = await window.showInputBox({
	// 			placeHolder: 'Overwrite? (y/N)',
	// 			value: 'n'
	// 		});

	// 		let cmd = `php ${workspacePath}/bin/cake.php bake shell ${shell}`;

	// 		if (plugin) {
	// 			cmd = `${cmd} --plugin ${plugin}`;
	// 		}

	// 		if (overwrite === 'y' || overwrite === 'Y') {
	// 			cmd = `${cmd} --force`;
	// 		}

	// 		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {
	// 				window.showInformationMessage(
	// 					`Shell ${shell} successfully created!`
	// 				);
	// 			}

	// 		});

	// 	}));

	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeHelper', async () => {

	// 		const helper = await window.showInputBox({
	// 			placeHolder: 'Please enter helper name...'
	// 		});

	// 		const plugin = await window.showInputBox({
	// 			placeHolder: 'Please enter plugin name or leave empty...'
	// 		});

	// 		const overwrite = await window.showInputBox({
	// 			placeHolder: 'Overwrite? (y/N)',
	// 			value: 'n'
	// 		});

	// 		let cmd = `php ${workspacePath}/bin/cake.php bake helper ${helper}`;

	// 		if (plugin) {
	// 			cmd = `${cmd} --plugin ${plugin}`;
	// 		}

	// 		if (overwrite === 'y' || overwrite === 'Y') {
	// 			cmd = `${cmd} --force`;
	// 		}

	// 		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {
	// 				window.showInformationMessage(
	// 					`Helper ${helper} successfully created!`
	// 				);
	// 			}

	// 		});

	// 	}));

	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakePlugin', async () => {

	// 		const plugin = await window.showInputBox({
	// 			placeHolder: 'Please enter plugin name...'
	// 		});

	// 		const overwrite = await window.showInputBox({
	// 			placeHolder: 'Overwrite? (y/N)',
	// 			value: 'n'
	// 		});

	// 		let cmd = `php ${workspacePath}/bin/cake.php bake plugin ${plugin}`;

	// 		if (overwrite === 'y' || overwrite === 'Y') {
	// 			cmd = `${cmd} --force`;
	// 		}

	// 		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {
	// 				window.showInformationMessage(
	// 					`Plugin ${plugin} successfully created!`
	// 				);
	// 			}

	// 		});

	// 	}));

	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeMigration', async () => {

	// 		const migration = await window.showInputBox({
	// 			value: '',
	// 			placeHolder: 'Please enter migration name...',
	// 		});

	// 		let cmd = `php ${workspacePath}/bin/cake.php bake migration ${migration}`;

	// 		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {

	// 				const found = extractFilenameFromStdout(stdout);

	// 				if (found !== null) {

	// 					window.showInformationMessage(
	// 						`Migration ${migration} successfully created: ${found}`
	// 					);

	// 					var openPath = Uri.parse("file:///" + found);
	// 					workspace.openTextDocument(openPath).then(doc => {
	// 						window.showTextDocument(doc);
	// 					});

	// 				}

	// 			}

	// 		});

	// 	}));

	// 	context.subscriptions.push(commands.registerCommand('cakephp-bake.MigrationsMigrate', async () => {

	// 		let cmd = `php ${workspacePath}/bin/cake.php migrations migrate`;

	// 		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {
	// 			if (stderr) {
	// 				window.showErrorMessage(stripAnsi(stderr));
	// 			} else {
	// 				window.showInformationMessage(
	// 					`Migration(s) successfully migrated!`
	// 				);
	// 			}
	// 		});

	// 	}));
}
