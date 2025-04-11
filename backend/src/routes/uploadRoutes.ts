// routes/upload.ts

import express from 'express';
import { upload } from '../middleware/upload';

const router = express.Router();

router.post('/upload', upload.single('image'), async (req: express.Request, res: express.Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded.' });
    return;
  }

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;

  console.log("✅ Image uploaded at:", imageUrl);

  res.json({ imageUrl });
});


export default router;
