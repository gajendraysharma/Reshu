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

# PAGE 6 is 1111 (need to save ~90px)
# We already did some replacements on 6, but we need more.
content = replace_in_page(content, 6, 7, 'py-2', 'py-1')
content = replace_in_page(content, 6, 7, 'py-1.5', 'py-0.5')
content = replace_in_page(content, 6, 7, 'py-1', 'py-0')
content = replace_in_page(content, 6, 7, 'mb-2', 'mb-1')
content = replace_in_page(content, 6, 7, 'mt-2', 'mt-1')
content = replace_in_page(content, 6, 7, 'p-4', 'p-2')
content = replace_in_page(content, 6, 7, 'p-3', 'p-1.5')
content = replace_in_page(content, 6, 7, 'p-2', 'p-1')
content = replace_in_page(content, 6, 7, 'gap-3', 'gap-1')
content = replace_in_page(content, 6, 7, 'gap-2', 'gap-1')
content = replace_in_page(content, 6, 7, 'gap-1.5', 'gap-0.5')
content = replace_in_page(content, 6, 7, 'mb-1', 'mb-0')
content = replace_in_page(content, 6, 7, 'pb-1', 'pb-0')
content = replace_in_page(content, 6, 7, 'text-[10pt]', 'text-[9pt]')
content = replace_in_page(content, 6, 7, 'text-[9.5pt]', 'text-[8.5pt]')
content = replace_in_page(content, 6, 7, 'text-[9pt]', 'text-[8pt]')

# PAGE 7 is 1039 (need to save ~15px)
content = replace_in_page(content, 7, 8, 'py-2', 'py-1')
content = replace_in_page(content, 7, 8, 'p-3', 'p-2')
content = replace_in_page(content, 7, 8, 'gap-2', 'gap-1')
content = replace_in_page(content, 7, 8, 'mb-1', 'mb-0')

# PAGE 1 is 1039 (need to save ~15px)
content = replace_in_page(content, 1, 2, 'pt-8', 'pt-4')
content = replace_in_page(content, 1, 2, 'pb-8', 'pb-4')
content = replace_in_page(content, 1, 2, 'gap-8', 'gap-4')
content = replace_in_page(content, 1, 2, 'mt-12', 'mt-6')

with open('src/components/PrintDossier.tsx', 'w') as f:
    f.write(content)
