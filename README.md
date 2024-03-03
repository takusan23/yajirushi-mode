# やじるしMODE
選んだ2つの図形（図形じゃなくてもいい）の間に矢印をいい感じに書いてくれる`Figma プラグイン`です。  

![Imgur](https://imgur.com/bHUDpVL.png)

![Imgur](https://imgur.com/7X0vFX9.png)

![Imgur](https://imgur.com/VVY9R0a.png)

![Imgur](https://imgur.com/jqBZhaj.png)

# ダウンロード
// todo

# 開発環境構築

## 公式の説明
https://www.figma.com/plugin-docs/plugin-quickstart-guide/

## 必要なもの
- `Figma`デスクトップアプリ
- `Node.js`
- `Visual Studio Code`等のテキストエディタ

## セットアップ
- リポジトリを`git clone`するなり、ソースコードを`zip`でダウンロードするなりして、ソースコードを入手する
- ダウンロードしたソースコードをターミナル（`cmd`、`PowerShell`等）で開き、以下のコマンドを叩いてください
  - `npm i`
- ビルドする。これはソースコードを`Figma`でプラグインとして読み込む際に必要です
  - ビルドコマンドは以下です。叩いてください
    - `npm run build`
- `Figma`デスクトップアプリを開いて読み込む
  - 適当な`Figma デザイン`（デザインの方だけ動きます）を開き
  - 左上の`Figma のロゴ`を押し、`プラグイン`→`開発`→`マニフェストからプラグインを...`を押して
  - このソースコード内にある、`manifest.json`を読み込む
- プラグインが開くはず

## 開発メモ
`TypeScript`で書いています。  
ソースコードを変更したら、その都度ビルドコマンドを叩く必要があります。

### UI側（ウィンドウ側、ユーザーが入力する側）
`UI側`ですが、`HTML / CSS / JavaScript`で書くのは普通にしんどいので、それぞれ以下の技術を使っています。  

- `React`
  - エントリーポイントは`src-ui/main.tsx`です（`Vite`なので`index.html`もあります）
  - `App.tsx`から下をいじっていくことになるのかな
- `Tailwind CSS`
  - `CSS`書きたくないので、`Tailwind CSS`で見た目を整えてます
- `Vite`
  - `webpack`でも良かったけど使ってみたかった
  - とても速い！
  - プラグインを使ったので、一つの`index.html`にまとめてくれます（そうしないといけない）

そんなに難しいことはしていないハズ（雑だとは思う）

### プラグイン側（UI じゃない方）
`esbuild`でビルドしています。めっっっっちゃ速い。  
型チェックはしてくれないので、`npm run tsc`で型チェックが出来ます（`--noEmit`）

あと、`Figma Plugin`は`ES6+`？までの言語機能しか無いので、`ES6`でも動くように引数を設定しています。