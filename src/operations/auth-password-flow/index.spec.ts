import { PasswordFlowTokenResource, makeAuthenticateWithPasswordFlow } from './index'

import got, { Got } from 'got'
import nock, { disableNetConnect } from 'nock'

beforeAll(() => {
    disableNetConnect()
})

const baseUrl = 'https://bolo.example.com/'
const authPath = '/services/oauth2/token'
describe('authenticateWithClientCredentialFlow', () => {
    const credentials = {
        clientId: 'koko-id',
        clientSecret: 'bolo-secret',
        username: 'ko@ko.com',
        password: 'kok',
        securityToken: 's-token',
    }

    const gotInstance: Got = got.extend({
        prefixUrl: baseUrl,
    })

    const authenticate = makeAuthenticateWithPasswordFlow({ gotInstance })

    it('should authenticate to salesforce', async () => {
        const tokenResource: PasswordFlowTokenResource = {
            access_token: 'koko-token',
            instance_url: 'https://yourInstance.salesforce.com',
            id: 'koko',
            token_type: 'Bearer',
            issued_at: '1234567890',
            signature: 'bolo_koko',
        }

        nock(baseUrl).post(authPath).reply(200, tokenResource)

        const token = await authenticate(credentials)

        expect(token).toEqual(tokenResource)
    })

    it('should fail to authenticate to salesforce', async () => {
        nock(baseUrl).post(authPath).reply(400, { message: 'oh no' })

        await expect(async () => await authenticate(credentials)).rejects.toMatchInlineSnapshot(
            `[HTTPError: Response code 400 (Bad Request)]`
        )
    })
})
