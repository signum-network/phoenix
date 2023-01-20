import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { ChainTime } from '@signumjs/util';
import { ActivatedRoute } from '@angular/router';
import { Peer } from '@signumjs/core/out/typings/peer';
import semver from 'semver';
import { StoreService } from "../../store/store.service";
import { UnsubscribeOnDestroy } from "../../util/UnsubscribeOnDestroy";
import { takeUntil } from "rxjs/operators";
import { I18nService } from "../../layout/components/i18n/i18n.service";

@Component({
  selector: 'app-peers',
  styleUrls: ['./peers.component.scss'],
  templateUrl: './peers.component.html'
})
export class PeersComponent extends UnsubscribeOnDestroy implements OnInit, AfterViewInit {
  public dataSource: MatTableDataSource<Peer>;
  public displayedColumns: string[];
  pickerFromField = new FormControl();
  pickerToField = new FormControl();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private maxVersion: string;
  locale: string;

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.displayedColumns = ['version', 'announcedAddress', 'platform', 'lastUpdated', 'downloadedVolume', 'uploadedVolume'];
    this.dataSource = new MatTableDataSource<Peer>();
    this.dataSource.data = this.route.snapshot.data.peers;
    this.calcMaxVersion();
    this.storeService.settingsUpdated$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(({language}) => {
          this.locale = language;
        }
      );
  }

  private calcMaxVersion(): void {
    const MinVersion = '0.0.1';
    this.maxVersion = this.dataSource.data.reduce((maxVersion, peer) => {
      const v = peer.version ? semver.coerce(peer.version) : MinVersion;
      return semver.gt(v, maxVersion) ? v : maxVersion;
    }, MinVersion);
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getVersionClass(peer: Peer): string {
    try {
      const v = semver.coerce(peer.version);
      return semver.lt(v, this.maxVersion) ? 'chip versionLow' : 'chip versionOk';
    } catch (e) {
      return 'chip versionLow';
    }
  }

  convertTimestampToDate(timestamp: string): Date {
    return ChainTime.fromChainTimestamp(parseInt(timestamp, 10)).getDate();
  }

  convertMibiByte(uploadedVolume: string): number {
    return parseInt(uploadedVolume, 10) / (1024**2)
  }
}
