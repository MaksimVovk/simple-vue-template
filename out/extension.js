"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const TEMPLATE = `
<template>
  <div class="">

  </div>
</template>

<script>
  import { reactive } from 'vue'
  export default {
		props: {

		},
		emits: [],
    setup(props, { emit }) {
			// Variables
      props = reactive(props)

			// Computed

			// Methods

			return {

			}
    }
  }
</script>

<style lang="scss" scoped>

</style>
`;
function activate(context) {
    let disposable = vscode.commands.registerCommand('simple-vue-template.generateVueTemplate', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const template = TEMPLATE;
            editor.edit(editBuilder => {
                editBuilder.insert(editor.selection.active, template);
            });
        }
    });
    let createVueFile = vscode.commands.registerCommand('simple-vue-template.createVueTemplateFile', async (uri) => {
        const folderPath = uri.fsPath;
        console.log('folderPath', folderPath);
        const fileName = await vscode.window.showInputBox({
            prompt: 'Enter the name for the new Vue file',
            placeHolder: 'Component',
            validateInput: input => {
                if (!input.length) {
                    return 'Enter file name';
                }
                return null;
            }
        });
        if (fileName) {
            const fName = fileName.endsWith('.vue') ? fileName : fileName + '.vue';
            const filePath = path.join(folderPath, fName);
            const template = TEMPLATE;
            fs.writeFile(filePath, template, (err) => {
                if (err) {
                    vscode.window.showErrorMessage('Failed to create file');
                    return;
                }
                vscode.window.showInformationMessage('Vue file created successfully');
                vscode.workspace.openTextDocument(filePath).then(doc => {
                    vscode.window.showTextDocument(doc);
                });
            });
        }
    });
    context.subscriptions.push(disposable, createVueFile);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map