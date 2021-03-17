// path must not be shortened, or mocking fails
import {signAndBroadcastTransaction} from '../../api/factories/transaction/signAndBroadcastTransaction';

export const mockSignAndBroadcastTransaction = () => {
    // @ts-ignore
    signAndBroadcastTransaction = jest.fn().mockImplementation(() => () => Promise.resolve({transaction: 'transactionId'}));
};
