import re

css_path = '/home/kashribha/Documents/job_apply/kashribha.github.io/assets/css/style.css'

with open(css_path, 'r') as f:
    css = f.read()

# Update the gap in #portfolio-grid
css = re.sub(r'#portfolio-grid\s*\{[^}]*gap:\s*4rem;[^}]*\}', r'#portfolio-grid {\n    perspective: 1500px;\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: 2rem;\n}', css)

with open(css_path, 'w') as f:
    f.write(css)

html_path = '/home/kashribha/Documents/job_apply/kashribha.github.io/projects.html'

with open(html_path, 'r') as f:
    html = f.read()

# Update the margin-top in pagination-controls
html = re.sub(r'margin-top:\s*3rem;', 'margin-top: 1rem;', html)

with open(html_path, 'w') as f:
    f.write(html)

print("Gap between cards reduced to 2rem and pagination top margin reduced to 1rem.")
