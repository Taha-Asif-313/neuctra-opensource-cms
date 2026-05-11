import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GoToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null; // nothing to render visually
};

export default GoToTop;
