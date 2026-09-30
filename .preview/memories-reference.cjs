const http = require('http');
const fs = require('fs');
const video = 'C:/Users/ASUS/Videos/Screen Recordings/Screen Recording 2026-09-30 173429.mp4';
http.createServer((req,res)=>{
 if(req.url === '/video') { const size=fs.statSync(video).size; const range=req.headers.range; if(range){const [a,b]=range.replace('bytes=','').split('-');const start=+a,end=b?+b:size-1;res.writeHead(206,{'Content-Type':'video/mp4','Content-Range':`bytes ${start}-${end}/${size}`,'Accept-Ranges':'bytes','Content-Length':end-start+1});fs.createReadStream(video,{start,end}).pipe(res);}else{res.writeHead(200,{'Content-Type':'video/mp4','Content-Length':size});fs.createReadStream(video).pipe(res);}return; }
 res.writeHead(200,{'Content-Type':'text/html'});res.end('<body style="margin:0;background:#111;color:white"><video id="v" src="/video" controls style="width:100%;height:85vh"></video><div>'+[0,2,4,6,8,10,15].map(t=>`<button onclick="v.currentTime=${t};v.pause()">${t} seconds</button>`).join('')+'</div></body>');
}).listen(3103,'127.0.0.1');

