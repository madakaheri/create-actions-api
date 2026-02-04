import fs from 'node:fs/promises';

/**
 * Action名の一覧を取得
 * @param {string} srcPath
 * @returns {Promise<string[]>}
 */
export async function searchActionNames(sourcePath) {
	const dirrents = await fs.readdir(sourcePath, {
		withFileTypes: true,
		recursive: false,
	});
	return dirrents
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name)
		.sort();
}
