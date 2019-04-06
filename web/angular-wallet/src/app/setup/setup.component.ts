import { Component, OnInit } from '@angular/core';
import { constants } from '../constants';
import { I18nService } from '../layout/components/i18n/i18n.service';
import { MatSelectChange } from '@angular/material';
import { Account } from '@burstjs/core';
import { StoreService } from 'app/store/store.service';
import { environment } from 'environments/environment.hmr';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Settings } from 'app/settings';

@Component({
    selector: 'app-setup',
    styleUrls: ['./setup.component.scss'],
    templateUrl: './setup.component.html'
})
export class SetupComponent implements OnInit {

    public selectedNode = new FormControl();
    public languages: Array<any>;
    public currentLanguage: any;
    public settings: Settings;

    public nodes = constants.nodes.map(({address, port}) => `${address}:${port}`)
        .concat(environment.defaultNode);

    constructor(private i18n: I18nService, private storeService: StoreService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.languages = constants.languages;
        this.currentLanguage = this.i18n.currentLanguage;
        this.settings = this.route.snapshot.data.settings as Settings;
        this.selectedNode.setValue(this.settings.node);
        this.selectedNode.valueChanges.subscribe(this.setNode())
    }

    private setNode(): (value: string) => void {
        return async (value) => {
            const settings = await this.storeService.getSettings();
            this.storeService.saveSettings({
                ...settings,
                node: value
            });
        };
    }

    setLanguage(event: MatSelectChange) {
        this.currentLanguage = event.value;
        this.i18n.setLanguage(event.value);
    }

}
