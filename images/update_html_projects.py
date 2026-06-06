with open('/home/kashribha/Documents/job_apply/kashribha.github.io/projects.html', 'r') as f:
    html_content = f.read()

new_cards = """
                <div class="project-card" data-project="sort">
                    <div class="project-img"><img src="images/sort.png" alt="Merge Sort"></div>
                    <div class="project-content">
                        <span class="year">2020</span>
                        <h3>Fast Merge Sort (ARootSort)</h3>
                        <p class="short-desc">Highly optimized adaptive merge sort based on array sortedness and subarray reversing.</p>
                    </div>
                </div>

                <div class="project-card" data-project="depth">
                    <div class="project-img"><img src="images/depth.png" alt="3D Depth"></div>
                    <div class="project-content">
                        <span class="year">2019-2020</span>
                        <h3>3D Structure from 2D Images</h3>
                        <p class="short-desc">Constructing 3D structures from multiple 2D images using deep learning and image processing.</p>
                    </div>
                </div>

                <div class="project-card" data-project="compiler">
                    <div class="project-img"><img src="images/comp.jpeg" alt="Compiler"></div>
                    <div class="project-content">
                        <span class="year">2019</span>
                        <h3>Compiler Design</h3>
                        <p class="short-desc">Custom compiler for a C-type language featuring control structures and automatic code optimization.</p>
                    </div>
                </div>

                <div class="project-card" data-project="mscloud">
                    <div class="project-img"><img src="images/mscloud.jpg" alt="Master Slave DB"></div>
                    <div class="project-content">
                        <span class="year">2020</span>
                        <h3>Master-Slave DB Orchestrator</h3>
                        <p class="short-desc">Highly available and fault-tolerant Database as a Service using master-slave replication architecture.</p>
                    </div>
                </div>

                <div class="project-card" data-project="peuler">
                    <div class="project-img"><img src="images/peuler.webp" alt="Project Euler"></div>
                    <div class="project-content">
                        <span class="year">Ongoing</span>
                        <h3>Project Euler</h3>
                        <p class="short-desc">Solving complex mathematical problems with code using advanced algorithms and optimization techniques.</p>
                    </div>
                </div>
                
            </div>
        </section>
"""

html_content = html_content.replace('            </div>\n        </section>', new_cards)

with open('/home/kashribha/Documents/job_apply/kashribha.github.io/projects.html', 'w') as f:
    f.write(html_content)
