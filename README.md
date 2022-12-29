# test-pubsub-pull

詳細: [Cloud Pub/Sub で非同期 HTTP API 的なことをやってみる実験](https://zenn.dev/hankei6km/scraps/c4da53f3d75eab)

## 準備

最初に 1 回実施。
`tmp/key.json` に権限がある SA の鍵を保存。

ターミナルを開いたら下記を実施。

```sh
$ export PROJID=<project id>
$ export TOPID=<topic id>
```

## 受信(作成と受信個別に実施)

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

## 受信(スクリプト利用)

上記をまとめて実行するスクリプトとして `scripts/wait.sh` が利用できる。

```sh
$ ./scripts/wait.sh <reqid>
```

## パブリッシュ

ターミナルを開いて下記を実行。

```sh
$ node src/pub.js <reqid> <data>
```
