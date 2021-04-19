import { Event, EventEmitter, NotebookDocument, TreeDataProvider, TreeItem, TreeItemCollapsibleState } from 'vscode';
import { IDisposable, IKernel, PythonPackage } from '../types';

// export type NodeType = 'cluster' | 'database' | 'table' | 'column';
export interface ITreeData {
    readonly parent?: ITreeData;
    getTreeItem(): Promise<TreeItem>;
}
export class PackageNode implements ITreeData {
    constructor(
        public readonly notebook: NotebookDocument,
        public readonly pyPackage: PythonPackage,
        private readonly kernel: IKernel
    ) {
        console.log(!!this.kernel);
    }

    public async getTreeItem(): Promise<TreeItem> {
        const item = new TreeItem(this.pyPackage.name, TreeItemCollapsibleState.None);
        item.description = this.pyPackage.version;
        return item;
    }
    public async getChildren(): Promise<ITreeData[]> {
        return [];
        // return this.engineSchema.cluster.databases.map((item) => new DatabaseNode(this, item.name));
    }
}

export class PackageViewer implements TreeDataProvider<ITreeData>, IDisposable {
    private readonly _onDidChangeTreeData = new EventEmitter<ITreeData | void>();
    private packages: PythonPackage[] = [];
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
            return this.packages.map((item) => new PackageNode(this.notebook, item, this.kernel));
        }
        return;
    }
    public getParent?(_element: ITreeData): ITreeData | undefined {
        return;
        // return element?.parent;
    }
    public setPackages(document: NotebookDocument, packages: PythonPackage[], kernel: IKernel) {
        this.packages = packages;
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
