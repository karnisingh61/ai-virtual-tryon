import React, { useState } from "react";
import "../styles/pro-ui.css";

export default function Home() {
  const [person, setPerson] = useState(null);
  const [cloth, setCloth] = useState(null);
  const [personPreview, setPersonPreview] = useState(null);
  const [clothPreview, setClothPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const pick = (setter, previewSetter) => (e) => {
    const file = e.target.files[0];
    setter(file);
    previewSetter(URL.createObjectURL(file));
  };

  const generateTryOn = async () => {
    if (!person || !cloth) return alert("Upload both images!");
    setLoading(true);
    setResult(null);

    const form = new FormData();
    form.append("person", person);
    form.append("cloth", cloth);

    try {
      const res = await fetch("http://localhost:5000/tryon", {
        method: "POST",
        body: form,
      });
      const blob = await res.blob();
      setResult(URL.createObjectURL(blob));
    } catch (e) {
      alert("Backend error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-ultra text-white fade-slow">

      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-logo">AI Powered Virtual Try-On</div>
      </div>

      {/* HERO SECTION */}
      <div className="text-center pt-28 pb-10">
        <h1 className="text-5xl font-extrabold mb-4">
          Upload, Try & Visualize Clothes in Seconds 👗👕
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Our AI system blends your photo with any outfit using deep-learning
          based virtual try-on technology.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6 pb-20">

        {/* PERSON UPLOAD */}
        <div className="glass p-6 tilt">
          <h2 className="text-2xl font-bold mb-4">Upload Person Img</h2>

          <input
            type="file"
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg"
            onChange={pick(setPerson, setPersonPreview)}
          />

          {personPreview && (
            <img
              src={personPreview}
              className="mt-4 rounded-xl shadow-lg fade-slow"
            />
          )}
        </div>

        {/* CLOTH UPLOAD */}
        <div className="glass p-6 tilt">
          <h2 className="text-2xl font-bold mb-4">Upload Cloth </h2>

          <input
            type="file"
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg"
            onChange={pick(setCloth, setClothPreview)}
          />

          {clothPreview && (
            <img
              src={clothPreview}
              className="mt-4 rounded-xl shadow-lg fade-slow"
            />
          )}
        </div>

        {/* PREVIEW */}
        <div className="glass p-6 tilt">
          <h2 className="text-2xl font-bold mb-4">Preview</h2>

          {personPreview ? (
            <img src={personPreview} className="rounded-xl shadow-lg mb-4 fade-slow" />
          ) : (
            <div className="h-40 loader-glow rounded-xl"></div>
          )}

          {clothPreview ? (
            <img src={clothPreview} className="rounded-xl shadow-lg fade-slow" />
          ) : (
            <div className="h-40 loader-glow rounded-xl"></div>
          )}
        </div>
      </div>

      {/* BUTTON */}
      <div className="text-center mb-16">
        <button onClick={generateTryOn} className="btn-pro">
          {loading ? "Generating..." : "Generate Try-On"}
        </button>
      </div>

      {/* RESULT */}
      <div className="max-w-xl mx-auto glass p-6 tilt mb-20">
        <h2 className="text-2xl font-bold mb-4">Result</h2>

        {loading && <div className="h-80 loader-glow"></div>}

        {result && (
          <img
            src={result}
            className="rounded-xl shadow-2xl fade-slow mx-auto"
          />
        )}
      </div>

      {/* FOOTER */}
      <div className="footer">
        © 2025 Virtual Try-On AI Project | Built by "Karni Singh Shekhawat" 
      </div>
    </div>
  );
}
