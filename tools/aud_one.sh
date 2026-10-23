#!/bin/sh
# スキル1つ（または「a,b」の組み合わせ）を持たせて、目標なしで1回遊ばせる。結果は aud/res.txt に追記
# 例: for s in $(seq 1 30); do ./aud_one.sh hv $s; done; python3 aud_an.py
cd "$(dirname "$0")"; mkdir -p aud
if [ "$1" = none ]; then r=$(SEED=$2 NOQ=1 SKIP=1 JSON=1 node sim.js | grep ^J); else r=$(SEED=$2 SK=$1 NOQ=1 SKIP=1 JSON=1 node sim.js | grep ^J); fi
echo "$1 $2 $r" >> aud/res.txt
