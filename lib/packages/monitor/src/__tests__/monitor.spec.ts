import {Monitor} from '../monitor';
import {consoleLogger} from '../typings/consoleLogger';

interface MonitorData {
    foo: number;
}

const fetcher = () => Promise.resolve({foo: 1});
const comparer = ({foo}) => foo === 1;

describe('Monitor', () => {
    describe('serialize/deserialize', () => {

        let serializedMonitor;
        beforeEach(() => {
            const monitor = new Monitor<MonitorData>({
                compareFn: comparer,
                asyncFetcherFn: fetcher,
                intervalSecs: 1,
                key: 'test-key',
                timeoutSecs: 5,
                logger: consoleLogger,
            });
            serializedMonitor = monitor.serialize();
        });

        it('should be serialized and deserialized correctly', () => {
            expect(serializedMonitor).toContain('"intervalSecs":1');
            const newMonitor = Monitor.deserialize(serializedMonitor);
            expect(newMonitor.timeoutSecs).toBe(5);
            expect(newMonitor.intervalSecs).toBe(1);
            expect(newMonitor.key).toBe('test-key');
            expect(newMonitor.isExpired()).toBeFalsy();
            expect(newMonitor.hasStarted()).toBeFalsy();
        });

        it('should have set startTime when serialized/deserialized', () => {
            const monitor = new Monitor<MonitorData>({
                compareFn: comparer,
                asyncFetcherFn: fetcher,
                intervalSecs: 1,
                key: 'test-key',
                timeoutSecs: 5,
                logger: consoleLogger,
            });
            monitor.start();
            const startedMonitor = monitor.serialize();
            const newMonitor = Monitor.deserialize(startedMonitor);
            expect(newMonitor.timeoutSecs).toBe(5);
            expect(newMonitor.intervalSecs).toBe(1);
            expect(newMonitor.key).toBe('test-key');
            expect(newMonitor.isExpired()).toBeFalsy();
            expect(newMonitor.hasStarted()).toBeTruthy();

            monitor.stop();
            newMonitor.stop();
        });

        it('deserialized monitor should function as expected', (done) => {
            jest.setTimeout(4000);
            const newMonitor = Monitor.deserialize<MonitorData>(serializedMonitor);
            newMonitor.onFulfilled(({key, data}) => {
                expect(key).toBe('test-key');
                expect(data.foo).toBe(1);
                done();
            });
            newMonitor.start();
        });
    });

    describe('hasStarted', () => {
        it('should behave correctly', () => {
            jest.setTimeout(5000);
            const monitor = new Monitor({
                asyncFetcherFn: fetcher,
                compareFn: comparer,
                intervalSecs: 1,
                key: 'test-key',
                timeoutSecs: 5
            });

            expect(monitor.hasStarted()).toBeFalsy();
            monitor.start();
            expect(monitor.hasStarted()).toBeTruthy();
            monitor.stop();
            expect(monitor.hasStarted()).toBeFalsy();
        });
    });

    describe('start', () => {
        it('should call predicateFunction periodically', (done) => {
            jest.setTimeout(7500);
            let counter = 0;
            const compareFn = jest.fn().mockImplementation(({count}) =>
                count === 1
            );
            const monitor = new Monitor({
                asyncFetcherFn: () => Promise.resolve({count: counter++}),
                compareFn,
                intervalSecs: 1,
                key: 'test-key',
                timeoutSecs: 5
            });
            monitor.start();
            monitor.onFulfilled(() => {
                expect(compareFn).toHaveBeenCalledTimes(2);
                done();
            });
        });

        it('should timeout as expected', (done) => {
            jest.setTimeout(5000);
            const monitor = new Monitor({
                asyncFetcherFn: fetcher,
                compareFn: ({foo}) => foo === 2, // << never true
                intervalSecs: 1,
                key: 'test-key',
                timeoutSecs: 3
            });
            monitor.start();
            monitor.onTimeout(() => {
                done();
            });
        });
    });

    describe('abort', () => {
        it('should stop a started monitor as expected', (done) => {
            jest.setTimeout(5000);
            const monitor = new Monitor({
                asyncFetcherFn: fetcher,
                compareFn: comparer,
                intervalSecs: 1,
                key: 'test-key',
                timeoutSecs: 30
            });

            monitor.start();
            expect(monitor.hasStarted()).toBeTruthy();
            monitor.stop();
            monitor.onFulfilled(() => {
                throw new Error('Should not be called');
            });
            setTimeout(() => {
                expect(monitor.hasStarted()).toBeFalsy();
                done();
            }, 2000);
        });
    });
});

