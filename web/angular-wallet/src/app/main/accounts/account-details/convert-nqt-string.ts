import { Pipe, PipeTransform } from '@angular/core';
import { Amount } from '@signumjs/util';

@Pipe({ name: 'convertNQTString' })
export class ConvertNQTStringPipe implements PipeTransform {

    transform(value: string): string {
        return value && Amount.fromPlanck(value).toString();
    }
}
