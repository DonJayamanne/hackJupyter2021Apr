/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fastDeepEqual from 'fast-deep-equal';
import * as fs from 'fs-extra';
import * as path from 'path';
import {
    window,
    Extension,
    extensions,
    notebook,
    NotebookDocument,
    WebviewPanel,
    ViewColumn,
    Uri,
    WebviewOptions,
    Disposable,
    Webview,
    ExtensionContext,
    NotebookCommunication,
    EventEmitter,
    CancellationTokenSource,
    NotebookCellExecutionState,
    commands
} from 'vscode';
import { getScript } from './inspectorScripts';
import { IJupyterExtensionApi } from './jupyter';
import { execute, registerDisposable } from './utils';
import { noop } from './constants';
import { IKernel, PythonPackage, Variable } from './types';
import { VariableTreeView } from './activityBar/clusterView';
import { PackagesTreeView } from './activityBar/packages';

let extensionUri: Uri;
let jupyterExtension: Extension<IJupyterExtensionApi>;
// let packages: string[] = [];
// fs.readFile(
//     '/Users/donjayamanne/Desktop/Development/vsc/vscode-hackathonJupyterExecutions/libs/pypi.json',
//     (_, data) => {
//         packages = JSON.parse(data.toString()) as string[];
//     }
// );
export function registerKernelListener(context: ExtensionContext) {
    initializePackageCommands();
    extensionUri = context.extensionUri;
    const ext = extensions.getExtension<IJupyterExtensionApi>('ms-toolsai.jupyter');
    if (!ext) {
        return;
    }
    if (ext.isActive) {
        registerWithJupyter(ext);
    } else {
        ext.activate().then(() => registerWithJupyter(ext));
    }
    // registerDisposable

    window.onDidChangeActiveNotebookEditor((e) => {
        if (!e) {
            return;
        }
        displayVariables(e.document);
    });

    commands.registerCommand(
        'vars.viewDataFrameInQGrid',
        async ({ notebook, kernel, variable }: { notebook: NotebookDocument; kernel: IKernel; variable: Variable }) => {
            console.log(kernel);
            console.log(variable);
            const dfView = CatCodingPanel.createOrShow(extensionUri, `${variable.varName} (${variable.varType})`);
            await jupyterExtension.exports.initializeWebViewKernel(
                notebook,
                dfView.notebookCommunication,
                new CancellationTokenSource().token
            );
            dfView.notebookCommunication.postMessage({ type: 'HelloWordFromExt', payload: 1 });
            dfView.notebookCommunication.onDidReceiveMessage((x) => {
                console.log(x);
            });
            await execute(
                kernel,
                {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    code: `
import sys
sys.path.append('/Users/donjayamanne/Desktop/Development/vsc/vscode-hackathonJupyterExecutions/libs')
import qgrid`,
                    silent: true,
                    stop_on_error: false,
                    store_history: false
                },
                noop
            );
            execute(
                kernel,
                {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    // code: `${getScript('python')!.dataFrameCommand}(${variable.varName})`,
                    code: `qgrid.show_grid(${variable.varName})`,
                    silent: false,
                    stop_on_error: false,
                    store_history: false
                },
                (msg) => {
                    if (msg.header.msg_type === 'display_data') {
                        console.error(msg);
                        dfView.notebookCommunication.postMessage({ type: 'RENDER_WIDGET', payload: msg.content });
                    }
                }
            );
        }
    );
    commands.registerCommand(
        'vars.viewDataFrameInAwesome',
        async ({ notebook, kernel, variable }: { notebook: NotebookDocument; kernel: IKernel; variable: Variable }) => {
            console.log(kernel);
            console.log(variable);
            const dfView = CatCodingPanel.createOrShow(extensionUri, `${variable.varName} (${variable.varType})`);
            await jupyterExtension.exports.initializeWebViewKernel(
                notebook,
                dfView.notebookCommunication,
                new CancellationTokenSource().token
            );
            dfView.notebookCommunication.postMessage({ type: 'HelloWordFromExt', payload: 1 });
            dfView.notebookCommunication.onDidReceiveMessage((x) => {
                console.log(x);
            });
            execute(
                kernel,
                {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    code: `
jsonstr = ${variable.varName}.to_json(orient='records')
from IPython.core.display import display, HTML
sprite_size = 32 if len(${variable.varName}.index)>50000 else 64
# Create Facets template
HTML_TEMPLATE = """
        <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.3.3/webcomponents-lite.js"></script>
        <facets-dive sprite-image-width="{sprite_size}" sprite-image-height="{sprite_size}" id="elem" height="600"></facets-dive>
        <script>
            document.querySelector("#elem").data = {jsonstr};
        </script>"""

# Load the json dataset and the sprite_size into the template
html = """${facetHTML}""" + HTML_TEMPLATE.format(jsonstr=jsonstr, sprite_size=sprite_size)

# Display the template
display(HTML(html))`,
                    silent: false,
                    stop_on_error: false,
                    store_history: false
                },
                (msg) => {
                    if (msg.header.msg_type === 'display_data') {
                        console.error(msg);
                        dfView.notebookCommunication.postMessage({ type: 'RENDER_HTML', payload: msg.content });
                    }
                }
            );
        }
    );
    commands.registerCommand(
        'vars.viewWidget',
        async ({ notebook, kernel, variable }: { notebook: NotebookDocument; kernel: IKernel; variable: Variable }) => {
            console.log(kernel);
            console.log(variable);
            const dfView = CatCodingPanel.createOrShow(extensionUri, `${variable.varName} (${variable.varType})`);
            await jupyterExtension.exports.initializeWebViewKernel(
                notebook,
                dfView.notebookCommunication,
                new CancellationTokenSource().token
            );
            // let scriptUri = dfView.notebookCommunication
            //     .asWebviewUri(
            //         Uri.file(
            //             '/Users/donjayamanne/Desktop/Development/vsc/vscode-hackathonJupyterExecutions/libs/ipympl/js/dist/index.js'
            //         )
            //     )
            //     .toString();
            // dfView.notebookCommunication.postMessage({
            //     type: 'IPyWidgets_WidgetScriptSourceResponse',
            //     payload: {
            //         moduleName: 'jupyter-matplotlib',
            //         /**
            //          * Where is the script being source from.
            //          */
            //         source: 'local',
            //         /**
            //          * Resource Uri (not using Uri type as this needs to be sent from extension to UI).
            //          */
            //         scriptUri
            //         /**
            //          * File on disc
            //          */
            //         // fileUri?: string;
            //     }
            // });
            // scriptUri = dfView.notebookCommunication
            //     .asWebviewUri(
            //         Uri.file(
            //             '/Users/donjayamanne/Desktop/Development/vsc/vscode-hackathonJupyterExecutions/libs/qgrid/static/index.js'
            //         )
            //     )
            //     .toString();
            // dfView.notebookCommunication.postMessage({
            //     type: 'IPyWidgets_WidgetScriptSourceResponse',
            //     payload: {
            //         moduleName: 'qgrid',
            //         /**
            //          * Where is the script being source from.
            //          */
            //         source: 'local',
            //         /**
            //          * Resource Uri (not using Uri type as this needs to be sent from extension to UI).
            //          */
            //         scriptUri
            //         /**
            //          * File on disc
            //          */
            //         // fileUri?: string;
            //     }
            // });
            dfView.notebookCommunication.postMessage({ type: 'HelloWordFromExt', payload: 1 });
            dfView.notebookCommunication.onDidReceiveMessage((x) => {
                console.log(x);
            });
            const code = variable.isWidget
                ? `${getScript('python')!.widgetQueryCommand}(${variable.varName})`
                : variable.varType.toLowerCase() === 'dataframe'
                ? `${getScript('python')!.dataFrameCommand}(${variable.varName})`
                : `${getScript('python')!.figureCommand}(${variable.varName})`;
            execute(
                kernel,
                {
                    code,
                    silent: true,
                    stop_on_error: false,
                    store_history: false
                },
                (msg) => {
                    if (msg.header.msg_type === 'display_data') {
                        console.error(msg);
                        dfView.notebookCommunication.postMessage({ type: 'RENDER_WIDGET', payload: msg.content });
                    }
                }
            );
        }
    );
}

