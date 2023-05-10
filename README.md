# container-presentational-pattern-generator README

Container/Presentationalパターン用のテンプレートから`container.tsx`と`presentational.tsx`を生成する拡張機能です。

## Features

VSCode上のエクスプローラに存在するディレクトリに、`container.tsx`と`presentational.tsx`を生成します。

## Requirements

## How To Use

1. `container.tsx`と`presenter.tsx`を生成したいディレクトリに対し右クリックする
1. `Generate Container/Presentational Files`を選択する
1. コンポーネント名をダイアログに入力する
1. 生成完了！

## Extension Settings

* `container-presentational-pattern-generator.containerFileName`: containerのファイル名を指定します。
* `container-presentational-pattern-generator.containerTemplate`: containerテンプレートです。
* `container-presentational-pattern-generator.presentaionalFileName`: presentationalのファイル名を指定します。
* `container-presentational-pattern-generator.presentationalTemplate`: presentationalのテンプレートです。


各テンプレートに変数を用意しています。
* `%component%`: コンポーネント名が代入されます。
* `%presentational%`: presentationalのファイル名が代入されます

## Contribution

誰でもOK！
バグ報告・機能提案のIssueとPull Requestお待ちしております！