with open('/home/kashribha/Documents/job_apply/kashribha.github.io/assets/js/main.js', 'r') as f:
    js_content = f.read()

new_projects = """
        'sort': {
          title: 'Fast Merge Sort (ARootSort)',
          year: '2020',
          role: 'Personal Project',
          desc: `<p>ARoot Sort is a highly optimized merge sort which performs two different kinds of merge sort based on the degree of sortedness of input after subarray reversing.</p>
                 <ul>
                   <li>Implemented custom adaptive algorithms to drastically reduce sorting overhead on partially sorted arrays.</li>
                   <li>Optimized space and time complexity for competitive programming use cases.</li>
                 </ul>`
        },
        'depth': {
          title: '3D Structure and Orientation from 2D Images',
          year: '2019-2020',
          role: 'Undergraduate Project',
          desc: `<p>Constructing 3D structures from multiple 2D images using deep learning and image processing.</p>
                 <ul>
                   <li>Implemented feature extraction techniques using Convolutional Neural Networks.</li>
                   <li>Built algorithms to calculate depth mapping and render objects in a 3D coordinate space.</li>
                 </ul>`
        },
        'compiler': {
          title: 'Compiler Design',
          year: '2019',
          role: 'Undergraduate Project',
          desc: `<p>Built a simple working compiler for a C-type language.</p>
                 <ul>
                   <li>Supports use of while loops and conditional statements.</li>
                   <li>Optimizes the intermediate code by removing unwanted lines and unused variables automatically.</li>
                 </ul>`
        },
        'mscloud': {
          title: 'Database Orchestrator with Master-Slave Architecture',
          year: '2020',
          role: 'Undergraduate Project',
          desc: `<p>Implemented a highly available and fault-tolerant Database as a Service platform.</p>
                 <ul>
                   <li>Designed using a Master-Slave architecture for read/write scaling.</li>
                   <li>Automated failover protocols to prevent data loss during node failures.</li>
                 </ul>`
        },
        'peuler': {
          title: 'Project Euler',
          year: 'Ongoing',
          role: 'Hobby',
          desc: `<p>Solving complex mathematical problems with code to overcome high computational complexities.</p>
                 <ul>
                   <li>Utilized advanced data structures and dynamic programming.</li>
                   <li>Improved complexity analysis skills through iterative algorithm optimization.</li>
                 </ul>`
        }
"""

# Insert right before the closing brace of projectData
js_content = js_content.replace('      };\n\n      document.querySelectorAll(\'.project-card\')', new_projects + '      };\n\n      document.querySelectorAll(\'.project-card\')')

with open('/home/kashribha/Documents/job_apply/kashribha.github.io/assets/js/main.js', 'w') as f:
    f.write(js_content)
