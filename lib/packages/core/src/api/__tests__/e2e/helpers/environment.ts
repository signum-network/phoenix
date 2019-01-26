import * as path from 'path';

/**
 * Loads Environment Variables
 *
 * @note The variables are stored in an .env file which is not commited to repository
 * Use .env.template as reference
 */
export const loadEnvironment = () => {
  require('dotenv').config({path: path.join(__dirname, '.env')});

  return {
    timeout : Number.parseInt(process.env.JEST_TIMEOUT, 10) * 1000,
    testNetHost : process.env.TEST_NET_HOST,
    testNetApiPath:  process.env.TEST_NET_API_PATH,
    testPassphrase:  process.env.TEST_PASSPHRASE,
    testRecipientId:  process.env.TEST_RECIPIENT_ID
  };
};



