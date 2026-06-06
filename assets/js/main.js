
// Safe wrapper
try {
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
  });
  
  // Highlight active nav based on pathname
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
      if (link.getAttribute('href') === page) {
          link.classList.add('active');
      } else {
          link.classList.remove('active');
      }
  });
  
  // Grid Trail Logic
  const gridContainer = document.getElementById('grid-trail');
  if (gridContainer) {
      let cols = 0, rows = 0;
      const createGrid = () => {
          gridContainer.innerHTML = '';
          const size = 50; 
          cols = Math.ceil(window.innerWidth / size);
          rows = Math.ceil(window.innerHeight / size);
          gridContainer.style.setProperty('--columns', cols);
          gridContainer.style.setProperty('--rows', rows);
          
          for(let i=0; i<cols*rows; i++) {
              const cell = document.createElement('div');
              cell.className = 'grid-cell';
              gridContainer.appendChild(cell);
          }
      };
      createGrid();
      window.addEventListener('resize', createGrid);
      
      document.addEventListener('mousemove', (e) => {
          if (!gridContainer) return;
          const size = 50;
          const col = Math.floor(e.clientX / size);
          const row = Math.floor(e.clientY / size);
          const index = row * cols + col;
          
          const cells = gridContainer.children;
          if (cells[index]) {
              const cell = cells[index];
              cell.classList.add('active');
              setTimeout(() => cell.classList.remove('active'), 400); 
          }
      });
  }

  // Floating Pizza-Burger Inspired Parallax
  const shapes = document.querySelectorAll('.floating-shape');
  if (shapes.length > 0) {
      document.addEventListener('mousemove', (e) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 40;
          const y = (e.clientY / window.innerHeight - 0.5) * 40;
          shapes.forEach((shape, index) => {
              const speed = (index + 1) * 0.8;
              shape.style.transform = `translate(${x * speed}px, ${y * speed}px) rotate(${x*1.5}deg)`;
          });
      });
  }
});



