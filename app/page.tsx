import SiteNav from "./components/SiteNav";
import MouseMagic from "./components/MouseMagic";
import ProjectLightbox from "./components/ProjectLightbox";
import MomentsLightbox from "./components/MomentsLightbox";

const IMG = "https://cdn.jsdelivr.net/gh/Syed-Salman-Naqvi/Portfolio@master/images";
const RESUME_URL = "/images/Syed%20Salman%20Naqvi%20Resume.pdf";

const photos: [string, string][] = [
  ["1000359228.jpg.jpeg", "Skyline over the old water tower."],
  ["1000359231.jpg.jpeg", "Giant tree and an endless sky."],
  ["1000359242.jpg.jpeg", "Water delivery at sunset."],
  ["1000359245.jpg.jpeg", "Rows of clay pots in the evening light."],
  ["1000359248.jpg.jpeg", "A forgotten bus swallowed by nature."],
];

const blogs = [
  ["Harry Potter and the Philosopher’s Stone", "A personal take on a classic story and the ideas behind it.", "https://medium.com/@smsalman862/harry-potter-and-the-philosophers-stone-29032db64a10"],
  ["Navigating the World of Website Development Frameworks for Beginners", "A beginner-friendly look at choosing the right tools for building websites.", "https://medium.com/@smsalman862/navigating-the-world-of-website-development-frameworks-for-beginners-d9f0a3d2873d"],
  ["Suggestions for beginner Website Developers & coders", "Practical advice for anyone starting a journey into web development.", "https://medium.com/@smsalman862/suggestions-for-becoming-a-website-developer-coder-3ecaab5a01e0"],
  ["When a crisis hits, should we take a stand or remain neutral?", "A personal reflection on difficult decisions and taking a position.", "https://medium.com/@smsalman862/when-a-crisis-hits-should-we-take-a-stand-or-remain-neutral-34dbefafc75f"],
];

const skills = [
  ["HTML5", "Semantic, accessible and structured web pages.", "95%", "HTML"],
  ["CSS3", "Responsive layouts, animation and modern UI styling.", "92%", "CSS"],
  ["JavaScript", "Interactive interfaces and dynamic experiences.", "88%", "JS"],
  ["TypeScript", "Typed, maintainable and scalable front-end code.", "78%", "TS"],
  ["React", "Component-based interfaces and reusable UI systems.", "82%", "RE"],
  ["Next.js", "Modern React applications with performance in mind.", "78%", "NX"],
  ["WordPress", "Custom websites, Elementor and content solutions.", "90%", "WP"],
  ["Git & GitHub", "Version control and collaborative development.", "85%", "GH"],
];

const projects = [
  ["web-1-ss.png", "01", "Web Experience", "Interface & Front-End"],
  ["web-2-ss.png", "02", "Digital Experience", "Responsive Development"],
  ["web-3-ss.png", "03", "Web Interface", "Creative Direction"],
  ["web-4-ss.png", "04", "Client Project", "Front-End Development"],
];

const snapshots = ["web-1-ss.png", "web-2-ss.png", "web-3-ss.png", "web-4-ss.png", "web-5-ss.png", "web-6-ss.png"];

