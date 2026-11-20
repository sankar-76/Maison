import {useEffect,useMemo,useState} from 'react';import {useSearchParams} from 'react-router-dom';import {LayoutGrid,List,SlidersHorizontal,X} from 'lucide-react';import {getProducts} from '../services/api.js';import {categories,swatch} from '../data/products.js';import {ProductCard} from '../components/Common.jsx';import useReveal from '../animations/useReveal.jsx';
const SZ=["XS","S","M","L","XL"];
export default function Shop(){const [sp,setSp]=useSearchParams();const [all,setAll]=useState(null);const [err,setErr]=useState(false);const [open,setOpen]=useState(false);const [list,setList]=useState(false);
 const [f,setF]=useState({size:'',color:'',max:500,sort:'popular'});const q=sp.get('q')||'',cat=sp.get('cat')||'',gender=sp.get('gender')||'';
 useEffect(()=>{getProducts().then(setAll).catch(()=>setErr(true))},[]);
 const set=(k,v)=>setSp(p=>{const n=new URLSearchParams(p);v?n.set(k,v):n.delete(k);return n},{replace:true});
 const res=useMemo(()=>{if(!all)return[];let r=all.filter(p=>(!q||(p.name+p.category+p.gender).toLowerCase().includes(q.toLowerCase()))&&(!cat||p.category===cat)&&(!gender||p.gender===gender)&&(!f.size||p.sizes.includes(f.size))&&(!f.color||p.colors.includes(f.color))&&p.price<=f.max);
  const s={popular:(a,b)=>b.popularity-a.popularity,low:(a,b)=>a.price-b.price,high:(a,b)=>b.price-a.price,newest:(a,b)=>b.isNew-a.isNew||+b.id-+a.id};return r.sort(s[f.sort])},[all,q,cat,gender,f]);
 const ref=useReveal(res.map(p=>p.id).join());
 if(err)return <p className="pad center">Something went wrong loading products.</p>;if(!all)return <div className="loader">Loading…</div>;
 const Chips=({items,val,on})=><div className="chips">{items.map(i=><button key={i} className={val===i?'on':''} aria-pressed={val===i} onClick={()=>on(val===i?'':i)}>{i}</button>)}</div>;
 return <div className="pad" ref={ref}><h1 className="lg">Shop</h1><div className="bar"><span>{res.length} products</span><button className="filterbtn" onClick={()=>setOpen(true)}><SlidersHorizontal size={16}/> Filters</button>
  <select aria-label="Sort" value={f.sort} onChange={e=>setF({...f,sort:e.target.value})}><option value="popular">Popularity</option><option value="newest">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
  <span className="toggle"><button aria-label="Grid" aria-pressed={!list} onClick={()=>setList(false)}><LayoutGrid size={18}/></button><button aria-label="List" aria-pressed={list} onClick={()=>setList(true)}><List size={18}/></button></span></div>
  <div className="shopwrap"><aside className={'filters'+(open?' open':'')}><button className="close" aria-label="Close filters" onClick={()=>setOpen(false)}><X/></button>
   <input aria-label="Search" placeholder="Search…" value={q} onChange={e=>set('q',e.target.value)}/><h4>Gender</h4><Chips items={['men','women']} val={gender} on={v=>set('gender',v)}/><h4>Category</h4><Chips items={categories} val={cat} on={v=>set('cat',v)}/>
   <h4>Size</h4><Chips items={SZ} val={f.size} on={v=>setF({...f,size:v})}/><h4>Colour</h4><Chips items={Object.keys(swatch)} val={f.color} on={v=>setF({...f,color:v})}/>
   <h4>Max price: ${f.max}</h4><input type="range" aria-label="Max price" min="50" max="500" step="10" value={f.max} onChange={e=>setF({...f,max:+e.target.value})}/>
   <button className="btn" onClick={()=>{setSp({});setF({size:'',color:'',max:500,sort:'popular'})}}>Clear all</button></aside>
   <div className={list?'listview':'grid'}>{res.length?res.map(p=><ProductCard key={p.id} p={p} list={list}/>):<p className="empty">No products match your filters.</p>}</div></div></div>}
