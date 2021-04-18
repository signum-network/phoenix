import {asyncRetry} from '../asyncRetry';

describe('asyncRetry', () => {
    it('should retry as expected, with success', async () => {
        let calledFirstTime = true;
        const asyncFn = jest.fn().mockImplementation(() => {
            if (calledFirstTime) {
                calledFirstTime = !calledFirstTime;
                return Promise.reject('First Run Error');
            }
            return Promise.resolve('All fine');
        });
        const onFailureAsync = jest.fn().mockImplementation((e, retryCount) => {
            return retryCount < 3;
        });

        await asyncRetry<void>({
            asyncFn,
            onFailureAsync
        });
        expect(asyncFn).toHaveBeenCalledTimes(2);
        expect(onFailureAsync).toHaveBeenCalledTimes(1);
    });

    it('should stop on max retrials reached', async () => {
        const asyncFn = jest.fn().mockRejectedValue('AsyncFn Error');
        const onFailureAsync = jest.fn().mockResolvedValue(true); // would retry infinitely
        try {
            await asyncRetry<void>({
                asyncFn,
                onFailureAsync
            });
        } catch (e) {
            expect(e).toBe('AsyncFn Error');
        }
        expect(asyncFn).toHaveBeenCalledTimes(21);
        expect(onFailureAsync).toHaveBeenCalledTimes(20);
    });

    it('should stop when onFailureAsync throws error', async () => {
        const asyncFn = jest.fn().mockRejectedValue('AsyncFn Error');
        const onFailureAsync = jest.fn().mockRejectedValue('onFailureAsync Error'); // would retry infinitely
        try {
            await asyncRetry<void>({
                asyncFn,
                onFailureAsync
            });
        } catch (e) {
            expect(e).toBe('onFailureAsync Error');
        }
        expect(asyncFn).toHaveBeenCalledTimes(1);
        expect(onFailureAsync).toHaveBeenCalledTimes(1);
    });

});
