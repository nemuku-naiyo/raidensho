#!/usr/bin/env python3
"""src/raidensho.html（claude.aiの作品として公開している本体）から、
単独で動く index.html（GitHub Pages用）を作る。"""
import pathlib
root = pathlib.Path(__file__).resolve().parent.parent
s = (root / 'src' / 'raidensho.html').read_text(encoding='utf-8')
i = s.index('<div class="app">')
head, body = s[:i], s[i:]
head = head.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', '')
extra = '''<meta charset="utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="雷電所">
<meta name="theme-color" content="#04050b">
<meta name="description" content="点に雷を落として連鎖させ、目標の発電量を越えていくローグライト。">
<link rel="manifest" href="manifest.webmanifest">
<style>[hidden]{display:none!important}</style>
'''
out = '<!doctype html>\n<html lang="ja">\n<head>\n' + extra + head + '</head>\n<body>\n' + body + '</body>\n</html>\n'
(root / 'index.html').write_text(out, encoding='utf-8')
print('index.html', len(out), 'bytes')
