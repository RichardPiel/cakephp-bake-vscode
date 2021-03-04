/**
 * Permet d'extraire le chemin du fichier
 * créé par la commande bake
 * @param text 
 */
export function extractFilenameFromStdout(text: String) {
    const regex = /\`(?<file>(.*?)[\/\\][0-9]{14}(.*?))\`/;
    const found = text.match(regex);
    return  found !== null ? found.groups!.file : null;
}

export function detectOverwrite(text: String) {
    const regex = /(.*?\s)(overwrite\?)(.*?\s)/;
    const found = text.match(regex);
    return  found;
}

export function ansiDetect() {
	const pattern = [
		'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
	].join('|');

	return new RegExp(pattern, 'g');
};