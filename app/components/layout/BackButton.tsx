import { useNavigate, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Check if the browser has history to go back to
    if (window.history.length > 1) {
      setCanGoBack(true);
    }
  }, [location]);

  const handleBack = () => {
    if (canGoBack) {
      navigate(-1);
    }
  };

  // Do not render the button on the root route "/"
  if (location.pathname === "/") return null;

  return (
    <button
      onClick={handleBack}
      disabled={!canGoBack}
      className={`
        rounded-full
        bg-primary
        flex
        items-center
        justify-center
        ${canGoBack ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
        fixed
        left-4
        top-4
      `}
    >
      <img src="/icons/arrow-back.svg" alt="Back" className="w-12 h-12" />
    </button>
  );
}
