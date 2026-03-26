import React, { useState, useEffect } from 'react';

const CookieDisclaimer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="cookie-disclaimer">
        <p>We use cookies to improve your experience. By using our website, you agree to our cookie policy.</p>
        <button onClick={acceptCookies}>Accept</button>
      </div>
    )
  );
};

export default CookieDisclaimer;
