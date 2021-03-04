
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, commands, ExtensionContext, workspace, Uri } from 'vscode';

import { extractFilenameFromStdout } from "./tools";

export function activate(context: ExtensionContext) {

	const cp = require('child_process');
	const timeout = 2000;
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

		cp.exec(cmd , {"timeout": timeout}, (err: string, stdout: string, stderr: string) => {
			console.log('stderr', stderr)
			console.log('stdout', stdout)
			if (err) {
				window.showInformationMessage(
					`Problem occured: ${err}`
				);
			} else if (stderr) {
				window.showInformationMessage(
					`Problem occured: ${stderr}`
				);
			} else {
				window.showInformationMessage(
					`Controller file successfully created!`
				);
			}
		});

	}));

	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeCell', async () => {

		const cell = await window.showInputBox({
			placeHolder: 'Please enter cell name...'
		});

		const prefix = await window.showInputBox({
			placeHolder: 'Please enter prefix name or leave empty...'
		});

		const plugin = await window.showInputBox({
			placeHolder: 'Please enter plugin name or leave empty...'
		});

		let cmd = `php ${workspacePath}/bin/cake.php bake controller ${cell}`;

		if (prefix) {
			cmd = `${cmd} --prefix ${prefix}`;
		}

		if (plugin) {
			cmd = `${cmd} --plugin ${plugin}`;
		}

		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

			if (err) {
				window.showInformationMessage(
					`Problem occured: ${err}`
				);
			} else if (stderr) {
				window.showInformationMessage(
					`Problem occured: ${stderr}`
				);
			} else {
				window.showInformationMessage(
					`Cell ${cell} successfully created!`
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
		console.log('dddd', cmd)
		
		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {
			console.log('stderr', stderr)
			console.log('stdout', stdout)
			if (err) {
				window.showInformationMessage(
					`Problem occured: : ${err}`
				);
			} else if (stderr) {
				window.showInformationMessage(
					`Problem occured: ${stderr}`
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

		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

			if (err) {
				window.showInformationMessage(
					`Problem occured: ${err}`
				);
			} else if (stderr) {
				window.showInformationMessage(
					`Problem occured: ${stderr}`
				);
			} else {
				window.showInformationMessage(
					`Template files successfully created!`
				);
			}

		});
		
	}));

	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeCommand', async () => {

		const command = await window.showInputBox({
			placeHolder: 'Please enter command name...'
		});

		const plugin = await window.showInputBox({
			placeHolder: 'Please enter plugin name or leave empty...'
		});

		let cmd = `php ${workspacePath}/bin/cake.php bake command ${command}`;

		if (plugin) {
			cmd = `${cmd} --plugin ${plugin}`;
		}

		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

			if (err) {
				window.showInformationMessage(
					`Problem occured: ${err}`
				);
			} else if (stderr) {
				window.showInformationMessage(
					`Problem occured: ${stderr}`
				);
			} else {
				window.showInformationMessage(
					`Command ${command} successfully created!`
				);
			}

		});
		
	}));
	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeComponent', async () => {

		const component = await window.showInputBox({
			placeHolder: 'Please enter component name...'
		});

		const plugin = await window.showInputBox({
			placeHolder: 'Please enter plugin name or leave empty...'
		});

		let cmd = `php ${workspacePath}/bin/cake.php bake component ${component}`;

		if (plugin) {
			cmd = `${cmd} --plugin ${plugin}`;
		}

		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

			if (err) {
				window.showInformationMessage(
					`Problem occured: ${err}`
				);
			} else if (stderr) {
				window.showInformationMessage(
					`Problem occured: ${stderr}`
				);
			} else {
				window.showInformationMessage(
					`Component ${component} successfully created!`
				);
			}

		});
		
	}));

	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeShell', async () => {

		const shell = await window.showInputBox({
			placeHolder: 'Please enter shell name...'
		});

		let cmd = `php ${workspacePath}/bin/cake.php bake shell ${shell}`;


		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

			if (err) {
				window.showInformationMessage(
					`Problem occured: ${err}`
				);
			} else if (stderr) {
				window.showInformationMessage(
					`Problem occured: ${stderr}`
				);
			} else {
				window.showInformationMessage(
					`Shell ${shell} successfully created!`
				);
			}

		});
		
	}));

	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeHelper', async () => {

		const helper = await window.showInputBox({
			placeHolder: 'Please enter helper name...'
		});

		const plugin = await window.showInputBox({
			placeHolder: 'Please enter plugin name or leave empty...'
		});

		let cmd = `php ${workspacePath}/bin/cake.php bake helper ${helper}`;

		if (plugin) {
			cmd = `${cmd} --plugin ${plugin}`;
		}

		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

			if (err) {
				window.showInformationMessage(
					`Problem occured: ${err}`
				);
			} else if (stderr) {
				window.showInformationMessage(
					`Problem occured: ${stderr}`
				);
			} else {
				window.showInformationMessage(
					`Helper ${helper} successfully created!`
				);
			}

		});
		
	}));

	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakePlugin', async () => {

		const plugin = await window.showInputBox({
			placeHolder: 'Please enter plugin name...'
		});

		let cmd = `php ${workspacePath}/bin/cake.php bake plugin ${plugin}`;

		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

			if (err) {
				window.showInformationMessage(
					`Problem occured: ${err}`
				);
			} else if (stderr) {
				window.showInformationMessage(
					`Problem occured: ${stderr}`
				);
			} else {
				window.showInformationMessage(
					`Plugin ${plugin} successfully created!`
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
		
		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {

		
			if (err) {
				window.showInformationMessage(
					`Problem occured: ${err}`
				);
			} else if (stderr) {
				window.showInformationMessage(
					`Problem occured: ${stderr}`
				);
			} else {
	
				const found = extractFilenameFromStdout(stdout);
			
				if (found !== null) {
	
					window.showInformationMessage(
						`Migration ${migration} successfully created: ${found}`
					);
	
					var openPath = Uri.parse("file:///" + found);
					workspace.openTextDocument(openPath).then(doc => {
						window.showTextDocument(doc);
					});
	
				}
	
			}

		});

		
	}));

	context.subscriptions.push(commands.registerCommand('cakephp-bake.MigrationsMigrate', async () => {

		let cmd = `php ${workspacePath}/bin/cake.php migrations migrate`;

		cp.exec(cmd, {"timeout": timeout} , (err: string, stdout: string, stderr: string) => {
			if (err) {
				window.showInformationMessage(
					`Problem occured: ${err}`
				);
			} else if (stderr) {
				window.showInformationMessage(
					`Problem occured: ${stderr}`
				);
			} else {
				window.showInformationMessage(
					`Migration(s) successfully migrated!`
				);
			}
		});

	}));

}