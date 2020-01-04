import { Pipe, PipeTransform } from "@angular/core";
import { ApiService } from "app/api.service";

@Pipe({ name: 'addNodeUrl' })
export class AddNodeUrlPipe implements PipeTransform {

    nodeUrl: string = '';
    constructor(private apiService: ApiService) {
        this.nodeUrl = this.apiService.nodeUrl;
    }

    transform(value: string): string {
        if (this.nodeUrl.endsWith('/')) {
            // remove "/" from end of url to avoid double slashes
            this.nodeUrl = this.nodeUrl.substr(0, this.nodeUrl.length - 1);
        }
        return value && `${this.nodeUrl}/${value}`;
    }
}