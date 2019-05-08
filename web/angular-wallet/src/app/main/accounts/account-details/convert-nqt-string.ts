import { Pipe, PipeTransform } from "@angular/core";
import { convertNQTStringToNumber } from "@burstjs/util";

@Pipe({ name: 'convertNQTString' })
export class ConvertNQTStringPipe implements PipeTransform {

    transform(value: string): string {
        return value && convertNQTStringToNumber(value).toString();
    }
}