import {RecipientAmountCsvParser} from './recipientAmountCsvParser';


describe('RecipientAmountCsvParser', () => {
  describe('parse', () => {
    it('should parse correct csv data with default options', () => {
      const testData = '1,10\n' +
        '2,20\n' +
        '3,30';

      const parser = new RecipientAmountCsvParser();
      const recipientAmounts = parser.parse(testData);
      expect(recipientAmounts.length).toBe(3);
      expect(recipientAmounts[0]).toEqual({recipient: '1', amountNQT: '10'});
      expect(recipientAmounts[1]).toEqual({recipient: '2', amountNQT: '20'});
      expect(recipientAmounts[2]).toEqual({recipient: '3', amountNQT: '30'});
    });

    it('should parse correct csv data with custom options', () => {
      const testData = '1-10;' +
        '2-20;' +
        '3-30';

      const parser = new RecipientAmountCsvParser({delimiter: '-', lineBreak: ';'});
      const recipientAmounts = parser.parse(testData);
      expect(recipientAmounts.length).toBe(3);
      expect(recipientAmounts[0]).toEqual({recipient: '1', amountNQT: '10'});
      expect(recipientAmounts[1]).toEqual({recipient: '2', amountNQT: '20'});
      expect(recipientAmounts[2]).toEqual({recipient: '3', amountNQT: '30'});
    });

    it('should trim and parse correct csv data', () => {
      const testData = '   1,10\n  ' +
        '2,   20\n   ' +
        '   3, 30   \n';

      const parser = new RecipientAmountCsvParser();
      const recipientAmounts = parser.parse(testData);
      expect(recipientAmounts.length).toBe(3);
      expect(recipientAmounts[0]).toEqual({recipient: '1', amountNQT: '10'});
      expect(recipientAmounts[1]).toEqual({recipient: '2', amountNQT: '20'});
      expect(recipientAmounts[2]).toEqual({recipient: '3', amountNQT: '30'});
    });

    it('should throw exception, if has duplicated recipients ', () => {
      const testData = '1,10\n' +
        '2,20\n' +
        '1,30';

      const parser = new RecipientAmountCsvParser();
      try{
        parser.parse(testData);
        expect(true).toBe('Exception expected');
      }catch (e){
        expect(e.message).toContain('Duplicated Recipient:1');
      }
    });

    it('should throw exception, if has zero amount ', () => {
      const testData = '1,10\n' +
        '2,0\n' +
        '3,30';

      const parser = new RecipientAmountCsvParser();
      try{
        parser.parse(testData);
        expect(true).toBe('Exception expected');
      }catch (e){
        expect(e.message).toContain('Invalid Amount:2');
      }
    });

    it('should throw exception, if has negative amount ', () => {
      const testData = '1,10\n' +
        '2,10\n' +
        '3,-30';

      const parser = new RecipientAmountCsvParser();
      try{
        parser.parse(testData);
        expect(true).toBe('Exception expected');
      }catch (e){
        expect(e.message).toContain('Invalid Amount:3');
      }
    });

    it('should throw exception, if has non-numeric amount ', () => {
      const testData = '1,10\n' +
        '2,10\n' +
        '3,ABD';

      const parser = new RecipientAmountCsvParser();
      try{
        parser.parse(testData);
        expect(true).toBe('Exception expected');
      }catch (e){
        expect(e.message).toContain('Invalid Amount:3');
      }
    });

    it('should throw exception, if has more than 64 recipients for different amounts ', () => {
      const testData = [];
      for (let i = 1; i <= 65; ++i){
        testData.push(`${i},${i * 10}`);
      }

      const parser = new RecipientAmountCsvParser();
      try{
        parser.parse(testData.join('\n'));
        expect(true).toBe('Exception expected');
      }catch (e){
        expect(e.message).toContain('Maximum Limit (64) for Multiout exceeded');
      }
    });

    it('should throw exception, if has more than 128 recipients for same amounts ', () => {
      const testData = [];
      for (let i = 1; i <= 129; ++i){
        testData.push(`${i},100`);
      }

      const parser = new RecipientAmountCsvParser();
      try{
        parser.parse(testData.join('\n'));
        expect(true).toBe('Exception expected');
      }catch (e){
        expect(e.message).toContain('Maximum Limit (128) for Same Multiout exceeded');
      }
    });
  });
});

