import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('simple-vue-template.generateVueTemplate', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const template = `
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
`
            editor.edit(editBuilder => {
              editBuilder.insert(editor.selection.active, template);
            });
        }
    });

		disposable = vscode.commands.registerCommand('simple-vue-template.generateVueTemplateSimple', () => {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
					const template = `
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
`
					editor.edit(editBuilder => {
						editBuilder.insert(editor.selection.active, template);
					});
			}
	});

  context.subscriptions.push(disposable);
}

export function deactivate() {}