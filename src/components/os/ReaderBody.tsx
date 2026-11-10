import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  type LucideIcon,
} from "lucide-react";
import {
  ABOUT_BODY,
  CONTACT_CHANNELS,
  PROJECTS,
  SITE,
  SKILL_GROUPS,
  VITALS,
} from "../../data/portfolio";

const CHANNEL_ICONS: Record<string, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  github: Github,
  linkedin: Linkedin,
};

interface ReaderBodyProps {
  idPrefix?: string;
  backHref?: string;
}

export function ReaderBody({
  idPrefix = "reader",
  backHref,
}: ReaderBodyProps) {
  const [emailLocal, emailDomain] = SITE.email.split("@") as [string, string];
  const year = new Date().getFullYear();

  return (
    <div className="reader-body">
      <h2 id={`${idPrefix}-title`}>{SITE.name}</h2>
      <p className="reader-role">{SITE.role}</p>
      <p className="reader-lede">
        I build web and mobile products with modern technologies — and care
        about the details that make them matter. This is the flat edition of the
        portfolio, with every project, skill, and contact link in one place.
      </p>

      <section className="reader-section" aria-labelledby={`${idPrefix}-about`}>
        <h3 id={`${idPrefix}-about`}>About</h3>
        {ABOUT_BODY.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <dl className="reader-vitals">
          {VITALS.map((vital) => (
            <div key={vital.label}>
              <dt>{vital.label}</dt>
              <dd>{vital.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="reader-section" aria-labelledby={`${idPrefix}-work`}>
        <h3 id={`${idPrefix}-work`}>Work</h3>
        <ul className="reader-projects">
          {PROJECTS.map((project) => (
            <li key={project.id}>
              <div className="reader-project-head">
                <h4>{project.name}</h4>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.name}`}
                >
                  Visit
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </div>
              <span className="reader-project-type">{project.type}</span>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="reader-section"
        aria-labelledby={`${idPrefix}-skills`}
      >
        <h3 id={`${idPrefix}-skills`}>Skills</h3>
        <div className="reader-skills">
          {SKILL_GROUPS.map((group) => (
            <div className="reader-skill-group" key={group.id}>
              <h4>{group.label}</h4>
              <p>{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="reader-section"
        aria-labelledby={`${idPrefix}-contact`}
      >
        <h3 id={`${idPrefix}-contact`}>Contact</h3>
        <div className="reader-contact">
          <p>Interested in working together or just want to say hi?</p>
          <a className="reader-email" href={`mailto:${SITE.email}`}>
            {emailLocal}@<wbr />
            {emailDomain}
          </a>
          {CONTACT_CHANNELS.filter((channel) => channel.id !== "email").map(
            (channel) => {
              const Icon = CHANNEL_ICONS[channel.icon];
              return (
                <a
                  className="reader-contact-row"
                  key={channel.id}
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                >
                  <span>
                    <Icon size={13} aria-hidden="true" /> {channel.label}
                  </span>
                  <span>{channel.value}</span>
                </a>
              );
            },
          )}
        </div>
      </section>

      <div className="reader-foot">
        <span>
          © {year} Bradley Gichuru · {SITE.os} · Built with Astro + React
        </span>
        {backHref && (
          <a href={backHref}>
            <ArrowUp size={12} aria-hidden="true" />
            <span className="reader-foot-desktop">Back to desktop</span>
            <span className="reader-foot-mobile">Back to home</span>
          </a>
        )}
      </div>
    </div>
  );
}

export function ReaderApp() {
  return (
    <div className="app reader-app">
      <ReaderBody idPrefix="reader-app" />
    </div>
  );
}
