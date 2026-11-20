// Service layer: replace bodies with fetch() calls to an Express/MongoDB API later.
import {products} from '../data/products.js';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
export const getProducts=async()=>{await wait(200);return products};
export const getProduct=async id=>{await wait(100);return products.find(p=>p.id===id)||null};
export const subscribe=async email=>({ok:true,demo:true,email});
export const sendMessage=async m=>({ok:true,demo:true});
// DEMO ONLY: no payment is processed and nothing is sent to a server.
export const placeOrder=async o=>{await wait(400);return {id:'DEMO-'+Date.now().toString(36).toUpperCase(),demo:true,...o}};
export const validateCode=c=>({STUDIO10:.1,WELCOME15:.15}[c.trim().toUpperCase()]||0);
