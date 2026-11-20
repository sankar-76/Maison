import {useEffect,useRef,useState} from 'react';import {Link,NavLink,useNavigate,useLocation} from 'react-router-dom';import {ShoppingBag,Heart,Search,Menu,X} from 'lucide-react';import gsap from 'gsap';
import {useStore} from '../context/StoreContext.jsx';import {categories} from '../data/products.js';
export default function Navbar(){const {count,wish,setDrawer}=useStore();const [menu,setMenu]=useState(false);const [mega,setMega]=useState(false);const [q,setQ]=useState('');const [sOpen,setS]=useState(false);
 const nav=useNavigate();const {pathname}=useLocation();const bag=useRef();const first=useRef(true);
 useEffect(()=>{setMenu(false);setMega(false);setS(false)},[pathname]);
 useEffect(()=>{if(first.current){first.current=false;return}gsap.fromTo(bag.current,{scale:1.35},{scale:1,duration:.6,ease:'elastic.out(1,.4)'})},[count]);
 useEffect(()=>{document.body.style.overflow=menu?'hidden':'';const k=e=>{if(e.key==='Escape'){setMenu(false);setS(false)}};addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[menu]);
 const go=e=>{e.preventDefault();nav('/shop?q='+encodeURIComponent(q));setS(false)};
 return <><header className="nav"><div className="navin"><Link to="/" className="logo">MAISON</Link>
  <nav className="links" aria-label="Main"><NavLink to="/shop">Shop</NavLink><span onMouseEnter={()=>setMega(true)} onMouseLeave={()=>setMega(false)}><button className="linkbtn" aria-expanded={mega} onClick={()=>setMega(m=>!m)}>Collections</button>
   <div className={'mega'+(mega?' open':'')}>{categories.map(c=><Link key={c} to={`/shop?cat=${c}`}>{c}</Link>)}<Link to="/shop?gender=men">Men</Link><Link to="/shop?gender=women">Women</Link></div></span><NavLink to="/about">About</NavLink><NavLink to="/contact">Contact</NavLink></nav>
  <div className="icons"><button aria-label="Search" onClick={()=>setS(s=>!s)}><Search size={20}/></button><Link aria-label={`Wishlist (${wish.length})`} to="/wishlist"><Heart size={20}/></Link>
   <button aria-label={`Open bag, ${count} items`} onClick={()=>setDrawer(true)} className="bagbtn"><span ref={bag} style={{display:'inline-flex'}}><ShoppingBag size={20}/></span>{count>0&&<b className="badge">{count}</b>}</button>
   <button className="burger" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} onClick={()=>setMenu(m=>!m)}>{menu?<X/>:<Menu/>}</button></div></div>
  {sOpen&&<form className="searchbar" onSubmit={go} role="search"><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products…" aria-label="Search products"/><button>Search</button></form>}
  </header><div className={'drawer-m'+(menu?' open':'')}>{[['/','Home'],['/shop','Shop'],['/wishlist','Wishlist'],['/cart','Bag'],['/about','About'],['/contact','Contact']].map(([t,l])=><Link key={t} to={t}>{l}</Link>)}</div></>}
