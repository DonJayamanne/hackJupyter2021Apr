import { ExtensionContext } from 'vscode';
import { VariableTreeView } from './activityBar/clusterView';
import { registerKernelListener } from './webViewLoader';

export async function activate(context: ExtensionContext) {
    // initializeConnectionStorage(context);
    // initializeCache(context.globalState);
    // KernelProvider.register();
    // registerDisposableRegistry(context);
    // ContentProvider.register();
    VariableTreeView.register();
    // registerNotebookConnection();
    // registerConfigurationListener(context);
    // registerInteractiveExperience();
    registerKernelListener(context);
    console.error('Loaded me');
}
