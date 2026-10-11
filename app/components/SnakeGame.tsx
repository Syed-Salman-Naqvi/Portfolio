"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const COLS = 20;
const ROWS = 13;
const initialSnake: Point[] = [{ x: 5, y: 6 }, { x: 4, y: 6 }, { x: 3, y: 6 }];

function randomFood(snake: Point[]): Point {
  let point: Point;
  do {
    point = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((part) => part.x === point.x && part.y === point.y));
  return point;
}

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(initialSnake);
  const [food, setFood] = useState<Point>({ x: 13, y: 6 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [playing, setPlaying] = useState(false);
  const [over, setOver] = useState(false);
  const [score, setScore] = useState(0);
  const directionRef = useRef<Direction>("RIGHT");
  const snakeRef = useRef<Point[]>(initialSnake);
  const foodRef = useRef<Point>({ x: 13, y: 6 });

  const turn = useCallback((next: Direction) => {
    const current = directionRef.current;
    if ((current === "UP" && next === "DOWN") || (current === "DOWN" && next === "UP") ||
        (current === "LEFT" && next === "RIGHT") || (current === "RIGHT" && next === "LEFT")) return;
    directionRef.current = next;
    setDirection(next);
  }, []);

  const start = useCallback(() => {
    const fresh = [...initialSnake];
    const nextFood = randomFood(fresh);
    snakeRef.current = fresh;
    foodRef.current = nextFood;
    setSnake(fresh);
    setFood(nextFood);
    setScore(0);
    directionRef.current = "RIGHT";
    setDirection("RIGHT");
    setOver(false);
    setPlaying(true);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const keys: Record<string, Direction> = {
        ArrowUp: "UP", w: "UP", W: "UP",
        ArrowDown: "DOWN", s: "DOWN", S: "DOWN",
        ArrowLeft: "LEFT", a: "LEFT", A: "LEFT",
        ArrowRight: "RIGHT", d: "RIGHT", D: "RIGHT",
      };
      const next = keys[event.key];
      if (next) {
        event.preventDefault();
        turn(next);
      }
      if ((event.key === " " || event.key === "Enter") && !playing && !over) {
        event.preventDefault();
        start();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [turn, playing, over, start]);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      const currentSnake = snakeRef.current;
      const head = currentSnake[0];
      const dir = directionRef.current;
      const next: Point = {
        x: head.x + (dir === "RIGHT" ? 1 : dir === "LEFT" ? -1 : 0),
        y: head.y + (dir === "DOWN" ? 1 : dir === "UP" ? -1 : 0),
      };
      const currentFood = foodRef.current;
      const eating = next.x === currentFood.x && next.y === currentFood.y;
      const body = eating ? currentSnake : currentSnake.slice(0, -1);
      if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS ||
          body.some((part) => part.x === next.x && part.y === next.y)) {
        setPlaying(false);
        setOver(true);
        return;
      }
      const moved = [next, ...currentSnake.slice(0, eating ? currentSnake.length : -1)];
      snakeRef.current = moved;
      setSnake(moved);
      if (eating) {
        setScore((value) => value + 1);
        const nextFood = randomFood(moved);
        foodRef.current = nextFood;
        setFood(nextFood);
      }
    }, 145);
    return () => clearInterval(timer);
  }, [playing]);

  const occupied = new Set(snake.map((part) => `${part.x},${part.y}`));
  const head = snake[0];

  return (
    <div className="snake-game">
      <div className="snake-hud">
        <div><span>APPLES</span><strong>{String(score).padStart(2, "0")}</strong></div>
        <div><span>STATUS</span><strong className="snake-status">{playing ? "IN PLAY" : over ? "GAME OVER" : "READY"}</strong></div>
        <div><span>BEST EFFORT</span><strong>{String(score).padStart(2, "0")}</strong></div>
      </div>
      <div className="snake-board-wrap">
        <div className="snake-board" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }} role="img" aria-label={`Snake game board. Score ${score}.`}>
          {Array.from({ length: COLS * ROWS }, (_, index) => {
            const x = index % COLS;
            const y = Math.floor(index / COLS);
            const isHead = head.x === x && head.y === y;
            const isBody = occupied.has(`${x},${y}`) && !isHead;
            const isFood = food.x === x && food.y === y;
            return <span key={index} className={`snake-cell${isHead ? " snake-head" : ""}${isBody ? " snake-body" : ""}${isFood ? " snake-food" : ""}`} />;
          })}
          {!playing && (
            <div className="snake-overlay">
              <span className="snake-overlay-icon">{over ? "×" : "↗"}</span>
              <p className="eyebrow">{over ? "RUN ENDED" : "MINI GAME / 002"}</p>
              <h3>{over ? `Score: ${score}` : "Classic snake."}</h3>
              <p>{over ? "One more round? Try to beat your score." : "Collect the glowing pixels. Don’t hit the walls or your own tail."}</p>
              <button className="game-start-button" onClick={start}>{over ? "PLAY AGAIN ↗" : "START SNAKE ↗"}</button>
            </div>
          )}
        </div>
      </div>
      <div className="snake-controls" aria-label="Snake direction controls">
        <button onClick={() => turn("UP")} aria-label="Move up">↑</button>
        <div><button onClick={() => turn("LEFT")} aria-label="Move left">←</button><button onClick={() => turn("DOWN")} aria-label="Move down">↓</button><button onClick={() => turn("RIGHT")} aria-label="Move right">→</button></div>
      </div>
      <div className="game-foot"><span><i /> {playing ? `SNAKE IS MOVING ${direction}` : "ARROW KEYS / WASD / TOUCH CONTROLS"}</span><span>COLLECT. GROW. DON’T CRASH.</span></div>
    </div>
  );
}
