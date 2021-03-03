
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, commands, ExtensionContext, workspace, Uri } from 'vscode';

import extractFilename from "./extractFilename"
const cp = require('child_process')

export function activate(context: ExtensionContext) {

	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeController', async () => {
		// Nom du modèle à baker
		const model = await window.showInputBox({
			value: '',
			placeHolder: 'Entrez le nom du modèle',
		});

		// Prefix ?
		const prefix = await window.showInputBox({
			value: '',
			placeHolder: 'Prefix ?',
		});

		// Plugin ?
		const plugin = await window.showInputBox({
			value: '',
			placeHolder: 'Plugin ?',
		});

		let cmd = `php ${workspace.rootPath}/bin/cake.php bake controller ${model}`;

		if (prefix) {
			cmd = `${cmd} --prefix ${prefix}`
		}

		if (plugin) {
			cmd = `${cmd} --plugin ${prefix}`
		}

		cp.exec(cmd , (err: string, stdout: string, stderr: string) => {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (err) {
				console.log('error: ' + err);
			}
		});

		// Todo Open file
		
	}));

	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeModel', async () => {

		// Nom du modèle à baker
		const model = await window.showInputBox({
			value: '',
			placeHolder: 'Entrez le nom du modèle',
		});

		// Prefix ?
		const prefix = await window.showInputBox({
			value: '',
			placeHolder: 'Prefix ?',
		});

		// Plugin ?
		const plugin = await window.showInputBox({
			value: '',
			placeHolder: 'Plugin ?',
		});

		let cmd = `php ${workspace.rootPath}/bin/cake.php bake model ${model}`;

		if (prefix) {
			cmd = `${cmd} --prefix ${prefix}`
		}

		if (plugin) {
			cmd = `${cmd} --plugin ${prefix}`
		}

		cp.exec(cmd , (err: string, stdout: string, stderr: string) => {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (err) {
				console.log('error: ' + err);
			}
		});

		// Todo Open file

		
	}));
	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeTemplate', async () => {
		// Nom du modèle à baker
		const model = await window.showInputBox({
			value: '',
			placeHolder: 'Entrez le nom du modèle',
		});

		// Prefix ?
		const prefix = await window.showInputBox({
			value: '',
			placeHolder: 'Prefix ?',
		});

		// Plugin ?
		const plugin = await window.showInputBox({
			value: '',
			placeHolder: 'Plugin ?',
		});

		let cmd = `php ${workspace.rootPath}/bin/cake.php bake template ${model}`;

		if (prefix) {
			cmd = `${cmd} --prefix ${prefix}`
		}

		if (plugin) {
			cmd = `${cmd} --plugin ${prefix}`
		}

		cp.exec(cmd , (err: string, stdout: string, stderr: string) => {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (err) {
				console.log('error: ' + err);
			}
		});

		// Todo Open file

		
	}));
	context.subscriptions.push(commands.registerCommand('cakephp-bake.bakeMigration', async () => {
		
		const migration = await window.showInputBox({
			value: '',
			placeHolder: 'Nom de la migration',
		});

		let cmd = `php ${workspace.rootPath}/bin/cake.php bake migration ${migration}`;

		cp.exec(cmd , (err: string, stdout: string, stderr: string) => {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);

			let dir_to_file = `${workspace.rootPath}/config/`;

			const regex = /Creating\ file\ (?<file>(.*?)[/\\][0-9]{14}(.*?)\.php)/;
			const found = stdout.match(regex);

			if (found !== null) {
				console.log('found FILE : ', found.groups.file);

				var openPath = Uri.parse("file:///" + found.groups.file); //A request file path
				workspace.openTextDocument(openPath).then(doc => {
					window.showTextDocument(doc);
				});
			}
			


			if (err) {
				console.log('error: ' + err);
			}
		});

		// Todo Open file
		
	}));

	context.subscriptions.push(commands.registerCommand('cakephp-bake.MigrationsMigrate', async () => {

		let cmd = `php ${workspace.rootPath}/bin/cake.php migrations migrate`;

		cp.exec(cmd , (err: string, stdout: string, stderr: string) => {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
		
			if (err) {
				console.log('error: ' + err);
			}
		});

		// Todo Open file
		
	}));
}