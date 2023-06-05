# [bolomio] Salesforce Authorizer

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/bolomio/salesforce-authorizer)
[![npm version](https://badge.fury.io/js/%40bolomio%2Fsalesforce-connector.svg)](https://www.npmjs.com/package/@bolomio/salesforce-authorizer)

The @bolomio/salesforce-authorizer package is an open-source npm package that provides functions for authenticating with Salesforce using different authentication flows. It allows you to easily authenticate Salesforce instances in your Node.js applications.

## Features

- Authenticate with Salesforce using the client credential flow
- Authenticate with Salesforce using the password flow
- Customize authentication options such as base URL, headers, timeouts, and retry settings
- Promise-based API for easy integration with async/await or Promises

## Installation

You can install the package using npm:

```bash
npm install @bolomio/salesforce-authorizer
```

## Usage

```javascript
const { makeSalesforceAuthorizer } = require('@bolomio/salesforce-authorizer');
const { HTTPError } = require('got');

// Create an instance of the Salesforce authorizer with custom options
const authorizer = makeSalesforceAuthorizer({
  baseUrl: "https://{domain-name}.sandbox.my.salesforce.com/",
});

async function authenticate() {
  try {
    const resource = await authorizer.authenticateWithClientCredentialFlow({
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
    });
    console.log(resource);
  } catch (e) {
    if (e instanceof HTTPError) {
      console.log(e.response.body);
    }
  }
}

authenticate();
```

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request. Make sure to follow the [contribution guidelines](./CONTRIBUTING.md).

## License

This project is licensed under the [GNU General Public License](LICENSE).
