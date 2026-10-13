// Decorative arrows keep their desktop appearance and are hidden by mobile CSS.
// Operates on compiled HTML text nodes; attributes and raw-text content are retained.
const arrows=/[↗↘↙↖→←↑↓➡⬅⬆⬇➜➤]\uFE0F?/gu;
const rawTags=new Set(['script','style','textarea','pre','code']);
const pureArrowSpan=/^([\s↗↘↙↖→←↑↓➡⬅⬆⬇➜➤\uFE0F]+)<\/span>/u;

export function mobileDecorations(html){
 const start=html.indexOf('<body'),end=html.lastIndexOf('</body>');
 if(start<0||end<start)return html;
 const bodyStart=html.indexOf('>',start)+1,body=html.slice(bodyStart,end);
 const tags=[];let output='',index=0;
 while(index<body.length){
  if(body.startsWith('<!--',index)){
   const until=body.indexOf('-->',index+4);if(until<0)throw new Error('Unclosed comment in compiled page');
   output+=body.slice(index,until+3);index=until+3;continue;
  }
  if(body[index]==='<'){
   const from=index;let quote=null;
   for(index++;index<body.length;index++){
    const char=body[index];
    if(quote){if(char===quote)quote=null;}
    else if(char==='"'||char==="'")quote=char;
    else if(char==='>'){index++;break;}
   }
   let token=body.slice(from,index);
   const closing=token.match(/^<\/([a-z][a-z0-9-]*)/iu),opening=token.match(/^<([a-z][a-z0-9-]*)/iu);
   if(opening?.[1].toLowerCase()==='span'&&!tags.some(tag=>rawTags.has(tag.name))&&!token.includes('mobile-decoration')){
    const text=body.slice(index).match(pureArrowSpan)?.[1];
    if(text&&/[↗↘↙↖→←↑↓➡⬅⬆⬇➜➤]/u.test(text))token=token.includes('class="')?token.replace(/class="([^"]*)"/u,(_,classes)=>`class="${classes} mobile-decoration"`):token.slice(0,-1)+' class="mobile-decoration">';
   }
   output+=token;
   if(closing){const position=tags.map(tag=>tag.name).lastIndexOf(closing[1].toLowerCase());if(position>=0)tags.splice(position);}
   else if(opening&&!/\/\s*>$/u.test(token)&&!['img','br','hr','input','link','meta','wbr','source','area','embed','param','track','col'].includes(opening[1].toLowerCase()))tags.push({name:opening[1].toLowerCase(),decoration:token.includes('mobile-decoration')});
  }else{
   const next=body.indexOf('<',index),until=next<0?body.length:next,text=body.slice(index,until);
   const rendered=tags.some(tag=>rawTags.has(tag.name)||tag.decoration)?text:text.replace(arrows,(arrow,offset)=>{
    // Directional symbols between words retain their informational meaning.
    if(/[→←↑↓]/u.test(arrow)&&text.slice(0,offset).trim()&&text.slice(offset+arrow.length).trim())return arrow;
    return `<span class="mobile-decoration">${arrow}</span>`;
   });
   // Keep each existing flex label as one item, retaining desktop icon spacing.
   output+=rendered!==text&&['a','button'].includes(tags.at(-1)?.name)?`<span class="mobile-label">${rendered}</span>`:rendered;
   index=until;
  }
 }
 return html.slice(0,bodyStart)+output+html.slice(end);
}
