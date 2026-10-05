"use client";

import { useState } from "react";

const links = [
  ["START", "#start"],
  ["MOMENTS", "#moments"],
  ["CHALLENGE", "#challenge"],
  ["SKILLS", "#skills"],
  ["WORK", "#work"],
  ["MAGIC", "#magic"],
  ["CONTACT", "#contact"],
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className={`site-header ${open ? "is-open" : ""}`}>
      <a className="brand" href="#start" aria-label="Back to start" onClick={() => setOpen(false)}>
        <img src="https://cdn.jsdelivr.net/gh/Syed-Salman-Naqvi/Portfolio@master/images/SOLOWEBCIRCLE.png" alt="Solo Web" />
        <span>SOLO WEB<span className="brand-dot">.</span></span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>

      <nav aria-label="Main navigation">
        {links.map(([label, href], index) => (
          <a key={label} href={href} onClick={() => setOpen(false)}>
            <small>0{index + 1}</small>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
