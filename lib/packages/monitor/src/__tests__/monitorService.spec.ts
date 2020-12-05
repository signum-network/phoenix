import {Monitor} from '../monitor';
import {MonitorService} from '../monitorService';
import {MemoryMonitorRepository} from '../repositories/MemoryMonitorRepository';
import {MonitorRepository} from '../typings/monitorRepository';

describe('MonitorService', () => {

    let monitorService: MonitorService;
    let monitorRepository: MonitorRepository;

    beforeEach(() => {
        monitorRepository = new MemoryMonitorRepository();
        monitorService = new MonitorService({
            monitorTimeoutSecs: 5,
            monitorIntervalSecs: 1,
            monitorRepository
        });
    });


    describe('start', () => {
        it('should be serialized correctly', async () => {

            await monitorService.startMonitor({
                key: 'test',
                asyncFetcher: () => Promise.resolve({foo: 'bar'}),
                targetFieldName: 'foo',
                targetValue: 'bar',
                timeoutCallback: () => {
                },
                fulfilledCallback: () => {
                }
            });

            const monitors = await monitorRepository.getAll();

            expect()
            expect(monitor.serialize()).toEqual('{"intervalSecs":1,"abortAfterSecs":5,"key":"test-key","startTime":-1}');

        });

        it('should deserialize a monitor', () => {
            const monitor = Monitor.deserialize('{"intervalSecs":1,"abortAfterSecs":5,"key":"test-key","startTime":-1}');
            expect(monitor.isExpired()).toBeFalsy();
            expect(monitor.hasStarted()).toBeFalsy();
        });
    });

    describe('hasStarted', () => {
        it('should behave correctly', () => {
            const monitor = new Monitor({
                intervalSecs: 1,
                key: 'test-key',
                abortAfterSecs: 5
            });

            expect(monitor.hasStarted()).toBeFalsy();
            monitor.start({
                asyncFetcher: () => Promise.resolve({foo: 'bar'}),
                callback: () => {
                },
                predicateFn: () => false,
            });
            expect(monitor.hasStarted()).toBeTruthy();
            monitor.abort();
            expect(monitor.hasStarted()).toBeFalsy();
        });
    });

    describe('start', () => {
        it('should call predicateFunction periodically', (done) => {
            jest.setTimeout(5000);
            const monitor = new Monitor({
                intervalSecs: 1,
                key: 'test-key',
                abortAfterSecs: 5
            });
            let counter = 0;
            monitor.start({
                asyncFetcher: () => Promise.resolve({counter: counter++}),
                predicateFn: (data) => data.counter === 2,
                callback: (data, fulfilled) => {
                    expect(data.counter).toBe(2);
                    expect(fulfilled).toBeTruthy();
                    expect(monitor.isExpired()).toBeFalsy();
                    done();
                }
            });
        });
        it('should timeout as expected', (done) => {
            jest.setTimeout(5000);
            const monitor = new Monitor({
                intervalSecs: 1,
                key: 'test-key',
                abortAfterSecs: 2
            });
            monitor.start({
                asyncFetcher: () => Promise.resolve(),
                predicateFn: () => false,
                callback: (data, fulfilled) => {
                    expect(fulfilled).toBeFalsy();
                    expect(monitor.isExpired()).toBeTruthy();
                    done();
                }
            });
        });
    });
});
