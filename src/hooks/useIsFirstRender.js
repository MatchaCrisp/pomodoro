import { useRef, useEffect } from 'react';

export const useIsFirstRender = () => {
  const r = useRef(true);
  useEffect(() => {
    r.current = false;
  }, []);
  return r.current;
};