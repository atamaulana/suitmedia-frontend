import { useEffect, useState } from "react";

export default function useScrollDirection() {
  const [direction, setDirection] = useState("up");
  let last = window.scrollY;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setDirection(y > last ? "down" : "up");
      last = y;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return direction;
}
