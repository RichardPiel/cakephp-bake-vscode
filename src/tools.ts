
import { workspace } from "vscode";
const ds = require('path').sep
const semver = require('semver')
const { promisify } = require('util')
const util = require('util');

/**
 * Permet d'extraire le chemin du premier fichier
 * créé par la commande bake
 * @param text
 */
export function extractFilenameFromStdout(text: String): typeof text | null {
  const regex = /\`(?<file>(.*?)\.php)\`/;
  const found = text.match(regex);
  return found !== null ? found.groups!.file : null;
}

/**
 * Permet de parcourir un tableau de manière asynchrone
 * @param array 
 * @param callback 
 */
export async function asyncForEach(array: any, callback: any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * Retourne les commandes de l'extension
 * @returns commands
 */
export function getListCommands(): Array<{ label: string, description: string }> {
  const meta = require('../package.json')
  return meta.contributes.commands
    .map((c: { command: string, title: string }, index: number) => {
      return {
        label: c.command,
        description: c.title
      }
    });
}
export async function test() {
  return "Hello"
}

export async function getCustomCommands(commandFolder: String): Promise<{ label: string; description: string; }[]> {

  const fs = require('fs');
  const readdir = util.promisify(fs.readdir);
  let files;
  try {
    files = await readdir(commandFolder);
  } catch (err) {
    console.log(err);
  }
  return files.map((file: string, index: number) => {
    return {
      label: file.replace("Command.php", ""),
      description: file
    }
  });
}

/**
 * ucFirst function
 * @param text 
 * @returns 
 */
export function ucFirst(text: String): typeof text {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

/**
* camelCase function
* @param text 
* @returns 
*/
export function toCamelCase(text: String): typeof text {
  return text.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
}

/**
* inArray function
* @param needle 
* @param haystack 
* @returns 
*/
export function inArray(needle: String, haystack: Array<String>): boolean {
  var length = haystack.length;
  for (var i = 0; i < length; i++) {
    if (haystack[i] == needle) return true;
  }
  return false;
}

/**
* Retourne les commandes de l'extension
* @returns commands
*/
export function getCakeMajorVersion(): number {
  const workspacePath = workspace.asRelativePath(
    workspace.workspaceFolders![0].uri
  );
  const meta = require(workspacePath + ds + 'composer.json')
  if (meta.require['cakephp/cakephp']) {
    return semver.minVersion(meta.require['cakephp/cakephp']).major;
  }
  return 0;
}
