#!/bin/sh
# 本体のスクリプト部分だけを取り出して chk.js にし、構文チェックする（sim.js / play.js はこれを読む）
cd "$(dirname "$0")"
python3 -c "
s=open('../src/raidensho.html',encoding='utf-8').read();a=s.index('<script>')+8;b=s.rindex('</script>');open('chk.js','w',encoding='utf-8').write(s[a:b])" && node --check chk.js && echo 'syntax OK'
