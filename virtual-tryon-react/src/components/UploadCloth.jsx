import React from "react";
import heic2any from "heic2any";

const UploadCloth = ({ setCloth, setClothFile }) => {

  const handleClothUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let finalFile = file;

    if (file.type === "image/heic" || file.name.endsWith(".HEIC")) {
      try {
        const converted = await heic2any({
          blob: file,
          toType: "image/jpeg",
        });

        finalFile = new File([converted], "cloth.jpg", { type: "image/jpeg" });

      } catch (err) {
        alert("Could not convert HEIC clothing image");
        return;
      }
    }

    // Preview
    const url = URL.createObjectURL(finalFile);
    setCloth(url);

    // REAL FILE for backend
    setClothFile(finalFile);
  };

  return (
    <div style={{ border: "2px dashed #8fb3ff", padding: 20, marginTop: 20 }}>
      <h3>Upload Clothing Image (T-shirt / Hoodie)</h3>
      <input type="file" accept="image/*" onChange={handleClothUpload} />
    </div>
  );
};

export default UploadCloth;
