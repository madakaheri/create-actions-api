import fs from 'node:fs/promises';
import process from 'node:process';

/**
 * 設定ファイルを読み込みます。
 * @returns {Promise<{actionApiType: ActionApiType, apiPath: string, sdkConfig: {rootPath: string, srcPath: string, outPath: string}}>}
 */
async function loadConfig() {
	const configFile = new URL('../config.json', import.meta.url);
	const rawConfig = JSON.parse(await fs.readFile(configFile, 'utf8'));
	const configDirectory = new URL('./', configFile);
	const resolvePath = value => new URL(value, configDirectory).pathname;
	return {
		actionApiType: rawConfig.actionApiType,
		apiPath: resolvePath(rawConfig.apiPath),
		sdkConfig: {
			rootPath: resolvePath(rawConfig.sdkConfig.rootPath),
			srcPath: resolvePath(rawConfig.sdkConfig.srcPath),
			outPath: resolvePath(rawConfig.sdkConfig.outPath),
		},
	};
}

const [_node, _file, command, ..._options] = process.argv;
const {actionApiType, apiPath, sdkConfig} = await loadConfig();

const info = `
---------------------------------------

Actions API Scripts

---------------------------------------


Usage: node src/main.js <command>

Commands:
	init               Initialize both API and SDK directories
	api-init           Initialize API directory
	sdk-init           Initialize SDK directory
	sdk-update         Generate SDK Actions from API Actions and update existing SDK
`;

switch (command) {
	case 'init': {
		const {apiInit} = await import('./actions/api-init/index.js');
		await apiInit({
			actionApiType,
			rootPath: apiPath,
		});
		const {sdkInit} = await import('./actions/sdk-init/index.js');
		await sdkInit({
			actionApiType,
			rootPath: sdkConfig.rootPath,
		});
		break;
	}

	case 'api-init': {
		const {apiInit} = await import('./actions/api-init/index.js');
		await apiInit({
			actionApiType,
			rootPath: apiPath,
		});
		break;
	}

	case 'sdk-init': {
		const {sdkInit} = await import('./actions/sdk-init/index.js');
		await sdkInit({
			actionApiType,
			rootPath: sdkConfig.rootPath,
		});
		break;
	}

	case 'sdk-update': {
		const {sdkUpdate} = await import('./actions/sdk-update/index.js');
		await sdkUpdate({
			srcPath: sdkConfig.srcPath,
			outPath: sdkConfig.outPath,
		});
		break;
	}

	default: {
		console.info(info);
	}
}
