// Layout decoration for the trusted, retained Insights documents.
// Article prose, source URLs and historical publication data stay intact.
import {htmlEscape as esc} from './seo-render.mjs';

const ui={
 en:{contents:'In this guide',table:'Article table',swipe:'Scroll the table horizontally to compare all columns.'},
 da:{contents:'I denne guide',table:'Tabel i artiklen',swipe:'Rul tabellen vandret for at sammenligne alle kolonner.'},
 sv:{contents:'I den här guiden',table:'Tabell i artikeln',swipe:'Rulla tabellen i sidled för att jämföra alla kolumner.'}
};
const plain=value=>{
 // Navigation labels and column names in these documents are encoded text,
 // not HTML fragments. Reject unexpected markup instead of stripping it.
 if(/[<>]/.test(value))throw new Error('Insights heading and column labels must be plain encoded text');
 const entities={amp:'&',quot:'"','#39':"'"};
 // One pass preserves nested literal entities such as &amp;quot;.
 return value.replace(/&(amp|quot|#39);/g,(_,name)=>entities[name]).trim();
};
export const isInsightsUrl=url=>/^\/(?:da\/|sv\/)?insights\/(?:[^/?]+\.html)?$/.test(url);

function headingIds(content){
 const used=new Set([...content.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]));
 const headings=[];let counter=0;
 const html=content.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/g,(whole,attrs,title)=>{
  let id=attrs.match(/\bid="([^"]+)"/)?.[1];
  if(!id){do{id='article-section-'+String(++counter).padStart(2,'0');}while(used.has(id));used.add(id);attrs+=' id="'+id+'"';}
  headings.push({id,title:plain(title)});
  return `<h2${attrs}>${title}</h2>`;
 });
 const ctaIds=new Set([...html.matchAll(/<section class="guide-cta">([\s\S]*?)<\/section>/g)].flatMap(match=>[...match[1].matchAll(/<h2[^>]*id="([^"]+)"/g)].map(item=>item[1])));
 return {html,headings:headings.filter(item=>!ctaIds.has(item.id))};
}

function tableMarkup(table){
 const thead=table.match(/<thead\b[^>]*>([\s\S]*?)<\/thead>/)?.[1];
 if(!thead)return {html:table,columns:0};
 const labels=[...thead.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map(match=>plain(match[1]));
 let html=table.replace(/<table\b([^>]*)>/,(whole,attrs)=>{
  const extra=labels.length===2?' editorial-table-two-columns':'';
  attrs=attrs.includes('class="')?attrs.replace(/class="([^"]*)"/,(_,classes)=>`class="${classes}${extra}"`):attrs+` class="${extra.trim()}"`;
  return `<table${attrs} role="table">`;
 });
 html=html.replace(/<thead\b[^>]*>([\s\S]*?)<\/thead>/,(whole,inner)=>`<thead role="rowgroup">${inner.replace(/<th\b[^>]*>/g,'<th scope="col" role="columnheader">')}</thead>`);
 html=html.replace(/<tbody\b[^>]*>([\s\S]*?)<\/tbody>/,(whole,inner)=>`<tbody role="rowgroup">${inner.replace(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g,(row,cells)=>{
  let index=0;
  const rendered=cells.replace(/<(td|th)\b([^>]*)>([\s\S]*?)<\/(?:td|th)>/g,(cell,tag,attrs,value)=>{
   const column=index++,isRowHeader=column===0;
   return isRowHeader?`<th${attrs.replace(/\s(?:scope|role)="[^"]*"/g,'')} scope="row" role="rowheader">${value}</th>`:`<td${attrs} role="cell" data-label="${esc(labels[column]||'')}">${value}</td>`;
  });
  return `<tr role="row">${rendered}</tr>`;
 })}</tbody>`);
 html=html.replace(/<tr>/g,'<tr role="row">');
 return {html,columns:labels.length};
}

function decorateTables(body,lang){
 return body.replace(/<div class="(guide-table-wrap|authority-table-wrap)"([^>]*)>(\s*<table\b[\s\S]*?<\/table>\s*)<\/div>/g,(whole,kind,attrs,table)=>{
  const decorated=tableMarkup(table),wide=decorated.columns>2;
  const classes=kind+(wide?' editorial-table-scroll':decorated.columns===2?' editorial-table-two-columns':'');
  return `${wide?`<p class="table-hint">${esc(ui[lang].swipe)}</p>`:''}<div class="${classes}"${attrs}${wide?` tabindex="0" role="region" aria-label="${esc(ui[lang].table)}"`:''}>${decorated.html}</div>`;
 });
}

export function decorateInsights(body,lang,url){
 if(!isInsightsUrl(url))return body;
 let html=body;
 if(url.endsWith('/insights/'))html=html.replace('class="authority-hero"','class="authority-hero insights-hub-hero"');
 if(html.includes('class="guide-body"')){
  let toc=[];
  html=html.replace(/<article class="guide-body">([\s\S]*?)<\/article>/,(whole,content)=>{
   const decorated=headingIds(content);toc=decorated.headings;
   let article=decorated.html.replace(/<ul>/g,'<ul class="guide-related-links">');
   // Every citations block is a source list, including the final references.
   article=article.replace(/<p class="guide-citations">([\s\S]*?)<\/p>/g,(whole,content)=>referenceList(whole,content));
   const headings=[...article.matchAll(/<h2\b[^>]*>[\s\S]*?<\/h2>/g)];
   const last=headings.at(-1);
   if(last&&article.slice(last.index).includes('class="method-note"'))article=article.slice(0,last.index)+`<section class="guide-source-section">${article.slice(last.index)}</section>`;
   return `<article class="guide-body">${article}</article>`;
  });
  const links=toc.map(item=>`<li><a href="#${esc(item.id)}">${esc(item.title)}</a></li>`).join('');
  const desktop=`<nav class="guide-toc" aria-label="${esc(ui[lang].contents)}"><h2>${esc(ui[lang].contents)}</h2><ol>${links}</ol></nav>`;
  const mobile=`<div class="guide-shell"><details class="guide-toc-mobile"><summary>${esc(ui[lang].contents)}</summary><nav aria-label="${esc(ui[lang].contents)}"><ol>${links}</ol></nav></details></div>`;
  html=html.replace('<div class="guide-shell guide-layout">',mobile+'<div class="guide-shell guide-layout">');
  html=html.replace(/<aside class="guide-aside">([\s\S]*?)<\/aside>/,(whole,content)=>`<aside class="guide-aside">${desktop}<div class="guide-aside-cta">${content}</div></aside>`);
 }
 return decorateTables(html,lang);
}

function referenceList(original,content){
 const links=[...content.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map(match=>match[0]);
 const remainder=content.replace(/<a\b[^>]*>[\s\S]*?<\/a>/g,'').replace(/[\s·]/g,'');
 if(!links.length||remainder)return original;
 return `<ul class="guide-citations">${links.map(link=>`<li>${link}</li>`).join('')}</ul>`;
}
