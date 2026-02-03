import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {test} from 'node:test';
import {ensureEmptyRoot} from './ensure-empty-root.js';

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

test('ensureEmptyRoot passes when directory does not exist', async () => {
	await withTemporaryRoot(async temporaryRoot => {
		const rootPath = path.join(temporaryRoot, 'api');
		await assert.doesNotReject(() => ensureEmptyRoot(rootPath));
	});
});

test('ensureEmptyRoot throws when directory is not empty', async () => {
	await withTemporaryRoot(async temporaryRoot => {
		const rootPath = path.join(temporaryRoot, 'api');
		await fs.mkdir(rootPath, {recursive: true});
		await fs.writeFile(path.join(rootPath, 'dummy.txt'), 'x');
		await assert.rejects(
			ensureEmptyRoot(rootPath),
			/\bAPI directory already exists\b/,
		);
	});
});
