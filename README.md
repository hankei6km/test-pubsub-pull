# test-pubsub-pull

```sh
$ export PROJID=<project id>
$ export SUBID==<subscription id>
```

`tmp/key.json` に権限がある SA の鍵を保存。

```sh
$ node src/index.js id1
```

コンソールから `id1` をパブリッシュすると ACK を返す。
