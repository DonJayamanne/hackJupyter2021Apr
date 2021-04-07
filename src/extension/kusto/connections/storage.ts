import { EventEmitter, ExtensionContext, Memento, SecretStorage } from 'vscode';
import { getFromCache, updateCache } from '../../cache';
import { GlobalMementoKeys, noop } from '../../constants';
import { logError, registerDisposable } from '../../utils';
import { AzureAuthenticatedConnection } from './azAuth';
import { IConnectionInfo } from './types';

let secretStorage: SecretStorage;
let memento: Memento;
const cachedKustoConnectionsKey = 'CACHED_KUSTO-CONNECTIONS';

const onDidChangeConnection = new EventEmitter<{ connection: IConnectionInfo; change: 'added' | 'removed' }>();

async function migrateCachedConnections() {
    const clusters: string[] = getFromCache<string[]>(GlobalMementoKeys.clusterUris) || [];
    const cachedConnections = getCachedConnections();
    if (cachedConnections.length > 0 && clusters.length) {
        await updateCache(GlobalMementoKeys.clusterUris, undefined);
        return;
    }
    if (cachedConnections.length === 0 && clusters.length) {
        const connectionsToCache = clusters.map((cluster) => AzureAuthenticatedConnection.from({ cluster }).info);
        await memento.update(cachedKustoConnectionsKey, connectionsToCache);
        await updateCache(GlobalMementoKeys.clusterUris, undefined);
        return;
    }
}
export async function initializeConnectionStorage(context: ExtensionContext) {
    secretStorage = context.secrets;
    memento = context.globalState;
    context.subscriptions.push(onDidChangeConnection);
    await migrateCachedConnections();
}

export function onConnectionChanged(
    cb: (change: { connection: IConnectionInfo; change: 'added' | 'removed' }) => void
) {
    registerDisposable(onDidChangeConnection.event(cb));
}

export async function getConnectionSecret(key: string) {
    return secretStorage.get(key);
}

export async function addConnectionSecret(key: string, secret: string) {
    await secretStorage.store(key, secret);
}
export async function removeConnectionSecret(key: string) {
    await secretStorage.delete(key);
}

export function getCachedConnections(): IConnectionInfo[] {
    return memento.get<IConnectionInfo[]>(cachedKustoConnectionsKey, []);
}
let pendingUpdatesPromise = Promise.resolve();
/**
 * Safe way to perform updates without having to wait for other updates to complete.
 * Basically all writes to the cache is done in a synchronous manner.
 */
export async function updateConnectionCache(options: {
    info: IConnectionInfo;
    action: 'add' | 'remove';
}): Promise<void> {
    pendingUpdatesPromise = pendingUpdatesPromise
        .then(async () => {
            const cachedConnections = memento.get<IConnectionInfo[]>(cachedKustoConnectionsKey, []);
            const connectionsToSave = new Map<string, IConnectionInfo>();
            cachedConnections.forEach((item) => connectionsToSave.set(item.id, item));

            if (options.action === 'add') {
                connectionsToSave.set(options.info.id, options.info);
            } else {
                connectionsToSave.delete(options.info.id);
            }

            await memento.update(cachedKustoConnectionsKey, Array.from(connectionsToSave.values()));
            if (options.action === 'add') {
                onDidChangeConnection.fire({ connection: options.info, change: 'added' });
            } else {
                onDidChangeConnection.fire({ connection: options.info, change: 'removed' });
            }
        })
        .catch((ex) => logError('Failed in performing an update', ex))
        .then(noop);
    await pendingUpdatesPromise;
}
