"use client";

import { useEffect, useRef, useState } from "react";
import SnakeGame from "./SnakeGame";

type GameChoice = "reflex" | "snake";

export default function PortfolioGame() {
  const [activeGame, setActiveGame] = useState<GameChoice>("reflex");
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [target, setTarget] = useState({ x: 50, y: 50 });
  const [best, setBest] = useState(0);
  const [finished, setFinished] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  function chooseGame(game: GameChoice) {
    if (timer.current) clearInterval(timer.current);
    setPlaying(false);
    setActiveGame(game);
  }

  function startGame() {
    if (timer.current) clearInterval(timer.current);
    setScore(0);
    setTimeLeft(15);
    setFinished(false);
    setPlaying(true);
    setTarget({ x: 15 + Math.random() * 70, y: 15 + Math.random() * 70 });
    timer.current = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          if (timer.current) clearInterval(timer.current);
          setPlaying(false);
          setFinished(true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
  }

  function hitTarget() {
    if (!playing) return;
    setScore((current) => {
      const next = current + 1;
      setBest((previous) => Math.max(previous, next));
      return next;
    });
    setTarget({ x: 8 + Math.random() * 84, y: 10 + Math.random() * 80 });
  }

  return (
    <section className="game-section" id="play">
      <div className="section-intro split-intro game-intro">
        <div>
          <p className="eyebrow">A LITTLE SIDE QUEST / 05</p>
          <h2>Take a <em>play break.</em></h2>
        </div>
        <p>Need a break from scrolling? Pick a mini-game. Catch glowing energy orbs in a quick reflex test, or switch to a classic Snake challenge.</p>
      </div>
      <div className="game-shell">
        <div className="game-picker" role="tablist" aria-label="Choose a mini-game">
          <button className={activeGame === "reflex" ? "game-tab is-active" : "game-tab"} onClick={() => chooseGame("reflex")} role="tab" aria-selected={activeGame === "reflex"}> <span>01</span> CATCH THE GLOW <b>✦</b></button>
          <button className={activeGame === "snake" ? "game-tab is-active" : "game-tab"} onClick={() => chooseGame("snake")} role="tab" aria-selected={activeGame === "snake"}><span>02</span> SNAKE GAME <b>↗</b></button>
        </div>
        {activeGame === "snake" ? <SnakeGame /> : (
          <>
            <div className="game-hud">
              <div><span>SCORE</span><strong>{score.toString().padStart(2, "0")}</strong></div>
              <div><span>TIME LEFT</span><strong className={timeLeft <= 5 && playing ? "game-time-low" : ""}>{timeLeft}<small>s</small></strong></div>
              <div><span>PERSONAL BEST</span><strong>{best.toString().padStart(2, "0")}</strong></div>
            </div>
            <div className={`game-arena ${playing ? "is-playing" : ""}`} role="group" aria-label="Catch the energy orb game">
              <div className="game-arena-grid" />
              {playing ? (
                <button className="game-orb" style={{ left: `${target.x}%`, top: `${target.y}%` }} onClick={hitTarget} aria-label="Catch the energy orb"><span>✦</span></button>
              ) : (
                <div className="game-start-card">
                  <div className="game-emblem">✳</div>
                  <p className="eyebrow">{finished ? "TIME'S UP" : "MINI GAME / 001"}</p>
                  <h3>{finished ? `You scored ${score}.` : "Catch the glow."}</h3>
                  <p>{finished ? (score >= 12 ? "Lightning fast. That was seriously impressive." : "Run it back and beat your score.") : "Tap the orb as many times as you can in 15 seconds."}</p>
                  <button className="game-start-button" onClick={startGame}>{finished ? "PLAY AGAIN ↗" : "START THE CHALLENGE ↗"}</button>
                </div>
              )}
              <span className="game-corner game-corner-tl">SALMAN.EXE</span>
              <span className="game-corner game-corner-tr">REFLEX TEST / 15 SEC</span>
              <span className="game-corner game-corner-bl">MOVE FAST. STAY CURIOUS.</span>
              <span className="game-corner game-corner-br">BUILD 001</span>
            </div>
            <div className="game-foot"><span><i /> INTERACTIVE EXPERIMENT</span><span>NO DOWNLOAD. JUST GOOD REFLEXES.</span></div>
          </>
        )}
      </div>
    </section>
  );
}
