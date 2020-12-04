import {MemoryMonitorRepository} from '../repositories/MemoryMonitorRepository';

describe('MemoryMonitorRepository', () => {
    describe('getAll', () => {
        it('should get all monitor model correctly', async () => {

            const repository = new MemoryMonitorRepository();
            await repository.insert({id: '1', startTime: Date.now()});
            await repository.insert({id: '2', startTime: Date.now() + 10});

            const monitorModels = await repository.getAll();

            expect(monitorModels).toHaveLength(2);
            expect(monitorModels[0].id).toBe('1');
            expect(monitorModels[0].startTime).toBeGreaterThan(Date.now() - 1000);
            expect(monitorModels[1].id).toBe('2');
            expect(monitorModels[1].startTime).toBeGreaterThan(Date.now() - 1000);

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
            await repository.insert({id: '1', startTime: Date.now()});
            await repository.insert({id: '2', startTime: Date.now() + 10});
            const monitorModel = await repository.get('2');

            expect(monitorModel.id).toBe('2');
            expect(monitorModel.startTime).toBeGreaterThan(Date.now() - 1000);
        });
        it('should return undefined for an unknown monitor model', async () => {
            const repository = new MemoryMonitorRepository();
            await repository.insert({id: '1', startTime: Date.now()});
            const monitorModel = await repository.get('2');
            expect(monitorModel).toBeUndefined();
        });
    });
    describe('remove', () => {
        it('should remove existing monitor', async () => {
            const repository = new MemoryMonitorRepository();
            await repository.insert({id: '1', startTime: Date.now()});
            await repository.insert({id: '2', startTime: Date.now() + 10});

            await repository.remove('1');
            let monitorModels = await repository.getAll();
            expect(monitorModels).toHaveLength(1);
            expect(monitorModels[0].id).toBe('2');
            await repository.remove('2');
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
