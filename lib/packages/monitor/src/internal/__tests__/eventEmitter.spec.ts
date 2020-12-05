import {EventEmitter} from '../eventEmitter';

describe('EventEmitter', () => {
    describe('on', () => {
        it('should trigger callback', (done) => {
            jest.setTimeout(2000);
            const emitter = new EventEmitter();

            emitter.on('test-event', (payload) => {
                expect(payload).toEqual({foo: 'bar'});
                done();
            });
            emitter.on('test-event-2', (payload) => {
                throw new Error('Should not call this method');
            });
            emitter.emit('test-event', {foo: 'bar'});
        });
    });

    describe('once', () => {
        it('should trigger callback only once', (done) => {
            jest.setTimeout(2000);
            const emitter = new EventEmitter();

            emitter.once('test-event', (payload) => {
                expect(payload).toEqual({foo: 'bar'});
                expect(payload).not.toEqual({foo: 'does not go through'});
                done();
            });
            emitter.emit('test-event', {foo: 'bar'});
            emitter.emit('test-event', {foo: 'does not go through'});
        });
    });

    describe('off', () => {
        it('should trigger only once', (done) => {
            jest.setTimeout(2000);
            const emitter = new EventEmitter();

            const testFn = (payload) => {
                expect(payload).toEqual({foo: 'bar'});
                expect(payload).not.toEqual({foo: 'does not go through'});
                done();
            };
            emitter.on('test-event', testFn);
            emitter.emit('test-event', {foo: 'bar'});
            emitter.off('test-event', testFn);
            emitter.emit('test-event', {foo: 'does not go through'});
        });
    });
});
