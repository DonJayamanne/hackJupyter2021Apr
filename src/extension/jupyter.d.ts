// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CancellationToken, NotebookCell, NotebookCommunication, NotebookDocument } from 'vscode';
import type { Kernel } from '@jupyterlab/services';

// Typings for the code in the jupyter extension
export interface IJupyterExtensionApi {
    registerCellExecutionHandler(
        cb: (cell: NotebookCell, args: Parameters<Kernel.IKernelConnection['requestExecute']>) => void
    ): void;
    getKernel(
        notebook: NotebookDocument
    ): Promise<
        | undefined
        | Pick<Kernel.IKernel, 'isReady' | 'ready' | 'requestExecute' | 'iopubMessage' | 'status' | 'statusChanged'>
    >;
    initializeWebViewKernel(
        document: NotebookDocument,
        webview: NotebookCommunication,
        token: CancellationToken
    ): Promise<void>;
}
