const fs=require('fs');const file='src/components/EducationSection.jsx';let s=fs.readFileSync(file,'utf8');
s=s.replace('    setMounted(true);','    const frame = requestAnimationFrame(() => setMounted(true));\n    return () => cancelAnimationFrame(frame);');
for (const name of ['matchedEdu','activeItem','item'])s=s.replace('"{'+name+'.thesisTitle}"','&ldquo;{'+name+'.thesisTitle}&rdquo;');
fs.writeFileSync(file,s);
