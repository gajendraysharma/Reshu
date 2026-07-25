import re

with open('src/components/PrintDossier.tsx', 'r') as f:
    content = f.read()

def reduce_spacing(block):
    block = block.replace('pb-1.5', 'pb-0.5')
    block = block.replace('mb-1.5', 'mb-0.5')
    block = block.replace('gap-2', 'gap-1')
    block = block.replace('p-2.5', 'p-1')
    block = block.replace('mt-1.5', 'mt-0.5')
    block = block.replace('mt-1', 'mt-0.5')
    block = block.replace('w-8 h-8', 'w-6 h-6')
    block = block.replace('w-4 h-4', 'w-3.5 h-3.5')
    block = block.replace('h-2', 'h-1.5')
    block = block.replace('text-[11pt]', 'text-[10pt]')
    block = block.replace('text-[9pt]', 'text-[8.5pt]')
    block = block.replace('text-[8pt]', 'text-[7.5pt]')
    block = block.replace('text-[7pt]', 'text-[6.5pt]')
    block = block.replace('h-[105px]', 'h-[80px]')
    return block

start_tag = 'className="print-page page-4'
end_tag = 'className="print-page page-5'

start_idx = content.find(start_tag)
end_idx = content.find(end_tag, start_idx)

block = content[start_idx:end_idx]
block = reduce_spacing(block)

new_content = content[:start_idx] + block + content[end_idx:]

with open('src/components/PrintDossier.tsx', 'w') as f:
    f.write(new_content)

