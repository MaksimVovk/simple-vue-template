import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
const TEMPLATE =`
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
`
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('simple-vue-template.generateVueTemplate', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const template = TEMPLATE;
            editor.edit(editBuilder => {
              editBuilder.insert(editor.selection.active, template);
            });
        }
    });

		let createVueFile = vscode.commands.registerCommand('simple-vue-template.createVueTemplateFile', async (uri: vscode.Uri) => {
			const folderPath = uri.fsPath;
			console.log('folderPath', folderPath)
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
				const fName = fileName.endsWith('.vue') ? fileName : fileName + '.vue'
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

export function deactivate() {}