/**
 * Permet d'extraire le chemin du premier fichier
 * créé par la commande bake
 * @param text
 */
export function extractFilenameFromStdout(text: String): typeof text | null
{
    const regex = /\`(?<file>(.*?)\.php)\`/;
    const found = text.match(regex);
    return found !== null ? found.groups!.file : null;
}

export async function asyncForEach(array: [], callback: any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  