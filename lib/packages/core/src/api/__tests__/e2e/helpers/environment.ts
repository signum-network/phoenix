import * as fs from 'fs';
import * as path from 'path';

/**
 * Loads Environment Variables
 *
 * @note The variables are stored in an .env file which is not commited to repository
 * Use .env.template as reference
 */
export const loadEnvironment = () => {

  const envFilePath = path.join(__dirname, '.env');

  if (!fs.existsSync(envFilePath)) {
    throw new Error(`
    Cannot find environment variables file:

    - ${envFilePath}

    Please, copy .env.template and create your local .env file.
    NOTE: The file won't be commited, as it contains sensible information!
    `);
  }

  require('dotenv').config({path: envFilePath});

  const env = {
    timeout : Number.parseInt(process.env.JEST_TIMEOUT, 10) * 1000,
    testNetHost : process.env.TEST_NET_HOST,
    testNetApiPath:  process.env.TEST_NET_API_PATH,
    testPassphrase:  process.env.TEST_PASSPHRASE,
    testRecipientId:  process.env.TEST_RECIPIENT_ID,
    testRecipientPassphrase:  process.env.TEST_RECIPIENT_PASSPHRASE,
    testTransactionId:  process.env.TEST_TRANSACTION_ID,
    testEncryptedMessageTransactionId: process.env.TEST_ENCRYPTED_MESSAGE_TRANSACTION_ID,
    testContractCreatorId: process.env.TEST_CONTRACT_CREATOR_ID,
    testContractId: process.env.TEST_CONTRACT_ID,
    testAssetId: process.env.TEST_ASSET_ID,
    testContractCodeHex: process.env.TEST_CONTRACT_CODE,
    // .. add more variables here
  };

  console.log(`
  ---------------------------------------------------
                  TEST ENVIRONMENT
  ---------------------------------------------------
  ${JSON.stringify(env, null, '\t')}
  `);
  return env;
};



