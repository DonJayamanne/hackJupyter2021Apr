// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

const colors = require('colors/safe');
const fs = require('fs-extra');
const path = require('path');
const constants = require('../constants');

/**
 * In order to compile the extension in strict mode, one of the dependencies (@jupyterlab) has some files that
 * just won't compile in strict mode.
 * Unfortunately we cannot fix it by overriding their type definitions
 * Note: that has been done for a few of the JupyterLabl files (see typings/index.d.ts).
 * The solution is to modify the type definition file after `npm install`.
 */
function fixJupyterLabJsonDTSFile() {
    var relativePath = path.join('node_modules/@phosphor/coreutils/lib/json.d.ts');
    var filePath = path.join(constants.ExtensionRootDir, relativePath);
    if (!fs.existsSync(filePath)) {
        throw new Error("Type Definition file from JupyterLab not found '" + filePath + "' (pvsc post install script)");
    }
    var fileContents = fs.readFileSync(filePath, { encoding: 'utf8' });
    if (fileContents.indexOf('export declare type JSONValue = JSONPrimitive | JSONObject | JSONArray | any;') > 0) {
        // tslint:disable-next-line:no-console
        console.log(colors.blue(relativePath + ' file already updated (by Jupyter VSC)'));
        return;
    }
    if (fileContents.indexOf('export declare type JSONValue = JSONPrimitive | JSONObject | JSONArray;') > 0) {
        var replacedText = fileContents.replace(
            'export declare type JSONValue = JSONPrimitive | JSONObject | JSONArray;',
            'export declare type JSONValue = JSONPrimitive | JSONObject | JSONArray | any;'
        );
        if (fileContents === replacedText) {
            throw new Error("Fix for JupyterLabl file 'settingregistry.d.ts' failed (pvsc post install script)");
        }
        fs.writeFileSync(filePath, replacedText);
        // tslint:disable-next-line:no-console
        console.log(colors.green(relativePath + ' file updated (by Jupyter VSC)'));
    } else {
        // tslint:disable-next-line:no-console
        console.log(colors.red(relativePath + ' file does not need updating.'));
    }
}

/**
 * In order to compile the extension in strict mode, one of the dependencies (@jupyterlab) has some files that
 * just won't compile in strict mode.
 * Unfortunately we cannot fix it by overriding their type definitions
 * Note: that has been done for a few of the JupyterLabl files (see typings/index.d.ts).
 * The solution is to modify the type definition file after `npm install`.
 */
function fixJupyterLabDTSFiles() {
    var relativePath = path.join('node_modules/@jupyterlab/coreutils/lib/tokens.d.ts');
    var filePath = path.join(constants.ExtensionRootDir, relativePath);
    if (!fs.existsSync(filePath)) {
        throw new Error("Type Definition file from JupyterLab not found '" + filePath + "' (pvsc post install script)");
    }
    var fileContents = fs.readFileSync(filePath, { encoding: 'utf8' });
    if (fileContents.indexOf('[key: string]: ISchema | undefined;') > 0) {
        // tslint:disable-next-line:no-console
        console.log(colors.blue(relativePath + ' file already updated (by Jupyter VSC)'));
        return;
    }
    if (fileContents.indexOf('[key: string]: ISchema;') > 0) {
        var replacedText = fileContents.replace('[key: string]: ISchema;', '[key: string]: ISchema | undefined;');
        if (fileContents === replacedText) {
            throw new Error("Fix for JupyterLabl file 'tokens.d.ts' failed (pvsc post install script)");
        }
        fs.writeFileSync(filePath, replacedText);
        // tslint:disable-next-line:no-console
        console.log(colors.green(relativePath + ' file updated (by Jupyter VSC)'));
    } else {
        // tslint:disable-next-line:no-console
        console.log(colors.red(relativePath + ' file does not need updating.'));
    }
}

/**
 * In order to get raw kernels working, we reuse the default kernel that jupyterlab ships.
 * However it expects to be talking to a websocket which is serializing the messages to strings.
 * Our raw kernel is not a web socket and needs to do its own serialization. To do so, we make a copy
 * of the default kernel with the serialization stripped out. This is simpler than making a copy of the module
 * at runtime.
 */
function createJupyterKernelWithoutSerialization() {
    var relativePath = path.join('node_modules', '@jupyterlab', 'services', 'lib', 'kernel', 'default.js');
    var filePath = path.join(constants.ExtensionRootDir, relativePath);
    if (!fs.existsSync(filePath)) {
        throw new Error(
            "Jupyter lab default kernel not found '" + filePath + "' (Jupyter Extension post install script)"
        );
    }
    var fileContents = fs.readFileSync(filePath, { encoding: 'utf8' });
    var replacedContents = fileContents.replace(
        /^const serialize =.*$/gm,
        'const serialize = { serialize: (a) => a, deserialize: (a) => a };'
    );
    if (replacedContents === fileContents) {
        throw new Error('Jupyter lab default kernel cannot be made non serializing');
    }
    var destPath = path.join(path.dirname(filePath), 'nonSerializingKernel.js');
    fs.writeFileSync(destPath, replacedContents);
    console.log(colors.green(destPath + ' file generated (by Jupyter VSC)'));
}

(async () => {
    fixJupyterLabJsonDTSFile();
    fixJupyterLabDTSFiles();
    createJupyterKernelWithoutSerialization();
})().catch((ex) => console.error('Encountered error while running postInstall step', ex));
