//
const fs = require('fs-extra');

fs.writeFile(
    '/Users/donjayamanne/Desktop/Development/vsc/vscode-hackathonJupyterExecutions/libs/sidecarRenderer/sidecarRenderer.js',
    fs
        .readFileSync(
            '/Users/donjayamanne/Desktop/Development/vsc/vscode-jupyter/out/datascience-ui/sidecarRenderer/sidecarRenderer.js'
        )
        .toString()
);
fs.writeFile(
    '/Users/donjayamanne/Desktop/Development/vsc/vscode-hackathonJupyterExecutions/libs/ipywidgetsKernel/ipywidgetsKernel.js',
    fs
        .readFileSync(
            '/Users/donjayamanne/Desktop/Development/vsc/vscode-jupyter/out/datascience-ui/ipywidgetsKernel/ipywidgetsKernel.js'
        )
        .toString()
);
fs.writeFile(
    '/Users/donjayamanne/Desktop/Development/vsc/vscode-hackathonJupyterExecutions/libs/ipywidgetsRenderer/ipywidgetsRenderer.js',
    fs
        .readFileSync(
            '/Users/donjayamanne/Desktop/Development/vsc/vscode-jupyter/out/datascience-ui/ipywidgetsRenderer/ipywidgetsRenderer.js'
        )
        .toString()
);
