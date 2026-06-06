with open('/home/kashribha/Documents/job_apply/kashribha.github.io/index.html', 'w') as f:
    f.write('''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>K Shrinidhi Bhagavath | Senior Software Engineer</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="assets/js/main.js" defer></script>
</head>
<body>
    <div class="bg-animation"></div>
    
    <nav>
        <a href="#intro" class="active">Intro</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
    </nav>

    <div class="container">
        
        <!-- INTRO PAGE -->
        <section id="intro" class="page-section active fade-up">
            <header class="hero">
                <div class="profile-img-container">
                    <img src="images/usr.png" alt="K Shrinidhi Bhagavath">
                </div>
                <h1>Hi, I am <span>K Shrinidhi Bhagavath</span>.</h1>
                <p>I am a Senior Software Engineer specializing in low-level systems, distributed platforms, and optimization.</p>
                
                <div style="font-size: 1.15rem; max-width: 800px; text-align: left; margin-top: 2rem; color: var(--text-main);">
                    <p style="margin-bottom: 1rem;">Currently, my work at Akamai Technologies focuses heavily on building robust automation pipelines, Model Context Protocol (MCP) integrations, and developer tooling.</p>
                    <p>Outside of architecting systems, my current interests revolve around reading books, occasionally playing PC games, exercising, reading manga, and playing badminton with friends and cousins.</p>
                </div>
                
                <div class="hobbies-section">
                    <span class="hobby-badge">Books & Manga</span>
                    <span class="hobby-badge">Badminton</span>
                    <span class="hobby-badge">PC Gaming</span>
                    <span class="hobby-badge">Exercise</span>
                </div>
            </header>
        </section>

        <!-- EXPERIENCE PAGE -->
        <section id="experience" class="page-section fade-up">
            <h2 class="section-title">Experience & Education</h2>
            <div class="timeline">
                <div class="timeline-item">
                    <span class="timeline-date">July 2021 - Present</span>
                    <div class="timeline-content">
                        <h3>Senior Software Engineer</h3>
                        <h4>Akamai Technologies Ltd.</h4>
                        <p>Specializing in low-level systems, distributed platforms, and optimization.</p>
                        <ul>
                            <li>Developing critical automated workflows and infrastructure tooling.</li>
                            <li>Building complex Model Context Protocol (MCP) integrations for Edgegrid APIs and internal OAuth2 services.</li>
                            <li>Automating global certificate rotation pipelines to reduce toil during critical security vulnerabilities.</li>
                        </ul>
                    </div>
                </div>
                <div class="timeline-item">
                    <span class="timeline-date">Jan 2021 - June 2021, June 2020 - July 2020</span>
                    <div class="timeline-content">
                        <h3>Software Engineering Intern</h3>
                        <h4>Akamai Technologies Ltd.</h4>
                        <ul>
                            <li>Developed asynchronous command-line tools for pre-processing data and reporting performance parameters.</li>
                            <li>Improved automated monitoring frameworks used during important software changes in the network.</li>
                        </ul>
                    </div>
                </div>
                <div class="timeline-item">
                    <span class="timeline-date">July 2017 - May 2021</span>
                    <div class="timeline-content">
                        <h3>B.Tech in Computer Science & Engineering</h3>
                        <h4>PES University, Bangalore</h4>
                        <ul>
                            <li>Specialization in Algorithm and Computing Models.</li>
                            <li>Recipient of the CNR Rao Merit Scholarship (top 20 percent in CS dept).</li>
                            <li>GPA: 8.94/10</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- PROJECTS PAGE -->
        <section id="projects" class="page-section fade-up">
            <h2 class="section-title">Portfolio Projects</h2>
            <p style="margin-bottom: 2rem; font-size: 1.1rem;">Click on any project card to view more detailed information.</p>
            
            <div class="projects-grid">
                <!-- 2026 Projects (Important) -->
                <div class="project-card featured" data-project="cert-rotation">
                    <div class="project-img"><img src="images/bg1.jpg" alt="CPS"></div>
                    <div class="project-content">
                        <span class="year">2026</span>
                        <h3>Emergency Certificate Rotation (CPS)</h3>
                        <p class="short-desc">Automated certificate rotation pipeline for Akamai Certificate Provisioning System to handle CA vulnerability markups without manual toil.</p>
                    </div>
                </div>
                
                <div class="project-card featured" data-project="mcp-oauth">
                    <div class="project-img"><img src="images/bg2.jpg" alt="OAuth MCP"></div>
                    <div class="project-content">
                        <span class="year">2026</span>
                        <h3>Internal OAuth2 MCP Server</h3>
                        <p class="short-desc">Secure Model Context Protocol integration with full OAuth2 handling and user-level telemetry for Akamai internal microservices.</p>
                    </div>
                </div>
                
                <div class="project-card featured" data-project="mcp-edgegrid">
                    <div class="project-img"><img src="images/akam.jpg" alt="Edgegrid"></div>
                    <div class="project-content">
                        <span class="year">2026</span>
                        <h3>Edgegrid API MCP</h3>
                        <p class="short-desc">Specialized MCP for Akamai products exposing APIs via Edgegrid, enabling AI agents to securely interact with the platform.</p>
                    </div>
                </div>

                <!-- Older Projects -->
                <div class="project-card" data-project="log-analysis">
                    <div class="project-img"><img src="images/comp.jpg" alt="Log Analysis"></div>
                    <div class="project-content">
                        <span class="year">2021</span>
                        <h3>Low Latency Log Analysis</h3>
                        <p class="short-desc">Python interface for Grafana and Clickhouse to analyze millions of rows and visualize Akamai network anomalies.</p>
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

        <!-- CONTACT PAGE -->
        <section id="contact" class="page-section fade-up">
            <h2 class="section-title" style="text-align: center; display: block;">Get In Touch</h2>
            <p style="text-align: center; margin-bottom: 3rem; font-size: 1.1rem;">Have a question or want to work together? Drop me a message.</p>
            
            <form class="contact-form" action="https://formspree.io/f/mbjbolnz" method="post">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea name="message" id="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn-submit">Send Message</button>
            </form>
        </section>

    </div>

    <!-- PROJECT MODAL -->
    <div class="modal-overlay" id="project-modal">
        <div class="modal-content">
            <button class="modal-close">X</button>
            <div class="modal-body">
                <!-- Content injected via JS -->
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
