import os

files = [
    '/Users/khalil/Documents/GitHub/MyFarmHand/resources/js/Pages/Modules/Finance.jsx',
    '/Users/khalil/Documents/GitHub/MyFarmHand/resources/js/Pages/Modules/Inventory.jsx',
    '/Users/khalil/Documents/GitHub/MyFarmHand/resources/js/Pages/Modules/Tasks.jsx',
    '/Users/khalil/Documents/GitHub/MyFarmHand/resources/js/Pages/Modules/Users.jsx'
]

for file_path in files:
    with open(file_path, 'r') as f:
        lines = f.read().split('\n')
    
    container_start = -1
    for i, line in enumerate(lines):
        if '<div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">' in line:
            container_start = i
            break
            
    if container_start == -1:
        print(f"Container not found in {file_path}")
        continue
        
    form_start = -1
    table_start = -1
    
    for i in range(container_start + 1, len(lines)):
        if '{/*' in lines[i] and '*/}' in lines[i]:
            if form_start == -1:
                form_start = i
            elif table_start == -1:
                table_start = i
                break
                
    if form_start == -1 or table_start == -1:
        print(f"Comments not found in {file_path}")
        continue
        
    div_count = 0
    container_end = -1
    for i in range(container_start, len(lines)):
        line = lines[i]
        div_count += line.count('<div')
        div_count -= line.count('</div')
        
        if div_count == 0:
            container_end = i
            break
            
    if container_end == -1:
        print(f"Container end not found in {file_path}")
        continue
        
    prefix = lines[:form_start]
    form_block = lines[form_start:table_start]
    table_block = lines[table_start:container_end]
    suffix = lines[container_end:]
    
    while table_block and table_block[-1].strip() == '':
        table_block.pop()
    while form_block and form_block[-1].strip() == '':
        form_block.pop()
        
    new_lines = prefix + table_block + [""] + form_block + [""] + suffix
    
    with open(file_path, 'w') as f:
        f.write('\n'.join(new_lines))
    print(f"Swapped {file_path}")
