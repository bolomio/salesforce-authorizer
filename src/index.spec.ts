import { makeSalesforceAuthorizer, SalesforceAuthorizer } from './index'

describe('index', () => {
    const connector: SalesforceAuthorizer = makeSalesforceAuthorizer({
        baseUrl: 'https://koko.exameple.com',
    })

    it('should be able to instantiate', () => {
        expect(connector).toHaveProperty('authenticateWithClientCredentialFlow')
        expect(connector).toHaveProperty('authenticateWithPasswordFlow')
    })
})
