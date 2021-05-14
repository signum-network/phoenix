/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {MiningInfo} from '../../../typings/miningInfo';


/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getMiningInfo]]
 * @module core.api.factories
 */


//THIS BLOCK REPLICATES what Suggested Fees does.
//export const getMiningInfo = (service: BurstService): () => Promise<MiningInfo> =>{
 //return async (): Promise<MiningInfo> => {
     
  //  const miningInfo: MiningInfo = await service.query('getMiningInfo');
   //     return {
   //         ...miningInfo
   //             };            
    
   //     };
  //  };

    export const getMiningInfo = (service: BurstService): () => Promise<MiningInfo> =>
    (): Promise<MiningInfo> => service.query('getMiningInfo');
