// CertificateTemplate.js
import React from "react";
import certificate from "../images/eco-park-run-certificate.png";

const CertificateTemplate = ({ participantName, participantAddress }) => {
  const truncatedAddress =
    participantAddress.length > 30
      ? participantAddress.substring(0, 33) + "..."
      : participantAddress;
  return (
    <div id="certificate">
      {/* Your certificate template HTML goes here */}
      <div className="relative text-center">
        <img
          src={certificate}
          className="w-full object-cover"
          alt="certificate"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="c-cert-text text-cert font-bold pb-24 mb-0.5 ml-3 capitalize">
            {participantName}
          </h2>
        </div>
        <h2 className="absolute bottom-36 ml-20 pl-3 mb-1 c-cert-text text-cert-size font-semibold capitalize">
          {truncatedAddress}
        </h2>
      </div>
    </div>
  );
};

export default CertificateTemplate;
