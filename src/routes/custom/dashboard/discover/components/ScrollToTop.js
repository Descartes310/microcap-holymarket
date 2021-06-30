import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <div onClick={scrollToTop} style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            fontSize: 20,
            color: 'black',
            backgroundColor: '#febb3a'
        }}>
          &#8593;
        </div>
      )}
    </div>
  );
}