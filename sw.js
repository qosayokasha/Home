// يخزّن واجهة التطبيق والمكتبات ليفتح بدون إنترنت. البيانات تُخزَّن في المتصفح (cache + طابور) وليس هنا.
const C='he-v1',U=['./','https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js','https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>Promise.all(U.map(u=>fetch(u,u.startsWith('http')?{mode:'no-cors'}:{}).then(r=>c.put(u,r)).catch(()=>{})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||r.url.includes('supabase.co'))return;
 e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./'))))});
