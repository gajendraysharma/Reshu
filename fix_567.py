import re

with open('src/components/PrintDossier.tsx', 'r') as f:
    content = f.read()

def replace_in_page(content, page_num, next_page, old, new):
    start_tag = f'className="print-page page-{page_num}'
    end_tag = f'className="print-page page-{next_page}' if next_page else 'className="print-page page-15"'
    
    start_idx = content.find(start_tag)
    if start_idx == -1: return content
    
    end_idx = content.find(end_tag, start_idx)
    if end_idx == -1: end_idx = len(content)
    
    block = content[start_idx:end_idx]
    block = block.replace(old, new)
    
    return content[:start_idx] + block + content[end_idx:]

for p in [5, 6, 7]:
    content = replace_in_page(content, p, p+1, 'mb-2', 'mb-1')
    content = replace_in_page(content, p, p+1, 'mb-1', 'mb-0')
    content = replace_in_page(content, p, p+1, 'mt-2', 'mt-1')
    content = replace_in_page(content, p, p+1, 'mt-1', 'mt-0')
    content = replace_in_page(content, p, p+1, 'pb-2', 'pb-1')
    content = replace_in_page(content, p, p+1, 'pb-1', 'pb-0')
    content = replace_in_page(content, p, p+1, 'pt-4', 'pt-2')
    content = replace_in_page(content, p, p+1, 'py-2', 'py-1')
    content = replace_in_page(content, p, p+1, 'p-4', 'p-2')
    content = replace_in_page(content, p, p+1, 'p-3', 'p-2')
    content = replace_in_page(content, p, p+1, 'gap-3', 'gap-1.5')
    content = replace_in_page(content, p, p+1, 'gap-2', 'gap-1')

with open('src/components/PrintDossier.tsx', 'w') as f:
    f.write(content)
