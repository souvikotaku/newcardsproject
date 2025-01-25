import React, { useState } from "react";
import "./Home.css";
import { FiFilter, FiUpload, FiPlus } from "react-icons/fi"; // Import the filter icon
import { HiOutlineUserGroup, HiOutlineCalendar } from "react-icons/hi";
import { TbCards, TbCalendarUser, TbTrash } from "react-icons/tb";
import { LuArrowUpDown, LuCalendarCheck2 } from "react-icons/lu";
import { FaRegFolder } from "react-icons/fa";
import { IoHourglassOutline, IoFilmOutline } from "react-icons/io5";
import { GoStack } from "react-icons/go";
import { BiImage, BiVideo, BiHeart } from "react-icons/bi";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // Import the CSS for styling

const Home = () => {
  const [sections, setSections] = useState([
    {
      hasChild: false,
      logo: null,
      coverImage: null,
      isPopupOpen: false,
      islogoPopupOpen: false,
    },
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
        islogoPopupOpen: false,
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

  const togglelogoPopup = (index) => {
    const newSections = [...sections];
    newSections[index].islogoPopupOpen = !newSections[index].islogoPopupOpen;
    setSections(newSections);
  };

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        backgroundColor: "#fceefc",
      }}
    >
      <div className="proposal-page">
        {/* Left Section */}
        <div className="left-section">
          <div className="scrollable-box">
            {sections.map((section, index) => (
              <>
                <div key={index} className="proposal-box">
                  {/* Remove Button */}
                  {index !== 0 && (
                    <>
                      <RxCross1
                        className="remove-section-btn"
                        data-tooltip-id="remove-tooltip" // Add this to link with Tooltip
                        data-tooltip-content="Remove Section" // Tooltip content
                        onClick={() => removeSectionAtIndex(index)}
                      />
                      <Tooltip id="remove-tooltip" place="top" />
                    </>
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
                        // setIsLogoModalOpen(true);
                        togglelogoPopup(index);
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
                              marginTop: "5px",
                              marginBottom: "5px",
                            }}
                          >
                            <FiPlus size={30} />
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
                    {section.islogoPopupOpen && (
                      <div className="modal-content-logo">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            cursor: "pointer",
                          }}
                        >
                          <h3>Logo</h3>
                          <h3
                            onClick={() => {
                              togglelogoPopup(index);
                            }}
                          >
                            Hide
                          </h3>
                        </div>

                        <p>Recommended size: 400 x 400, 1MB</p>
                        <div
                          className="drop-area"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleDrop(e, "logo")}
                        >
                          <div className="uploadicondiv">
                            <p className="uploadlogo">
                              <FiUpload size={30} color="black" />
                            </p>
                            Drop files here
                          </div>
                        </div>
                        <input
                          type="file"
                          accept="image/jpeg, image/png"
                          style={{ display: "none" }}
                          id="fileInputLogo"
                          onChange={(e) => {
                            handleFileUpload(e.target.files[0], "logo");
                            // const newSections = [...sections];
                            // newSections[index].islogoPopupOpen = false;
                            // setSections(newSections);
                            togglelogoPopup(index);
                          }}
                        />
                        <div
                          style={{
                            flexDirection: "column",
                            display: "flex",
                          }}
                        >
                          <div className="fromdevicediv">
                            <p className="fromdevicepara">
                              <FaRegFolder size={20} />
                            </p>

                            <label
                              htmlFor="fileInputLogo"
                              className="from-device"
                            >
                              From Device
                            </label>
                          </div>

                          {sections[activeSectionIndex]?.logo && (
                            <button
                              className="removebutton"
                              onClick={() => {
                                const newSections = [...sections];
                                newSections[activeSectionIndex].logo = null;
                                setSections(newSections);
                              }}
                            >
                              <p
                                style={{
                                  marginRight: "10px",
                                }}
                              >
                                <TbTrash size={20} />
                              </p>
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    )}

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
                    <input
                      style={{
                        width: "fit-content",
                      }}
                      type="text"
                      className="title-input"
                      placeholder="Add Title here"
                    />
                  </div>
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
                      placeholder="Add description here"
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
                      Accept before{" "}
                      <span
                        style={{
                          marginLeft: "5px",
                        }}
                      >
                        February 21, 2025
                      </span>
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
                      <LuCalendarCheck2
                        size={15}
                        color="gray"
                        style={{
                          marginRight: "5px",
                          marginTop: "-3px",
                        }}
                      />{" "}
                      Starts on{" "}
                      <span
                        style={{
                          marginLeft: "5px",
                        }}
                      >
                        proposal acceptance
                      </span>
                    </p>
                    <p
                      className="accept-date"
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      <IoHourglassOutline
                        size={15}
                        color="gray"
                        style={{
                          marginRight: "5px",
                          marginTop: "-3px",
                        }}
                      />{" "}
                      Contract term{" "}
                      <span
                        style={{
                          marginLeft: "5px",
                        }}
                      >
                        12 months
                      </span>
                    </p>
                  </div>

                  {/* Show Popup */}
                  {section.isPopupOpen && (
                    <div className="options-popup">
                      <div>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "16px",
                            fontWeight: "bold",
                            padding: "10px",
                            marginBottom: "0px",
                            paddingTop: "0px",
                            marginBottom: "10px",
                          }}
                        >
                          Add Section
                        </p>
                      </div>
                      <div
                        className="popup-option"
                        onClick={() => toggleSectionAtIndex(index)}
                      >
                        <span className="popupspan">
                          <HiOutlineBars3BottomLeft className="popup-icon" />
                        </span>
                        <div
                          style={{
                            textAlign: "left",
                            fontSize: "12px",
                          }}
                        >
                          <p
                            style={{
                              marginBottom: "5px",
                              marginTop: "0px",
                            }}
                          >
                            Text and Image
                          </p>
                          <p
                            style={{
                              marginTop: "5px",
                              color: "gray",
                            }}
                          >
                            Use it for About us, Exec. summary etc.
                          </p>
                        </div>
                      </div>
                      <div
                        className="popup-option"
                        onClick={() => toggleSectionAtIndex(index)}
                        style={{
                          paddingTop: "0px",
                          // paddingLeft: "20px",
                        }}
                      >
                        <span className="popupspan">
                          <IoFilmOutline className="popup-icon" />
                        </span>
                        <div
                          style={{
                            textAlign: "left",
                            fontSize: "12px",
                          }}
                        >
                          <p
                            style={{
                              marginBottom: "5px",
                              marginTop: "0px",
                            }}
                          >
                            Media and embed
                          </p>
                          <p
                            style={{
                              marginTop: "5px",
                              color: "gray",
                            }}
                          >
                            Add pitch videos or brochure files
                          </p>
                        </div>
                      </div>
                      <div
                        className="popup-option"
                        onClick={() => toggleSectionAtIndex(index)}
                        style={{
                          paddingTop: "0px",
                          // paddingLeft: "20px",
                        }}
                      >
                        <span className="popupspan">
                          <BiHeart className="popup-icon" />
                        </span>
                        <div
                          style={{
                            textAlign: "left",
                            fontSize: "12px",
                          }}
                        >
                          <p
                            style={{
                              marginBottom: "5px",
                              marginTop: "0px",
                            }}
                          >
                            Testimonials
                          </p>
                          <p
                            style={{
                              marginTop: "5px",
                              color: "gray",
                            }}
                          >
                            Add testimonials from your client
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "fit-content",
                      display: "flex",
                    }}
                  >
                    <button
                      className="add-section-btn"
                      data-tooltip-id={`tooltip-${index}`} // Assign a unique tooltip ID
                      data-tooltip-content={
                        section.hasChild ? "Remove Section" : "Add Section"
                      } // Set tooltip content dynamically
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
                    <Tooltip id={`tooltip-${index}`} place="top" />
                    <button className="add-section-btn-2">
                      <GoStack size={15} />
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        {/* Right Section */}

        <div
          className="right-section"
          style={{
            display: "flex",
          }}
        >
          <div
            className="indisection"
            style={{
              textAlign: "left",
            }}
          >
            <div className="recipients">
              <h4
                style={{
                  marginBottom: "20px",
                }}
              >
                Recipients
              </h4>
              <label
                style={{
                  fontSize: "14px",
                }}
              >
                Client *
              </label>
              <select className="dropdown">
                <option>Select...</option>
              </select>
              <label
                style={{
                  fontSize: "14px",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                Create new client
              </label>
            </div>
            <hr></hr>
            <div className="signers">
              <h4>Signers</h4>
              <label
                style={{
                  fontSize: "14px",
                }}
              >
                Client signer *
              </label>
              <select
                className="dropdown"
                disabled
                style={{
                  background: "#f1f1f1",
                }}
              >
                <option>Select...</option>
              </select>
            </div>
          </div>
          <div className="indisection2">
            <p className="filterpara">
              {" "}
              <HiOutlineUserGroup size={24} className="filter-icon" />
            </p>
            <p className="filterpara">
              {" "}
              <HiOutlineCalendar size={24} className="filter-icon" />
            </p>
            <p className="filterpara">
              {" "}
              <TbCards size={24} className="filter-icon" />
            </p>
            <p className="filterpara">
              {" "}
              <TbCalendarUser size={24} className="filter-icon" />
            </p>
            <p className="filterpara">
              {" "}
              <LuArrowUpDown size={24} className="filter-icon" />
            </p>
          </div>
        </div>

        {/* Cover Image Modal */}
        {isCoverImageModalOpen && (
          <div
            className="modal"
            onClick={() => setIsCoverImageModalOpen(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h3>Cover Image</h3>
                <h3
                  onClick={() => setIsCoverImageModalOpen(false)}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Hide
                </h3>
              </div>
              <p>Recommended size: 1200 x 800, 2MB</p>
              <div
                className="drop-area"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "coverImage")}
              >
                <div className="uploadicondiv">
                  <p className="uploadlogo">
                    <FiUpload size={30} color="black" />
                  </p>
                  Drop files here
                </div>
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
              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                }}
              >
                <div className="fromdevicediv">
                  <p className="fromdevicepara">
                    <FaRegFolder size={20} />
                  </p>

                  <label htmlFor="fileInputCoverImage" className="from-device">
                    From Device
                  </label>
                </div>
                {sections[activeSectionIndex]?.coverImage && (
                  <button
                    className="removebutton"
                    onClick={() => {
                      const newSections = [...sections];
                      newSections[activeSectionIndex].coverImage = null;
                      setSections(newSections);
                    }}
                  >
                    <p
                      style={{
                        marginRight: "10px",
                      }}
                    >
                      <TbTrash size={20} />
                    </p>
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
