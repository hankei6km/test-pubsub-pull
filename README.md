# test-pubsub-pull

## 準備

最初に 1 回実施。
`tmp/key.json` に権限がある SA の鍵を保存。

ターミナルを開いたら下記を実施。

```sh
$ export PROJID=<project id>
$ export TOPID=<topic id>
```

## 受信(待機)

サブスクリプション id とフィルターに指定する `reqid` を指定する。

作成されたサブスクリプションは `reqid` が合致するメッセージのみ受信する。

```sh
$ node src/sub.js <subscription id> <reqid>
```

指定したサブスクリプションからメッセージを pull する(120 秒間だけ稼働)。

```sh
$ node src/index.js <subscription id>
```

サブスクリプションはそのまま残るので必要がなければコンソールなどから削除。

## パブリッシュ

ターミナルを開いて下記を実行。

```sh
$ node src/pub.js <reqid> <data>
```
