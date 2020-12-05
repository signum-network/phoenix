import {MemoryMonitorRepository} from '../memoryMonitorRepository';
import {Monitor} from '../../monitor';

describe('MemoryMonitorRepository', () => {

    let monitor1, monitor2;

    beforeAll(() => {
        monitor1 = new Monitor({
            key: 'monitor-1',
            compareFn: () => true,
            asyncFetcherFn: () => Promise.resolve({data: 'fake'}),
            intervalSecs: 1,
            timeoutSecs: 20,
        });

        monitor2 = new Monitor({
            key: 'monitor-2',
            compareFn: () => true,
            asyncFetcherFn: () => Promise.resolve({data: 'fake'}),
            intervalSecs: 2,
            timeoutSecs: 40,
        });
    });

    describe('getAll', () => {
        it('should get all monitor model correctly', async () => {
            const repository = new MemoryMonitorRepository();
            await repository.insert(monitor1);
            await repository.insert(monitor2);

            const monitors = await repository.getAll();

            expect(monitors).toHaveLength(2);
            expect(monitors[0].key).toBe('monitor-1');
            expect(monitors[0].intervalSecs).toBe(1);
            expect(monitors[0].timeoutSecs).toBe(20);
            expect(monitors[1].key).toBe('monitor-2');
            expect(monitors[1].intervalSecs).toBe(2);
            expect(monitors[1].timeoutSecs).toBe(40);
        });
        it('should get an empty array, if no monitor exists', async () => {
            const repository = new MemoryMonitorRepository();
            const monitorModels = await repository.getAll();
            expect(monitorModels).toHaveLength(0);
        });
    });

    describe('get', () => {
        it('should get a known monitor model correctly', async () => {
            const repository = new MemoryMonitorRepository();
            await repository.insert(monitor1);
            await repository.insert(monitor2);
            const gotMonitor = await repository.get('monitor-2');
            expect(gotMonitor.key).toBe('monitor-2');
        });
        it('should return null for an unknown monitor model', async () => {
            const repository = new MemoryMonitorRepository();
            await repository.insert(monitor1);
            const gotMonitor = await repository.get('monitor-2');
            expect(gotMonitor).toBeNull();
        });
    });

    describe('remove', () => {
        it('should remove existing monitor', async () => {
            const repository = new MemoryMonitorRepository();
            await repository.insert(monitor1);
            await repository.insert(monitor2);
            await repository.remove('monitor-1');

            let monitorModels = await repository.getAll();
            expect(monitorModels).toHaveLength(1);
            expect(monitorModels[0].key).toBe('monitor-2');
            await repository.remove('monitor-2');
            monitorModels = await repository.getAll();
            expect(monitorModels).toHaveLength(0);

        });
        it('should do nothing if monitor does not exist', async () => {
            const repository = new MemoryMonitorRepository();
            await repository.remove('1');
            const monitorModels = await repository.getAll();
            expect(monitorModels).toHaveLength(0);
        });
    });

});
