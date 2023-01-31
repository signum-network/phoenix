export const PATH = 'TRANSACTIONS_';

export const actionTypes = {
  sendMoney: `${PATH}_SEND_MONEY`,
  sendMoneySuccess: `${PATH}_SEND_MONEY_SUCCESS`,
  sendMoneyFailed: `${PATH}_SEND_MONEY_FAILED`,
  generateQRAddress: `${PATH}_GENERATE_QR_ADDRESS`,
  generateQRAddressSuccess: `${PATH}_GENERATE_QR_ADDRESS_SUCCESS`,
  generateQRAddressFailed: `${PATH}_GENERATE_QR_ADDRESS_FAILED`,
};
