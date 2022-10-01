/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import {  getCustomCommands, finalAppLocation } from "./tools";
import { CommandsProvider, Command } from "./commands";

const cp = require("child_process");
const stripAnsi = require("strip-ansi");
const timeout = 2000;
const fs = require('fs')

let config = vscode.workspace.getConfiguration('cakephp.bake')
let phpLocation = config.get<string | null>('php.location', 'php')

const directorySeparator = "/"

export async function activate(context: vscode.ExtensionContext) {

	let customCommands = await getCustomCommands()
	context.subscriptions.push(vscode.commands.registerCommand(`cakephp.custom.command`, async () => {
		const picked = await vscode.window.showQuickPick(customCommands, { placeHolder: 'Please select custom command to execute...' });
		if (picked) {
			let cmd = `${phpLocation} ${finalAppLocation()}${directorySeparator}bin${directorySeparator}cake.php ${picked.label}`;
			let activeTerminals = (<any>vscode.window).terminals.length;
			if (activeTerminals > 0) {

				const terminals = <vscode.Terminal[]>(<any>vscode.window).terminals;
				terminals[0].show();
				terminals[0].sendText(cmd);
			} else {
				const terminal = vscode.window.createTerminal(`CakePHP Bake`);
				terminal.show();
				terminal.sendText(cmd);
			}
		}
	}));

	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
		? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

	const commandsProvider = new CommandsProvider(context)

	/**	
	 * This command, show a list of all commands available
	 */
	context.subscriptions.push(vscode.commands.registerCommand(`cakephp.commands`, async () => {
		const picked = await vscode.window.showQuickPick(commandsProvider.getListCommands(), { placeHolder: 'Please select command to execute...' });
		if (picked) {
			vscode.commands.executeCommand(picked.label);
		}
	}));

	/**	
	 * Register all commands
	 */
	commandsProvider.getCommands().forEach(
		function (command: Command) {
			context.subscriptions.push(
				vscode.commands.registerCommand(`cakephp.${command.cmdName}`, async () => {
					command.execute();
				})
			);
		}
	);

	/**	
	 * Specific command to migrate migrations
	 */
	context.subscriptions.push(vscode.commands.registerCommand('cakephp-bake.migrationsMigrate', async () => {

		let cmd = `php ${finalAppLocation()}${directorySeparator}bin${directorySeparator}cake.php migrations migrate`;

		cp.exec(cmd, { "timeout": timeout }, (err: string, stdout: string, stderr: string) => {
			if (stderr) {
				vscode.window.showErrorMessage(stripAnsi(stderr));
			} else {
				vscode.window.showInformationMessage(
					`Migration(s) successfully migrated!`
				);
			}
		});

	}));

}