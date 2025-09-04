import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);



router.get("/:year", async (req, res) => {
  const { year } = req.params;
  console.log(`[Gallery API] Request received for year: ${year}`);

  // Hardcoded image lists
  const images = {
  "2022": [
    "https://ik.imagekit.io/r6iowgnur/2024/IMG_2701.JPG?updatedAt=1756968735717",
    "https://ik.imagekit.io/r6iowgnur/2024/IMG_2690.JPG?updatedAt=1756968734744",
  ],
  "2024": [
    "https://ik.imagekit.io/r6iowgnur/2024/IMG_2701.JPG?updatedAt=1756968735717",//1
    "https://ik.imagekit.io/r6iowgnur/2024/IMG_2690.JPG?updatedAt=1756968734744",//2
    "https://ik.imagekit.io/r6iowgnur/2024/IMG_2622.JPG?updatedAt=1756968733884", 
    "https://ik.imagekit.io/r6iowgnur/2024/IMG_2607.JPG.~tmp?updatedAt=1756968733957",
    "https://ik.imagekit.io/r6iowgnur/2024/IMG_2670.JPG?updatedAt=1756968732996",
    "https://ik.imagekit.io/r6iowgnur/2024/IMG_2617.JPG?updatedAt=1756968732507",
  ],
};

  if (images[year]) {
    console.log(
      `[Gallery API] Found ${images[year].length} images for year ${year}`
    );
    res.status(200).json({ images: images[year] });
  } else {
    console.warn(`[Gallery API] No images found for year: ${year}`);
    res.status(404).json({ error: "No images found for this year." });
  }
});

export default router;
