with open('/home/kashribha/Documents/job_apply/kashribha.github.io/assets/css/style.css', 'r') as f:
    css_content = f.read()

import re

# Remove old Interactive Face css block
css_content = re.sub(r'/\* Interactive Face \*/.*?\.mouth\.surprised \{.*?\}', '', css_content, flags=re.DOTALL)

new_face_css = """
/* Interactive Face */
.interactive-face {
    width: 140px; height: 140px;
    background: #ffcc00; /* Cute emoji yellow */
    border-radius: 50%;
    position: relative;
    margin: 0 auto 2rem;
    box-shadow: inset -10px -10px 20px rgba(200, 150, 0, 0.4), 0 10px 25px rgba(255, 204, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.interactive-face:hover {
    transform: scale(1.1);
}
.eye {
    width: 30px; height: 40px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 30px;
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.2);
    transition: all 0.1s;
}
.eye.blink {
    height: 4px;
    top: 48px;
    background: var(--base03);
    box-shadow: none;
}
.eye.blink .pupil { display: none; }
.left-eye { left: 30px; }
.right-eye { right: 30px; }
.pupil {
    width: 16px; height: 16px;
    background: var(--base03);
    border-radius: 50%;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.05s linear;
}

/* Base Mouth (Cute Smile) */
.mouth {
    width: 40px; height: 15px;
    border-bottom: 6px solid var(--base03);
    border-radius: 0 0 50% 50%;
    position: absolute;
    bottom: 35px;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-sizing: border-box;
}

/* Emotions based on hovering links and mouse pos */
.mouth.surprised {
    width: 25px; height: 25px;
    border: 6px solid var(--base03);
    border-radius: 50%;
    background: #586e75;
    bottom: 30px;
}
.mouth.smile {
    width: 50px; height: 25px;
    background: #ff6b6b;
    border-bottom: 6px solid var(--base03);
    border-left: 3px solid var(--base03);
    border-right: 3px solid var(--base03);
    border-radius: 0 0 50px 50px;
    bottom: 30px;
}
.mouth.big-smile {
    width: 60px; height: 35px;
    background: #ff6b6b;
    border: 6px solid var(--base03);
    border-radius: 0 0 50px 50px;
    bottom: 25px;
}
.mouth.kissing {
    width: 20px; height: 20px;
    border: 6px solid var(--base03);
    border-radius: 50%;
    background: transparent;
    bottom: 30px;
}
.mouth.proud {
    width: 35px; height: 10px;
    border-bottom: none;
    border-top: 6px solid var(--base03);
    border-radius: 50% 50% 0 0;
    bottom: 40px;
    transform: rotate(15deg);
}
.mouth.excited {
    width: 50px; height: 40px;
    background: #ff6b6b;
    border: 6px solid var(--base03);
    border-radius: 0 0 50px 50px;
    bottom: 25px;
}
/* For excited, we also add tongue */
.mouth.excited::after {
    content: '';
    position: absolute;
    bottom: 0; left: 50%;
    transform: translateX(-50%);
    width: 25px; height: 15px;
    background: #ff9999;
    border-radius: 50% 50% 0 0;
}
"""

with open('/home/kashribha/Documents/job_apply/kashribha.github.io/assets/css/style.css', 'w') as f:
    f.write(css_content + "\n" + new_face_css)
