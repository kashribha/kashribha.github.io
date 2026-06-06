with open('/home/kashribha/Documents/job_apply/kashribha.github.io/assets/js/main.js', 'r') as f:
    lines = f.readlines()

# Find where the old Interactive Face Logic starts
start_idx = -1
for i, line in enumerate(lines):
    if '// Interactive Face Logic' in line:
        start_idx = i
        break

if start_idx != -1:
    lines = lines[:start_idx]

new_face_logic = """
  // Interactive Cute Emoji Face Logic
  const face = document.getElementById('interactive-face');
  const pupils = document.querySelectorAll('.pupil');
  const mouth = document.getElementById('face-mouth');
  const navLinksList = document.querySelectorAll('nav a');

  if (face && pupils.length > 0 && mouth) {
      // Mouse tracking for eyes
      document.addEventListener('mousemove', (e) => {
          // If we are currently hovering over a nav link, skip mouse tracking for the mouth
          const isHoveringNav = Array.from(navLinksList).some(link => link.matches(':hover'));
          
          const rect = face.getBoundingClientRect();
          const faceCenterX = rect.left + rect.width / 2;
          const faceCenterY = rect.top + rect.height / 2;

          const deltaX = e.clientX - faceCenterX;
          const deltaY = e.clientY - faceCenterY;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

          // Move pupils smoothly
          const angle = Math.atan2(deltaY, deltaX);
          const maxMove = 8;
          const moveX = Math.cos(angle) * Math.min(distance / 15, maxMove);
          const moveY = Math.sin(angle) * Math.min(distance / 15, maxMove);

          pupils.forEach(pupil => {
              pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
          });

          // Emote based on pointer distance/position ONLY if not hovering nav
          if (!isHoveringNav) {
              if (distance < 60) {
                  // Surprised (mouse very close)
                  mouth.className = 'mouth surprised';
                  mouth.style.cssText = '';
              } else if (deltaY < -150) {
                  // Looking way up (neutral/thoughtful line)
                  mouth.className = 'mouth neutral';
                  mouth.style.cssText = 'height: 8px; width: 25px; border-bottom: 6px solid var(--base03); border-radius: 10px; background: transparent;';
              } else {
                  // Default cute smile
                  mouth.className = 'mouth';
                  mouth.style.cssText = '';
              }
          }
      });
      
      // Nav Hover Emotions
      navLinksList.forEach(link => {
          link.addEventListener('mouseenter', (e) => {
              const text = e.target.textContent.toLowerCase();
              mouth.style.cssText = ''; 
              if (text.includes('experience')) {
                  // Proud / Confident face
                  mouth.className = 'mouth proud';
              } else if (text.includes('project')) {
                  // Excited / Star-eyed logic
                  mouth.className = 'mouth excited';
              } else if (text.includes('contact')) {
                  // Cute kissing / whistling face
                  mouth.className = 'mouth kissing';
              } else if (text.includes('intro')) {
                  // Big welcoming smile
                  mouth.className = 'mouth smile';
              }
          });
          
          link.addEventListener('mouseleave', () => {
              // Revert to normal
              mouth.className = 'mouth';
              mouth.style.cssText = '';
          });
      });

      // Click emotion (blink and big smile)
      face.addEventListener('click', () => {
          mouth.className = 'mouth big-smile';
          mouth.style.cssText = '';
          
          // Blink eyes
          const eyes = document.querySelectorAll('.eye');
          eyes.forEach(eye => eye.classList.add('blink'));
          setTimeout(() => { 
              mouth.className = 'mouth'; 
              eyes.forEach(eye => eye.classList.remove('blink'));
          }, 800);
      });
  }
});
"""

lines.append(new_face_logic)

with open('/home/kashribha/Documents/job_apply/kashribha.github.io/assets/js/main.js', 'w') as f:
    f.writelines(lines)
