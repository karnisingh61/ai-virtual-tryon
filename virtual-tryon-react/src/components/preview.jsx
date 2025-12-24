import React from "react";

const Preview = ({ image, cloth }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Preview</h2>

      {/* USER PHOTO */}
      <div style={{ marginBottom: 20 }}>
        <h4>Your Uploaded Photo</h4>
        <div style={{
          width: "300px",
          height: "300px",
          background: "#000",
          margin: "auto",
          borderRadius: "10px",
          overflow: "hidden",
        }}>
          {image && (
            <img
              src={image}
              alt="user"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
              }}
            />
          )}
        </div>
      </div>

      {/* CLOTHING PHOTO */}
      <div>
        <h4>Clothing Preview</h4>
        <div style={{
          width: "300px",
          height: "300px",
          background: "#000",
          margin: "auto",
          borderRadius: "10px",
          overflow: "hidden",
        }}>
          {cloth && (
            <img
              src={cloth}
              alt="cloth"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
