import { ExtensionContext } from 'vscode';
import { VariableTreeView } from './activityBar/clusterView';
import { PackagesTreeView } from './activityBar/packages';
import { registerKernelListener } from './webViewLoader';

export async function activate(context: ExtensionContext) {
    // initializeConnectionStorage(context);
    // initializeCache(context.globalState);
    // KernelProvider.register();
    // registerDisposableRegistry(context);
    // ContentProvider.register();
    VariableTreeView.register();
    PackagesTreeView.register();
    // registerNotebookConnection();
    // registerConfigurationListener(context);
    // registerInteractiveExperience();
    await registerKernelListener(context);
    console.error('Loaded me');
}
