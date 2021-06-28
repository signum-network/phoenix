import { AsyncStorageKeys } from '../../enums';
import { load } from '../../utils/storage';
import { defaultSettings } from '../../environment';

const { nodeHost } = defaultSettings;

export async function getCurrentNode (): Promise<string> {
    const node = await load(AsyncStorageKeys.currentNode) || nodeHost;
    console.log('loaded', node);
    return node as string;
}
