import re

with open('toc-header.php', 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Content length: {len(content)}")
print(f"Content repr: {repr(content)}")

regex = r'<\?php\s+include\s*\(\s*["\']([^"\']+)["\']\s*\);\s*\?>'
match = re.search(regex, content, flags=re.DOTALL | re.IGNORECASE)

if match:
    print("MATCH FOUND!")
    print(f"Group 1: {match.group(1)}")
else:
    print("NO MATCH")
    
    # Try simpler regexes to see where it fails
    print("Trying simple start...")
    if re.search(r'<\?php', content): print("<?php found")
    else: print("<?php NOT found")
    
    print("Trying include...")
    if re.search(r'include', content): print("include found")
    
    print("Trying complex without tags...")
    if re.search(r'include\s*\(\s*["\']([^"\']+)["\']\s*\);', content, flags=re.DOTALL): print("include statement found")
