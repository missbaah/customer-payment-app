import { useState, useEffect } from "react";

// custom hook to determine if the screen size is mobile
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 768px)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
};
