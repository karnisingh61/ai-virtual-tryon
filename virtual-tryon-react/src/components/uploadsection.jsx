import React, { useState } from "react";

function UploadSection() {
  const [person, setPerson] = useState(null);
  const [cloth, setCloth] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTryOn = async () => {
    if (!person || !cloth) {
      alert("Please upload both person and cloth images!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("person", person);
    formData.append("cloth", cloth);

    try {
      const response = await fetch("http://localhost:5000/tryon", {
        method: "POST",
        body: formData,
      });

      const blob = await response.blob();
      setOutput(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Try-On failed:", error);
      alert("Error running try-on. Check backend.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>AI Virtual Try-On</h2>

      <div>
        <label>Upload Person Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPerson(e.target.files[0])}
        />
      </div>

      <div>
        <label>Upload Cloth Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCloth(e.target.files[0])}
        />
      </div>

      <button onClick={handleTryOn}>Try On</button>

      {loading && <p>Processing... Please wait.</p>}

      <div style={{ marginTop: "20px" }}>
        {output && (
          <>
            <h3>Result:</h3>
            <img src={output} alt="Try-On Result" width="250" />
          </>
        )}
      </div>
    </div>
  );
}

export default UploadSection;
