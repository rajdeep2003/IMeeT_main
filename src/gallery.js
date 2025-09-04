import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// router.get('/:year', async (req, res) => {
//     const { year } = req.params;
//     try {
//       const { data, error } = await supabase.storage.from('gallery').list(year, {
//         limit: 100,
//       });
  
//       if (error) throw error;
  
//       const publicUrls = data
//         .filter(file => file.name.match(/\.(jpg|jpeg|png|webp)$/i))
//         .map(file => {
//           return supabase.storage.from('gallery').getPublicUrl(`${year}/${file.name}`).data.publicUrl;
//         });
  
//       res.status(200).json({ images: publicUrls });
//     } catch (err) {
//       console.error("Error fetching images:", err);
//       res.status(500).json({ error: "Failed to fetch images." });
//     }
// });

router.get('/:year', async (req, res) => {
  const { year } = req.params;

  // Hardcoded image lists
  const images = {
    "2022": [
      "https://your-cdn-or-supabase-link.com/2022/image1.jpg",
      "https://your-cdn-or-supabase-link.com/2022/image2.jpg",
      "https://your-cdn-or-supabase-link.com/2022/image3.png"
    ],
    "2024": [
      "https://ik.imagekit.io/r6iowgnur/2024/IMG_2701.JPG?updatedAt=1756968735717",
      "https://ik.imagekit.io/r6iowgnur/2024/IMG_2690.JPG?updatedAt=1756968734744",
      "https://ik.imagekit.io/r6iowgnur/2024/IMG_2622.JPG?updatedAt=1756968733884",
    ]
  };

  if (images[year]) {
    res.status(200).json({ images: images[year] });
  } else {
    res.status(404).json({ error: "No images found for this year." });
  }
});

  
export default router;