// Robust Modal Handler
document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('project-modal');
    if (!modalOverlay) return;
    
    const modalClose = modalOverlay.querySelector('.modal-close');
    const modalBody = modalOverlay.querySelector('.modal-body');
    
    // Explicit project data matching exactly the data-project attributes in projects.html
    const projectData = {
        'cert-rotation': {
            title: 'Emergency Certificate Rotation (CPS)',
            year: 'Dec 2024 - Present',
            role: 'Senior Software Engineer',
            desc: '<p>Automated certificate rotation pipeline for Akamai Certificate Provisioning System to handle CA vulnerability markups globally.</p><ul><li>Fully automated workflow triggered by CA vulnerability markups.</li><li>Zero manual intervention required during critical security events.</li><li>Deployed across Akamai global distributed edge network.</li></ul>'
        },
        'delivery-automation': {
            title: 'Software Delivery Automation',
            year: 'Dec 2024 - Present',
            role: 'Senior Software Engineer',
            desc: '<p>Full-stack application for end-to-end deployment, testing, and monitoring.</p><ul><li>Reduced weekly manual toil by 95% (from 3 hours to 9 minutes).</li><li>Unified deployment workflows across multiple internal services.</li><li>Built robust end-to-end testing and monitoring hooks.</li></ul>'
        },
        'log-analysis': {
            title: 'Low Latency Log Analysis & Infrastructure',
            year: '2023-2024',
            role: 'Software Engineer II',
            desc: '<p>High-throughput data pipeline migrated to a self-managed Kubernetes Spark Cluster on Linode to analyze millions of rows.</p><ul><li>Implemented automated analysis to detect service anomalies and report probable causes.</li><li>Reduced team toil by automating repetitive manual infrastructure tasks.</li><li>Significantly reduced incident resolution time.</li></ul>'
        },
        'automation-library': {
            title: 'Python Automation Library',
            year: '2021-2023',
            role: 'Software Engineer',
            desc: '<p>Concurrent Python automation library with abstract statistical models, reducing manual monitoring effort by 75%.</p><ul><li>Built visualization interfaces for Grafana and databases (Clickhouse, Modified Cassandra).</li><li>Implemented asynchronous data gathering tools to optimize performance for external low-latency applications.</li></ul>'
        },
        'trie-index': {
            title: 'Trie-Based Inverted Index Engine',
            year: 'Nov 2020',
            role: 'Personal Project',
            desc: '<p>Custom C++ search engine using Trie data structures optimizing for memory locality and fast wildcard queries.</p>'
        },
        'ltree': {
            title: 'LTree: Hybrid Fast Data Structure',
            year: 'Mar 2020',
            role: 'Personal Project',
            desc: '<p>Novel C++ hybrid data structure bridging Arrays and Linked Lists with O(log n) access time.</p>'
        },
        'rnn-captioning': {
            title: 'Hierarchical RNN Image Captioning',
            year: '2018',
            role: 'Research Intern (CDSAML)',
            desc: '<p>CDSAML Internship project using a hierarchical recurrent neural network to generate descriptive paragraphs for images.</p><ul><li>Achieved a 13.6 METEOR score.</li><li>Achieved a BLEU-1 score of 34.4%.</li></ul>'
        },
        'sort': {
            title: 'Fast Merge Sort (ARootSort)',
            year: '2020',
            role: 'Personal Project',
            desc: '<p>Highly optimized adaptive merge sort based on array sortedness and subarray reversing.</p><ul><li>Implemented custom adaptive algorithms to drastically reduce sorting overhead on partially sorted arrays.</li><li>Optimized space and time complexity for competitive programming use cases.</li></ul>'
        },
        'depth': {
            title: '3D Structure and Orientation from 2D Images',
            year: '2019-2020',
            role: 'Undergraduate Project',
            desc: '<p>Constructing 3D structures from multiple 2D images using deep learning and image processing.</p><ul><li>Implemented feature extraction techniques using Convolutional Neural Networks.</li><li>Built algorithms to calculate depth mapping and render objects in a 3D coordinate space.</li></ul>'
        },
        'compiler': {
            title: 'Compiler Design',
            year: '2019',
            role: 'Undergraduate Project',
            desc: '<p>Custom compiler for a C-type language featuring control structures and automatic code optimization.</p><ul><li>Supports use of while loops and conditional statements.</li><li>Optimizes the intermediate code by removing unwanted lines and unused variables automatically.</li></ul>'
        },
        'mscloud': {
            title: 'Database Orchestrator with Master-Slave Architecture',
            year: '2020',
            role: 'Undergraduate Project',
            desc: '<p>Highly available and fault-tolerant Database as a Service using master-slave replication architecture.</p><ul><li>Designed using a Master-Slave architecture for read/write scaling.</li><li>Automated failover protocols to prevent data loss during node failures.</li></ul>'
        },
        'peuler': {
            title: 'Project Euler',
            year: 'Ongoing',
            role: 'Hobby',
            desc: '<p>Solving complex mathematical problems with code using advanced algorithms and optimization techniques.</p><ul><li>Utilized advanced data structures and dynamic programming.</li><li>Improved complexity analysis skills through iterative algorithm optimization.</li></ul>'
        }
    };

    // Attach to all project cards safely
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default routing
            const id = card.getAttribute('data-project');
            const data = projectData[id];
            
            if(data) {
                modalBody.innerHTML = `
                    <h2 style="color: var(--primary-color); margin-bottom: 0.5rem;">${data.title}</h2>
                    <div class="modal-meta" style="margin-bottom: 1.5rem; font-weight: bold; color: var(--text-muted);">
                        <span style="margin-right: 15px;">📅 ${data.year}</span>
                        <span>👨‍💻 ${data.role}</span>
                    </div>
                    <div style="line-height: 1.6; color: var(--text-main);">
                        ${data.desc}
                    </div>
                `;
                modalOverlay.classList.add('active');
                modalOverlay.style.display = 'flex'; // Force display if hidden
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                console.error("Missing data for project ID:", id);
            }
        });
    });

    // Close logic
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        modalOverlay.style.display = 'none'; // Force hide
        document.body.style.overflow = '';
    };

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    modalOverlay.addEventListener('click', (e) => {
        if(e.target === modalOverlay) closeModal();
    });
});

} catch (e) {
    console.error("Main JS Error:", e);
}

