// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { generateFile, replaceVariables } from './generator';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let generatePresentationFileDisposable = vscode.commands.registerCommand('container-presentational-pattern-generator.generatePresentationFile', (uri: vscode.Uri) => {
		// エクスプローラー上で選択しているディレクトリを取得する
		// 入力済みのinputboxを表示させる
		vscode.window.showInputBox({
			value: path.basename(uri.path),
			placeHolder: 'コンポーネント名を入力してください',
			prompt: 'コンポーネント名を入力してください',
			validateInput: (text: string) => {	
				if (text.length === 0) {
					return 'コンポーネント名を入力してください';
				}
				return null;
			}
		}).then(async (component: string | undefined) => {
			if (component === undefined) {
				return;
			}
			
			generateFiles(uri.path, { component });

			// 生成したファイルを表示させるため、エクスプローラを更新する
			vscode.commands.executeCommand("workbench.files.action.refreshFilesExplorer");
		});
	});

	context.subscriptions.push(generatePresentationFileDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

async function generateFiles(dirpath: string, options: { component: string }): Promise<void> {
	// ファイル名が入力されたら、ファイルを生成する
	// container用のファイル設定
	const containerFilename = vscode.workspace.getConfiguration('container-presentational-pattern-generator').get<string>('containerFilename') || '';
	const containerTemplate = vscode.workspace.getConfiguration('container-presentational-pattern-generator').get<string>('containerTemplate') || '';

	// presentational用のファイル設定
	const presentationalFilename = vscode.workspace.getConfiguration('container-presentational-pattern-generator').get<string>('presentationalFilename') || '';
	const presentationalTemplate = vscode.workspace.getConfiguration('container-presentational-pattern-generator').get<string>('presentationalTemplate') || '';

	const containerContent = replaceVariables(containerTemplate, { component: options.component, presentational: presentationalFilename });
	const presentationalContent = replaceVariables(presentationalTemplate, { component: options.component, presentational: presentationalFilename });

	// ファイルを生成する
	const containerPromise = generateFile(`${dirpath}/${containerFilename}.tsx`, containerContent);
	const presentationalPromise = generateFile(`${dirpath}/${presentationalFilename}.tsx`, presentationalContent);

	await Promise.all([containerPromise, presentationalPromise]);
}