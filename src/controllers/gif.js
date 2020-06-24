import { Pool } from 'pg';
// import multer from 'multer';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import conf from '../config';

dotenv.config();
const pool = new Pool({
  connectionString: conf.DATABASE_URL,
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function postGif(req, res) {
  const { title, image } = req.body;
  const upload = await cloudinary.v2.uploader.upload(image);
  const insertGifQuery = `INSERT INTO gifs (title, cloudinary_id, gif_url) VALUES ($1, $2, $3)`;
  const values = [title, upload.public_id, upload.secure_url];
  await pool.query(insertGifQuery, values);
  try {
    res.status(201).json({
      status: 'success',
      data: {
        message: 'Gif uploaded successfully!',
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      Error: 'Gif upload failed!',
    });
  }
}
async function getGif(req, res) {
  // eslint-disable-next-line camelcase
  const { cloudinary_id } = req.params;
  const getGifQuery = `SELECT * FROM gifs WHERE cloudinary_id = $1`;
  // eslint-disable-next-line camelcase
  const value = [cloudinary_id];
  const results = await await pool.query(getGifQuery, value);
  const data = results.rows;
  if (results.rowCount < 1) {
    res.status(404).json({
      status: 'error',
      Error: 'No gif found!',
    });
  } else {
    try {
      res.status(201).json({
        status: 'success',
        data,
      });
    } catch (error) {
      res.status(404).json({
        status: 'error',
        Error: 'No article found!',
      });
    }
  }
}

async function updateGif(req, res) {
  const { title, image } = req.body;
  // eslint-disable-next-line camelcase
  const { cloudinary_id } = req.params;
  const upload = await cloudinary.v2.uploader.upload(image);
  const updateGifQuery = `UPDATE gifs SET title = $1, cloudinary_id = $2, gif_url = $3 WHERE cloudinary_id = $4`;
  // eslint-disable-next-line camelcase
  const values = [title, upload.public_id, upload.secure_url, cloudinary_id];
  const checkField = title && image;
  if (!checkField) {
    res.status(400).json({
      status: 'error',
      Error: 'No gif updated!',
    });
  } else {
    await pool.query(updateGifQuery, values);
    try {
      res.status(201).json({
        status: 'success',
        data: {
          message: 'Gif updated successfully!',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
async function deleteGif(req, res) {
  const deleteGifQuery = `DELETE FROM gifs WHERE cloudinary_id = $1`;
  // eslint-disable-next-line camelcase
  const { cloudinary_id } = req.params;
  // eslint-disable-next-line camelcase
  const value = [cloudinary_id];
  await pool.query(deleteGifQuery, value);
  try {
    res.status(201).json({
      status: 'success',
      data: {
        message: 'Gif deleted successfully!',
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      Error: 'No gif found!',
    });
  }
}
async function getAllGifs(req, res) {
  const getAllGifsQuery = `SELECT * FROM gifs`;
  const results = await pool.query(getAllGifsQuery);
  const data = results.rows;

  try {
    res.status(201).json({
      status: 'success',
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      Error: 'No article found!',
    });
  }
}
export default { postGif, getGif, updateGif, deleteGif, getAllGifs };
