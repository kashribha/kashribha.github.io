import os
import glob

# --- 1. CSS Update ---
css_path = '/home/kashribha/Documents/job_apply/kashribha.github.io/assets/css/style.css'
with open(css_path, 'r') as f:
    css = f.read()

face_css = """
/* Interactive Face */
.interactive-face {
    width: 160px; height: 160px;
    background: var(--yellow);
    border-radius: 50%;
    position: relative;
    margin: 0 auto 2rem;
    box-shadow: inset -10px -10px 20px rgba(0,0,0,0.1), 0 10px 25px rgba(181, 137, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s;
}
.interactive-face:hover {
    transform: scale(1.05);
}
.eye {
    width: 35px; height: 45px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 35px;
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.2);
}
.left-eye { left: 35px; }
.right-eye { right: 35px; }
.pupil {
    width: 18px; height: 18px;
    background: var(--base03);
    border-radius: 50%;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.05s linear;
}
.mouth {
    width: 50px; height: 20px;
    border-bottom: 6px solid var(--base03);
    border-radius: 0 0 50% 50%;
    position: absolute;
    bottom: 35px;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-sizing: border-box;
}
.mouth.smile {
    height: 35px; width: 60px;
    background: var(--red);
    border-bottom: 6px solid var(--base03);
    border-left: 2px solid var(--base03);
    border-right: 2px solid var(--base03);
}
.mouth.surprised {
    width: 25px; height: 25px;
    border: 6px solid var(--base03);
    border-radius: 50%;
    background: var(--base02);
    bottom: 30px;
}
"""
if '.interactive-face' not in css:
    with open(css_path, 'a') as f:
        f.write(face_css)

# --- 2. JS Update ---
js_path = '/home/kashribha/Documents/job_apply/kashribha.github.io/assets/js/main.js'
with open(js_path, 'r') as f:
    lines = f.readlines()

face_js = """
  // Interactive Face Logic
  const face = document.getElementById('interactive-face');
  const pupils = document.querySelectorAll('.pupil');
  const mouth = document.getElementById('face-mouth');

  if (face && pupils.length > 0 && mouth) {
      document.addEventListener('mousemove', (e) => {
          const rect = face.getBoundingClientRect();
          const faceCenterX = rect.left + rect.width / 2;
          const faceCenterY = rect.top + rect.height / 2;

          const deltaX = e.clientX - faceCenterX;
          const deltaY = e.clientY - faceCenterY;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

          // Move pupils
          const angle = Math.atan2(deltaY, deltaX);
          const maxMove = 10;
          const moveX = Math.cos(angle) * Math.min(distance / 12, maxMove);
          const moveY = Math.sin(angle) * Math.min(distance / 12, maxMove);

          pupils.forEach(pupil => {
              pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
          });

          // Emote based on pointer
          if (distance < 70) {
              mouth.className = 'mouth surprised';
          } else if (deltaY < -150) {
              mouth.className = 'mouth';
              mouth.style.height = '10px';
          } else if (deltaX > 250 || deltaX < -250) {
              mouth.className = 'mouth';
              mouth.style.height = '15px';
              mouth.style.width = '40px';
          } else {
              mouth.className = 'mouth';
              mouth.style.height = '20px';
              mouth.style.width = '50px';
          }
      });
      
      face.addEventListener('click', () => {
          mouth.className = 'mouth smile';
          setTimeout(() => { mouth.className = 'mouth'; }, 1500);
      });
  }
"""

if 'Interactive Face Logic' not in "".join(lines):
    # Remove the last line `});` safely and append the new logic
    while lines and lines[-1].strip() == '':
        lines.pop()
    if lines[-1].strip() == '});':
        lines.pop()
    
    lines.append(face_js)
    lines.append("\n});\n")
    
    with open(js_path, 'w') as f:
        f.writelines(lines)

# --- 3. HTML Update (Nav across all files) ---
html_files = glob.glob('/home/kashribha/Documents/job_apply/kashribha.github.io/*.html')

