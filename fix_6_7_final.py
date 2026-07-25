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

# PAGE 6 (need 11px)
content = replace_in_page(content, 6, 7, 'py-1', 'py-0')
content = replace_in_page(content, 6, 7, 'p-2', 'p-1.5')
content = replace_in_page(content, 6, 7, 'p-1.5', 'p-1')
content = replace_in_page(content, 6, 7, 'mb-2', 'mb-0')
content = replace_in_page(content, 6, 7, 'pb-2', 'pb-0')
content = replace_in_page(content, 6, 7, 'pt-4', 'pt-2')
content = replace_in_page(content, 6, 7, 'text-[8.5pt]', 'text-[8pt]')

# PAGE 7 (need 13px)
content = replace_in_page(content, 7, 8, 'py-1', 'py-0')
content = replace_in_page(content, 7, 8, 'p-2', 'p-1.5')
content = replace_in_page(content, 7, 8, 'mb-2', 'mb-0')
content = replace_in_page(content, 7, 8, 'pb-2', 'pb-0')
content = replace_in_page(content, 7, 8, 'pt-4', 'pt-2')
content = replace_in_page(content, 7, 8, 'text-[9.5pt]', 'text-[9pt]')
content = replace_in_page(content, 7, 8, 'text-[9pt]', 'text-[8.5pt]')

with open('src/components/PrintDossier.tsx', 'w') as f:
    f.write(content)
