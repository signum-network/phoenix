import {RecipientAmountCsvParser} from './recipientAmountCsvParser';
import {I18nService} from '../../../layout/components/i18n/i18n.service';
import {BehaviorSubject, Subject} from 'rxjs';

class MockTranslationService extends I18nService {
  constructor() {
    // @ts-ignore
    super(null, null, {
      ready: new BehaviorSubject(false)
    });
  }

  getTranslation(phrase: string, opts?: object): string {
    return phrase;
  }
}

const mockTranslationService =  new MockTranslationService();

describe('RecipientAmountCsvParser', () => {
  describe('parse', () => {
    it('should parse correct csv data with default options', () => {
      const testData = '1,10\n' +
        '2,20\n' +
        '3,30';

      const parser = new RecipientAmountCsvParser(mockTranslationService);
      const recipientAmounts = parser.parse(testData);
      expect(recipientAmounts.length).toBe(3);
      expect(recipientAmounts[0]).toEqual({recipient: '1', amountNQT: '1000000000'});
      expect(recipientAmounts[1]).toEqual({recipient: '2', amountNQT: '2000000000'});
      expect(recipientAmounts[2]).toEqual({recipient: '3', amountNQT: '3000000000'});
    });

    it('should parse correct csv data with custom options', () => {
      const testData = '1-10;' +
        '2-20;' +
        '3-30';

      const parser = new RecipientAmountCsvParser(mockTranslationService, {delimiter: '-', lineBreak: ';'});
      const recipientAmounts = parser.parse(testData);
      expect(recipientAmounts.length).toBe(3);
      expect(recipientAmounts[0]).toEqual({recipient: '1', amountNQT: '1000000000'});
      expect(recipientAmounts[1]).toEqual({recipient: '2', amountNQT: '2000000000'});
      expect(recipientAmounts[2]).toEqual({recipient: '3', amountNQT: '3000000000'});
    });

    it('should trim and parse correct csv data', () => {
      const testData = '   1,10\n  ' +
        '2,   20\n   ' +
        '   3, 30   \n';

      const parser = new RecipientAmountCsvParser(mockTranslationService);
      const recipientAmounts = parser.parse(testData);
      expect(recipientAmounts.length).toBe(3);
      expect(recipientAmounts[0]).toEqual({recipient: '1', amountNQT: '1000000000'});
      expect(recipientAmounts[1]).toEqual({recipient: '2', amountNQT: '2000000000'});
      expect(recipientAmounts[2]).toEqual({recipient: '3', amountNQT: '3000000000'});
    });

    it('should throw exception, if has duplicated recipients ', () => {
      const testData = '1,10\n' +
        '2,20\n' +
        '1,30';

      const parser = new RecipientAmountCsvParser(mockTranslationService);
      try{
        parser.parse(testData);
        expect(true).toBe('Exception expected');
      }catch (e){
        expect(e.message).toContain('csv_error_duplicated_recipient: 1');
      }
    });

    it('should throw exception, if has zero amount ', () => {
      const testData = '1,10\n' +
        '2,0\n' +
        '3,30';

      const parser = new RecipientAmountCsvParser(mockTranslationService);
      try{
        parser.parse(testData);
        expect(true).toBe('Exception expected');
      }catch (e){
        expect(e.message).toContain('csv_error_invalid_amount');
      }
    });

    it('should throw exception, if has negative amount ', () => {
      const testData = '1,10\n' +
        '2,10\n' +
        '3,-30';

      const parser = new RecipientAmountCsvParser(mockTranslationService);
      try{
        parser.parse(testData);
        expect(true).toBe('Exception expected');
      }catch (e){
        expect(e.message).toContain('csv_error_invalid_amount');
      }
    });

    it('should throw exception, if has non-numeric amount ', () => {
      const testData = '1,10\n' +
        '2,10\n' +
        '3,ABD';

      const parser = new RecipientAmountCsvParser(mockTranslationService);
      try{
        parser.parse(testData);
        expect(true).toBe('Exception expected');
      }catch (e){
        expect(e.message).toContain('csv_error_invalid_amount');
      }
    });

    it('should throw exception, if has more than 64 recipients for different amounts ', () => {
      const testData = [];
      for (let i = 1; i <= 65; ++i){
        testData.push(`${i},${i * 10}`);
      }

      const parser = new RecipientAmountCsvParser(mockTranslationService);
      try{
        parser.parse(testData.join('\n'));
        expect(true).toBe('Exception expected');
      }catch (e){
        expect(e.message).toContain('csv_error_max_limit_multiout 64');
      }
    });

    it('should throw exception, if has more than 128 recipients for same amounts ', () => {
      const testData = [];
      for (let i = 1; i <= 129; ++i){
        testData.push(`${i},100`);
      }

      const parser = new RecipientAmountCsvParser(mockTranslationService);
      try{
        parser.parse(testData.join('\n'));
        expect(true).toBe('Exception expected');
      }catch (e){
        expect(e.message).toContain('csv_error_max_limit_same_multiout 128');
      }
    });

    it('should throw exception, if has unreadable format', () => {
      const parser = new RecipientAmountCsvParser(mockTranslationService);
      try{
        parser.parse('1029');
        expect(true).toBe('Exception expected');
      }catch (e){
        expect(e.message).toContain('csv_error_unreadable_format');
      }
    });
  });
});

