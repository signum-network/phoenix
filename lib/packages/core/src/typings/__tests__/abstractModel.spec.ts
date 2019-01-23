import AbstractModel from '../abstractModel';

describe('AbstractModel', () => {

    class SimpleModel extends AbstractModel {
        public foo: string;
        public bar: number;
        public cat: boolean;
        public zombie: any;

        constructor(obj: any) {
            super();
            this.mapJsonToProps(obj);
        }
    }

    class ComplexModel extends AbstractModel {
        public data: string;
        public innerModel: SimpleModel;

        constructor(obj: any) {
            super();
            this.mapJsonToProps(obj);
        }
    }


    describe('Simple Model', () => {
        const simple = new SimpleModel({
                foo: 'some text',
                bar: 1,
                cat: true
            }
        );

        it('should map fields according the passed object', () => {
            expect(simple.foo).toBe('some text');
            expect(simple.bar).toBe(1);
            expect(simple.cat).toBeTruthy();
            expect(simple.zombie).toBeUndefined();
        });

        it('should return Json on toJson()', () => {
            const json = simple.toJson();
            expect(json.foo).toBe('some text');
            expect(json.bar).toBe(1);
            expect(json.cat).toBeTruthy();
            expect(json.zombie).toBeUndefined();
        });

        it('should return Json on toJson() with custom mapping', () => {
            const mapper = ({bar, ...props}) => ({
                ...props,
                // some custom mappings
                bar: bar + 1,
                zombie: 'Alive!'
            });
            const json = simple.toJson(mapper);
            expect(json.foo).toBe('some text');
            expect(json.bar).toBe(2);
            expect(json.cat).toBeTruthy();
            expect(json.zombie).toBe('Alive!');
        });
    });

    describe('Complex Model', () => {
        const complex = new ComplexModel({
            data: 'data text',
            innerModel : {
                    foo: 'some text',
                    bar: 1,
                    cat: true
                }
            }
        );

        it('should map fields according the passed object', () => {
            expect(complex.data).toBe('data text');
            // note that these are only shallow copies
            expect(complex.innerModel.foo).toBe('some text');
            expect(complex.innerModel.bar).toBe(1);
            expect(complex.innerModel.cat).toBeTruthy();
            expect(complex.innerModel.zombie).toBeUndefined();
        });

        it('should return Json on toJson()', () => {
            const json = complex.toJson();
            expect(json.data).toBe('data text');
            // note that these are only shallow copies
            expect(complex.innerModel.foo).toBe('some text');
            expect(complex.innerModel.bar).toBe(1);
            expect(complex.innerModel.cat).toBeTruthy();
            expect(complex.innerModel.zombie).toBeUndefined();
        });
    });

});
