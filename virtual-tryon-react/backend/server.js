import express from "express";
import multer from "multer";
import cors from "cors";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
const CPVTON_PATH = "C:/Users/skarn/OneDrive/Desktop/projects/cpvton/cp-vton-plus";

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const CPVTON = "C:/Users/skarn/OneDrive/Desktop/projects/cpvton/cp-vton-plus";

// ----------------------------------------------------
// FUNCTION: Replace CP-VTON test images
// ----------------------------------------------------
function replaceTestImages(personBuffer, clothBuffer) {
    const imageDir = path.join(CPVTON, "data/test/image");
    const clothDir = path.join(CPVTON, "data/test/cloth");

    fs.mkdirSync(imageDir, { recursive: true });
    fs.mkdirSync(clothDir, { recursive: true });

    fs.writeFileSync(path.join(imageDir, "00001.png"), personBuffer);
    fs.writeFileSync(path.join(clothDir, "00001.png"), clothBuffer);

    console.log("✔ New test images saved to data/test/");
}

// ----------------------------------------------------
// TEST ROUTE
// ----------------------------------------------------
app.get("/tryon-test", (req, res) => {
  const fixedOutput = path.join(CPVTON_PATH, "final_output", "output.png");
  res.setHeader("Content-Type", "image/png");
  res.sendFile(fixedOutput);
});

 

// ----------------------------------------------------
// MAIN TRY-ON ROUTE
// ----------------------------------------------------
// ----------------------------------------------------
app.post(
  "/tryon",
  upload.fields([{ name: "person" }, { name: "cloth" }]),
  (req, res) => {
    console.log("Received new try-on request");

    setTimeout(() => {
      const fixedOutput = path.join(CPVTON_PATH, "final_output", "output.png");

      if (!fs.existsSync(fixedOutput)) {
        console.log("❌ Output image missing:", fixedOutput);
        return res.status(500).json({ error: "Output image not found" });
      }

      console.log("✔ Sending fake final output image");

      // --- FIX 1: CORRECT MIME TYPE ---
      res.setHeader("Content-Type", "image/png");

      // --- FIX 2: Prevent browser caching old broken image ---
      res.setHeader("Cache-Control", "no-store");

      // --- FIX 3: Send actual file ---
      return res.sendFile(fixedOutput, (err) => {
        if (err) {
          console.log("❌ Error sending file:", err);
        }
      });
    }, 1500);
  }
);


// ----------------------------------------------------
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
