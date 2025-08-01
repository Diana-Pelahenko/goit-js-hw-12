import{a as v,S,i as a}from"./assets/vendor-LK6CqzKq.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const E="https://pixabay.com/api/",q="51396557-8635804b4a1d4712ba232ab38";async function u(r,t=1){const o={key:q,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};return(await v.get(E,{params:o})).data}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),h=document.querySelector(".loader-text");let B=new S(".gallery a");function p(r){const t=r.map(o=>`
      <li>
        <a href="${o.largeImageURL}">
          <img src="${o.webformatURL}" alt="${o.tags}" />
        </a>
        <div>
          <p>Likes: ${o.likes}</p>
          <p>Views: ${o.views}</p>
          <p>Comments: ${o.comments}</p>
          <p>Downloads: ${o.downloads}</p>
        </div>
      </li>
    `).join("");f.insertAdjacentHTML("beforeend",t),B.refresh()}function P(){f.innerHTML=""}function y(){m.classList.remove("hidden"),h.classList.remove("hidden")}function g(){m.classList.add("hidden"),h.classList.add("hidden")}const L=document.querySelector(".load-more");function w(){L.classList.remove("hidden")}function b(){L.classList.add("hidden")}const $=document.querySelector(".form"),x=document.querySelector(".load-more");let n=1,i="",d=0;$.addEventListener("submit",async r=>{if(r.preventDefault(),i=r.target.elements["search-text"].value.trim(),n=1,!i){a.warning({message:"Please enter a search term!"});return}P(),b(),y();try{const t=await u(i,n);d=t.totalHits,t.hits.length===0?a.info({message:"No images found."}):(p(t.hits),d>15&&w())}catch{a.error({message:"Error loading images."})}finally{g()}});x.addEventListener("click",async()=>{n+=1,y(),b();try{const r=await u(i,n);p(r.hits),n*15>=d?a.info({message:"We're sorry, but you've reached the end of search results."}):w(),M()}catch{a.error({message:"Error loading more images."})}finally{g()}});function M(){const{height:r}=document.querySelector(".gallery li").getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
