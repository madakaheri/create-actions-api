import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {test} from 'node:test';
import {sdkInit} from './index.js';

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
	const temporaryRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'sdk-init-'));
	try {
		await run(temporaryRoot);
	} finally {
		await fs.rm(temporaryRoot, {recursive: true, force: true});
	}
}

test('sdkInit copies aws-rest assets and creates actions directory', async () => {
	await withTemporaryRoot(async temporaryRoot => {
		const rootPath = path.join(temporaryRoot, 'sdk');
		await sdkInit({actionApiType: 'aws-rest', rootPath});

		await assert.doesNotReject(() => fs.access(path.join(rootPath, 'src')));
		assert.equal(await pathExists(path.join(rootPath, 'src', 'actions')), true);
		assert.equal(await pathExists(path.join(rootPath, 'src', 'index.js')), true);
		assert.equal(await pathExists(path.join(rootPath, 'src', 'utils', 'api.js')), true);
	});
});

test('sdkInit copies aws-lambda assets', async () => {
	await withTemporaryRoot(async temporaryRoot => {
		const rootPath = path.join(temporaryRoot, 'sdk');
		await sdkInit({actionApiType: 'aws-lambda', rootPath});

		assert.equal(await pathExists(path.join(rootPath, 'src', 'index.js')), true);
		assert.equal(await pathExists(path.join(rootPath, 'src', 'utils', 'api.js')), true);
		assert.equal(await pathExists(path.join(rootPath, 'src', 'utils', 'configure.js')), true);
	});
});

test('sdkInit throws when rootPath is not empty', async () => {
	await withTemporaryRoot(async temporaryRoot => {
		const rootPath = path.join(temporaryRoot, 'sdk');
		await fs.mkdir(rootPath, {recursive: true});
		await fs.writeFile(path.join(rootPath, 'dummy.txt'), 'x');

		await assert.rejects(
			sdkInit({actionApiType: 'aws-rest', rootPath}),
			/\bSDK directory already exists\b/,
		);
	});
});
