
import { workspace, window } from "vscode";

const semver = require('semver')
const util = require('util');
const directorySeparator = require('path').sep

/**
 * Browse an array asynchronously
 * @param array 
 * @param callback 
 */
export async function asyncForEach(array: any, callback: any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export async function getCustomCommands(): Promise<{ label: string; description: string; }[]> {

  const dirsToScan = [
    "Command",
    "Shell"
  ];

  const fs = require('fs');
  const readdir = util.promisify(fs.readdir);
  let filesFound: { label: string, description: string }[] = [];

  for (const dir of dirsToScan) {
    let files = [];
    try {
      files = await readdir(`${finalAppLocation()}${directorySeparator}src${directorySeparator}${dir}`);
    } catch (err) {
    }

    files.map((file: string, index: number) => {
      filesFound.push({
        label: file.replace(`${dir}.php`, ""),
        description: file
      })
    });
  }

  return filesFound;

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
* @returns text
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
* @returns  boolean
*/
export function inArray(needle: String, haystack: Array<String>): boolean {
  var length = haystack.length;
  for (var i = 0; i < length; i++) {
    if (haystack[i] == needle) return true;
  }
  return false;
}

/**
* Retourne la version majeure de CakePHP
* @returns number
*/
export function getCakeMajorVersion(): number {

  const meta = require(finalAppLocation() + directorySeparator + 'composer.json')
  if (meta.require['cakephp/cakephp']) {
    return semver.minVersion(meta.require['cakephp/cakephp']).major;
  }
  return 0;
}

export function finalAppLocation(): string {
  const workspacePath = workspace.asRelativePath(
    workspace.workspaceFolders![0].uri
  );
  let config = workspace.getConfiguration('cakephp.bake')
  const projectLocation = config.get<string | null>('project.location', null)
  if (projectLocation !== null) {
    return projectLocation;
  }

  return workspacePath;
}