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

  // Modal Logic (only if modal exists on page)
  const modalOverlay = document.getElementById('project-modal');
  if(modalOverlay) {
      const modalClose = modalOverlay.querySelector('.modal-close');
      const modalBody = modalOverlay.querySelector('.modal-body');

      const projectData = {
        'cert-rotation': {
          title: 'Emergency Certificate Rotation (CPS)',
          year: '2024-Present',
          role: 'Senior Software Engineer',
          desc: `<p>Leading the development of a critical extension to the Certificate Provisioning System (CPS) to handle emergency rotations for vulnerable CA keys (DigiCert/LE).</p>
                 <p>This system ensures global security compliance by securely automating the global rotation process when a Certificate Authority marks a specific batch of certificates as vulnerable.</p>
                 <ul>
                   <li>Fully automated workflow triggered by CA vulnerability markups.</li>
                   <li>Zero manual intervention required during critical security events.</li>
                   <li>Deployed across Akamai's global distributed edge network.</li>
                 </ul>`
        },
        'delivery-automation': {
          title: 'Software Delivery Automation',
          year: '2024-Present',
          role: 'Senior Software Engineer',
          desc: `<p>Architected a full-stack application for end-to-end deployment, testing, and monitoring across multiple internal Akamai services.</p>
                 <p>This automation significantly streamlines the delivery pipeline by removing manual bottlenecks and unifying disparate workflows.</p>
                 <ul>
                   <li>Reduced weekly manual toil by <strong>95%</strong> (from 3 hours to 9 minutes).</li>
                   <li>Unified deployment workflows across multiple internal services.</li>
                   <li>Built robust end-to-end testing and monitoring hooks.</li>
                 </ul>`
        },
        'log-analysis': {
          title: 'Low Latency Log Analysis & Infrastructure',
          year: '2023-2024',
          role: 'Software Engineer II',
          desc: `<p>Engineered a high-throughput data pipeline to analyze millions of rows of low latency logs from the Akamai network and dynamically update top 5% CP Codes for all services.</p>
                 <p>Successfully migrated legacy data pipelines from DataBricks to a self-managed <strong>Kubernetes Spark Cluster on Linode</strong>, optimizing cost and control.</p>
                 <ul>
                   <li>Implemented automated analysis to detect service anomalies and report probable causes.</li>
                   <li>Reduced team toil by automating repetitive manual infrastructure tasks.</li>
                   <li>Significantly reduced incident resolution time.</li>
                 </ul>`
        },
        'automation-library': {
          title: 'Python Automation Library',
          year: '2021-2023',
          role: 'Software Engineer',
          desc: `<p>Developed a concurrent Python automation library featuring abstract statistical and ML models to detect and manage baselines.</p>
                 <ul>
                   <li>Adoption of this library reduced manual monitoring effort by <strong>75%</strong>.</li>
                   <li>Built visualization interfaces for Grafana and databases (Clickhouse, Modified Cassandra).</li>
                   <li>Implemented asynchronous data gathering tools to optimize performance for external low-latency applications.</li>
                 </ul>`
        },
        'rnn-captioning': {
          title: 'Hierarchical RNN Image Captioning',
          year: '2018',
          role: 'Research Intern (CDSAML)',
          desc: `<p>Implemented a model with a hierarchical recurrent neural network to generate descriptive paragraphs for images.</p>
                 <p>The model features a sentence RNN that receives image features to decide sentence count and produces topic vectors. These are used by a word RNN to generate the actual sentences.</p>
                 <ul>
                   <li>Achieved a 13.6 METEOR score.</li>
                   <li>Achieved a BLEU-1 score of 34.4%.</li>
                   <li>Conducted at the Center for Data Sciences and Applied Machine Learning (PESU).</li>
                 </ul>`
        }

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
      };

      document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
          const id = card.getAttribute('data-project');
          const data = projectData[id];
          if(data) {
            modalBody.innerHTML = `
              <h2>${data.title}</h2>
              <div class="modal-meta">
                <span>📅 ${data.year}</span>
                <span>👨‍💻 ${data.role}</span>
              </div>
              ${data.desc}
            `;
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        });
      });

      function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }

      modalClose.addEventListener('click', closeModal);
      modalOverlay.addEventListener('click', (e) => {
        if(e.target === modalOverlay) closeModal();
      });
  }

  // Interactive Face Logic
  const face = document.getElementById('interactive-face');
  const pupils = document.querySelectorAll('.pupil');
  const mouth = document.getElementById('face-mouth');

  if (face && pupils.length > 0 && mouth) {
      document.addEventListener('mousemove', (e) => {
          const rect = face.getBoundingClientRect();
          const faceCenterX = rect.left + rect.width / 2;
          const faceCenterY = rect.top + rect.height / 2;

          const deltaX = e.clientX - faceCenterX;
          const deltaY = e.clientY - faceCenterY;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

          // Move pupils
          const angle = Math.atan2(deltaY, deltaX);
          const maxMove = 10;
          const moveX = Math.cos(angle) * Math.min(distance / 12, maxMove);
          const moveY = Math.sin(angle) * Math.min(distance / 12, maxMove);

          pupils.forEach(pupil => {
              pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
          });

          // Emote based on pointer
          if (distance < 70) {
              mouth.className = 'mouth surprised';
          } else if (deltaY < -150) {
              mouth.className = 'mouth';
              mouth.style.height = '10px';
          } else if (deltaX > 250 || deltaX < -250) {
              mouth.className = 'mouth';
              mouth.style.height = '15px';
              mouth.style.width = '40px';
          } else {
              mouth.className = 'mouth';
              mouth.style.height = '20px';
              mouth.style.width = '50px';
          }
      });
      
      face.addEventListener('click', () => {
          mouth.className = 'mouth smile';
          setTimeout(() => { mouth.className = 'mouth'; }, 1500);
      });
  }

});
