# kashribha.github.io

Personal portfolio site for **K Shrinidhi Bhagavath** — Senior Software Engineer at Akamai Technologies, Bangalore.

Specializing in Python platform engineering, developer tooling, distributed platforms, and optimization.

---

## Featured work

The public project cards and experience timeline summarize evidence-backed work. They intentionally distinguish production experience from project work and omit sensitive implementation details.

- **MCP servers and developer tooling:** Owned an internal MCP server for approximately 20 active users across SRE, DevOps, and development. Implemented a customer-facing MCP server in alpha for a limited customer cohort. Together, the servers handle approximately 100K requests/month and integrate developer, data, observability, log-analysis, and anomaly-analysis workflows.
- **Emergency Certificate Rotation (CPS):** Designed and implemented a Python workflow for vulnerable CA-key incidents spanning batches of approximately **1K–20K certificates**, with CPS API integration and safety gates.
- **Log analysis and infrastructure migration:** Contributed to Scala/Spark ETL and aggregation work processing approximately 200K aggregated rows every five minutes across approximately 70K active CP codes. Contributed to the Databricks-to-Linode migration on a **50-node** Kubernetes cluster (40 ETL nodes and 10 aggregation nodes).
- **Observability and automation:** Automated monitoring of eight DevOps dashboards spanning approximately 1,200 metrics and 12,000 metric rows. Alerting identified deployment restart counts within 15 minutes rather than the 1–6 hours required by manual verification; a weekly DevOps deployment workflow was automated from three hours to nine minutes.
- **C++ project work:** The portfolio includes systems projects such as a trie-based index and LTree hybrid data structure. These are project-based C++ work, not a claim of professional C++ employment.

Data-volume figures that have not been verified are deliberately excluded.

---

## Structure

```
kashribha.github.io/
├── index.html            — Intro / Hero page
├── experience.html       — Work experience and education timeline
├── projects.html         — Portfolio project cards with modals
├── git_projects.html     — GitHub open-source projects (WIP)
├── contact.html          — Contact form (Formspree)
├── assets/
│   ├── css/
│   │   ├── style.css              — Custom Solarized Light theme
│   │   └── fontawesome-all.min.css — Font Awesome icons
│   ├── js/
│   │   └── main.js               — Grid trail, parallax, modals, pagination
│   └── webfonts/                 — Font Awesome web fonts
├── CODE_AUDIT.md         — Code quality audit report
└── README.md             — This file
```

---

## Theme

Custom **Solarized Light** color scheme built from scratch. No framework dependencies.

## Features

- Fixed top navigation with active link highlighting
- Mouse-driven grid trail background effect
- Floating parallax shapes
- Project card grid with 3D fold-out pagination
- Static HTML modals (no dynamic DOM injection)
- Contact form with AJAX submission via Formspree (no page redirect)
- Fully responsive layout

## Links

- LinkedIn: https://www.linkedin.com/in/kashribha/
- GitHub: https://github.com/kashribha
