with open('/home/kashribha/Documents/job_apply/kashribha.github.io/projects.html', 'r') as f:
    content = f.read()

content = content.replace('images/bg1.jpg', 'images/server.jpg')
content = content.replace('images/bg2.jpg', 'images/code1.jpg')
content = content.replace('images/comp.jpg', 'images/data.jpg')
content = content.replace('images/akam.jpg', 'images/circuit.jpg')

with open('/home/kashribha/Documents/job_apply/kashribha.github.io/projects.html', 'w') as f:
    f.write(content)
