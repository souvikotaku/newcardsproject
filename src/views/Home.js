import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [sections, setSections] = useState([{ hasChild: false, logo: null }]); // Tracks sections, child status, and logos
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [activeSectionIndex, setActiveSectionIndex] = useState(null); // Track which section's logo is being added

  // Function to toggle a section after a specific index
  const toggleSectionAtIndex = (index) => {
    const newSections = [...sections];

    if (newSections[index].hasChild) {
      // If already has a child, remove it
      newSections.splice(index + 1, 1);
      newSections[index].hasChild = false;
    } else {
      // If no child, add a new section
      newSections.splice(index + 1, 0, { hasChild: false, logo: null });
      newSections[index].hasChild = true;
    }

    setSections(newSections);
  };

  // Handle file upload
  const handleFileUpload = (file) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newSections = [...sections];
        newSections[activeSectionIndex].logo = e.target.result; // Set logo for the active section
        setSections(newSections);
        setIsModalOpen(false); // Close the modal
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid JPG/PNG image.");
    }
  };

  // Handle drag-and-drop
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="proposal-page">
      {/* Left Section */}
      <div className="left-section">
        <div className="scrollable-box">
          {sections.map((section, index) => (
            <div key={index} className="proposal-box">
              {/* Add Logo Section */}
              <div
                className="add-logo"
                onClick={() => {
                  setActiveSectionIndex(index);
                  setIsModalOpen(true);
                }}
              >
                {section.logo ? (
                  <img
                    src={section.logo}
                    alt="Uploaded Logo"
                    className="logo-preview"
                  />
                ) : (
                  "+ Add logo"
                )}
              </div>
              <div className="cover-image">Add cover image</div>
              <div className="prepared-for">Prepared for -</div>
              <input
                type="text"
                className="title-input"
                placeholder="Add title here"
              />
              <p className="description">
                This proposal contains all details relevant to the scope of
                work, pricing, and terms. Please review and continue with your
                signature and approval.
              </p>
              <p className="accept-date">
                Accept before <span>February 21, 2025</span>
              </p>
              <button className="accept-button">Accept</button>
              <div className="footer">
                <span>
                  Starts on <strong>proposal acceptance</strong>
                </span>
                <span>
                  Contract term <strong>12 months</strong>
                </span>
              </div>
              {/* Toggle Button for Adding/Removing Section */}
              <button
                className="add-section-btn"
                onClick={() => toggleSectionAtIndex(index)}
              >
                {section.hasChild ? "-" : "+"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="recipients">
          <h4>Recipients</h4>
          <label>Client *</label>
          <select className="dropdown">
            <option>Select...</option>
          </select>
          <button className="create-client">Create new client</button>
        </div>
        <div className="signers">
          <h4>Signers</h4>
          <label>Client signer *</label>
          <select className="dropdown">
            <option>Select...</option>
          </select>
        </div>
      </div>

      {/* Logo Modal */}
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Logo</h3>
            <p>Recommended size: 400 x 400, 1MB</p>
            <div
              className="drop-area"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              Drop files here
            </div>
            <input
              type="file"
              accept="image/jpeg, image/png"
              style={{ display: "none" }}
              id="fileInput"
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
            <label htmlFor="fileInput" className="from-device">
              From Device
            </label>
            <button
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
