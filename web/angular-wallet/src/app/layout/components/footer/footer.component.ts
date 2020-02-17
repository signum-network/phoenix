import { Component, OnInit, Input } from '@angular/core';
import { NetworkService } from 'app/network/network.service';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector   : 'footer',
    templateUrl: './footer.component.html',
    styleUrls  : ['./footer.component.scss']
})
export class FooterComponent {

    constructor() {
    }

}
