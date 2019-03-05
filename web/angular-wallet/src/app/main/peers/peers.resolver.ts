import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { NetworkService } from 'app/network/network.service';
import { Peer } from '@burstjs/core/out/typings/peer';

@Injectable()
export class PeersResolver implements Resolve<Peer[]> {
    constructor(private networkService: NetworkService) {
    }

    async resolve(route: ActivatedRouteSnapshot) {
        const peersResponse = await this.networkService.getPeers();
        const peers = peersResponse.peers.map(this.networkService.getPeer);
        return await Promise.all(peers);
    }
}
