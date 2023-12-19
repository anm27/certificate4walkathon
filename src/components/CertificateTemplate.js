// CertificateTemplate.js
import React from "react";
import certificate from "../images/walkathon-certificate-23.png";

const CertificateTemplate = ({ participantName }) => {
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
          <h2 className="text-gray-900 text-lg font-bold pb-7 capitalize">
            {participantName}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate;
