import json,re,glob,os
src=open('../src/raidensho.html',encoding='utf-8').read()
Q=json.loads('['+re.search(r'quota:\[([^\]]*)\]',src).group(1)+']')
QF={k:float(v) for k,v in re.findall(r"\n  (\w+):\{qf:([\d.]+)",src)}
rows={}
for f in sorted(glob.glob('aud/boss/*.txt')):
    k=os.path.basename(f)[:-4];qf=QF.get(k,1.0);R={2:[],5:[],8:[]}
    for l in open(f):
        s,_,j=l.strip().partition(' ')
        if not j.startswith('J'):continue
        h=json.loads(j[1:])
        for i in (2,5,8):
            if len(h)>i:R[i].append(h[i][0]/Q[i])
    rows[k]=(qf,R)
T=0.15
print(f"target fail {T:.0%}")
for k,(qf,R) in rows.items():
    out=[]
    for i in (2,5):
        r=sorted(R[i]);n=len(r)
        if n<8:out.append(f"st{i//3+1}: n={n}");continue
        fail=sum(x<qf for x in r)/n;q=r[int(n*T)]
        out.append(f"st{i//3+1}: n={n:3d} fail={fail:4.0%} med={r[n//2]:.2f} qf*={q:.2f}")
    print(f"{k:6s} qf={qf:.2f} | "+" | ".join(out))
