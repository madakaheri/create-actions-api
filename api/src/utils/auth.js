import {cognito} from '@trusquetta/aws-cognito';

class AuthClass {
	/**
	 * 認証されていない場合は null
	 */
	user = null;

	/**
	 * handler内で実行します。
	 * @param {import('aws-lambda').APIGatewayEvent} event
	 */
	async fetchCurrentAuthenticationUser(event) {
		const {requestContext} = event;
		const {
			cognitoIdentityId: identityId,
			cognitoAuthenticationProvider,
		} = requestContext.identity;
		if (!cognitoAuthenticationProvider) {
			return;
		}

		const cognitoSub = cognitoAuthenticationProvider.split(':')[2];
		const cognitoUser = await (async () => {
			const {Users} = await cognito.listUsers({
				Filter: `sub = "${cognitoSub}"`,
				Limit: 1,
			});
			return Users[0];
		})();
		if (!cognitoUser) {
			return;
		}

		this.user = cognitoUser;
		this.user.identityId = identityId;
		return this.user;
	}
}

export const auth = new AuthClass();
export default auth;