old_nav = '''    <nav>
        <a href="index.html">Intro</a>
        <a href="experience.html">Experience</a>
        <a href="projects.html">Projects</a>
        <a href="contact.html">Contact</a>
    </nav>'''

new_nav = '''    <nav>
        <a href="index.html">Intro</a>
        <a href="experience.html">Experience</a>
        <a href="projects.html">Projects</a>
        <a href="git_projects.html">Git Projects</a>
        <a href="contact.html">Contact</a>
    </nav>'''

for hf in html_files:
    with open(hf, 'r') as f:
        content = f.read()
    if 'git_projects.html' not in content:
        # Some might have "class=active" on one of them, so we'll just replace the inner part
        # Better robust approach: replace line by line or inject before Contact
        pass

# Robust Nav Injection
for hf in html_files:
    with open(hf, 'r') as f:
        content = f.read()
    
    if '<a href="git_projects.html"' not in content:
        content = content.replace('<a href="contact.html">Contact</a>', '<a href="git_projects.html">Git Projects</a>\n        <a href="contact.html">Contact</a>')
        with open(hf, 'w') as f:
            f.write(content)

# --- 4. Update index.html specifically ---
idx_path = '/home/kashribha/Documents/job_apply/kashribha.github.io/index.html'
with open(idx_path, 'r') as f:
    idx_content = f.read()

# Replace profile img
img_block = '''<div class="profile-img-container">
                    <img src="images/usr.png" alt="K Shrinidhi Bhagavath">
                </div>'''
face_block = '''<div class="interactive-face" id="interactive-face">
                    <div class="eye left-eye"><div class="pupil"></div></div>
                    <div class="eye right-eye"><div class="pupil"></div></div>
                    <div class="mouth" id="face-mouth"></div>
                </div>'''
idx_content = idx_content.replace(img_block, face_block)

# Remove hobbies section (button style badges)
import re
idx_content = re.sub(r'<div class="hobbies-section">.*?</div>', '', idx_content, flags=re.DOTALL)

with open(idx_path, 'w') as f:
    f.write(idx_content)

# --- 5. Create git_projects.html ---
git_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>K Shrinidhi Bhagavath | Git Projects</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="assets/js/main.js" defer></script>
</head>
<body>
    <div class="bg-animation"></div>
    <nav>
        <a href="index.html">Intro</a>
        <a href="experience.html">Experience</a>
        <a href="projects.html">Projects</a>
        <a href="git_projects.html" class="active">Git Projects</a>
        <a href="contact.html">Contact</a>
    </nav>
    <div class="container">
        <section id="git-projects" class="page-section fade-up" style="text-align: center; margin-top: 10vh;">
            <h2 class="section-title">GitHub Projects</h2>
            
            <div style="padding: 4rem; background: var(--bg-alt); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); max-width: 600px; margin: 0 auto;">
                <h3 style="color: var(--text-bold); font-size: 2rem; margin-bottom: 1rem;">🚧 Work In Progress 🚧</h3>
                <p style="font-size: 1.2rem; color: var(--text-main);">I am currently curating and documenting my open-source repositories and hobby projects. Check back soon for updates!</p>
                
                <a href="https://github.com/kaybee1928" target="_blank" class="btn" style="margin-top: 2rem;">Visit My GitHub Profile</a>
            </div>
        </section>
    </div>
    <footer>
        <div class="social-links">
            <a href="https://www.linkedin.com/in/kashribha/" target="_blank">LinkedIn</a>
            <a href="https://github.com/kaybee1928" target="_blank">GitHub</a>
            <a href="mailto:shrinidhibhagavath11@gmail.com">Email</a>
        </div>
        <p>Built by K Shrinidhi Bhagavath | Solarized Light Theme</p>
    </footer>
</body>
</html>"""
with open('/home/kashribha/Documents/job_apply/kashribha.github.io/git_projects.html', 'w') as f:
    f.write(git_html)

print("Done updating files.")
