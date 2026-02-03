import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {test} from 'node:test';
import {ensureActionsDirectory} from './ensure-actions-directory.js';

/**
 * 一時ディレクトリを使って処理を実行します。
 * @param {(temporaryRoot: string) => Promise<void>} run
 * @returns {Promise<void>}
 */
async function withTemporaryRoot(run) {
	const temporaryRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'sdk-init-step-'));
	try {
		await run(temporaryRoot);
	} finally {
		await fs.rm(temporaryRoot, {recursive: true, force: true});
	}
}

test('ensureActionsDirectory creates actions directory', async () => {
	await withTemporaryRoot(async temporaryRoot => {
		const srcPath = path.join(temporaryRoot, 'src');
		await fs.mkdir(srcPath, {recursive: true});
		await ensureActionsDirectory(srcPath);
		await assert.doesNotReject(() => fs.access(path.join(srcPath, 'actions')));
	});
});
