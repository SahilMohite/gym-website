import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
     
className={`fixed bottom-6 right-6 z-50
  !h-12 !w-12 !min-h-0 !min-w-0 !shrink-0
  !rounded-full !aspect-square
  flex items-center justify-center
  border border-orange-500 bg-orange-500 text-white
  shadow-lg transition-all duration-300
  hover:bg-orange-600 hover:border-orange-600
  ${
    visible
      ? "translate-y-0 opacity-100"
      : "pointer-events-none translate-y-4 opacity-0"
  }`}

    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
