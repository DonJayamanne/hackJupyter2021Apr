import KustoClient from 'azure-kusto-data/source/client';
import { KustoResponseDataSet } from 'azure-kusto-data/source/response';
import { notebook, NotebookDocument, TextDocument } from 'vscode';
import { Connection, fromConnectionInfo } from './connections';
import { addDocumentConnectionHandler, ensureDocumentHasConnectionInfo } from './connections/notebookConnection';
import { IConnectionInfo } from './connections/types';
import { IDisposable } from '../types';
import { disposeAllDisposables, logError, registerDisposable } from '../utils';

const clientMap = new WeakMap<NotebookDocument | TextDocument, Promise<Client | undefined>>();

export class Client implements IDisposable {
    private readonly disposables: IDisposable[] = [];
    private readonly kustoClient: Promise<KustoClient>;
    private readonly connection: Connection;
    constructor(
        private readonly document: NotebookDocument | TextDocument,
        public readonly connectionInfo: IConnectionInfo
    ) {
        this.addHandlers();
        this.connection = fromConnectionInfo(connectionInfo);
        this.kustoClient = this.connection.getKustoClient();
        registerDisposable(this);
    }
    public static async remove(document: NotebookDocument) {
        clientMap.delete(document);
    }
    public static async create(document: NotebookDocument | TextDocument): Promise<Client | undefined> {
        const client = clientMap.get(document);
        if (client) {
            return client;
        }

        // eslint-disable-next-line no-async-promise-executor
        const promise = new Promise<Client | undefined>(async (resolve) => {
            try {
                const connectionInfo = await ensureDocumentHasConnectionInfo(document);
                if (!connectionInfo) {
                    return resolve(undefined);
                }
                resolve(new Client(document, connectionInfo));
            } catch (ex) {
                logError(`Failed to create the Kusto Client`, ex);
                resolve(undefined);
            }
        });
        promise.then((item) => {
            if (item) {
                return;
            }
            if (promise === clientMap.get(document)) {
                clientMap.delete(document);
            }
        });
        promise.catch(() => {
            if (promise === clientMap.get(document)) {
                clientMap.delete(document);
            }
        });
        clientMap.set(document, promise);
        return promise;
    }
    public async execute(query: string): Promise<KustoResponseDataSet> {
        const client = await this.kustoClient;
        if (this.connectionInfo.type === 'appInsights') {
            return client.executeQueryV1('', query);
        } else {
            const database = 'database' in this.connectionInfo ? this.connectionInfo.database : '';
            return client.execute(database || '', query);
        }
    }
    private addHandlers() {
        addDocumentConnectionHandler((e) => clientMap.delete(e));
        notebook.onDidCloseNotebookDocument(
            (e) => {
                if (e === this.document) {
                    this.dispose();
                }
            },
            this,
            this.disposables
        );
    }
    dispose() {
        disposeAllDisposables(this.disposables);
    }
}
