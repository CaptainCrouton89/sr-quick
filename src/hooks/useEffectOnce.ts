import { useEffect, useRef } from "react";

/**
 * Will run the useEffect only once
 * @param effect callback function
 * @param dependencies dependencies
 */
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

/**
 * Will continue attempting to run the useEffect until the condition is true
 * @param effect callback function
 * @param dependencies dependencies
 * @param condition determines if the effect should run
 */
export const useEffectUntilTrue = (
  effect: React.EffectCallback,
  dependencies: React.DependencyList,
  condition: boolean
) => {
  const ref = useRef(false);
  useEffect(() => {
    if (!ref.current && condition) {
      effect();
      ref.current = true;
    }
  }, dependencies);
};
