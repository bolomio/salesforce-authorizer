import type { Options, Response, Got } from 'got'

export interface PasswordFlowTokenResource {
    /**
     * An identity URL that can be used to identify the user and to query for more information about the user.
     */
    id: string

    /**
     * Time stamp of when the signature was created in milliseconds.
     */
    issued_at: string

    /**
     * A URL indicating the instance of the user’s org. For example: https://yourInstance.salesforce.com/.
     */
    instance_url: string

    /**
     * Base64-encoded HMAC-SHA256 signature signed with the client_secret.
     * The signature can include the concatenated ID and issued_at value,
     * which you can use to verify that the identity URL hasn’t changed since the server sent it.
     */
    signature: string

    /**
     * OAuth token that a connected app uses to request access to a protected resource on behalf of the client application.
     * Additional permissions in the form of scopes can accompany the access token.
     */
    access_token: string

    /**
     * A Bearer token type, which is used for all responses that include an access token.
     */
    token_type: string
}

export function makeAuthenticateWithPasswordFlow({ gotInstance }: { gotInstance: Got }) {
    /**
     * Authenticate a salesforce instance with the password flow.
     * @link https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_username_password_flow.htm&type=5
     *
     * @param {string} clientId - The client ID provided by the connected app in Salesforce.
     * @param {string} clientSecret - The client secret provided by the connected app in Salesforce.
     * @param {string} username - The username of the Salesforce user to authenticate.
     * @param {string} password - The password of the Salesforce user to authenticate.
     * @param {string} securityToken - The security token of the Salesforce user.
     *   This token is provided by email when the password has been set or reset.
     * @returns {Promise<PasswordFlowTokenResource>} A Promise that resolves to the token resource object.
     */
    return async function authenticateWithPasswordFlow({
        clientId,
        clientSecret,
        username,
        password,
        securityToken,
    }: {
        clientId: string
        clientSecret: string
        username: string
        password: string
        securityToken: string
    }): Promise<PasswordFlowTokenResource> {
        const options: Options = {
            form: {
                grant_type: 'password',
                client_id: clientId,
                client_secret: clientSecret,
                username,
                password: `${password}${securityToken}`,
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            responseType: 'json',
        }

        const response = (await gotInstance.post(
            `services/oauth2/token`,
            options
        )) as Response<PasswordFlowTokenResource>

        return response.body
    }
}