export default function Home() {
  return (
    <main>
      <SiteNav />
      <MouseMagic />

      <section className="hero" id="start">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-content">
          <div className="hero-kicker"><span /> FRONT-END DEVELOPER <b>×</b> DIGITAL CREATIVE</div>
          <h1>
            Hi, my name is
            <strong>Syed Muhammad<br />Salman Naqvi<span>.</span></strong>
          </h1>
          <div className="hero-type">
            <span>I develop</span>
            <div className="type-window">
              <span>dynamic websites</span>
              <span>motion & interactions</span>
              <span>creative interfaces</span>
              <span>digital experiences</span>
            </div>
          </div>
          <p className="hero-description">
            I turn ideas into responsive, expressive websites with clean front-end code,
            thoughtful interaction and a little bit of visual magic.
          </p>
          <div className="hero-actions">
            <a className="button button-fill" href="#work">EXPLORE MY WORK <span>↗</span></a>
            <a className="button button-line" href="#contact">LET&apos;S CONNECT</a>
            <a className="button button-resume" href={RESUME_URL} download="Syed Salman Naqvi Resume.pdf" aria-label="Download Syed Salman Naqvi resume as a PDF"><span className="resume-icon" aria-hidden="true">↓</span>DOWNLOAD RESUME</a>
          </div>
          <div className="hero-meta">
            <span><b>01</b> AVAILABLE FOR CREATIVE WORK</span>
            <span>SCROLL TO EXPLORE <i>↓</i></span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-label visual-label-top">SELECTED<br />FRAME / 01</div>
          <div className="hero-photo hero-photo-back">
            <img src={`${IMG}/pic-7.jpg`} alt="Creative photography" />
          </div>
          <div className="hero-photo hero-photo-front">
            <img src={`${IMG}/mypic.jpg`} alt="Portrait" />
            <div className="photo-tag">DEVELOPER / CREATIVE</div>
          </div>
          <div className="visual-mark">S<br />N</div>
          <div className="visual-label visual-label-bottom">KARACHI / PAKISTAN<br />BUILDING ON THE WEB</div>
        </div>
      </section>

      <div className="marquee" aria-label="Portfolio specialties">
        <div><span>FRONT-END DEVELOPMENT</span><i>✦</i><span>CREATIVE DIRECTION</span><i>✦</i><span>INTERACTION DESIGN</span><i>✦</i><span>DIGITAL EXPERIENCES</span><i>✦</i><span>FRONT-END DEVELOPMENT</span><i>✦</i><span>CREATIVE DIRECTION</span><i>✦</i></div>
      </div>

      <section className="moments section-dark" id="moments">
        <div className="section-intro split-intro">
          <div>
            <p className="eyebrow">BEYOND THE SCREEN / 01</p>
            <h2>I also enjoy capturing <em>heartwarming moments.</em></h2>
          </div>
          <p>When I&apos;m away from the keyboard, I like to look for stories in ordinary moments. Photography is my other way of playing with composition, light and emotion.</p>
        </div>
        <MomentsLightbox photos={photos} base={IMG} />
      </section>

      <section className="challenge" id="challenge">
        <div className="section-intro centered-intro">
          <p className="eyebrow">SELECTED ARTICLES / 02</p>
          <h2>Ideas worth <em>reading.</em></h2>
          <p>Read, question, learn and keep building. A selection of articles I&apos;ve written about technology, creativity, stories and difficult questions on Medium.</p>
        </div>
        <div className="blog-grid">
          {blogs.map(([title, description, href], i) => (
            <a className="blog-card" href={href} target="_blank" rel="noreferrer" key={title}>
              <div className="blog-top"><span>ARTICLE / 0{i + 1}</span><b>↗</b></div>
              <div className="blog-body"><h3>{title}</h3><p>{description}</p></div>
              <div className="blog-bottom"><span>MEDIUM</span><span>READ ARTICLE</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="skills" id="skills">
        <div className="section-intro centered-intro">
          <p className="eyebrow">WHAT I WORK WITH / 03</p>
          <h2>Tools of the <em>trade.</em></h2>
          <p>My front-end toolkit for turning concepts into polished, responsive and maintainable digital experiences.</p>
        </div>
        <div className="skills-grid">
          {skills.map(([name, desc, level, mark], i) => (
            <article className="skill-card" key={name}>
              <div className="skill-number">0{i + 1}</div>
              <div className="skill-mark">{mark}</div>
              <div className="skill-copy">
                <div className="skill-heading"><h3>{name}</h3><b>{level}</b></div>
                <p>{desc}</p>
                <div className="skill-track"><span style={{ width: level }} /></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work section-dark" id="work">
        <div className="section-intro split-intro work-intro">
          <div>
            <p className="eyebrow">SELECTED WORK / 04</p>
            <h2>Projects with <em>personality.</em></h2>
          </div>
          <p>Real interface work, experiments and visual directions. Each piece is built around clarity, responsiveness and a distinct visual character.</p>
        </div>
        <div className="project-grid">
          {projects.map(([src, no, title, type], i) => (
            <a className={`project-card project-card-${i + 1}`} href="#snapshots" key={src}>
              <div className="project-image"><img src={`${IMG}/${src}`} alt={title} loading="lazy" /></div>
              <div className="project-overlay" />
              <div className="project-info">
                <div><small>PROJECT {no}</small><h3>{title}</h3><p>{type}</p></div>
                <span>VIEW <b>↗</b></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="snapshots" id="snapshots">
        <div className="section-intro centered-intro">
          <p className="eyebrow">PROJECT SNAPSHOTS / 05</p>
          <h2>A closer <em>look.</em></h2>
          <p>Click any screenshot to open the full project view.</p>
        </div>
        <ProjectLightbox images={snapshots} base={IMG} />
      </section>

      <footer className="footer" id="contact">
        <div className="footer-head">
          <p className="eyebrow">LET&apos;S BUILD SOMETHING / 07</p>
          <h2>Contact <em>/&gt;.</em></h2>
          <div className="footer-orbit"><span>CREATIVE</span><span>DEVELOPER</span><span>CREATIVE</span></div>
        </div>
        <div className="footer-grid">
          <div className="footer-social">
            <p className="footer-label">FIND ME ON</p>
            <a href="https://www.linkedin.com/in/smsn" target="_blank" rel="noreferrer"><span>01</span>LinkedIn <b>↗</b></a>
            <a href="https://www.instagram.com/s.a.l.m.a.n_n.a.q.v.i" target="_blank" rel="noreferrer"><span>02</span>Instagram <b>↗</b></a>
            <a href="https://www.facebook.com/profile.php?id=100007216749479" target="_blank" rel="noreferrer"><span>03</span>Facebook <b>↗</b></a>
            <a href="https://wa.me/923272134562" target="_blank" rel="noreferrer"><span>04</span>WhatsApp <b>↗</b></a>
          </div>
          <div className="footer-cta">
            <p className="footer-label">HAVE A PROJECT?</p>
            <h3>Let&apos;s turn the idea into something people remember.</h3>
            <a className="footer-button" href="https://wa.me/qr/5YMDYU6JUPZLL1" target="_blank" rel="noreferrer">SEND ME A MESSAGE <span>↗</span></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SALMAN NAQVI</span>
          <span>DESIGNED & BUILT WITH NEXT.JS</span>
          <a className="back-to-top" href="#start" aria-label="Back to top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
