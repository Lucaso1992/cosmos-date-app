// import React, { Component } from "react";

const CloudinaryUploadWidget = ({onHandleImageUpload}) => {
   
    const cloudName = "ddpsqyjbc"; // replace with your own cloud name
    const uploadPreset = "geeft3j6"; // replace with your own upload preset

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          // console.log("Done! Here is the image info: ", result.info);
          onHandleImageUpload(result.info.secure_url)
          // document
          //   .getElementById("uploadedimage")
          //   .setAttribute("src", result.info.secure_url);
        }
      }
    );
  
    return (
      <button type="button" onClick={ () => myWidget.open()} id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    );
  }

export default CloudinaryUploadWidget;