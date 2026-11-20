import {useEffect,useRef} from 'react';import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
// [data-reveal] rise, [data-clip] clip-path image reveal, [data-parallax] scrub, [data-words] headline split. Reverted on cleanup.
export default function useReveal(dep){const ref=useRef();
 useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const mobile=matchMedia('(max-width:768px)').matches;
  const ctx=gsap.context(()=>{
   gsap.utils.toArray('[data-reveal]').forEach((el,i)=>gsap.from(el,{y:40,opacity:0,duration:.9,ease:'power3.out',delay:(i%4)*.06,scrollTrigger:{trigger:el,start:'top 92%',once:true}}));
   gsap.utils.toArray('[data-clip]').forEach(el=>gsap.from(el,{clipPath:'inset(0 0 100% 0)',duration:1.3,ease:'power4.out',scrollTrigger:{trigger:el,start:'top 85%',once:true}}));
   if(!mobile)gsap.utils.toArray('[data-parallax] img').forEach(img=>gsap.fromTo(img,{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:img.parentElement,scrub:true}}));
   gsap.utils.toArray('[data-words]').forEach(el=>gsap.from(el.querySelectorAll('.w>span'),{yPercent:110,duration:1.1,stagger:.08,ease:'power4.out',delay:.15}));
  },ref);return()=>ctx.revert()},[dep]);return ref}
export const Words=({text,as:T='h1',className})=><T data-words className={className} aria-label={text}>{text.split(' ').map((w,i)=><span key={i} className="w" aria-hidden><span>{w}</span>&nbsp;</span>)}</T>;
