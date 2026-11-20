import {createContext,useContext,useEffect,useMemo,useState,useCallback} from 'react';import {validateCode} from '../services/api.js';
const Ctx=createContext();export const useStore=()=>useContext(Ctx);
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
export function StoreProvider({children}){
 const [cart,setCart]=useState(()=>load('cart',[]));const [wish,setWish]=useState(()=>load('wish',[]));const [drawer,setDrawer]=useState(false);const [code,setCode]=useState(()=>load('code',''));
 useEffect(()=>localStorage.setItem('cart',JSON.stringify(cart)),[cart]);useEffect(()=>localStorage.setItem('wish',JSON.stringify(wish)),[wish]);useEffect(()=>localStorage.setItem('code',JSON.stringify(code)),[code]);
 const add=useCallback((p,size,color,qty=1,open=true)=>{const key=`${p.id}-${size}-${color}`;
  setCart(c=>c.find(i=>i.key===key)?c.map(i=>i.key===key?{...i,qty:Math.min(10,i.qty+qty)}:i):[...c,{key,id:p.id,name:p.name,price:p.price,image:p.images[0],size,color,qty}]);if(open)setDrawer(true)},[]);
 const setQty=(key,q)=>setCart(c=>q<1?c.filter(i=>i.key!==key):c.map(i=>i.key===key?{...i,qty:Math.min(q,10)}:i));
 const toggleWish=id=>setWish(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
 const t=useMemo(()=>{const sub=cart.reduce((s,i)=>s+i.price*i.qty,0);const rate=validateCode(code);const discount=+(sub*rate).toFixed(2);const shipping=!sub||sub-discount>=200?0:15;
  return{sub,discount,shipping,total:sub-discount+shipping,count:cart.reduce((s,i)=>s+i.qty,0),rate}},[cart,code]);
 return <Ctx.Provider value={{cart,add,setQty,clear:()=>setCart([]),wish,toggleWish,drawer,setDrawer,code,setCode,...t}}>{children}</Ctx.Provider>}
