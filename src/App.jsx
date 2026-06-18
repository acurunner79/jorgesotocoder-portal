import "./App.css";
import { apps } from "./data/apps";
import {
  accessLevels,
  activationQueue,
  backupCoverage,
  contactLinks,
  featuredProjects,
  monitoringCoverage,
  profile,
  restrictedChecklist,
  routeMatrix,
  securityDirectives,
  commandTicker,
  portalSystemIndex,
  missionLog,
} from "./data/site";

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
        <div className="locked-card-actions">
          <span className="card-link disabled" title="Restricted system">
            {app.lockedLabel || "Locked"}
          </span>

          <a className="route-plan-link" href="#routes">
            View Route Plan
          </a>
        </div>
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

function MissionLogEntry({ entry }) {
  return (
    <article className={`mission-log-entry ${entry.status.toLowerCase()}`}>
      <div className="mission-log-marker">
        <span>{entry.code}</span>
      </div>

      <div className="mission-log-content">
        <div className="mission-log-topline">
          <h3>{entry.title}</h3>
          <span>{entry.status}</span>
        </div>

        <p>{entry.detail}</p>

        <div className="mission-log-tags">
          {entry.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function MissionLog({ log }) {
  return (
    <section className="mission-log-section">
      <div className="section-heading">
        <span />
        <h2>{log.title}</h2>
        <span />
      </div>

      <div className="mission-log-shell">
        <div className="mission-log-header">
          <p>{log.eyebrow}</p>
          <h3>{log.title}</h3>
          <span>{log.subtitle}</span>
        </div>

        <div className="mission-log-timeline">
          {log.entries.map((entry) => (
            <MissionLogEntry key={entry.code} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemIndexMetric({ metric }) {
  return (
    <article className={`system-index-metric ${metric.tone}`}>
      <span>{metric.label}</span>
      <strong>{metric.value}</strong>
      <p>{metric.detail}</p>
    </article>
  );
}

function SystemIndexRow({ system }) {
  return (
    <article className={`system-index-row ${system.tone}`}>
      <div className="system-index-name">
        <span className="system-index-dot" />
        <strong>{system.name}</strong>
      </div>

      <span className="system-index-pill">{system.access}</span>
      <span className="system-index-status">{system.status}</span>
      <span className="system-index-shield">{system.shield}</span>
    </article>
  );
}

function PortalSystemIndex({ index }) {
  return (
    <section className="portal-system-index">
      <div className="section-heading">
        <span />
        <h2>{index.title}</h2>
        <span />
      </div>

      <div className="system-index-shell">
        <div className="system-index-header">
          <div>
            <p className="system-index-eyebrow">{index.eyebrow}</p>
            <h3>{index.title}</h3>
            <p>{index.subtitle}</p>
          </div>

          <div className="system-index-stamp">SECURE SUMMARY</div>
        </div>

        <div className="system-index-metrics">
          {index.metrics.map((metric) => (
            <SystemIndexMetric key={metric.label} metric={metric} />
          ))}
        </div>

        <div className="system-index-table">
          <div className="system-index-table-head">
            <span>System</span>
            <span>Access</span>
            <span>Status</span>
            <span>Shield</span>
          </div>

          <div className="system-index-rows">
            {index.systems.map((system) => (
              <SystemIndexRow key={system.name} system={system} />
            ))}
          </div>
        </div>
      </div>
    </section>
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

function RouteCard({ route }) {
  const accessClass = route.access.toLowerCase().replaceAll(" ", "-");
  const statusClass = route.status.toLowerCase().replaceAll(" ", "-");

  const activationLabel =
  route.status === "Live"
    ? "Signal active"
    : route.status === "Private Active"
      ? "Tailnet active"
      : route.status === "Never Public"
        ? "Internal lock"
        : route.status === "Future"
          ? "Queued"
          : "Activation pending";

  return (
    <article className={`route-lane ${accessClass} ${statusClass}`}>
      <div className="route-access">
        <span>{route.access}</span>
      </div>

      <div className="route-target">
        <h3>{route.domain}</h3>
        <p>{route.service}</p>
        <small>{route.method}</small>
      </div>

      <div className="route-connector" aria-hidden="true">
        <span />
        <i />
        <span />
      </div>

      <div className="route-state">
        <strong className={`route-status ${statusClass}`}>{route.status}</strong>
        <em>{activationLabel}</em>
      </div>
    </article>
  );
}

function SecurityDirective({ item }) {
  return (
    <article className="security-directive">
      <span>{item.code}</span>
      <div>
        <h3>{item.title}</h3>
        <p>{item.detail}</p>
      </div>
    </article>
  );
}

function ActivationQueueItem({ item }) {
  return (
    <article className="activation-item">
      <span>{item.order}</span>

      <div>
        <div className="activation-item-header">
          <h3>{item.title}</h3>
          <strong>{item.priority}</strong>
        </div>

        <p className="activation-route">{item.route}</p>
        <p>{item.detail}</p>
      </div>
    </article>
  );
}

function MonitoringCoverageItem({ item }) {
  return (
    <article className="monitoring-coverage-item">
      <span>{item.label}</span>
      <p>{item.detail}</p>
    </article>
  );
}

function BackupCoverageItem({ item }) {
  return (
    <article className="backup-coverage-item">
      <span>{item.label}</span>
      <p>{item.detail}</p>
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

function CommandTicker({ ticker }) {
  return (
    <section className="command-ticker" aria-label="Command ticker">
      <div className="command-ticker-label">
        <span className="ticker-dot" />
        {ticker.label}
      </div>

      <div className="command-ticker-track">
        <div className="command-ticker-scroll aurebesh-text">
          <span>{ticker.phrase}</span>
          <span aria-hidden="true">{ticker.phrase}</span>
        </div>
      </div>
    </section>
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
          <a href="#routes">Routes</a>
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

      <CommandTicker ticker={commandTicker} />

      <PortalSystemIndex index={portalSystemIndex} />

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

      <MissionLog log={missionLog} />

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

      <section className="route-section" id="routes">
        <div className="section-heading">
          <span />
          <h2>Route Matrix</h2>
          <span />
        </div>

        <div className="route-lanes">
          {routeMatrix.map((route) => (
            <RouteCard key={route.domain} route={route} />
          ))}
        </div>

        <div className="security-panel">
          <div className="security-panel-header">
            <p className="eyebrow">Security Directive</p>
            <h3>Route activation rules</h3>
          </div>

          <div className="security-directive-grid">
            {securityDirectives.map((item) => (
              <SecurityDirective key={item.code} item={item} />
            ))}
          </div>

          <div className="restricted-checklist">
            <h3>Restricted route checklist</h3>

            <ul>
              {restrictedChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="activation-queue">
          <div className="activation-queue-header">
            <p className="eyebrow">Activation Queue</p>
            <h3>Restricted route rollout order</h3>
          </div>

          <div className="activation-list">
            {activationQueue.map((item) => (
              <ActivationQueueItem key={item.route} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="monitoring-coverage-section">
        <div className="section-heading">
          <span />
          <h2>Monitoring Coverage</h2>
          <span />
        </div>

        <div className="monitoring-coverage-grid">
          {monitoringCoverage.map((item) => (
            <MonitoringCoverageItem key={item.label} item={item} />
          ))}
        </div>
      </section>

      <section className="backup-coverage-section">
        <div className="section-heading">
          <span />
          <h2>Backup Coverage</h2>
          <span />
        </div>

        <div className="backup-coverage-grid">
          {backupCoverage.map((item) => (
            <BackupCoverageItem key={item.label} item={item} />
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
            dots={["green", "green", "green", "green", "amber"]}
            detail="Monitoring · Droid · Home Assistant Active"
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