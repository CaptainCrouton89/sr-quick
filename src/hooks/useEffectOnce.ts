import { useEffect, useRef } from "react";

export const useEffectOnce = (
  effect: React.EffectCallback,
  dependencies: React.DependencyList
) => {
  const ref = useRef(false);
  useEffect(() => {
    if (!ref.current) {
      effect();
      ref.current = true;
    }
  }, dependencies);
};
