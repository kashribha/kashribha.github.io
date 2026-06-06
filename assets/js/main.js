
document.addEventListener('DOMContentLoaded', function() {
    // 1. Intersection Observer for scroll animations
    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(function(element) {
        observer.observe(element);
    });

    // 2. Highlight active nav
    var path = window.location.pathname;
    var page = path.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(function(link) {
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. Grid Trail Logic
    var gridContainer = document.getElementById('grid-trail');
    var cols = 0, rows = 0;
    
    if (gridContainer) {
        var createGrid = function() {
            gridContainer.innerHTML = '';
            var size = 50; 
            cols = Math.ceil(window.innerWidth / size);
            rows = Math.ceil(window.innerHeight / size);
            gridContainer.style.setProperty('--columns', cols);
            gridContainer.style.setProperty('--rows', rows);
            
            var fragment = document.createDocumentFragment();
            for(var i=0; i<cols*rows; i++) {
                var cell = document.createElement('div');
                cell.className = 'grid-cell';
                fragment.appendChild(cell);
            }
            gridContainer.appendChild(fragment);
        };
        
        createGrid();
        window.addEventListener('resize', createGrid);
        
        document.addEventListener('mousemove', function(e) {
            if (!gridContainer) return;
            var size = 50;
            var col = Math.floor(e.clientX / size);
            var row = Math.floor(e.clientY / size);
            var index = row * cols + col;
            
            var cells = gridContainer.children;
            if (cells[index]) {
                var cell = cells[index];
                cell.classList.add('active');
                setTimeout(function() {
                    cell.classList.remove('active');
                }, 800); 
            }
        });
    }

    // 4. Floating Parallax
    var shapes = document.querySelectorAll('.floating-shape');
    if (shapes.length > 0) {
        document.addEventListener('mousemove', function(e) {
            var x = (e.clientX / window.innerWidth - 0.5) * 40;
            var y = (e.clientY / window.innerHeight - 0.5) * 40;
            shapes.forEach(function(shape, index) {
                var speed = (index + 1) * 0.8;
                shape.style.transform = "translate(" + (x * speed) + "px, " + (y * speed) + "px) rotate(" + (x*1.5) + "deg)";
            });
        });
    }

    // 5. INDESTRUCTIBLE MODALS
    var modalOverlay = document.getElementById('project-modal');
    if (modalOverlay) {
        var modalClose = modalOverlay.querySelector('.modal-close');
        var modalBody = modalOverlay.querySelector('.modal-body');
        
        var projectData = {
            "cert-rotation": {
                title: "Emergency Certificate Rotation (CPS)",
                year: "Dec 2024 - Present",
                role: "Senior Software Engineer",
                desc: "<p>Leading the development of a critical extension to the Certificate Provisioning System (CPS) to handle emergency rotations for vulnerable CA keys (DigiCert/LE).</p><p>This system ensures global security compliance by securely automating the global rotation process when a Certificate Authority marks a specific batch of certificates as vulnerable.</p><ul><li>Fully automated workflow triggered by CA vulnerability markups.</li><li>Zero manual intervention required during critical security events.</li><li>Deployed across Akamai global distributed edge network.</li></ul>"
            },
            "delivery-automation": {
                title: "Software Delivery Automation",
                year: "Dec 2024 - Present",
                role: "Senior Software Engineer",
                desc: "<p>Architected a full-stack application for end-to-end deployment, testing, and monitoring across multiple internal Akamai services.</p><p>This automation significantly streamlines the delivery pipeline by removing manual bottlenecks and unifying disparate workflows.</p><ul><li>Reduced weekly manual toil by <strong>95%</strong> (from 3 hours to 9 minutes).</li><li>Unified deployment workflows across multiple internal services.</li><li>Built robust end-to-end testing and monitoring hooks.</li></ul>"
            },
            "mcp-oauth": {
                title: "MCP with OAuth2 and Monitoring",
                year: "2026 - Present",
                role: "Senior Software Engineer",
                desc: "<p>Built Model Context Protocol (MCP) servers with robust OAuth2 authentication and user-level monitoring for internal applications.</p><p>Currently utilized by 5 other engineering teams within Akamai to safely integrate LLM agents with internal corporate data and Edgegrid APIs.</p><ul><li>Architected secure OAuth2 token exchange flows for MCP proxy clients.</li><li>Implemented granular user-level request monitoring and rate limiting.</li><li>Developed specialized MCP integrations for Edgegrid-enabled Akamai products.</li></ul>"
            },
            "log-analysis": {
                title: "Low Latency Log Analysis",
                year: "2023-2024",
                role: "Software Engineer II",
                desc: "<p>Engineered a high-throughput data pipeline to analyze millions of rows of low latency logs from the Akamai network and dynamically update top 5% CP Codes for all services.</p><p>Successfully migrated legacy data pipelines from DataBricks to a self-managed <strong>Kubernetes Spark Cluster on Linode</strong>, optimizing cost and control.</p><ul><li>Implemented automated analysis to detect service anomalies and report probable causes.</li><li>Reduced team toil by automating repetitive manual infrastructure tasks.</li><li>Significantly reduced incident resolution time.</li></ul>"
            },
            "automation-library": {
                title: "Python Automation Library",
                year: "2021-2023",
                role: "Software Engineer",
                desc: "<p>Developed a concurrent Python automation library featuring abstract statistical and ML models to detect and manage baselines.</p><ul><li>Adoption of this library reduced manual monitoring effort by <strong>75%</strong>.</li><li>Built visualization interfaces for Grafana and databases (Clickhouse, Modified Cassandra).</li><li>Implemented asynchronous data gathering tools to optimize performance for external low-latency applications.</li></ul>"
            },
            "trie-index": {
                title: "Trie-Based Inverted Index Engine",
                year: "Nov 2020",
                role: "Personal Project",
                desc: "<p>Custom C++ search engine using Trie data structures optimizing for memory locality and fast wildcard queries.</p>"
            },
            "ltree": {
                title: "LTree: Hybrid Fast Data Structure",
                year: "Mar 2020",
                role: "Personal Project",
                desc: "<p>Novel C++ hybrid data structure bridging Arrays and Linked Lists with O(log n) access time.</p>"
            },
            "rnn-captioning": {
                title: "Hierarchical RNN Image Captioning",
                year: "2018",
                role: "Research Intern (CDSAML)",
                desc: "<p>Implemented a model with a hierarchical recurrent neural network to generate descriptive paragraphs for images.</p><p>The model features a sentence RNN that receives image features to decide sentence count and produces topic vectors. These are used by a word RNN to generate the actual sentences.</p><ul><li>Achieved a 13.6 METEOR score.</li><li>Achieved a BLEU-1 score of 34.4%.</li><li>Conducted at the Center for Data Sciences and Applied Machine Learning (PESU).</li></ul>"
            },
            "sort": {
                title: "Fast Merge Sort (ARootSort)",
                year: "2020",
                role: "Personal Project",
                desc: "<p>ARoot Sort is a highly optimized merge sort which performs two different kinds of merge sort based on the degree of sortedness of input after subarray reversing.</p><ul><li>Implemented custom adaptive algorithms to drastically reduce sorting overhead on partially sorted arrays.</li><li>Optimized space and time complexity for competitive programming use cases.</li></ul>"
            },
            "depth": {
                title: "3D Structure and Orientation from 2D Images",
                year: "2019-2020",
                role: "Undergraduate Project",
                desc: "<p>Constructing 3D structures from multiple 2D images using deep learning and image processing.</p><ul><li>Implemented feature extraction techniques using Convolutional Neural Networks.</li><li>Built algorithms to calculate depth mapping and render objects in a 3D coordinate space.</li></ul>"
            },
            "compiler": {
                title: "Compiler Design",
                year: "2019",
                role: "Undergraduate Project",
                desc: "<p>Built a simple working compiler for a C-type language.</p><ul><li>Supports use of while loops and conditional statements.</li><li>Optimizes the intermediate code by removing unwanted lines and unused variables automatically.</li></ul>"
            },
            "mscloud": {
                title: "Database Orchestrator with Master-Slave Architecture",
                year: "2020",
                role: "Undergraduate Project",
                desc: "<p>Implemented a highly available and fault-tolerant Database as a Service platform.</p><ul><li>Designed using a Master-Slave architecture for read/write scaling.</li><li>Automated failover protocols to prevent data loss during node failures.</li></ul>"
            },
            "peuler": {
                title: "Project Euler",
                year: "Ongoing",
                role: "Hobby",
                desc: "<p>Solving complex mathematical problems with code to overcome high computational complexities.</p><ul><li>Utilized advanced data structures and dynamic programming.</li><li>Improved complexity analysis skills through iterative algorithm optimization.</li></ul>"
            }
        };

        document.querySelectorAll('.project-card').forEach(function(card) {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                var id = this.getAttribute('data-project');
                var d = projectData[id];
                
                if (d) {
                    var html = "<h2 style='color: var(--primary-color); margin-bottom: 0.5rem; font-size: 1.8rem;'>" + d.title + "</h2>";
                    html += "<div style='margin-bottom: 1.5rem; font-weight: bold; color: var(--text-muted); font-size: 1.1rem;'>";
                    html += "<span style='margin-right: 15px;'>Date: " + d.year + "</span>";
                    html += "<span>Role: " + d.role + "</span>";
                    html += "</div>";
                    html += "<div style='line-height: 1.8; color: var(--text-main); font-size: 1.1rem;'>" + d.desc + "</div>";
                    
                    modalBody.innerHTML = html;
                    modalOverlay.style.setProperty('display', 'flex', 'important');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        var closeM = function() {
            modalOverlay.style.setProperty('display', 'none', 'important');
            document.body.style.overflow = '';
        };

        if (modalClose) {
            modalClose.addEventListener('click', closeM);
        }
        
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) closeM();
        });
    }
});
