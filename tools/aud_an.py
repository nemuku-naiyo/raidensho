import json,math,collections
D=collections.defaultdict(list)
for l in open('aud/res.txt'):
    k,_,rest=l.strip().partition(' ');_,_,j=rest.partition(' ')
    if not j.startswith('J'):continue
    D[k].append(json.loads(j[1:]))
def gm(xs):return math.exp(sum(math.log(max(x,1)) for x in xs)/len(xs))
def seg(runs,a,b):return gm([sum(r[a:b])/(b-a) for r in runs if len(r)>=b])
base=D['none']
B=[seg(base,0,3),seg(base,3,6),seg(base,6,9)]
print('n base',len(base),'base 1-3/4-6/7-9 avg power',[round(x) for x in B])
rows=[]
for k,runs in D.items():
    if k=='none':continue
    r=[seg(runs,a,a+3)/B[i] for i,a in enumerate((0,3,6))]
    rows.append((k,len(runs),r))
rows.sort(key=lambda x:-x[2][1])
for k,n,r in rows:print(f'{k:8s} n={n:2d}  S1 x{r[0]:.2f}  S2 x{r[1]:.2f}  S3 x{r[2]:.2f}')
