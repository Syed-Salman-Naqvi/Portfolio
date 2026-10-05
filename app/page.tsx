import MagicCanvas from "./components/MagicCanvas";

const IMG = "https://cdn.jsdelivr.net/gh/Syed-Salman-Naqvi/Portfolio@master/images";

const photos = [
  ["pic-1.jpg", "Keep the smile on!"],
  ["pic-8.jpg", "Do more of what makes you happy."],
  ["pic-6.jpg", "Be brave enough to live differently."],
  ["pic-4.jpg", "Follow your dreams."],
  ["pic-3.jpg", "You will either find a way or make one."],
];

const blogs = [
  ["Harry Potter and the Philosopher’s Stone", "https://medium.com/@smsalman862/harry-potter-and-the-philosophers-stone-29032db64a10"],
  ["Navigating the World of Website Development Frameworks for Beginners", "https://medium.com/@smsalman862/navigating-the-world-of-website-development-frameworks-for-beginners-d9f0a3d2873d"],
  ["Suggestions for beginner Website Developers & coders", "https://medium.com/@smsalman862/suggestions-for-becoming-a-website-developer-coder-3ecaab5a01e0"],
  ["When a crisis hits, should we take a stand or remain neutral?", "https://medium.com/@smsalman862/when-a-crisis-hits-should-we-take-a-stand-or-remain-neutral-34dbefafc75f"],
];

const skills = [
  ["HTML5", "Semantic, accessible and structured web pages.", 95, "01"],
  ["CSS3", "Responsive layouts, animation and modern UI styling.", 92, "02"],
  ["JavaScript", "Interactive interfaces and dynamic experiences.", 88, "03"],
  ["TypeScript", "Typed, maintainable and scalable front-end code.", 78, "04"],
  ["React", "Component-based interfaces and reusable UI systems.", 82, "05"],
  ["Next.js", "Modern React applications with performance in mind.", 78, "06"],
  ["WordPress", "Custom websites, Elementor and content solutions.", 90, "07"],
  ["Git & GitHub", "Version control and collaborative development.", 85, "08"],
];

const projects = [
  ["web-1-ss.png", "Project 01"],
  ["web-2-ss.png", "Project 02"],
  ["web-3-ss.png", "Project 03"],
  ["web-4-ss.png", "Project 04"],
];

