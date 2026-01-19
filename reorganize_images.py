
import os
import requests
from PIL import Image
from io import BytesIO

# Ensure directories exist
os.makedirs('public/images/hero', exist_ok=True)
os.makedirs('public/images/home', exist_ok=True)
os.makedirs('public/images/portfolio', exist_ok=True)
os.makedirs('public/images/instagram', exist_ok=True)
os.makedirs('public/images/gallery', exist_ok=True)
os.makedirs('public/images/commercial', exist_ok=True)
os.makedirs('public/images/shop', exist_ok=True)

# Import existing images list from current file (this script is transient)
try:
    from download_images import images as existing_images
except ImportError:
    # If file is not importable, we should look for it. But I know it is.
    print("Could not import download_images.py")
    exit(1)

new_images = []
gallery_counter = 50 # Start higher to avoid overwriting p1-p12 if they are distinct
commercial_counter = 1
shop_counter = 1
insta_counter = 1
portfolio_existing_count = 13 # Assuming p1-p12 exist

for i, img in enumerate(existing_images):
    url = img['url']
    original_path = img['path']
    
    # Simple assortment strategy:
    # 0-39: Gallery/Portfolio (Add to existing portfolio folder but new names)
    # 40-79: Commercial
    # 80-99: Shop
    # 100+: Instagram
    
    if i < 40:
        new_path = f"public/images/portfolio/p{gallery_counter}.webp"
        gallery_counter += 1
    elif i < 80:
        new_path = f"public/images/commercial/comm_{commercial_counter}.webp"
        commercial_counter += 1
    elif i < 100:
        new_path = f"public/images/shop/shop_{shop_counter}.webp"
        shop_counter += 1
    else:
        new_path = f"public/images/instagram/insta_{insta_counter}.webp"
        insta_counter += 1
        
    new_images.append({"url": url, "path": new_path})

# Now rewrite download_images.py with the new images list
# We will use the known structure of the file

script_content = """import os
import requests
from PIL import Image
from io import BytesIO

# Ensure directories exist
os.makedirs('public/images/hero', exist_ok=True)
os.makedirs('public/images/home', exist_ok=True)
os.makedirs('public/images/portfolio', exist_ok=True)
os.makedirs('public/images/instagram', exist_ok=True)
os.makedirs('public/images/gallery', exist_ok=True)
os.makedirs('public/images/commercial', exist_ok=True)
os.makedirs('public/images/shop', exist_ok=True)

images = [
"""

for img in new_images:
    script_content += f'    {{ "url": "{img["url"]}", "path": "{img["path"]}" }},\n'

script_content += """]

def download_and_convert(url, path):
    print(f"Checking {path}...")
    if os.path.exists(path):
        print(f"Skipping {path}, already exists")
        return

    print(f"Downloading {url}...")
    try:
        # Create directory if it doesn't exist (just in case)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        
        r = requests.get(url, timeout=10)
        if r.status_code == 200:
            # Open image from bytes
            img = Image.open(BytesIO(r.content))
            
            # Convert to RGB (in case of RGBA/P etc)
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            # Save as WebP
            img.save(path, 'WEBP', quality=85)
            print(f"Saved {path} as WebP!")
        else:
            print(f"Failed to download {url}: {r.status_code}")
    except Exception as e:
        print(f"Error processing {url}: {e}")

if __name__ == "__main__":
    total = len(images)
    print(f"Found {total} images to process.")
    for i, img in enumerate(images):
        print(f"[{i+1}/{total}] Processing...")
        download_and_convert(img["url"], img["path"])
"""

with open('download_images.py', 'w', encoding='utf-8') as f:
    f.write(script_content)

print("download_images.py has been updated with new assortment paths.")
