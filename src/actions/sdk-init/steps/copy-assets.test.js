import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {test} from 'node:test';
import {copyAssets} from './copy-assets.js';

/**
 * パスが存在するかを確認します。
 * @param {string} targetPath
 * @returns {Promise<boolean>}
 */
async function pathExists(targetPath) {
	try {
		await fs.access(targetPath);
		return true;
	} catch {
		return false;
	}
}

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

test('copyAssets copies aws-rest assets into src', async () => {
	await withTemporaryRoot(async temporaryRoot => {
		const srcPath = path.join(temporaryRoot, 'src');
		await fs.mkdir(srcPath, {recursive: true});
		await copyAssets({actionApiType: 'aws-rest', srcPath});
		assert.equal(await pathExists(path.join(srcPath, 'index.js')), true);
		assert.equal(await pathExists(path.join(srcPath, 'utils', 'api.js')), true);
	});
});

test('copyAssets copies aws-lambda assets into src', async () => {
	await withTemporaryRoot(async temporaryRoot => {
		const srcPath = path.join(temporaryRoot, 'src');
		await fs.mkdir(srcPath, {recursive: true});
		await copyAssets({actionApiType: 'aws-lambda', srcPath});
		assert.equal(await pathExists(path.join(srcPath, 'index.js')), true);
		assert.equal(await pathExists(path.join(srcPath, 'utils', 'api.js')), true);
		assert.equal(await pathExists(path.join(srcPath, 'utils', 'configure.js')), true);
	});
});
