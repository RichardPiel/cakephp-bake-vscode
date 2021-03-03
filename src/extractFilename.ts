/**
 * Permet d'extraire le chemin du fichier
 * créé par la commande bake
 * @param text 
 */
export function extractFilename(text: String) {
    const regex = /\`(?<file>(.*?)[\/\\][0-9]{14}(.*?))\`/;
    const found = text.match(regex);
    return  found !== null ? found.groups!.file : null;
}