const CloudinaryUploadWidget = ({onHandleImageUpload}) => {
   
    const cloudName = "dxyd5o0uw"; // replace with your own cloud name
    const uploadPreset = "zkyeilz6"; // replace with your own upload preset

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          onHandleImageUpload(result.info.secure_url)
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