import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {test} from 'node:test';
import {makeSrcDirectory} from './make-src-directory.js';

/**
 * 一時ディレクトリを使って処理を実行します。
 * @param {(temporaryRoot: string) => Promise<void>} run
 * @returns {Promise<void>}
 */
async function withTemporaryRoot(run) {
	const temporaryRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'api-init-step-'));
	try {
		await run(temporaryRoot);
	} finally {
		await fs.rm(temporaryRoot, {recursive: true, force: true});
	}
}

test('makeSrcDirectory creates src directory', async () => {
	await withTemporaryRoot(async temporaryRoot => {
		const srcPath = path.join(temporaryRoot, 'src');
		await makeSrcDirectory(srcPath);
		await assert.doesNotReject(() => fs.access(srcPath));
	});
});
