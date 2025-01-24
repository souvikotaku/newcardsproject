import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [sections, setSections] = useState([
    { hasChild: false, logo: null, coverImage: null, isPopupOpen: false },
  ]);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isCoverImageModalOpen, setIsCoverImageModalOpen] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(null);

  // Function to toggle a section after a specific index
  const toggleSectionAtIndex = (index) => {
    const newSections = [...sections];

    if (newSections[index].hasChild) {
      newSections.splice(index + 1, 1);
      newSections[index].hasChild = false;
    } else {
      newSections.splice(index + 1, 0, {
        hasChild: false,
        logo: null,
        coverImage: null,
        isPopupOpen: false,
      });
      newSections[index].hasChild = true;
    }

    newSections.forEach((section, i) => {
      if (i === index) {
        section.isPopupOpen = false;
      }
    });

    setSections(newSections);
  };

  // Function to remove section at a specific index
  const removeSectionAtIndex = (index) => {
    const newSections = [...sections];

    if (index > 0 && newSections[index - 1].hasChild) {
      newSections[index - 1].hasChild = false;
    }

    newSections.splice(index, 1); // Remove the section at the specified index
    setSections(newSections);
  };

  // Handle file upload (Logo and Cover Image)
  const handleFileUpload = (file, type) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newSections = [...sections];
        if (type === "logo") {
          newSections[activeSectionIndex].logo = e.target.result;
        } else if (type === "coverImage") {
          newSections[activeSectionIndex].coverImage = e.target.result;
        }
        setSections(newSections);
        type === "logo"
          ? setIsLogoModalOpen(false)
          : setIsCoverImageModalOpen(false);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid JPG/PNG image.");
    }
  };

  // Handle drag-and-drop
  const handleDrop = (e, type) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0], type);
    }
  };

  // Toggle popup visibility
  const togglePopup = (index) => {
    const newSections = [...sections];
    newSections[index].isPopupOpen = !newSections[index].isPopupOpen;
    setSections(newSections);
  };

  return (
    <div className="proposal-page">
      {/* Left Section */}
      <div className="left-section">
        <div className="scrollable-box">
          {sections.map((section, index) => (
            <div
              key={index}
              className="proposal-box"
              //   style={{
              //     backgroundImage: section.coverImage
              //       ? `url(${section.coverImage})`
              //       : "none",
              //   }}
            >
              {/* Remove Button */}
              {index !== 0 && (
                <button
                  className="remove-section-btn"
                  onClick={() => removeSectionAtIndex(index)}
                >
                  &times;
                </button>
              )}
              <div
                style={{
                  backgroundImage: section.coverImage
                    ? `url(${section.coverImage})`
                    : "none",
                  padding: "10px",
                }}
              >
                <div
                  className="add-logo"
                  onClick={() => {
                    setActiveSectionIndex(index);
                    setIsLogoModalOpen(true);
                  }}
                >
                  {section.logo ? (
                    <img
                      src={section.logo}
                      alt="Uploaded Logo"
                      className="logo-preview"
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <p
                        style={{
                          lineHeight: "1px",
                        }}
                      >
                        +
                      </p>
                      <p
                        style={{
                          lineHeight: "1px",
                        }}
                      >
                        Add logo
                      </p>
                    </div>
                  )}
                </div>

                {/* Add/Edit Cover Image Section */}
                <div
                  className="add-cover-image"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                  onClick={() => {
                    setActiveSectionIndex(index);
                    setIsCoverImageModalOpen(true);
                  }}
                >
                  {section.coverImage ? (
                    <div className="cover-image-preview editbuttondiv">
                      <p className="edittext">Edit cover image</p>{" "}
                      {/* Option to edit */}
                    </div>
                  ) : (
                    <div className="editbuttondiv">
                      <p className="edittext">Add cover image</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Add Logo Section */}

              {/* Other sections content */}
              <div className="prepared-for">Prepared for -</div>
              <div
                style={{
                  justifyContent: "start",
                  display: "flex",
                }}
              >
                <textarea
                  rows="2"
                  type="text"
                  className="title-input"
                  placeholder="Add title here"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "2%",
                }}
              >
                <p className="accept-date">
                  Accept before <span>February 21, 2025</span>
                </p>
                <button className="accept-button">Accept</button>
              </div>
              <hr></hr>
              <div
                style={{
                  display: "flex",
                  marginTop: "2%",
                }}
              >
                <p className="accept-date">
                  Starts on <span>proposal acceptance</span>
                </p>
                <p
                  className="accept-date"
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Contract term <span>12 months</span>
                </p>
              </div>

              {/* Toggle Button for Adding/Removing Section */}
              <button
                className="add-section-btn"
                onClick={() => {
                  if (section.hasChild) {
                    toggleSectionAtIndex(index);
                  } else {
                    togglePopup(index);
                  }
                }}
              >
                {section.hasChild ? "-" : "+"}
              </button>

              {/* Show Popup */}
              {section.isPopupOpen && (
                <div className="options-popup">
                  <div
                    className="popup-option"
                    onClick={() => toggleSectionAtIndex(index)}
                  >
                    Add Text and Image
                  </div>
                  <div
                    className="popup-option"
                    onClick={() => toggleSectionAtIndex(index)}
                  >
                    Add Media
                  </div>
                  <div
                    className="popup-option"
                    onClick={() => toggleSectionAtIndex(index)}
                  >
                    Add Testimonial
                  </div>
                </div>
              )}
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
      {isLogoModalOpen && (
        <div className="modal" onClick={() => setIsLogoModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Logo</h3>
            <p>Recommended size: 400 x 400, 1MB</p>
            <div
              className="drop-area"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "logo")}
            >
              Drop files here
            </div>
            <input
              type="file"
              accept="image/jpeg, image/png"
              style={{ display: "none" }}
              id="fileInputLogo"
              onChange={(e) => handleFileUpload(e.target.files[0], "logo")}
            />
            <label htmlFor="fileInputLogo" className="from-device">
              From Device
            </label>
            <button
              className="close-modal"
              onClick={() => setIsLogoModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Cover Image Modal */}
      {isCoverImageModalOpen && (
        <div className="modal" onClick={() => setIsCoverImageModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Cover Image</h3>
            <p>Recommended size: 1200 x 800, 2MB</p>
            <div
              className="drop-area"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "coverImage")}
            >
              Drop files here
            </div>
            <input
              type="file"
              accept="image/jpeg, image/png"
              style={{ display: "none" }}
              id="fileInputCoverImage"
              onChange={(e) =>
                handleFileUpload(e.target.files[0], "coverImage")
              }
            />
            <label htmlFor="fileInputCoverImage" className="from-device">
              From Device
            </label>
            <button
              className="close-modal"
              onClick={() => setIsCoverImageModalOpen(false)}
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
