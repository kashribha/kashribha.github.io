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
          year: '2026',
          role: 'Software Engineer II',
          desc: `<p>Designed and built an automated certificate rotation pipeline for Akamai's Certificate Provisioning System (CPS).</p>
                 <p>When a Certificate Authority marks a specific batch of certificates as vulnerable, this system securely automates the global rotation process, drastically reducing operational toil from 3 hours down to 9 minutes.</p>
                 <ul>
                   <li>Fully automated workflow triggered by CA vulnerability markups.</li>
                   <li>Zero manual intervention required during critical security events.</li>
                   <li>Deployed across Akamai's global distributed edge network.</li>
                 </ul>`
        },
        'mcp-oauth': {
          title: 'Internal OAuth2 MCP Server',
          year: '2026',
          role: 'Software Engineer II',
          desc: `<p>Built a secure Model Context Protocol (MCP) integration tailored for internal applications and services used by Akamai employees.</p>
                 <p>This project focused on bridging secure enterprise internal tools with AI capabilities, ensuring robust authentication and observability.</p>
                 <ul>
                   <li>Full OAuth2 protocol handling.</li>
                   <li>User-level telemetry and monitoring implementation.</li>
                   <li>Enabled AI agents to safely interact with internal microservices.</li>
                 </ul>`
        },
        'mcp-edgegrid': {
          title: 'Edgegrid API MCP',
          year: '2026',
          role: 'Software Engineer II',
          desc: `<p>Engineered a specialized MCP for Akamai products that expose APIs using the Edgegrid authentication protocol.</p>
                 <p>This critical infrastructure allows AI agents to securely authenticate and execute capabilities directly against Akamai's core platform APIs.</p>
                 <ul>
                   <li>Seamless Edgegrid authentication integration.</li>
                   <li>Secure capability execution mapping.</li>
                   <li>Streamlined AI automation for Akamai product management.</li>
                 </ul>`
        },
        'log-analysis': {
          title: 'Low Latency Log Analysis',
          year: '2021',
          role: 'Software Engineer',
          desc: `<p>Developed an efficient way to analyze millions of rows of low latency logs from the Akamai network and dynamically update top 5% CP Codes for all services.</p>
                 <ul>
                   <li>Developed Python interfaces for Grafana and Clickhouse.</li>
                   <li>Modified Apache Cassandra to provide metric baselines.</li>
                   <li>Created automated jobs for optimal hourly/daily database aggregation.</li>
                   <li>Automated reporting of probable causes for service anomalies.</li>
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
});
