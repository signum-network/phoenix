import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { convertNQTStringToNumber } from '@burstjs/util';
import { ActivatedRoute } from '@angular/router';
import { Peer } from '@burstjs/core/out/typings/peer';

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

    constructor(
        private route: ActivatedRoute
    ) {}

    public async ngOnInit() {
        this.displayedColumns = ['announcedAddress', 'downloadedVolume', 'uploadedVolume', 'application', 'platform'];
        this.dataSource = new MatTableDataSource<Peer>();
        this.dataSource.data = this.route.snapshot.data.peers;
    }

    public ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
