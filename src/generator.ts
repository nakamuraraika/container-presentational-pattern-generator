import * as fs from "node:fs/promises";

/**
 * ファイルを生成する
 */
export function generateFile(filepath: string, content: string): Promise<void> {
    return fs.writeFile(filepath, content);
}

/**
 * テンプレートファイルの変数
 * keyに対応するvalueで置換される
 */
export type Variables = {
    component: string,
    presentational: string,
};

/**
 * テンプレートファイルを読み込む
 */
export function readTemplate(filepath: string): Promise<string> {
    return fs.readFile(filepath, 'utf-8');
}

/**
 * テンプレートファイルの変数を置換する
 * %${key}% が ${value} に置換される
 */
export function replaceVariables(template: string, variables: Variables): string {
    let replaced = template;
    Object.entries(variables).forEach(([key, value]) => {
        const regexp = new RegExp(`%${key}%`, 'g');
        replaced = replaced.replace(regexp, value);
    });
    return replaced;
}