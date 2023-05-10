// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { generateFile, readTemplate, replaceVariables } from './generator';

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
			


			// ファイル名が入力されたら、ファイルを生成する
			// container用のファイル設定
			const containerFilename = vscode.workspace.getConfiguration('container-presentational-pattern-generator').get<string>('containerFilename') || '';
			const containerTemplate = vscode.workspace.getConfiguration('container-presentational-pattern-generator').get<string>('containerTemplate') || '';

			// presentational用のファイル設定
			const presentationalFilename = vscode.workspace.getConfiguration('container-presentational-pattern-generator').get<string>('presentationalFilename') || '';
			const presentationalTemplate = vscode.workspace.getConfiguration('container-presentational-pattern-generator').get<string>('presentationalTemplate') || '';

			const containerContent = replaceVariables(containerTemplate, { component, presentational: presentationalFilename });
			const presentationalContent = replaceVariables(presentationalTemplate, { component, presentational: presentationalFilename });

			// ファイルを生成する
			try {
				await generateFile(`${uri.fsPath}/${containerFilename}.tsx`, containerContent);
				await generateFile(`${uri.fsPath}/${presentationalFilename}.tsx`, presentationalContent);
				// このプロジェクトのsrc/templates/container.tsx.tempを読み込む
			} catch(err) {
				vscode.window.showInformationMessage('error occured');
			}
		});
	});

	context.subscriptions.push(generatePresentationFileDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