// INDESTRUCTIBLE MODAL LOGIC - Placed completely outside any other scopes
window.addEventListener('load', () => {
    try {
        const modalOverlay = document.getElementById('project-modal');
        if (!modalOverlay) {
            console.log("No project modal found on this page.");
            return;
        }
        
        console.log("Initializing modals safely...");
        const modalBody = modalOverlay.querySelector('.modal-body');
        const modalClose = modalOverlay.querySelector('.modal-close');
        
        const projectData = {
            'cert-rotation': {
                title: 'Emergency Certificate Rotation (CPS)',
                year: 'Dec 2024 - Present',
                role: 'Senior Software Engineer',
                desc: '<p>Automated certificate rotation pipeline for Akamai Certificate Provisioning System to handle CA vulnerability markups globally.</p><ul><li>Fully automated workflow triggered by CA vulnerability markups.</li><li>Zero manual intervention required during critical security events.</li><li>Deployed across Akamai global distributed edge network.</li></ul>'
            },
            'delivery-automation': {
                title: 'Software Delivery Automation',
                year: 'Dec 2024 - Present',
                role: 'Senior Software Engineer',
                desc: '<p>Full-stack application for end-to-end deployment, testing, and monitoring.</p><ul><li>Reduced weekly manual toil by 95% (from 3 hours to 9 minutes).</li><li>Unified deployment workflows across multiple internal services.</li><li>Built robust end-to-end testing and monitoring hooks.</li></ul>'
            },
            'log-analysis': {
                title: 'Low Latency Log Analysis & Infrastructure',
                year: '2023-2024',
                role: 'Software Engineer II',
                desc: '<p>High-throughput data pipeline migrated to a self-managed Kubernetes Spark Cluster on Linode to analyze millions of rows.</p><ul><li>Implemented automated analysis to detect service anomalies and report probable causes.</li><li>Reduced team toil by automating repetitive manual infrastructure tasks.</li><li>Significantly reduced incident resolution time.</li></ul>'
            },
            'automation-library': {
                title: 'Python Automation Library',
                year: '2021-2023',
                role: 'Software Engineer',
                desc: '<p>Concurrent Python automation library with abstract statistical models, reducing manual monitoring effort by 75%.</p><ul><li>Built visualization interfaces for Grafana and databases (Clickhouse, Modified Cassandra).</li><li>Implemented asynchronous data gathering tools to optimize performance for external low-latency applications.</li></ul>'
            },
            'trie-index': {
                title: 'Trie-Based Inverted Index Engine',
                year: 'Nov 2020',
                role: 'Personal Project',
                desc: '<p>Custom C++ search engine using Trie data structures optimizing for memory locality and fast wildcard queries.</p>'
            },
            'ltree': {
                title: 'LTree: Hybrid Fast Data Structure',
                year: 'Mar 2020',
                role: 'Personal Project',
                desc: '<p>Novel C++ hybrid data structure bridging Arrays and Linked Lists with O(log n) access time.</p>'
            },
            'rnn-captioning': {
                title: 'Hierarchical RNN Image Captioning',
                year: '2018',
                role: 'Research Intern (CDSAML)',
                desc: '<p>CDSAML Internship project using a hierarchical recurrent neural network to generate descriptive paragraphs for images.</p><ul><li>Achieved a 13.6 METEOR score.</li><li>Achieved a BLEU-1 score of 34.4%.</li></ul>'
            },
            'sort': {
                title: 'Fast Merge Sort (ARootSort)',
                year: '2020',
                role: 'Personal Project',
                desc: '<p>Highly optimized adaptive merge sort based on array sortedness and subarray reversing.</p><ul><li>Implemented custom adaptive algorithms to drastically reduce sorting overhead on partially sorted arrays.</li><li>Optimized space and time complexity for competitive programming use cases.</li></ul>'
            },
            'depth': {
                title: '3D Structure and Orientation from 2D Images',
                year: '2019-2020',
                role: 'Undergraduate Project',
                desc: '<p>Constructing 3D structures from multiple 2D images using deep learning and image processing.</p><ul><li>Implemented feature extraction techniques using Convolutional Neural Networks.</li><li>Built algorithms to calculate depth mapping and render objects in a 3D coordinate space.</li></ul>'
            },
            'compiler': {
                title: 'Compiler Design',
                year: '2019',
                role: 'Undergraduate Project',
                desc: '<p>Custom compiler for a C-type language featuring control structures and automatic code optimization.</p><ul><li>Supports use of while loops and conditional statements.</li><li>Optimizes the intermediate code by removing unwanted lines and unused variables automatically.</li></ul>'
            },
            'mscloud': {
                title: 'Database Orchestrator with Master-Slave Architecture',
                year: '2020',
                role: 'Undergraduate Project',
                desc: '<p>Highly available and fault-tolerant Database as a Service using master-slave replication architecture.</p><ul><li>Designed using a Master-Slave architecture for read/write scaling.</li><li>Automated failover protocols to prevent data loss during node failures.</li></ul>'
            },
            'peuler': {
                title: 'Project Euler',
                year: 'Ongoing',
                role: 'Hobby',
                desc: '<p>Solving complex mathematical problems with code using advanced algorithms and optimization techniques.</p><ul><li>Utilized advanced data structures and dynamic programming.</li><li>Improved complexity analysis skills through iterative algorithm optimization.</li></ul>'
            }
        };

        const cards = document.querySelectorAll('.project-card');
        console.log(`Found ${cards.length} project cards`);
        
        cards.forEach(card => {
            // Strip any existing click listeners by cloning
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            newCard.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Card clicked:", newCard.getAttribute('data-project'));
                
                const id = newCard.getAttribute('data-project');
                const data = projectData[id];
                
                if(data) {
                    modalBody.innerHTML = `
                        <h2 style="color: var(--primary-color); margin-bottom: 0.5rem; font-size: 1.8rem;">${data.title}</h2>
                        <div class="modal-meta" style="margin-bottom: 1.5rem; font-weight: bold; color: var(--text-muted); font-size: 1.1rem;">
                            <span style="margin-right: 15px;">📅 ${data.year}</span>
                            <span>👨‍💻 ${data.role}</span>
                        </div>
                        <div style="line-height: 1.8; color: var(--text-main); font-size: 1.1rem;">
                            ${data.desc}
                        </div>
                    `;
                    
                    // Force CSS directly inline to guarantee it shows
                    modalOverlay.style.cssText = 'display: flex !important; opacity: 1 !important; pointer-events: auto !important; visibility: visible !important;';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeModal = () => {
            modalOverlay.style.cssText = 'display: none !important; opacity: 0 !important; pointer-events: none !important; visibility: hidden !important;';
            document.body.style.overflow = '';
        };

        if (modalClose) {
            const newClose = modalClose.cloneNode(true);
            modalClose.parentNode.replaceChild(newClose, modalClose);
            newClose.addEventListener('click', (e) => {
                e.stopPropagation();
                closeModal();
            });
        }
        
        modalOverlay.addEventListener('click', (e) => {
            if(e.target === modalOverlay) closeModal();
        });
        
        console.log("Modals initialized successfully.");
    } catch(e) {
        console.error("Modal initialization failed:", e);
    }
});
