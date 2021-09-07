/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

export const constants = {
  maxRecipientsSameMultiout: 128,
  maxRecipientsMultiout: 64,
  connectionTimeout: 10000,
  currencies: [
    {code: 'AUD', symbol: '$'},
    {code: 'BRL', symbol: 'R$'},
    {code: 'CAD', symbol: '$'},
    {code: 'CLP', symbol: '$'},
    {code: 'CNY', symbol: '¥'},
    {code: 'CZK', symbol: 'Kč'},
    {code: 'DKK', symbol: 'kr'},
    {code: 'EUR', symbol: '€'},
    {code: 'GBP', symbol: '£'},
    {code: 'HKD', symbol: '$'},
    {code: 'HUF', symbol: 'Ft'},
    {code: 'IDR', symbol: 'Rp'},
    {code: 'ILS', symbol: '₪'},
    {code: 'INR', symbol: '₹'},
    {code: 'JPY', symbol: '¥'},
    {code: 'KRW', symbol: '₩'},
    {code: 'MXN', symbol: '$'},
    {code: 'MYR', symbol: 'RM'},
    {code: 'NOK', symbol: 'kr'},
    {code: 'NZD', symbol: '$'},
    {code: 'PHP', symbol: '₱'},
    {code: 'PKR', symbol: '₨'},
    {code: 'PLN', symbol: 'zł'},
    {code: 'RUB', symbol: '₽'},
    {code: 'SEK', symbol: 'kr'},
    {code: 'SGD', symbol: '$'},
    {code: 'THB', symbol: '฿'},
    {code: 'TRY', symbol: '₺'},
    {code: 'TWD', symbol: '$'},
    {code: 'USD', symbol: '$'},
    {code: 'ZAR', symbol: 'Rs'}
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
      name: 'Burstcoin.ro',
      region: 'Europe',
      location: 'Europe',
      address: 'https://wallet.burstcoin.ro',
      port: 443,
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
      name: 'Signum Node AU',
      region: 'Australia',
      location: 'Sydney',
      address: 'https://australia.signum.network',
      port: 443,
      reliable: true,
      testnet: false
    },
    {
      name: 'Testnet Burstcoin.ro',
      region: 'Europe',
      location: 'Europe',
      address: 'https://testnetwallet.burstcoin.ro',
      port: 443,
      reliable: false,
      testnet: true
    },
    {
      name: 'Testnet Zoh',
      region: 'Europe',
      location: 'Denmark',
      address: 'https://testnet.burstcoin.network',
      port: 6876,
      reliable: false,
      testnet: true
    },
    {
      name: 'Local Peer',
      region: 'Local',
      location: 'Local',
      address: 'http://localhost',
      port: 8125,
      reliable: true,
      testnet: false
    }
  ],
  supportUrl: 'https://github.com/signum-network/phoenix/issues',
  transactionCount: '100',
  multiOutMinVersion: '2.3.1',
  pocPlusVersion: '3.0.0',
  mainnetIndicator: {
    block: 23,
    previousHash: '520d5647e77106c98eeab9d1cc5753daab2a3b3e1ba0b2da388be305dd97e5f7'
  }
};
