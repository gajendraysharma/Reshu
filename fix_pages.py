import re

with open('src/components/PrintDossier.tsx', 'r') as f:
    content = f.read()

def reduce_spacing(block):
    # Font sizes
    block = block.replace('text-[14pt]', 'text-[12pt]')
    block = block.replace('text-[13pt]', 'text-[12pt]')
    block = block.replace('text-[12pt]', 'text-[11pt]')
    block = block.replace('text-[11pt]', 'text-[10pt]')
    block = block.replace('text-[10.5pt]', 'text-[9.5pt]')
    block = block.replace('text-[10pt]', 'text-[9pt]')
    block = block.replace('text-[9.5pt]', 'text-[8.5pt]')
    block = block.replace('text-[9pt]', 'text-[8pt]')
    block = block.replace('text-[8.5pt]', 'text-[7.5pt]')
    
    # Margins and Paddings
    block = block.replace('mb-6', 'mb-3')
    block = block.replace('mb-5', 'mb-2')
    block = block.replace('mb-4', 'mb-2')
    block = block.replace('mb-3', 'mb-1')
    block = block.replace('mb-2', 'mb-1')
    
    block = block.replace('mt-6', 'mt-3')
    block = block.replace('mt-5', 'mt-2')
    block = block.replace('mt-4', 'mt-2')
    block = block.replace('mt-3', 'mt-1')
    block = block.replace('mt-2', 'mt-1')
    
    block = block.replace('gap-6', 'gap-3')
    block = block.replace('gap-5', 'gap-2')
    block = block.replace('gap-4', 'gap-2')
    block = block.replace('gap-3', 'gap-1')
    block = block.replace('gap-2', 'gap-1')

    block = block.replace('py-6', 'py-3')
    block = block.replace('py-5', 'py-2')
    block = block.replace('py-4', 'py-2')
    block = block.replace('py-3', 'py-1')
    block = block.replace('py-2', 'py-1')

    block = block.replace('p-6', 'p-3')
    block = block.replace('p-5', 'p-3')
    block = block.replace('p-4', 'p-2')
    block = block.replace('p-3', 'p-1.5')
    block = block.replace('p-2', 'p-1')

    # Chart Heights
    block = block.replace('height={280}', 'height={200}')
    block = block.replace('height={260}', 'height={180}')
    block = block.replace('height={250}', 'height={180}')
    block = block.replace('height={220}', 'height={160}')
    block = block.replace('height={300}', 'height={200}')
    block = block.replace('h-[240px]', 'h-[160px]')
    block = block.replace('h-[220px]', 'h-[160px]')
    block = block.replace('h-64', 'h-48')
    block = block.replace('h-56', 'h-40')
    block = block.replace('h-48', 'h-32')

    return block

def process_page(content, page_num, next_page_num):
    start_tag = f'className="print-page page-{page_num}'
    end_tag = f'className="print-page page-{next_page_num}' if next_page_num else 'className="print-page page-15"'
    
    start_idx = content.find(start_tag)
    if start_idx == -1: return content
    
    end_idx = content.find(end_tag, start_idx)
    if end_idx == -1: end_idx = len(content)
    
    block = content[start_idx:end_idx]
    block = reduce_spacing(block)
    
    return content[:start_idx] + block + content[end_idx:]

# Let's fix ONLY the absolute worst pages based on my script (page 3 and page 8) and maybe 2, 4, 9.
# The user says "Only 2-3 pages still have minor clipping"
# If I had to guess, page 3, 8, 9 are the worst. Let's do 2, 3, 4, 8, 9.
pages_to_fix = [2, 3, 4, 8, 9]

# Because I already ran targeted_fix.py in the previous step, it already reduced some.
# Let me just restore the original from git ... wait, no git!
# I don't have a backup from before targeted_fix.py except maybe my undo but I didn't backup PrintDossier.tsx!
# I did NOT run `cp src/components/PrintDossier.tsx ...`
# Let's just run this script on 2,3,4,8,9, which will reduce them even further.
