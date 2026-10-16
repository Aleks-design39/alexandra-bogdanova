(() => {
  const d=window.resumeContent;
  for(const tool of d.tools){const row=document.createElement('article');row.className='tool-row';const title=document.createElement('h3');title.textContent=tool.name;const text=document.createElement('p');text.textContent=tool.text;row.append(title,text);document.getElementById('tools-list').append(row);}
  for(const item of d.conditions){const row=document.createElement('div');const label=document.createElement('dt');label.textContent=item.label;const value=document.createElement('dd');value.textContent=item.value;row.append(label,value);document.getElementById('conditions-list').append(row);}
})();
