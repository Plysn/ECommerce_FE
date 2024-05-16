const GoogleMap = () => {
  return (
    <div className="map-area">
      <div className="maps">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.584020703612!2d105.84117181536226!3d21.00733159376954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5aa71f4f71%3A0x7ca77a2b77e47b23!2zVHLhuqduIMSQ4buRbmcgQuG6r2NoIEtob2E!5e0!3m2!1svi!2sbd!4v1697438624814!5m2!1svi!2sbd"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleMap;
