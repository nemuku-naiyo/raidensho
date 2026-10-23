# 雷電所 RAIDENSHO

点に雷を落として連鎖させ、目標の発電量を越えていくローグライト。iPhoneの縦持ち向け。

**遊ぶ**：https://nemuku-naiyo.github.io/raidensho/

ホーム画面に追加すると、アプリのように全画面で遊べる。

## ルール（ひとこと）

- 雷を落とす点を選ぶ。その点と、まわりの円の中の同じ色の点に落ちて、そこから同じ色へつながっていく
- **遠くまでつながるほど強い。** 列の端に落とすほうが長くつながる
- 発電 ＝ 当たった個数 × 連鎖。スキルやボスの倍率は最後にかかる
- 1フェーズに3発。目標を越えたら「次へ」で1発だけ持ち越せる
- 3フェーズ目はボス。3ステージ制覇のあとはエンドレス

## ファイル

| 場所 | 中身 |
| --- | --- |
| `src/raidensho.html` | ゲーム本体（正本）。claude.aiの作品としてもこのまま公開している |
| `index.html` | GitHub Pages用。`tools/build.py` で `src/raidensho.html` から作る |
| `icons/` | アイコン（1024 / 512 / 180） |
| `bgm/` | BGM（peek＝ふだんのフェーズ、sebolydi＝ボス戦、tempo＝スキル選び・制覇）。つなぎ目なしでループさせるためWAVのまま |
| `manifest.webmanifest` | ホーム画面に追加したときの設定 |
| `tools/` | 調整用のシミュレーションとテスト |

## 更新の流れ

1. `src/raidensho.html` を直す
2. `python3 tools/build.py` で `index.html` を作り直す
3. `sh tools/mkchk.sh` で構文チェック、`cd tools && node play.js` で回帰テスト（最後に「予想と実際は一致」が出ればOK）

## 調整用の道具（tools/）

AIが毎回その場で一番発電する点を選んで遊ぶ、簡易シミュレーション。先は読まず、虹点もほとんど置かない。乱気流・停電区域・一撃勝負・虹点まわりのスキルは、人間のプレイで確かめる。

先に `sh tools/mkchk.sh` を実行して `tools/chk.js` を作っておく。

| コマンド（tools/ で実行） | 用途 |
| --- | --- |
| `SEED=1 JSON=1 JB=1 node sim.js` | 1回遊ばせて各フェーズの発電を出す |
| `./dd.sh <seed> <名前>` → `python3 ddan.py aud/<名前>.txt` | 何回も遊ばせて、フェーズごとの負け数と余裕を集計 |
| `./aud_one.sh <スキル> <seed>` → `python3 aud_an.py` | スキル1つ（`a,b`で組み合わせ）の強さを、なしの時の何倍かで比べる |
| `./bossrun.sh <ボス> <seed>` → `python3 bossan.py` | ボスを固定して、ボスごとの負けやすさを比べる |
| `node play.js` | 回帰テスト（予想スコアと実際の発電が一致するか） |

環境変数：`SEED` 乱数の種 / `SK` 最初から持たせるスキル / `NOQ` 目標なし / `SKIP` スキルを取らない / `FREE` 点の上以外も狙う / `JSON` 結果をJSONで / `JB` ボス名つき。
