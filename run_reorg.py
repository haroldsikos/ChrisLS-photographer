
import os
import shutil
import math

# Config
BASE_DIR = r"c:\Users\Harold\Documents\Scripts\2026\chris-ls-photography\public\images"
CATEGORIES_LIST = [
    'culture', 'landscape', 'city', 'food', 'animals', 
    'trekking', 'wedding', 'casual', 'models', 'sessions'
    # 'commercial' handled separately
]

HERO_FILES = ['p52.webp', 'p58.webp', 'p63.webp', 'p75.webp', 'p88.webp']

# 1. Create Directories
os.makedirs(os.path.join(BASE_DIR, "categories"), exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, "hero"), exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, "about"), exist_ok=True)

# 2. Handle Commercial (Move existing folder content)
comm_src = os.path.join(BASE_DIR, "commercial")
comm_dst = os.path.join(BASE_DIR, "categories", "commercial")
if os.path.exists(comm_src):
    if not os.path.exists(comm_dst):
        shutil.move(comm_src, comm_dst)
        print(f"Moved commercial to {comm_dst}")
    else:
        # If dst exists, move files individually
        for f in os.listdir(comm_src):
            shutil.move(os.path.join(comm_src, f), os.path.join(comm_dst, f))
        os.rmdir(comm_src)

# 3. Handle Hero Images (from portfolio)
port_dir = os.path.join(BASE_DIR, "portfolio")
hero_map = {} # old -> new name

if os.path.exists(port_dir):
    for idx, fname in enumerate(HERO_FILES):
        src = os.path.join(port_dir, fname)
        if os.path.exists(src):
            new_name = f"hero_slide_{idx+1}.webp"
            dst = os.path.join(BASE_DIR, "hero", new_name)
            shutil.move(src, dst)
            hero_map[fname] = new_name
            print(f"Moved {fname} to {dst}")
        else:
            print(f"Hero file {fname} not found in portfolio")

# 4. Handle About (me -> about)
me_dir = os.path.join(BASE_DIR, "me")
if os.path.exists(me_dir):
    for f in os.listdir(me_dir):
        shutil.move(os.path.join(me_dir, f), os.path.join(BASE_DIR, "about", f))
    os.rmdir(me_dir)
    print("Moved 'me' content to 'about'")

# 5. Distribute Remaining Portfolio to Categories
if os.path.exists(port_dir):
    # Get remaining files
    files = [f for f in os.listdir(port_dir) if f.endswith('.webp')]
    files.sort() # Ensure deterministic order
    
    # Calculate distribution
    num_cats = len(CATEGORIES_LIST)
    files_per_cat = math.ceil(len(files) / num_cats) if num_cats > 0 else 0
    
    print(f"Distributing {len(files)} files among {num_cats} categories (~{files_per_cat} each)")
    
    for i, cat in enumerate(CATEGORIES_LIST):
        cat_dir = os.path.join(BASE_DIR, "categories", cat)
        os.makedirs(cat_dir, exist_ok=True)
        
        # Take slice
        start = i * files_per_cat
        end = start + files_per_cat
        cat_files = files[start:end]
        
        for ci, fname in enumerate(cat_files):
            src = os.path.join(port_dir, fname)
            new_name = f"{ci+1}.webp"
            dst = os.path.join(cat_dir, new_name)
            shutil.move(src, dst)
            # print(f"Moved {fname} -> {cat}/{new_name}")

    # Remove portfolio dir if empty
    if not os.listdir(port_dir):
        os.rmdir(port_dir)
        print("Removed empty portfolio directory")
    else:
        print("Portfolio directory not empty, keeping.")

print("Reorganization complete.")
