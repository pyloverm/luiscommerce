import sys

# list of imports to check
imports = ['ast', 'json', 'math','time','requests','asyncio','functools']

# check each import
for i in imports:
    # check if the import is part of the standard library
    if i in sys.builtin_module_names:
        print(f'"{i}" is part of the Python standard library')
    else:
        print(f'"{i}" is not part of the Python standard library')
        
