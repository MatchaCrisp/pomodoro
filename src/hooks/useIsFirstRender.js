// external
// react
import { useRef, useEffect } from 'react';

// lets component know if this is the very first render
const useIsFirstRender = () => {
  const r = useRef(true);
  useEffect(() => {
    r.current = false;
  }, []);
  return r.current;
};

export default useIsFirstRender;