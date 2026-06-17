import "./App.css";
import { apps } from "./data/apps";
import { accessLevels, contactLinks, featuredProjects, profile } from "./data/site";

function AppCard({ app }) {
  return (
    <article className={`app-card ${app.statusType}`}>
      <div className="app-icon" aria-hidden="true">
        {app.iconImage ? <img src={app.iconImage} alt="" /> : <span>{app.icon}</span>}
      </div>

      <h3>{app.title}</h3>
      <p>{app.description}</p>

      <div className="tag-row">
        {app.tags.map((tag) => (
          <span key={tag} className={`tag ${tag.toLowerCase().replace(" ", "-")}`}>
            {tag}
          </span>
        ))}
      </div>

      {app.enabled ? (
        <a
          className="card-link"
          href={app.url}
          target={app.url.startsWith("http") ? "_blank" : undefined}
          rel={app.url.startsWith("http") ? "noreferrer" : undefined}
        >
          Open App
        </a>
      ) : (
        <span className="card-link disabled" title="Restricted system">
          Locked
        </span>
      )}
    </article>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-header">
        <h3>{project.title}</h3>
        <span>{project.status}</span>
      </div>

      <p>{project.description}</p>

      <a
        href={project.link}
        target={project.link.startsWith("http") ? "_blank" : undefined}
        rel={project.link.startsWith("http") ? "noreferrer" : undefined}
      >
        {project.linkLabel}
      </a>
    </article>
  );
}

function ContactCard({ item }) {
  return (
    <a
      className="contact-card"
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
    >
      <span>{item.label}</span>
      <strong>{item.value}</strong>
    </a>
  );
}

function AccessCard({ item }) {
  return (
    <article className={`access-card ${item.tone}`}>
      <span>{item.label}</span>
      <p>{item.description}</p>
    </article>
  );
}

function StatusPanel({ icon, title, dots, detail }) {
  return (
    <article className="status-panel">
      <div className="status-icon" aria-hidden="true">
        {icon}
      </div>

      <div>
        <h3>{title}</h3>
        <div className="dot-row" aria-hidden="true">
          {dots.map((dot, index) => (
            <span key={`${dot}-${index}`} className={`dot ${dot}`} />
          ))}
        </div>
        <p>{detail}</p>
      </div>
    </article>
  );
}

export default function App() {
  return (
    <main className="page-shell">
      <header className="top-nav">
        <a className="brand" href="/" aria-label="Jorge Soto Coder home">
          <span className="brand-mark" aria-hidden="true">
            <img src="/assets/icons/rebel-orange.png" alt="" />
          </span>
          <span>Jorge Soto Coder</span>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#apps">Apps</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-overlay" />

        <div className="holo-panel left-holo" aria-hidden="true">
          <span className="radar-ring ring-one" />
          <span className="radar-ring ring-two" />
          <span className="radar-ring ring-three" />
          <span className="radar-sweep" />
        </div>

        <div className="hero-content">
          <img
            className="hero-insignia"
            src="/assets/icons/rebel-orange.png"
            alt=""
            aria-hidden="true"
          />

          <p className="eyebrow">Systems Directory // Phase 2</p>
          <h1>Welcome to the Command Portal</h1>
          <p className="hero-copy">
            A central launch point for projects, applications, and systems across
            jorgesotocoder.com.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="https://home-tracker.jorgesotocoder.com">
              Launch Home Tracker
            </a>
            <a className="secondary-button" href="#projects">
              View Projects
            </a>
          </div>
        </div>

        <div className="holo-table right-holo" aria-hidden="true">
          <span className="table-ring" />
          <span className="table-core" />
          <span className="table-beam" />
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="section-heading">
          <span />
          <h2>About</h2>
          <span />
        </div>

        <div className="about-panel">
          <p className="eyebrow">Operator Profile</p>
          <h2>{profile.name}</h2>
          <h3>{profile.title}</h3>
          <p>{profile.summary}</p>

          <div className="highlight-grid">
            {profile.highlights.map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="section-heading">
          <span />
          <h2>Featured Projects</h2>
          <span />
        </div>

        <div className="project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="directory-section" id="apps">
        <div className="section-heading">
          <span />
          <h2>Application Directory</h2>
          <span />
        </div>

        <div className="app-grid">
          {apps.map((app) => (
            <AppCard key={app.title} app={app} />
          ))}
        </div>
      </section>

      <section className="access-section">
        <div className="section-heading">
          <span />
          <h2>Access Model</h2>
          <span />
        </div>

        <div className="access-grid">
          {accessLevels.map((item) => (
            <AccessCard key={item.label} item={item} />
          ))}
        </div>
      </section>

      <section className="status-section">
        <div className="section-heading">
          <span />
          <h2>System Status</h2>
          <span />
        </div>

        <div className="status-grid">
          <StatusPanel
            icon="●●●"
            title="Public Apps"
            dots={["green", "green", "green", "dim", "dim"]}
            detail="3 Online · 0 Issues"
          />

          <StatusPanel
            icon="◆"
            title="Private Systems"
            dots={["red", "red", "amber", "dim", "dim"]}
            detail="2 Restricted · 1 Coming Soon"
          />

          <StatusPanel
            icon="▤"
            title="Documentation"
            dots={["blue", "blue", "blue", "dim", "dim"]}
            detail="Up to Date · Synced"
          />
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-heading">
          <span />
          <h2>Command Links</h2>
          <span />
        </div>

        <div className="contact-grid">
          {contactLinks.map((item) => (
            <ContactCard key={item.label} item={item} />
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <img src="/assets/icons/rebel-orange.png" alt="" aria-hidden="true" />
        <p>jorgesotocoder.com // Rebel-inspired command portal concept</p>
      </footer>
    </main>
  );
}