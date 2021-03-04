/**
 * Permet d'extraire le chemin du premier fichier
 * créé par la commande bake
 * @param text 
 */
export function extractFilenameFromStdout(text: String) {
    const regex = /\`(?<file>(.*?)\.php)\`/;
    const found = text.match(regex);
    return found !== null ? found.groups!.file : null;
}
