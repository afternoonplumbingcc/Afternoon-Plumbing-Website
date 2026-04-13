const fs=require('fs'), path=require('path');
const root='/root/.openclaw/workspace/Afternoon-Plumbing-Website';
const files=[
'contact.html','faq.html','services.html','404.html','test-slider.html',
'acid-neutralizer-installation-westminster-md.html','hose-bib-replacement-westminster-md.html','water-heater-replacement-westminster-md.html','water-softener-installation-westminster-md.html','well-pump-repair-westminster-md.html','well-pumps.html',
'jobs/laundry-faucet.html','jobs/water-heater-electrical-leak-westminster.html','jobs/water-heater-replacement-westminster.html'
];
function strip(s){return s.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();}
for(const rel of files){
 const f=path.join(root,rel);
 const s=fs.readFileSync(f,'utf8');
 const body=(s.match(/<body[^>]*>([\s\S]*)<\/body>/i)||[])[1]||s;
 const txt=strip(body);
 console.log('===== '+rel+' =====');
 console.log(txt.slice(0,2200));
 console.log('\n');
}