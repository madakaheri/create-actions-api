import fs from 'node:fs/promises';

/**
 * ディレクトリセットを生成します。
 * @param {string} rootPath
 * @returns {Promise<void>}
 */
export async function makeDirectories(rootPath) {
	const directories = [
		'src',
		'src/actions',
		'src/utils',
	];
	await Promise.all(directories.map(dir => fs.mkdir(`${rootPath}/${dir}`, {recursive: true})));
}
