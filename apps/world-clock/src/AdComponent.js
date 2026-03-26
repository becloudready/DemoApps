import React, { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    if (window) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client={process.env.REACT_APP_ADSENSE_CLIENT}
         data-ad-slot={process.env.REACT_APP_ADSENSE_SLOT}
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  );
};

export default AdComponent;
