import re

with open('index.html', 'r') as f:
    content = f.read()

# Find gallery section boundaries
gallery_comment = '<!-- GALLERY -->'
gallery_end = '<button class="gallery-toggle-btn" id="galleryToggle">Show More</button>\n\n</section>'
g_start = content.index(gallery_comment)
g_end = content.index(gallery_end) + len(gallery_end)
gallery_block = content[g_start:g_end]

# Find before the march section boundaries
before_comment = '<!-- BEFORE THE MARCH -->'
before_end = '</div>\n\n</section>\n\n<!-- SHARE POSTERS -->'
b_start = content.index(before_comment)
# end is just before <!-- SHARE POSTERS -->
b_end = content.index('\n\n<!-- SHARE POSTERS -->') 
before_block = content[b_start:b_end]

print(f"Gallery block: chars {g_start}-{g_end}")
print(f"Before block: chars {b_start}-{b_end}")
print(f"Gallery starts: {repr(gallery_block[:50])}")
print(f"Before starts: {repr(before_block[:50])}")
print(f"Gallery ends: {repr(gallery_block[-50:])}")
print(f"Before ends: {repr(before_block[-50:])}")

# Now rearrange:
# 1. Remove gallery from position g_start:g_end, insert before_block there
# 2. Remove before_block from position b_start:b_end, insert gallery_block before <!-- FOOTER -->

# After step 1, b_start position shifts by (len(before_block) - len(gallery_block))

new_content = content[:g_start] + before_block + content[g_end:]

# Now find the new position of the before block in new_content (it shifted)
# and find the FAQ end position
# We need to remove before_block from where it now is (originally b_start, 
# but now shifted by len(before_block) - len(gallery_block))
shift = len(before_block) - len(gallery_block)
new_b_start = b_start + shift
new_b_end = b_end + shift

# Verify
print(f"\nIn new content, before block at {new_b_start}-{new_b_end}:")
print(repr(new_content[new_b_start:new_b_start+60]))
print(repr(new_content[new_b_end-20:new_b_end+30]))

# Remove original before block
new_content2 = new_content[:new_b_start] + new_content[new_b_end:]

# Now insert gallery_block after FAQ section, before <!-- FOOTER -->
footer_marker = '\n\n<!-- FOOTER -->'
footer_pos = new_content2.index(footer_marker)
new_content3 = new_content2[:footer_pos] + '\n\n' + gallery_block + new_content2[footer_pos:]

with open('index.html', 'w') as f:
    f.write(new_content3)

print("\nDone! Sections rearranged.")
