import { Event, EventEmitter, NotebookDocument, TreeDataProvider, TreeItem, TreeItemCollapsibleState } from 'vscode';
import { IDisposable, IKernel, Variable } from '../types';

// export type NodeType = 'cluster' | 'database' | 'table' | 'column';
export interface ITreeData {
    // readonly type: NodeType;
    getTreeItem(): Promise<TreeItem>;
    getChildren?(): Promise<ITreeData[] | undefined>;
}
export class VariableNode implements ITreeData {
    public data?: any;
    constructor(
        public readonly notebook: NotebookDocument,
        public readonly variable: Variable,
        private readonly kernel: IKernel
    ) {
        console.log(!!this.kernel);
        if (variable.varType === 'dict') {
            try {
                this.data = JSON.parse(this.variable.varContent.replace(/\\/g, '').replace(/'/g, '"'));
            } catch {
                //
            }
        }
    }

    public async getTreeItem(): Promise<TreeItem> {
        const item = new TreeItem(
            this.variable.varName,
            this.data ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.None
        );
        if (this.variable.isWidget) {
            item.contextValue = `varIPyWidget`;
        } else {
            item.contextValue = `var${this.variable.varType}`;
        }
        item.description = `${this.variable.varContent} (${this.variable.varShape})`;
        // if (!this.engineSchema) {
        //     item.iconPath = new ThemeIcon('error');
        //     item.tooltip = 'Failed to fetch the schema for this cluster, please check the logs.';
        // }
        return item;
    }
    public async getChildren(): Promise<ITreeData[]> {
        if (!this.data) {
            return [];
        }
        const data = this.data;
        if (
            typeof data === 'bigint' ||
            typeof data === 'boolean' ||
            typeof data === 'number' ||
            typeof data === 'string' ||
            typeof data === 'symbol' ||
            typeof data === 'undefined'
        ) {
            return [];
        }
        if (Array.isArray(this.data)) {
            return this.data.map((item, i) => {
                return new ObjectNode(`[${i}]`, item);
            });
        } else {
            return Object.keys(this.data).map((name) => {
                return new ObjectNode(name, this.data[name]);
            });
        }
    }
}
export class ObjectNode implements ITreeData {
    constructor(public readonly name: string, public readonly data?: any) {}

    public async getTreeItem(): Promise<TreeItem> {
        const item = new TreeItem(
            this.name,
            this.data ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.None
        );
        try {
            item.description = (this.data || '').toString();
        } catch {
            //
        }
        return item;
    }
    public async getChildren(): Promise<ITreeData[]> {
        if (!this.data) {
            return [];
        }
        const data = this.data;
        if (
            typeof data === 'bigint' ||
            typeof data === 'boolean' ||
            typeof data === 'number' ||
            typeof data === 'string' ||
            typeof data === 'symbol' ||
            typeof data === 'undefined'
        ) {
            return [];
        }
        if (Array.isArray(this.data)) {
            return this.data.map((item, i) => {
                return new ObjectNode(`[${i}]`, item);
            });
        } else {
            return Object.keys(this.data).map((name) => {
                return new ObjectNode(name, this.data[name]);
            });
        }
    }
}

export class VariableViewer implements TreeDataProvider<ITreeData>, IDisposable {
    private readonly _onDidChangeTreeData = new EventEmitter<ITreeData | void>();
    private variables: Variable[] = [];
    private notebook!: NotebookDocument;
    private kernel!: IKernel;

    public get onDidChangeTreeData(): Event<ITreeData | void> {
        return this._onDidChangeTreeData.event;
    }
    public dispose() {
        this._onDidChangeTreeData.dispose();
    }
    public async getTreeItem(element: ITreeData): Promise<TreeItem> {
        return element.getTreeItem();
    }
    public async getChildren(element?: ITreeData): Promise<ITreeData[] | undefined> {
        if (!element) {
            return this.variables.map((item) => new VariableNode(this.notebook, item, this.kernel));
        }
        return element.getChildren ? element.getChildren() : undefined;
    }
    public getParent?(_element: ITreeData): ITreeData | undefined {
        return;
        // return element?.parent;
    }
    // public async addConnection(connection: IConnectionInfo) {
    //     if (this.connections.find((cluster) => cluster.info.id === connection.id)) {
    //         return;
    //     }
    //     try {
    //         const schema = await fromConnectionInfo(connection).getSchema();
    //         this.connections.push(new ClusterNode(connection, schema));
    //         this._onDidChangeTreeData.fire();
    //     } catch (ex) {
    //         // If it fails, add the cluster so user can remove it & they know something is wrong.
    //         this.connections.push(new ClusterNode(connection));
    //         this._onDidChangeTreeData.fire();
    //         throw ex;
    //     }
    // }
    public setVariables(document: NotebookDocument, variables: Variable[], kernel: IKernel) {
        this.variables = variables;
        this.notebook = document;
        this.kernel = kernel;
        this._onDidChangeTreeData.fire();
    }
    public async refresh() {
        //     const connections = getCachedConnections();
        //     if (!Array.isArray(connections)) {
        //         return;
        //     }
        //     if (this.connections.length === 0) {
        //         await Promise.all(
        //             connections.map((clusterUri) =>
        //                 this.addConnection(clusterUri).catch((ex) => logError(`Failed to add cluster ${clusterUri}`, ex))
        //             )
        //         );
        //     } else {
        //         await Promise.all(
        //             connections.map((item) =>
        //                 this.refreshConnection(item).catch((ex) =>
        //                     logError(`Failed to add cluster ${JSON.stringify(item)}`, ex)
        //                 )
        //             )
        //         );
        //     }
    }
}
