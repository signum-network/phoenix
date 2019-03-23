import {
  TransactionArbitrarySubtype,
  TransactionEscrowSubtype,
  TransactionPaymentSubtype,
  TransactionType
} from '@burstjs/core';
import {getTransactionTypeTranslationKey} from './getTransactionTypeTranslationKey';

describe('getTransactionTypeTranslationKey ', () => {

  describe('smoke tests', () => {
    it('get message translation keys', () => {
      const transaction = {
        type: TransactionType.Arbitrary,
        subtype: TransactionArbitrarySubtype.Message
      };

      expect(getTransactionTypeTranslationKey(transaction, undefined)).toBe('arbitrary_message');

    });

    it('get escrow translation keys', () => {
      const transaction = {
        type: TransactionType.Escrow,
        subtype: TransactionEscrowSubtype.EscrowCreation
      };

      // not a translation key yet
      expect(getTransactionTypeTranslationKey(transaction, undefined)).toBe('Escrow Creation');

    });

    it('get payment translation keys', () => {
      const transaction = {
        type: TransactionType.Payment,
        subtype: TransactionPaymentSubtype.MultiOutSameAmount
      };

      expect(getTransactionTypeTranslationKey(transaction, undefined)).toBe('multi_out_same_payment');

    });


    it('get \'unkown\' translation keys for invalid type', () => {
      const transaction = {
        type: 7,
        subtype: TransactionPaymentSubtype.MultiOutSameAmount
      };

      expect(getTransactionTypeTranslationKey(transaction, undefined)).toBe('unknown');

    });

    it('get \'unkown\' translation keys for invalid subtype', () => {
      const transaction = {
        type: TransactionType.Payment,
        subtype: 99
      };

      expect(getTransactionTypeTranslationKey(transaction, undefined)).toBe('unknown');

    });
  });

  describe('Arbitrary Alias Sale tests', () => {

    it('get cancelation key', () => {

      const account = {
        accountRS: 'accountRS',
      };

      const transaction = {
        type: TransactionType.Arbitrary,
        subtype: TransactionArbitrarySubtype.AliasSale,
        attachment: {
          priceNQT: '0'
        },
        recipientRS: 'accountRS',
        senderRS: 'accountRS'
      };

      expect(getTransactionTypeTranslationKey(transaction, account)).toBe('alias_sale_cancellation');

    });

    it('get transfer key', () => {
      const account = {
        accountRS: 'accountRS',
      };

      const transaction = {
        type: TransactionType.Arbitrary,
        subtype: TransactionArbitrarySubtype.AliasSale,
        attachment: {
          priceNQT: '0'
        },
        recipientRS: 'recipientRS',
        senderRS: 'accountRS'
      };

      expect(getTransactionTypeTranslationKey(transaction, account)).toBe('alias_transfer');

    });

    it('get sale key', () => {

      const account = {
        accountRS: 'accountRS',
      };

      const transaction = {
        type: TransactionType.Arbitrary,
        subtype: TransactionArbitrarySubtype.AliasSale,
        attachment: {
          priceNQT: '100'
        },
        recipientRS: 'recipientRS',
        senderRS: 'accountRS'
      };

      expect(getTransactionTypeTranslationKey(transaction, account)).toBe('alias_sale');
    });

  });

});
