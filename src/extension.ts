
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, commands, ExtensionContext, workspace, Uri } from 'vscode';

import {extractFilename} from "./extractFilename";

export function activate(context: ExtensionContext) {

	const cp = require('child_process');
	
	const workspacePath = workspace.asRelativePath(workspace.workspaceFolders![0].uri);

	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeController', async () => {

		const model = await window.showInputBox({
			placeHolder: 'Please enter model name...'
		});

		const prefix = await window.showInputBox({
			placeHolder: 'Please enter prefix name or leave empty...'
		});

		const plugin = await window.showInputBox({
			placeHolder: 'Please enter plugin name or leave empty...'
		});

		let cmd = `php ${workspacePath}/bin/cake.php bake controller ${model}`;

		if (prefix) {
			cmd = `${cmd} --prefix ${prefix}`;
		}

		if (plugin) {
			cmd = `${cmd} --plugin ${plugin}`;
		}

		cp.exec(cmd , (err: string, stdout: string, stderr: string) => {
			if (err) {
				window.showInformationMessage(
					`Problem occured: ${err}`
				);
			} else {
				window.showInformationMessage(
					`Controller file successfully created!`
				);
			}
		});

	}));

	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeModel', async () => {

		const model = await window.showInputBox({
			placeHolder: 'Please enter model name...'
		});

		const plugin = await window.showInputBox({
			placeHolder: 'Please enter plugin name or leave empty...'
		});

		let cmd = `php ${workspacePath}/bin/cake.php bake model ${model}`;

		if (plugin) {
			cmd = `${cmd} --plugin ${plugin}`;
		}

		cp.exec(cmd , (err: string, stdout: string, stderr: string) => {
			if (err) {
				window.showInformationMessage(
					`Problem occured: : ${err}`
				);
			} else {
				window.showInformationMessage(
					`Model files successfully created!`
				);
			}
		});

	}));

	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeTemplate', async () => {

		const model = await window.showInputBox({
			placeHolder: 'Please enter model name...'
		});

		const prefix = await window.showInputBox({
			placeHolder: 'Please enter prefix name or leave empty...'
		});

		const plugin = await window.showInputBox({
			placeHolder: 'Please enter plugin name or leave empty...'
		});

		let cmd = `php ${workspacePath}/bin/cake.php bake template ${model}`;

		if (prefix) {
			cmd = `${cmd} --prefix ${prefix}`;
		}

		if (plugin) {
			cmd = `${cmd} --plugin ${plugin}`;
		}

		cp.exec(cmd , (err: string, stdout: string, stderr: string) => {

			if (err) {
				window.showInformationMessage(
					`Problem occured: ${err}`
				);
			} else {
				window.showInformationMessage(
					`Template files successfully created!`
				);
			}

		});
		
	}));

	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeMigration', async () => {
		
		const migration = await window.showInputBox({
			value: '',
			placeHolder: 'Please enter migration name...',
		});
		const path = workspace.asRelativePath(workspace.workspaceFolders![0].uri);

		let cmd = `php ${workspacePath}/bin/cake.php bake migration ${migration}`;
		
		cp.exec(cmd , (err: string, stdout: string, stderr: string) => {

			if (stderr) {
				window.showInformationMessage(
					`Problem occured: ${stderr}`
				);
			}

			const found = extractFilename(stdout);
		
			if (found !== null) {

				window.showInformationMessage(
					`Migration file successfully created: ${found}`
				);

				var openPath = Uri.parse("file:///" + found);
				workspace.openTextDocument(openPath).then(doc => {
					window.showTextDocument(doc);
				});

			}

			if (err) {
				window.showInformationMessage(
					`Problem occured: ${err}`
				);
			}

		});

		
	}));

	context.subscriptions.push(commands.registerCommand('cakephp-bake.MigrationsMigrate', async () => {

		let cmd = `php ${workspacePath}/bin/cake.php migrations migrate`;

		cp.exec(cmd , (err: string, stdout: string, stderr: string) => {
			window.showInformationMessage(
				`Problem occured: ${err}`
			);
		});

	}));

}