import fs from 'node:fs/promises';

/**
 * src ディレクトリを作成します。
 * @param {string} srcPath
 * @returns {Promise<void>}
 */
export async function makeSourceDirectory(sourcePath) {
	await fs.mkdir(sourcePath, {recursive: true});
}
