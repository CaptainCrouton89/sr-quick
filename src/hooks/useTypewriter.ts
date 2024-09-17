import { useEffect, useState } from "react";

export const useTypewriter = (
  text: string,
  speed = 100,
  initialDelay = 1000
) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(
        () => {
          setDisplayedText((prev) => prev + text[index]);
          setIndex(index + 1);
        },
        index == 0 ? initialDelay : speed
      );
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return displayedText;
};
