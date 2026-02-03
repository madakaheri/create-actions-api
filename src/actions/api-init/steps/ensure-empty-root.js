import fs from 'node:fs/promises';

/**
 * ルートディレクトリが空であることを確認します。
 * @param {string} rootPath
 * @returns {Promise<void>}
 */
export async function ensureEmptyRoot(rootPath) {
	try {
		const entries = await fs.readdir(rootPath);
		if (entries.length > 0) {
			throw new Error('API directory already exists.');
		}
	} catch (error) {
		if (error.code === 'ENOENT') {
			return;
		}

		throw error;
	}
}
