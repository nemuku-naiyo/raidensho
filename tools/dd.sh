#!/bin/sh
# 普通に1回遊ばせて、各フェーズの発電を aud/<名前>.txt に追記。集計は python3 ddan.py aud/<名前>.txt
# 例: for s in $(seq 1 60); do ./dd.sh $s base; done; python3 ddan.py aud/base.txt
cd "$(dirname "$0")"; mkdir -p aud
r=$(JB=1 SEED=$1 JSON=1 node sim.js | grep ^J); echo "$1 $r" >> aud/$2.txt
