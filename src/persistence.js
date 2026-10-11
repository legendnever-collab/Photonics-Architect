import {validateImport} from './core.js';
let db;export function openDB(){return new Promise((resolve,reject)=>{const r=indexedDB.open('photonics-architect',1);r.onupgradeneeded=()=>r.result.createObjectStore('designs');r.onsuccess=()=>{db=r.result;resolve()};r.onerror=()=>reject(r.error);});}
export function read(key){return new Promise((resolve,reject)=>{const t=db.transaction('designs'),r=t.objectStore('designs').get(key);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});}
export function write(key,value){return new Promise((resolve,reject)=>{const t=db.transaction('designs','readwrite');t.objectStore('designs').put(value,key);t.oncomplete=resolve;t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error)});}
export async function save(d){const old=await read('current');if(old)await write('backup',old);await write('current',validateImport(d));}
export async function load(){const current=await read('current');if(!current)return null;try{return validateImport(current)}catch{const backup=await read('backup');return validateImport(backup)}}
