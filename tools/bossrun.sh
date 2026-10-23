#!/bin/sh
# ボスを1体に固定して1回遊ばせる。結果は aud/boss/<ボス>.txt。集計は python3 bossan.py
# 例: for b in small alert one tower insul turb dark; do for s in $(seq 1 100); do ./bossrun.sh $b $s; done; done
cd "$(dirname "$0")"; mkdir -p aud/boss
[ -f chk_boss.js ] || python3 -c "
s=open('chk.js',encoding='utf-8').read();a='const k=pool[Math.floor(Math.random()*pool.length)];'
open('chk_boss.js','w',encoding='utf-8').write(s.replace(a,'const k=process.env.BOSS||pool[Math.floor(Math.random()*pool.length)];'))"
r=$(CHK=chk_boss.js BOSS=$1 JB=1 SEED=$2 JSON=1 node sim.js | grep ^J); echo "$2 $r" >> aud/boss/$1.txt
