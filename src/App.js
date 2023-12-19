// App.js
import React, { useState } from "react";
import html2canvas from "html2canvas";
import CertificateTemplate from "./components/CertificateTemplate";
import hidcoLogo from "./images/hidco-logo.png";

// Dummy participant data
const dummyParticipantData = {
  9875437382: { participantName: "Shri Amarendra Nath Mishra" },
  9475502550: { participantName: "Shri Debasis Sen" },
  // Add more participants as needed
};

const App = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [participantName, setParticipantName] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Simulate fetching participant data based on mobile number
    const data = dummyParticipantData[mobileNumber];

    if (data) {
      setParticipantName(data.participantName);

      // Render the CertificateTemplate component and wait for it to be rendered
      await new Promise((resolve) => setTimeout(resolve, 0));

      // Generate certificate image
      const certificateImage = await generateCertificateImage();

      // Create a download link for the image
      createDownloadLink(certificateImage);
    } else {
      console.error("Participant not found");
      // Handle participant not found error
    }
  };

  const generateCertificateImage = async () => {
    const certificateNode = document.getElementById("certificate");

    // Adjust the scale and use the 'allowTaint' option
    const options = {
      scale: 6, // Increase the scale for higher resolution
      allowTaint: true, // Allow images from other domains to be used
      logging: true,
    };

    return html2canvas(certificateNode, options).then((canvas) => {
      return canvas.toDataURL("image/png");
    });
  };

  // const createDownloadLink = (imageData) => {
  //   const a = document.createElement("a");
  //   a.href = imageData;
  //   a.download = "certificate.png";
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // };

  const createDownloadLink = (imageData) => {
    // Create a button to trigger the download
    const downloadButton = document.createElement("button");
    downloadButton.innerText = "Download Certificate";
    downloadButton.className =
      "block mt-4 bg-gradient-green text-center text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700";
    downloadButton.onclick = () => {
      const a = document.createElement("a");
      a.href = imageData;
      a.download = "certificate.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    // Append the button to the DOM
    const downloadContainer = document.getElementById("download-container");
    downloadContainer.innerHTML = "";
    downloadContainer.appendChild(downloadButton);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-400">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <img className="w-1/2 m-auto mb-3" src={hidcoLogo} alt="hidco" />
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Walkathon: EcoPark Run 2023 Certificate
        </h1>
        <form onSubmit={handleFormSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Enter Mobile Number:</span>
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="mt-1 p-2 w-full rounded-md text-black border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
            />
          </label>
          <button
            type="submit"
            className="bg-gradient-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
          >
            Generate Certificate
          </button>
        </form>

        {participantName && (
          <div className="mt-6">
            <h2 className="text-base font-semibold text-gray-800">
              Certificate of:
            </h2>
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {participantName}
            </h2>

            {/* Include your certificate template here and dynamically insert participantName */}
            <div className="bg-gray-100 rounded-md">
              <CertificateTemplate participantName={participantName} />
            </div>
            {/* Provide a download link for the generated certificate */}
            <div id="download-container">
              <button
                // href="#"
                download="certificate.png"
                className="block mt-4 bg-gradient-green text-center text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
              >
                Download Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
