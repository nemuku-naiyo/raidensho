import json,collections,re,sys
src=open('../src/raidensho.html',encoding='utf-8').read();Q=json.loads('['+re.search(r'quota:\[([^\]]*)\]',src).group(1)+']')
R=[[] for _ in range(9)];B=collections.defaultdict(lambda:[0,0]);cl=0;n=0;raw=[[] for _ in range(9)]
for l in open(sys.argv[1]):
    s,_,j=l.strip().partition(' ');h=json.loads(j[1:]);n+=1
    if len(h)==9 and h[8][0]>=Q[8]:cl+=1
    for i,(v,b) in enumerate(h):
        q=Q[i]*(.7 if b=='絶縁体' else 1);R[i].append(v/q);raw[i].append(v)
        if b:B[b][0]+=1;B[b][1]+=v<q
print('Q',Q,'runs',n,'clear',cl)
for i,r in enumerate(R):r.sort();rw=sorted(raw[i]);print(f'P{i+1} n={len(r):2d} fail={sum(x<1 for x in r):2d} median x{r[len(r)//2]:.2f}  low raw {rw[:6]} med {rw[len(rw)//2]}')
for b,v in B.items():print(b,'fail %d/%d'%(v[1],v[0]))
