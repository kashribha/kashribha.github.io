with open('/home/kashribha/Documents/job_apply/kashribha.github.io/projects.html', 'w') as f:
    f.write('''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>K Shrinidhi Bhagavath | Software Engineer</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="assets/js/main.js" defer></script>
</head>
<body>
    <div class="bg-animation"></div>
    <nav>
        <a href="index.html">Intro</a>
        <a href="experience.html">Experience</a>
        <a href="projects.html">Projects</a>
        <a href="contact.html">Contact</a>
    </nav>
    <div class="container">

        <section id="projects" class="page-section fade-up">
            <h2 class="section-title">Portfolio Projects</h2>
            <p style="margin-bottom: 2rem; font-size: 1.1rem;">Click on any project card to view more detailed information.</p>
            
            <div class="projects-grid">
                
                <div class="project-card featured" data-project="cert-rotation">
                    <div class="project-img"><img src="images/server.jpg" alt="CPS"></div>
                    <div class="project-content">
                        <span class="year">Dec 2024 - Present</span>
                        <h3>Emergency Certificate Rotation (CPS)</h3>
                        <p class="short-desc">Automated certificate rotation pipeline for Akamai Certificate Provisioning System to handle CA vulnerability markups globally.</p>
                    </div>
                </div>
                
                <div class="project-card featured" data-project="delivery-automation">
                    <div class="project-img"><img src="images/code1.jpg" alt="Automation"></div>
                    <div class="project-content">
                        <span class="year">Dec 2024 - Present</span>
                        <h3>Software Delivery Automation</h3>
                        <p class="short-desc">Full-stack application for end-to-end deployment, testing, and monitoring, reducing weekly manual toil by 95%.</p>
                    </div>
                </div>
                
                <div class="project-card" data-project="log-analysis">
                    <div class="project-img"><img src="images/data.jpg" alt="Log Analysis"></div>
                    <div class="project-content">
                        <span class="year">2023-2024</span>
                        <h3>Low Latency Log Analysis & Kubernetes</h3>
                        <p class="short-desc">High-throughput data pipeline migrated to a self-managed Kubernetes Spark Cluster on Linode to analyze millions of rows.</p>
                    </div>
                </div>

                <div class="project-card" data-project="automation-library">
                    <div class="project-img"><img src="images/circuit.jpg" alt="Library"></div>
                    <div class="project-content">
                        <span class="year">2021-2023</span>
                        <h3>Python Automation Library</h3>
                        <p class="short-desc">Concurrent Python automation library with abstract statistical models, reducing manual monitoring effort by 75%.</p>
                    </div>
                </div>

                <div class="project-card" data-project="trie-index">
                    <div class="project-img"><img src="images/peuler.jpeg" alt="Trie Engine"></div>
                    <div class="project-content">
                        <span class="year">Nov 2020</span>
                        <h3>Trie-Based Inverted Index Engine</h3>
                        <p class="short-desc">Custom C++ search engine using Trie data structures optimizing for memory locality and fast wildcard queries.</p>
                    </div>
                </div>

                <div class="project-card" data-project="ltree">
                    <div class="project-img"><img src="images/ltree.png" alt="LTree"></div>
                    <div class="project-content">
                        <span class="year">Mar 2020</span>
                        <h3>LTree: Hybrid Fast Data Structure</h3>
                        <p class="short-desc">Novel C++ hybrid data structure bridging Arrays and Linked Lists with O(log n) access time.</p>
                    </div>
                </div>

                <div class="project-card" data-project="rnn-captioning">
                    <div class="project-img"><img src="images/edu.jpg" alt="RNN"></div>
                    <div class="project-content">
                        <span class="year">2018</span>
                        <h3>Hierarchical RNN Image Captioning</h3>
                        <p class="short-desc">CDSAML Internship project using a hierarchical recurrent neural network to generate descriptive paragraphs for images.</p>
                    </div>
                </div>
                
            </div>
        </section>

        <!-- PROJECT MODAL -->
        <div class="modal-overlay" id="project-modal">
            <div class="modal-content">
                <button class="modal-close">X</button>
                <div class="modal-body">
                    <!-- Content injected via JS -->
                </div>
            </div>
        </div>

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
</html>''')
