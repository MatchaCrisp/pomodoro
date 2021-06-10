import { useRef, useEffect } from 'react';

const useIsFirstRender = () => {
  const r = useRef(true);
  useEffect(() => {
    r.current = false;
  }, []);
  return r.current;
};

export default useIsFirstRender;