import { Pipe, PipeTransform } from "@angular/core";
import { ApiService } from "app/api.service";
import { StoreService } from "app/store/store.service";
import { Settings } from "app/settings";

@Pipe({ name: 'addNodeUrl' })
export class AddNodeUrlPipe implements PipeTransform {

    nodeUrl: string = '';
    constructor(private storeService: StoreService, private apiService: ApiService) {
        this.nodeUrl = this.apiService.nodeUrl;
        // this.storeService.settings.subscribe((settings: Settings) => {
        //     this.nodeUrl = settings.node;
        // });
    }

    transform(value: string): string {
        return value && `${this.nodeUrl}/${value}`;
    }
}