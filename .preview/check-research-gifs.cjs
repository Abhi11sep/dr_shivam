const fs=require('fs');
for(const name of ['ra3.gif','ra4.gif','rb3.gif']){
const b=fs.readFileSync('public/research/'+name);let p=13,count=0;if(b[10]&128)p+=3*(1<<((b[10]&7)+1));
function blocks(){while(p<b.length){const n=b[p++];if(!n)break;p+=n;}}
while(p<b.length){const tag=b[p++];if(tag===0x3b)break;if(tag===0x21){p++;blocks();}else if(tag===0x2c){count++;const flags=b[p+8];p+=9;if(flags&128)p+=3*(1<<((flags&7)+1));p++;blocks();}else throw Error('Unknown GIF block '+tag);}
console.log(name+': '+count+' image frames; original matches: '+b.equals(fs.readFileSync('C:/Users/ASUS/Desktop/'+name.toUpperCase().replace('.GIF','.gif'))));}
