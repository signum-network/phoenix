import { Pipe, PipeTransform } from "@angular/core";
import { ApiService } from "app/api.service";

@Pipe({ name: 'addNodeUrl' })
export class AddNodeUrlPipe implements PipeTransform {

    nodeUrl: string = '';
    constructor(private apiService: ApiService) {
        this.nodeUrl = this.apiService.nodeUrl;
    }

    transform(value: string): string {
        return value && `${this.nodeUrl}/${value}`;
    }
}