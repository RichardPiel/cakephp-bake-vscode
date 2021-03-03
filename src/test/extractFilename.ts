export function extractFilename(text: String) {
    const regex = /Creating\ file\ (?<file>(.*?)[/\\][0-9]{14}(.*?)\.php)/;
			const found = stdout.match(regex);
}