const snapshots = ["web-1-ss.png", "web-2-ss.png", "web-3-ss.png", "web-4-ss.png", "web-5-ss.png", "web-6-ss.png"];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#start" aria-label="Home">
          <img src={`${IMG}/SOLOWEBCIRCLE.png`} alt="Solo Web" />
        </a>
        <nav aria-label="Main navigation">
          {[
            ["START", "#start"],
            ["CHALLENGE", "#challenge"],
            ["WORK", "#work"],
            ["SKILLS", "#skills"],
            ["MAGIC", "#magic"],
            ["CONTACT", "#contact"],
          ].map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
      </header>

      <section className="hero" id="start">
        <div className="hero-orb orb-a" />
        <div className="hero-orb orb-b" />
        <div className="hero-copy">
          <p className="eyebrow">FRONT-END DEVELOPER • DIGITAL CREATIVE</p>
          <h1>Hi, my name is <span>Syed Muhammad Salman Naqvi</span></h1>
          <p className="hero-subtitle">I build <strong>dynamic websites</strong>, motion-led interfaces, animations & things that make the web feel alive.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#work">Explore my work <span>↗</span></a>
            <a className="btn btn-ghost" href="#contact">Let&apos;s connect</a>
          </div>
        </div>
        <div className="hero-images">
          <div className="hero-image hero-image-main">
            <img src={`${IMG}/pic-7.jpg`} alt="Creative photography" />
            <span>01 / CREATIVE</span>
          </div>
          <div className="hero-image hero-image-secondary">
            <img src={`${IMG}/mypic.jpg`} alt="Syed Muhammad Salman Naqvi" />
            <span>02 / DEVELOPER</span>
          </div>
        </div>
        <div className="scroll-note"><span /> SCROLL TO EXPLORE</div>
      </section>

      <section className="moments section-dark">
        <div className="section-heading">
          <p className="eyebrow">BEYOND THE SCREEN</p>
          <h2>I also enjoy capturing <em>heartwarming moments.</em></h2>
        </div>
        <div className="photo-grid">
          {photos.map(([src, title], i) => (
            <figure className={i === 4 ? "photo-card photo-card-wide" : "photo-card"} key={src}>
              <img src={`${IMG}/${src}`} alt={title} loading="lazy" />
              <figcaption><span>0{i + 1}</span>{title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="challenge" id="challenge">
        <div className="section-heading centered">
          <p className="eyebrow">THE CHALLENGE</p>
          <h2>Challenge <em>Yourself</em></h2>
          <p>Read, learn and keep building. A few things I have written about the web, creativity and difficult questions.</p>
        </div>
        <div className="blog-grid">
          {blogs.map(([title, href], i) => (
            <a className="blog-card" href={href} target="_blank" rel="noreferrer" key={title}>
              <span className="card-number">0{i + 1}</span>
              <span className="card-arrow">↗</span>
              <h3>{title}</h3>
              <p>READ ARTICLE ON MEDIUM</p>
            </a>
          ))}
        </div>
      </section>

      <section className="skills" id="skills">
        <div className="section-heading centered">
          <p className="eyebrow">WHAT I WORK WITH</p>
          <h2>Tools of the <em>trade.</em></h2>
          <p>Technologies I use to turn ideas into responsive, modern digital experiences.</p>
        </div>
        <div className="skills-grid">
          {skills.map(([name, desc, level, no]) => (
            <article className="skill-card" key={name}>
              <span className="skill-no">{no}</span>
              <div className="skill-main">
                <div className="skill-top"><h3>{name}</h3><b>{level}%</b></div>
                <p>{desc}</p>
                <div className="skill-line"><i style={{ width: `${level}%` }} /></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work section-dark" id="work">
        <div className="section-heading">
          <p className="eyebrow">SELECTED WORK</p>
          <h2>Projects with <em>personality.</em></h2>
          <p>Hover the cards to reveal the work. Click any image below for a larger view.</p>
        </div>
        <div className="project-grid">
          {projects.map(([src, title], i) => (
            <a className="project-card" href="#snapshots" key={src}>
              <img src={`${IMG}/${src}`} alt={title} loading="lazy" />
              <div><span>{title}</span><b>VIEW SNAPSHOTS ↘</b></div>
            </a>
          ))}
        </div>
      </section>

      <section className="snapshots" id="snapshots">
        <div className="section-heading centered">
          <p className="eyebrow">PROJECT SNAPSHOTS</p>
          <h2>A closer <em>look.</em></h2>
        </div>
        <div className="snapshot-grid">
          {snapshots.map((src, i) => (
            <a href={`${IMG}/${src}`} target="_blank" rel="noreferrer" key={src}>
              <img src={`${IMG}/${src}`} alt={`Project screenshot ${i + 1}`} loading="lazy" />
              <span>0{i + 1}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="magic" id="magic">
        <div className="magic-copy">
          <p className="eyebrow">INTERACTIVE SPACE</p>
          <h2>Want to see some <em>magic?</em></h2>
          <p>Move your mouse across the screen and explore a lightweight interactive version of the original fluid-art experience.</p>
        </div>
        <MagicCanvas />
      </section>

      <footer className="footer" id="contact">
        <div className="footer-title">
          <p className="eyebrow">LET&apos;S BUILD SOMETHING</p>
          <h2>Contact <em>/&gt;.</em></h2>
        </div>
        <div className="footer-grid">
          <div>
            <p className="footer-label">FIND ME ON</p>
            <a href="https://www.linkedin.com/in/muhammad-salman-9b48aa232" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://www.instagram.com/s.a.l.m.a.n_n.a.q.v.i" target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href="https://www.facebook.com/profile.php?id=100007216749479" target="_blank" rel="noreferrer">Facebook ↗</a>
            <a href="https://wa.me/qr/5YMDYU6JUPZLL1" target="_blank" rel="noreferrer">WhatsApp ↗</a>
          </div>
          <div className="footer-message">
            <p className="footer-label">HAVE A PROJECT?</p>
            <h3>Let&apos;s turn the idea into something people remember.</h3>
            <a className="email-link" href="mailto:salman@example.com">SEND ME A MESSAGE ↗</a>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Salman Naqvi</span><span>BUILT WITH NEXT.JS</span></div>
      </footer>
    </main>
  );
}
