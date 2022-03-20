/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2021 Signum Network
 */

export const constants = {
  maxRecipientsSameMultiout: 128,
  maxRecipientsMultiout: 64,
  connectionTimeout: 10000,
  currencies: [
    {currency: 'AUD', symbol: '$'},
    {currency: 'BRL', symbol: 'R$'},
    {currency: 'BTC', symbol: '฿'},
    {currency: 'CAD', symbol: '$'},
    {currency: 'CLP', symbol: '$'},
    {currency: 'CNY', symbol: '¥'},
    {currency: 'CZK', symbol: 'Kč'},
    {currency: 'DKK', symbol: 'kr'},
    {currency: 'EUR', symbol: '€'},
    {currency: 'GBP', symbol: '£'},
    {currency: 'HKD', symbol: '$'},
    {currency: 'HUF', symbol: 'Ft'},
    {currency: 'IDR', symbol: 'Rp'},
    {currency: 'ILS', symbol: '₪'},
    {currency: 'INR', symbol: '₹'},
    {currency: 'JPY', symbol: '¥'},
    {currency: 'KRW', symbol: '₩'},
    {currency: 'MXN', symbol: '$'},
    {currency: 'MYR', symbol: 'RM'},
    {currency: 'NOK', symbol: 'kr'},
    {currency: 'NZD', symbol: '$'},
    {currency: 'PHP', symbol: '₱'},
    {currency: 'PKR', symbol: '₨'},
    {currency: 'PLN', symbol: 'zł'},
    {currency: 'RUB', symbol: '₽'},
    {currency: 'SEK', symbol: 'kr'},
    {currency: 'SGD', symbol: '$'},
    {currency: 'THB', symbol: '฿'},
    {currency: 'TRY', symbol: '₺'},
    {currency: 'TWD', symbol: '$'},
    {currency: 'USD', symbol: '$'},
    {currency: 'ZAR', symbol: 'Rs'}
  ],
  database: 'loki.db',
  defaultCurrency: 'USD',
  defaultLanguage: 'en',
  defaultTheme: 'light',
  documentationUrl: '',
  languages: [
    {code: 'en', name: 'English'},
    {code: 'bg', name: 'Български'},
    {code: 'ca', name: 'Català'},
    {code: 'cs', name: 'Čeština'},
    {code: 'de-de', name: 'Deutsch'},
    {code: 'el', name: 'Ελληνικά'},
    {code: 'es-es', name: 'Español'},
    {code: 'fi', name: 'Suomi'},
    {code: 'fr', name: 'Français'},
    {code: 'gl', name: 'Galego'},
    {code: 'hi', name: 'हिंदी'},
    {code: 'hr', name: 'Hrvatski'},
    {code: 'id', name: 'Bahasa Indonesia'},
    {code: 'it', name: 'Italiano'},
    {code: 'ja', name: '日本語'},
    {code: 'lt', name: 'Lietuviškai'},
    {code: 'nl', name: 'Nederlands'},
    {code: 'sk', name: 'Slovensky'},
    {code: 'pt-br', name: 'Português (Brasil)'},
    {code: 'sr', name: 'Српски'},
    {code: 'tr', name: 'Türk'},
    {code: 'uk', name: 'Yкраiнска'},
    {code: 'ro', name: 'Român'},
    {code: 'ru', name: 'Русский'},
    {code: 'zh-cn', name: '中文 (simplified)'},
  ],
  nodes: [
    {
      name: 'Local Peer',
      region: 'Local',
      location: 'Local',
      address: 'http://localhost',
      port: 8125,
      reliable: true,
      testnet: false
    },
    {
      name: 'Signum Node UK',
      region: 'Europe',
      location: 'UK',
      address: 'https://uk.signum.network',
      port: 8125,
      reliable: true,
      testnet: false
    },
    {
      name: 'Signum Node Brazil',
      region: 'South America',
      location: 'Brazil',
      address: 'https://brazil.signum.network',
      port: 443,
      reliable: true,
      testnet: false
    },
    {
      name: 'Signum Node Latin America',
      region: 'Middle America',
      location: 'Miami',
      address: 'https://latam.signum.network',
      port: 443,
      reliable: true,
      testnet: false
    },
    {
      name: 'Signum Node Canada',
      region: 'North America',
      location: 'Toronto',
      address: 'https://canada.signum.network',
      port: 443,
      reliable: true,
      testnet: false
    },
    {
      name: 'Signum Node EU',
      region: 'Europe',
      location: 'Frankfurt',
      address: 'https://europe.signum.network',
      port: 443,
      reliable: true,
      testnet: false
    },
    {
      name: 'Signum Node EU #1',
      region: 'Europe',
      location: 'Frankfurt',
      address: 'https://europe1.signum.network',
      port: 443,
      reliable: true,
      testnet: false
    },
    {
      name: 'Signum Node EU #2',
      region: 'Europe',
      location: 'Frankfurt',
      address: 'https://europe2.signum.network',
      port: 443,
      reliable: true,
      testnet: false
    },
    {
      name: 'Signum Node US East',
      region: 'United States',
      location: 'North Virgina',
      address: 'https://us-east.signum.network',
      port: 443,
      reliable: true,
      testnet: false
    },
    {
      name: 'Signum Node Singapore',
      region: 'Singapore',
      location: 'North Virgina',
      address: 'https://singapore.signum.network',
      port: 443,
      reliable: true,
      testnet: false
    },
    {
      name: 'Signum Node AU',
      region: 'Australia',
      location: 'Sydney',
      address: 'https://australia.signum.network',
      port: 443,
      reliable: true,
      testnet: false
    },
    {
      name: 'Signumcoin.ro',
      region: 'Europe',
      location: 'Europe',
      address: 'https://wallet.signumcoin.ro',
      port: 443,
      reliable: true,
      testnet: false
    },
    {
      name: 'Testnet Node Local',
      region: 'Europe',
      location: 'UK',
      address: 'http://europe3.testnet.signum.network',
      port: 6876,
      reliable: false,
      testnet: true
    },
    {
      name: 'Testnet Local',
      region: 'None',
      location: 'Local',
      address: 'http://localhost',
      port: 6876,
      reliable: false,
      testnet: true
    },
  ],
  supportUrl: 'https://github.com/signum-network/phoenix/issues',
  transactionCount: '100',
  multiOutMinVersion: '2.3.1',
  pocPlusVersion: '3.0.0',
  mainnetIndicator: {
    block: 23,
    previousHash: '520d5647e77106c98eeab9d1cc5753daab2a3b3e1ba0b2da388be305dd97e5f7'
  },
  defaultUserProfile: 'simple'
};
