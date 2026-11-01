// Compatibility helpers for embedded browsers.
const runtime=typeof globalThis!=='undefined'?globalThis:window;
if(!String.prototype.replaceAll){String.prototype.replaceAll=function(search,replacement){return this.split(search).join(replacement)}}
if(!runtime.queueMicrotask)runtime.queueMicrotask=callback=>Promise.resolve().then(callback);
export function newRecordId(){if(runtime.crypto?.randomUUID)return runtime.crypto.randomUUID();if(runtime.crypto?.getRandomValues){const bytes=new Uint8Array(16);runtime.crypto.getRandomValues(bytes);return Array.from(bytes,x=>x.toString(16).padStart(2,'0')).join('')}return 'record-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2)+'-'+Math.random().toString(36).slice(2)}