function initializePackageCommands() {
    commands.registerCommand('packages.add', async () => {
        const pkg = await window.showInputBox({ prompt: 'Package Name', title: 'Enter Package to install' });
        if (!pkg) {
            return;
        }
    });
    commands.registerCommand('package.uninstallPythonPackage', (node: PythonPackage) => {
        console.log(node);
    });
}

function displayVariables(document: NotebookDocument) {
    const vars = notebookVariables.get(document);
    if (!vars) {
        return;
    }
    const kernel = handlers.get(document);
    if (!kernel) {
        return;
    }
    VariableTreeView.instance.variableTreeProvider.setVariables(document, vars, kernel);
}
function setVariables(document: NotebookDocument, variables: Variable[]) {
    const vars = notebookVariables.get(document) || [];
    if (fastDeepEqual(vars, variables)) {
        return;
    }
    notebookVariables.set(document, variables);
    displayVariables(document);
}

const handlers = new WeakMap<NotebookDocument, IKernel>();
const notebookVariables = new WeakMap<NotebookDocument, Variable[]>();
let initializedVars = false;
async function registerWithJupyter(ext: Extension<IJupyterExtensionApi>) {
    jupyterExtension = ext;
    registerDisposable(
        notebook.onDidChangeCellExecutionState(async (e) => {
            if (handlers.has(e.cell.notebook)) {
                return;
            }
            const kernel = await ext.exports.getKernel(e.cell.notebook);
            if (!kernel) {
                return;
            }
            registerKernel(e.cell.notebook, kernel);
            // registerKernel2(e.cell.notebook, kernel);
            console.log(registerKernel2);
        })
    );
    registerDisposable(
        notebook.onDidChangeCellExecutionState(async (e) => {
            if (e.executionState !== NotebookCellExecutionState.Idle) {
                return;
            }
            const kernel = handlers.get(e.cell.notebook);
            if (!kernel) {
                return;
            }
            // getScript
            const script = getScript('python');
            if (!script) {
                return;
            }
            if (!initializedVars) {
                await execute(
                    kernel,
                    {
                        code: script.initScript,
                        store_history: false,
                        stop_on_error: false
                    },
                    noop
                );
                initializedVars = true;
            }
            const result = await execute(
                kernel,
                {
                    code: script.queryCommand,
                    store_history: false,
                    stop_on_error: false
                },
                (data) => {
                    if (data.header.msg_type === 'execute_result' && 'data' in data.content) {
                        let content = data.content.data['text/plain'];
                        content = content.replace(/^'|'$/g, '');
                        content = content.replace(/\\"/g, '"');
                        content = content.replace(/\\'/g, "\\\\'");

                        const vars: Variable[] = JSON.parse(content);
                        // notebookVariables.set(e.document, vars);
                        setVariables(e.document, vars);
                    }
                }
            );
            if (!hasPip) {
                hasPip = true;
                await execute(
                    kernel,
                    {
                        code: '%pip list --format=json',
                        store_history: false,
                        stop_on_error: false
                    },
                    (data) => {
                        if (
                            data.header.msg_type === 'stream' &&
                            'name' in data.content &&
                            data.content.name === 'stdout'
                        ) {
                            try {
                                const packages: PythonPackage[] = JSON.parse(data.content.text);
                                if (Array.isArray(packages) && packages[0].name && packages[0].version) {
                                    PackagesTreeView.instance.packagesTreeProvider.setPackages(
                                        e.cell.notebook,
                                        packages,
                                        kernel
                                    );
                                }
                            } catch {
                                //
                            }
                        }
                    }
                );
            }
            console.log(result);
        })
    );
}
let hasPip = false;
function registerKernel(notebook: NotebookDocument, kernel: IKernel) {
    if (handlers.has(notebook)) {
        return;
    }
    handlers.set(notebook, kernel);
    kernel.statusChanged.connect((_, status) => {
        console.log(`Kernel Status changed = ${status}`);
        if (status === 'restarting' || status === 'connected' || status === 'autorestarting' || status === 'dead') {
            initializedVars = false;
        }
    });
    kernel.iopubMessage.connect((_, args) => {
        console.log(args);
    });
}
let view: CatCodingPanel | undefined;
function registerKernel2(notebook: NotebookDocument, _kernel: IKernel) {
    if (view) {
        return;
    }
    view = CatCodingPanel.createOrShow(extensionUri);
    view.onDidDispose(() => {
        view = undefined;
    });
    jupyterExtension.exports.initializeWebViewKernel(
        notebook,
        view.notebookCommunication,
        new CancellationTokenSource().token
    );
}

function getWebviewOptions(extensionUri: Uri): WebviewOptions {
    return {
        // Enable javascript in the webview
        enableScripts: true,

        // And restrict the webview to only loading content from our extension's `media` directory.
        localResourceRoots: [Uri.file('/Users/donjayamanne/Desktop/Development/vsc/vscode-hackathonJupyterExecutions')]
    };
}

/**
 * Manages cat coding webview panels
 */
class CatCodingPanel {
    /**
     * Track the currently panel. Only allow a single panel to exist at a time.
     */
    // public static currentPanel: CatCodingPanel | undefined;

    public static readonly viewType = 'catCoding';

    private readonly _panel: WebviewPanel;
    private readonly _extensionUri: Uri;
    private _disposables: Disposable[] = [];
    public get onDidDispose() {
        return this._panel.onDidDispose;
    }

    public static createOrShow(extensionUri: Uri, title = '') {
        // const column = window.activeTextEditor ? window.activeTextEditor.viewColumn : undefined;

        // If we already have a panel, show it.
        // if (CatCodingPanel.currentPanel) {
        //     // CatCodingPanel.currentPanel._panel.reveal(column);
        //     return CatCodingPanel.currentPanel;
        // }

        // Otherwise, create a new panel.
        const panel = window.createWebviewPanel(
            CatCodingPanel.viewType,
            title,
            ViewColumn.Beside,
            getWebviewOptions(extensionUri)
        );

        return new CatCodingPanel(panel, extensionUri);
    }

    // public static revive(panel: WebviewPanel, extensionUri: Uri) {
    //     CatCodingPanel.currentPanel = new CatCodingPanel(panel, extensionUri);
    // }
    public get notebookCommunication(): NotebookCommunication {
        return {
            editorId: 'Hello',
            asWebviewUri: (uri) => {
                if (uri.fsPath.indexOf('vscode-jupyter') > 0) {
                    const targetFile = Uri.file(
                        path.join(
                            '/Users/donjayamanne/Desktop/Development/vsc/vscode-hackathonJupyterExecutions/tmp',
                            path.basename(path.dirname(uri.fsPath)),
                            path.basename(uri.fsPath)
                        )
                    );
                    fs.ensureDirSync(path.dirname(targetFile.fsPath));
                    fs.copyFileSync(uri.fsPath, targetFile.fsPath);
                    return this._panel.webview.asWebviewUri(targetFile);
                }
                return this._panel.webview.asWebviewUri(uri);
            },
            onDidReceiveMessage: this.onDidReceiveMessage.event.bind(this.onDidReceiveMessage),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            postMessage: async (message: any) => {
                if (this._disposed) {
                    return true;
                }
                this._panel.webview.postMessage(message);
                return true;
            }
        };
    }
    private _disposed?: boolean;
    private readonly onDidReceiveMessage = new EventEmitter<any>();
    private constructor(panel: WebviewPanel, extensionUri: Uri) {
        this._panel = panel;
        this._extensionUri = extensionUri;

        // Set the webview's initial html content
        this._update();

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programmatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Update the content based on view changes
        this._panel.onDidChangeViewState(
            (e) => {
                if (this._panel.visible) {
                    this._update();
                }
            },
            null,
            this._disposables
        );

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
            (message) => {
                // switch (message.messaaaage) {
                //     case 'alert':
                //         window.showErrorMessage(message.text);
                //         return;
                // }
                if (message && typeof message === 'object' && 'type' in message) {
                    if (message.type === 'CUSTOM_VIEW') {
                        console.error(message.payload);
                    }
                    this.onDidReceiveMessage.fire(message);
                }
            },
            null,
            this._disposables
        );
    }

    public doRefactor() {
        // Send a message to the webview webview.
        // You can send any JSON serializable data.
        this._panel.webview.postMessage({ command: 'refactor' });
    }

    public dispose() {
        // CatCodingPanel.currentPanel = undefined;
        this._disposed = true;
        // Clean up our resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private _update() {
        const webview = this._panel.webview;
        this._updateForCat(webview);
    }

    private _updateForCat(webview: Webview) {
        // this._panel.title = catName;
        this._panel.webview.html = this._getHtmlForWebview(webview);
    }

    private _getHtmlForWebview(webview: Webview) {
        // Local path to main script run in the webview
        const scriptPathOnDisk = Uri.joinPath(this._extensionUri, 'src', 'extension', 'script.js');

        // And the uri we use to load this script in the webview
        const scriptUri = webview.asWebviewUri(scriptPathOnDisk);
        const fontAwesomeCssUri = webview.asWebviewUri(
            Uri.file(
                '/Users/donjayamanne/Desktop/Development/vsc/vscode-hackathonJupyterExecutions/libs/fontawesome/font-awesome/css/font-awesome.min.css'
            )
        );
        const requireScriptsUri = webview.asWebviewUri(
            Uri.file(
                '/Users/donjayamanne/Desktop/Development/vsc/vscode-hackathonJupyterExecutions/libs/ipywidgetsKernel/require.js'
            )
        );
        const ipyWidgetScriptsUri = webview.asWebviewUri(
            Uri.file(
                '/Users/donjayamanne/Desktop/Development/vsc/vscode-hackathonJupyterExecutions/libs/ipywidgets/dist/ipywidgets.js'
            )
        );
        const kernelScriptUri = webview.asWebviewUri(
            Uri.file(
                '/Users/donjayamanne/Desktop/Development/vsc/vscode-hackathonJupyterExecutions/libs/ipywidgetsKernel/ipywidgetsKernel.js'
            )
        );
        const widgetScriptUri = webview.asWebviewUri(
            Uri.file(
                '/Users/donjayamanne/Desktop/Development/vsc/vscode-hackathonJupyterExecutions/libs/sidecarRenderer/sidecarRenderer.js'
            )
        );

        // // Local path to css styles
        // const styleResetPath = Uri.joinPath(this._extensionUri, 'media', 'reset.css');
        // const stylesPathMainPath = Uri.joinPath(this._extensionUri, 'media', 'css');

        // // Uri to load styles into webview
        // const stylesResetUri = webview.asWebviewUri(styleResetPath);
        // const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);

        // <link href="${stylesResetUri}" rel="stylesheet">
        // <link href="${stylesMainUri}" rel="stylesheet">

        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
                <meta http-equiv="Content-Security-Policy" content="img-src 'self' data: https: http: blob: ${
                    this._panel.webview.cspSource
                }; default-src 'unsafe-inline' 'unsafe-eval' data: https: http: blob: ${
            this._panel.webview.cspSource
        };">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="${fontAwesomeCssUri.toString()}">
			</head>
			<body>
				<script type="text/javascript" src="${requireScriptsUri.toString()}"></script>
				<script type="text/javascript" src="${ipyWidgetScriptsUri.toString()}"></script>
				<script type="text/javascript" src="${kernelScriptUri.toString()}"></script>
				<script type="text/javascript" src="${widgetScriptUri.toString()}"></script>
				<script type="text/javascript" src="${scriptUri.toString()}"></script>
                <div id='variableWidgetContainer'></div>
			</body>
			</html>`;
    }
}

const facetHTML = fs.readFileSync('/Users/donjayamanne/Desktop/Development/vsc/vscode-hackathonJupyterExecutions/src/extension/facethtml.html').toString();
