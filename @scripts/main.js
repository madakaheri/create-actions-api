import process from 'node:process';
import {actionApiType, sdkConfig} from '../config.js';

const [_node, _file, command, ...options] = process.argv;

const info = `
---------------------------------------

Actions API Scripts

---------------------------------------


Usage: node @scripts/main.js <command>

Commands:
	api-publish        Generate SDK Actions from API Actions and update existing SDK
	api-init           Initialize API directory
	sdk-init           Initialize SDK directory
`;

switch (command) {
	case 'api-publish': {
		const {apiPublish} = await import('./api-publish/index.js');
		await apiPublish({
			srcPath: sdkConfig.srcPath,
			outPath: sdkConfig.outPath,
		});
		break;
	}

	case 'api-init': {
		const {apiInit} = await import('./api-init/index.js');
		await apiInit({
			actionApiType,
			rootPath: sdkConfig.rootPath,
		});
		break;
	}

	case 'sdk-init': {
		const {sdkInit} = await import('./sdk-init/index.js');
		await sdkInit({
			actionApiType,
			rootPath: sdkConfig.rootPath,
		});
		break;
	}

	default: {
		console.info(info);
	}
}
