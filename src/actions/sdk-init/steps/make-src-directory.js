import fs from 'node:fs/promises';

/**
 * src ディレクトリを作成します。
 * @param {string} srcPath
 * @returns {Promise<void>}
 */
export async function makeSrcDirectory(srcPath) {
	await fs.mkdir(srcPath, {recursive: true});
}
