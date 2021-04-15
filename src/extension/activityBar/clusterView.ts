import { window } from 'vscode';
import { registerDisposable } from '../utils';
import { VariableViewer } from './treeData';

export class VariableTreeView {
    public static instance: VariableTreeView;
    constructor(public readonly variableTreeProvider: VariableViewer) {
        VariableTreeView.instance = this;
    }
    public static register() {
        const clusterExplorer = new VariableViewer();
        registerDisposable(clusterExplorer);
        const treeView = window.createTreeView('jupyterVariables', {
            treeDataProvider: clusterExplorer,
            canSelectMany: false,
            showCollapseAll: true
        });
        registerDisposable(treeView);
        const handler = new VariableTreeView(clusterExplorer);
        console.log(handler);
        // registerDisposable(commands.registerCommand('kusto.addConnection', () => addNewConnection()));
        // registerDisposable(commands.registerCommand('kusto.removeConnection', handler.removeConnection, handler));
        // registerDisposable(commands.registerCommand('kusto.refreshNode', handler.onRefreshNode, handler));
        // registerDisposable(commands.registerCommand('kusto.createNotebook', handler.createNotebook, handler));
        // onConnectionChanged((e) =>
        //     e.change === 'added'
        //         ? clusterExplorer.addConnection(e.connection)
        //         : clusterExplorer.removeCluster(e.connection)
        // );
        clusterExplorer.refresh();
    }

    // private async onRefreshNode() {
    // if (e instanceof ClusterNode) {
    //     this.clusterExplorer.refreshConnection(e.info);
    // }
    // if (e instanceof DatabaseNode) {
    //     this.clusterExplorer.refreshConnection(e.parent.info);
    // }
    // if (e instanceof TableNode) {
    //     this.clusterExplorer.refreshConnection(e.parent.parent.info);
    // }
    // if (!e) {
    //     this.clusterExplorer.refresh();
    // }
    // }
}
