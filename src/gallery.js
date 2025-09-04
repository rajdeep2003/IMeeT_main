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
    2022: [
      "https://ik.imagekit.io/r6iowgnur/2022/RTM_8126.JPG?updatedAt=1756979162962",
      "https://ik.imagekit.io/r6iowgnur/2022/DSC_0068.JPG?updatedAt=1756979138936",
      "https://ik.imagekit.io/r6iowgnur/2022/DSC_0043.JPG?updatedAt=1756979136876",
      "https://ik.imagekit.io/r6iowgnur/2022/DSC_0161.JPG?updatedAt=1756979136654",
      "https://ik.imagekit.io/r6iowgnur/2022/RTM_7947.JPG?updatedAt=1756979134196"
    ],
    2024: [
      "https://ik.imagekit.io/r6iowgnur/2024/IMG_2701.JPG?updatedAt=1756968735717", //1
      "https://ik.imagekit.io/r6iowgnur/2024/IMG_2690.JPG?updatedAt=1756968734744", //2
      "https://ik.imagekit.io/r6iowgnur/2024/IMG_2622.JPG?updatedAt=1756968733884",
      "https://ik.imagekit.io/r6iowgnur/2024/IMG_2607.JPG.~tmp?updatedAt=1756968733957",
      "https://ik.imagekit.io/r6iowgnur/2024/IMG_2670.JPG?updatedAt=1756968732996",
      "https://ik.imagekit.io/r6iowgnur/2024/IMG_2617.JPG?updatedAt=1756968732507",
      "https://ik.imagekit.io/r6iowgnur/2024/IMG_2277.JPG?updatedAt=1756968717759",
      "https://ik.imagekit.io/r6iowgnur/2024/DSC_0214.JPG?updatedAt=1756968715459",
      "https://ik.imagekit.io/r6iowgnur/2024/DSC_0256.JPG?updatedAt=1756968715258",
      "https://ik.imagekit.io/r6iowgnur/2024/DSC_0119-1.JPG?updatedAt=1756968710562",
      "https://ik.imagekit.io/r6iowgnur/2024/DSC_0180.JPG?updatedAt=1756968710408",
      "https://ik.imagekit.io/r6iowgnur/2024/IMG_2270.JPG?updatedAt=1756968708656",
      "https://ik.imagekit.io/r6iowgnur/2024/IMG_2269.JPG?updatedAt=1756968702801",
      "https://ik.imagekit.io/r6iowgnur/2024/DSC_0231.JPG?updatedAt=1756968702219",
      "https://ik.imagekit.io/r6iowgnur/2024/DSC_0125.jpg?updatedAt=1756968697505",
      "https://ik.imagekit.io/r6iowgnur/2024/IMG_2261.JPG?updatedAt=1756968691895",
      "https://ik.imagekit.io/r6iowgnur/2024/IMG_20240419_111700635.jpg?updatedAt=1756968675029",
      "https://ik.imagekit.io/r6iowgnur/2024/DSC_0243.JPG?updatedAt=1756968672695",
      "https://ik.imagekit.io/r6iowgnur/2024/DSC_0213-1.JPG?updatedAt=1756968657834",
      "https://ik.imagekit.io/r6iowgnur/2024/DSC_0239.JPG?updatedAt=1756968652002",
      "https://ik.imagekit.io/r6iowgnur/2024/DSC_0241.JPG?updatedAt=1756968651503",
      "https://ik.imagekit.io/r6iowgnur/2024/DSC_0237.JPG?updatedAt=1756968651357",
      "https://ik.imagekit.io/r6iowgnur/2024/DSC_0162-1.JPG?updatedAt=1756968650823",
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
