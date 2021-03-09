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
export function getListCommands(): Array<{ label: string, description: string }>
{
  const meta = require('../package.json')
	return meta.contributes.commands
  .map((c: {command:string, title:string}, index:number) => {
    return {
      label: c.command,
      description: c.title
    }
  });
}