import { makeAuthenticateWithClientCredentialFlow } from './operations/auth-client-credential-flow'
import { makeAuthenticateWithPasswordFlow } from './operations/auth-password-flow'

import type { Got, Headers, Hooks, NormalizedOptions, RequiredRetryOptions } from 'got'
import got from 'got'

/**
 * Configurations for the Salesforce Authorizer.
 */
export interface Options {
    /**
     * The base URL of the Salesforce instance.
     */
    baseUrl: string

    /**
     * Optional headers to include in requests to the Salesforce API.
     */
    headers?: Headers

    /**
     * The timeout duration for requests to the Salesforce API.
     */
    timeout?: NormalizedOptions['timeout']

    /**
     * Retry options for failed requests to the Salesforce API.
     */
    retry?: RequiredRetryOptions

    /**
     * Hooks to customize the behavior of requests to the Salesforce API.
     */
    hooks?: Hooks
}

/**
 * Create a Salesforce Authorizer that provides functions for authenticating with Salesforce.
 *
 * @param {Options} options - Configurations for the authorizer.
 * @returns {SalesforceAuthorizer} An object with authentication functions.
 */
export function makeSalesforceAuthorizer(options: Options) {
    const gotInstance: Got = got.extend({
        prefixUrl: options.baseUrl,
        headers: options.headers,
        timeout: options.timeout,
        retry: options.retry,
        hooks: options.hooks,
    })

    return {
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
        authenticateWithClientCredentialFlow: makeAuthenticateWithClientCredentialFlow({
            gotInstance,
        }),
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
        authenticateWithPasswordFlow: makeAuthenticateWithPasswordFlow({ gotInstance }),
    }
}

export type SalesforceAuthorizer = ReturnType<typeof makeSalesforceAuthorizer>
