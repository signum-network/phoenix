import {isNode} from '../isNode';

describe('isNode', () => {
    it('should detect that this test is running on nodejs', () => {
        expect(isNode()).toBeTruthy();
    });
});
