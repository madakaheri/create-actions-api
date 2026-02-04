import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {test} from 'node:test';
import {copyTemplate} from './copy-template.js';

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
	const temporaryRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'api-init-step-'));
	try {
		await run(temporaryRoot);
	} finally {
		await fs.rm(temporaryRoot, {recursive: true, force: true});
	}
}

test('copyTemplate copies aws-rest template into src', async () => {
	await withTemporaryRoot(async temporaryRoot => {
		const sourcePath = path.join(temporaryRoot, 'src');
		await fs.mkdir(sourcePath, {recursive: true});
		await copyTemplate({actionApiType: 'aws-rest', srcPath: sourcePath});
		assert.equal(await pathExists(path.join(sourcePath, 'index.js')), true);
		assert.equal(await pathExists(path.join(sourcePath, 'utils', 'auth.js')), true);
		assert.equal(await pathExists(path.join(sourcePath, 'utils', 'router', 'index.js')), true);
	});
});

test('copyTemplate copies aws-lambda template into src', async () => {
	await withTemporaryRoot(async temporaryRoot => {
		const sourcePath = path.join(temporaryRoot, 'src');
		await fs.mkdir(sourcePath, {recursive: true});
		await copyTemplate({actionApiType: 'aws-lambda', srcPath: sourcePath});
		assert.equal(await pathExists(path.join(sourcePath, 'index.js')), true);
		assert.equal(await pathExists(path.join(sourcePath, 'utils', 'router', 'index.js')), true);
	});
});
