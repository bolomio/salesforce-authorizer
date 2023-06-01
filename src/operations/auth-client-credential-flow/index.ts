import type { Got, Options, Response } from 'got'

export interface ClientCredentialFlowTokenResource {
    /**
     * OAuth token that a connected app uses to request access to a protected resource on behalf of the client application.
     * Additional permissions in the form of scopes can accompany the access token.
     */
    access_token: string

    /**
     * A URL indicating the instance of the user’s org. For example: https://yourInstance.salesforce.com/.
     */
    instance_url: string

    /**
     * An identity URL that can be used to identify the org and integration user.
     * The format of the URL is https://login.salesforce.com/id/orgID/userID.
     */
    id: string

    /**
     * The scopes associated with the access token.
     *
     * Scopes further define the type of protected resources that the client can access.
     * You assign scopes to a connected app when you build it, and they’re included with the OAuth tokens during the authorization flow.
     *
     * Because the client credentials flow doesn’t support UI sessions and doesn’t issue a refresh token,
     * Salesforce automatically filters out these scopes.
     *
     * Full access (full)
     * Manage user data via Web browsers (web)
     * Perform requests at any time(refresh_token, offline_access)
     * For more information, see OAuth Tokens and Scopes {@link https://help.salesforce.com/s/articleView?language=en_US&id=sf.remoteaccess_oauth_tokens_scopes.htm&type=5}.
     */
    scope: string

    /**
     * A Bearer token type, which is used for all responses that include an access token.
     */
    token_type: string

    /**
     * Time stamp of when the signature was created in milliseconds.
     */
    issued_at: string

    /**
     * Base64-encoded HMAC-SHA256 signature signed with the client_secret.
     * The signature can include the concatenated ID and issued_at value,
     * which you can use to verify that the identity URL hasn’t changed since the server sent it.
     */
    signature: string
}

export function makeAuthenticateWithClientCredentialFlow({ gotInstance }: { gotInstance: Got }) {
    /**
     * Authenticate a salesforce instance with the client credential flow.
     * For more details regarding the flow, see: {@link https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_client_credentials_flow.htm&type=5}
     *
     * @param {string} clientId - The consumer key of the connected app.
     *   To access the consumer key, go to the App Manager, find the connected app,
     *   select View from the dropdown, and click Manage Consumer Details.
     *   You may be prompted to verify your identity before you can view the consumer key.
     * @param {string} clientSecret - The consumer secret of the connected app.
     *   To access the consumer secret, go to the App Manager, find the connected app,
     *   select View from the dropdown, and click Manage Consumer Details.
     *   You may be prompted to verify your identity before you can view the consumer secret.
     * @returns {Promise<ClientCredentialFlowTokenResource>} A Promise that resolves to the token resource object.
     */
    return async function authenticateWithClientCredentialFlow({
        clientId,
        clientSecret,
    }: {
        clientId: string
        clientSecret: string
    }): Promise<ClientCredentialFlowTokenResource> {
        const options: Options = {
            form: {
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            responseType: 'json',
        }

        const response = (await gotInstance.post(
            `services/oauth2/token`,
            options
        )) as Response<ClientCredentialFlowTokenResource>

        return response.body
    }
}
