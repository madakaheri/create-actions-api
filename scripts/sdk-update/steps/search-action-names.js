import fs from 'node:fs/promises';

/**
 * Action名の一覧を取得
 * @param {string} sourcePath
 * @returns {Promise<string[]>}
 */
export async function searchActionNames(sourcePath) {
	const dirents = await fs.readdir(sourcePath, {
		withFileTypes: true,
		recursive: false,
	});
	return dirents
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name)
		.sort();
}
