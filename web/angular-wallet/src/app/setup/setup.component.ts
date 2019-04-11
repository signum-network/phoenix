import {Component, OnInit} from '@angular/core';
import {constants} from '../constants';
import {I18nService} from '../layout/components/i18n/i18n.service';
import {MatSelectChange} from '@angular/material';
import {StoreService} from 'app/store/store.service';
import {environment} from 'environments/environment.hmr';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Settings} from 'app/settings';

interface NodeDescriptor {
  url: string;
  version: string;
}

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

  public nodes = SetupComponent.createNodeList();

  private static createNodeList(): Array<NodeDescriptor> {
    return constants.nodes.map(({address, port, version}) => ({
        url: `${address}:${port}`,
        version
      })
    ).concat({
        url: environment.defaultNode,
        version: ''
      });
  }

  constructor(private i18n: I18nService, private storeService: StoreService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.languages = constants.languages;
    this.currentLanguage = this.i18n.currentLanguage;
    this.settings = this.route.snapshot.data.settings as Settings;
    this.selectedNode.setValue({
      url: this.settings.node,
      version: this.settings.nodeVersion
    });
    this.selectedNode.valueChanges.subscribe(this.setNode());
  }

  displayNodeUrl = (value: NodeDescriptor): string  => value.url;

  private setNode(): (value: NodeDescriptor) => void {
    return async (value) => {
      const settings = await this.storeService.getSettings();
      this.storeService.saveSettings({
        ...settings,
        node: value.url,
        nodeVersion: value.version
      });
    };
  }

  setLanguage(event: MatSelectChange): void {
    this.currentLanguage = event.value;
    this.i18n.setLanguage(event.value);
  }
}
