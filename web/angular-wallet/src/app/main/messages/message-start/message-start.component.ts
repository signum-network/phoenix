import { Component, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'message-start',
    templateUrl  : './message-start.component.html',
    styleUrls    : ['./message-start.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MessageStartComponent
{
    constructor()
    {
    }
}
