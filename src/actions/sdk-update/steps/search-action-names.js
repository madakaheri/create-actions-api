import fs from 'node:fs/promises';

/**
 * Action名の一覧を取得
 * @param {string} srcPath
 * @returns {Promise<string[]>}
 */
export async function searchActionNames(srcPath) {
	const dirrents = await fs.readdir(srcPath, {
		withFileTypes: true,
		recursive: false,
	});
	return dirrents
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name)
		.sort();
}
