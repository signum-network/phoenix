import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { ChainTime, convertNQTStringToNumber } from "@signumjs/util";
import { ActivatedRoute } from '@angular/router';
import { Peer } from '@signumjs/core/out/typings/peer';
import semver from 'semver';

@Component({
  selector: 'app-peers',
  styleUrls: ['./peers.component.scss'],
  templateUrl: './peers.component.html'
})
export class PeersComponent {
  public dataSource: MatTableDataSource<Peer>;
  public convertNQTStringToNumber = convertNQTStringToNumber;
  public displayedColumns: string[];
  pickerFromField = new FormControl();
  pickerToField = new FormControl();


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private maxVersion: string;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  /**
   * {
   *     "state": 2,
   *     "announcedAddress": "192.53.120.109:8123",
   *     "shareAddress": true,
   *     "downloadedVolume": 10769315,
   *     "uploadedVolume": 18737430,
   *     "application": "BRS",
   *     "version": "v3.4.0",
   *     "platform": "S-G5MH-AUJS-HXGQ-9ABYA",
   *     "blacklisted": false,
   *     "lastUpdated": 248712548,
   *     "requestProcessingTime": 0
   * }
   */

  public ngOnInit(): void {
    this.displayedColumns = ['version', 'announcedAddress', 'platform', 'lastUpdated', 'downloadedVolume', 'uploadedVolume'];
    this.dataSource = new MatTableDataSource<Peer>();
    this.dataSource.data = this.route.snapshot.data.peers;
    this.calcMaxVersion();
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
}
