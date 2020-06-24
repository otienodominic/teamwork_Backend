import { Pool } from 'pg';
import config from '../config';

const pool = new Pool({
  connectionString: config.DATABASE_URL,
});

// Create an article;
async function createArticle(req, res) {
  const { content } = req.body;
  const userId = req.user.id;
  const createArtcleQuery = `INSERT INTO article (content, user_id) VALUES ($1, $2)`;
  const values = [content, userId];
  const checkField = content && userId;
  if (!checkField) {
    res.status(400).json({
      status: 'error',
      Error: 'No article written',
    });
  } else {
    await pool.query(createArtcleQuery, values);
    try {
      res.status(201).json({
        status: 'success',
        data: {
          message: 'Article created successfully!',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
// Update article controller
async function updateArticle(req, res) {
  const updateArticleQuery = `UPDATE article SET content = $1 WHERE id = $2`;
  const articleId = parseInt(req.params.id, 10);
  const { content } = req.body;
  const checkField = content && articleId;
  const values = [content, articleId];
  if (!checkField) {
    res.status(400).json({
      status: 'error',
      Error: 'No article updated!',
    });
  } else {
    await pool.query(updateArticleQuery, values);
    try {
      res.status(201).json({
        status: 'success',
        data: {
          message: 'Article updated successfully!',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
// get all articles controller
// https://stackoverflow.com/questions/1035980/update-timestamp-when-row-is-updated-in-postgresql
async function getAllArticles(req, res) {
  const getAllArticlesQuery = `SELECT * FROM article`;
  const results = await pool.query(getAllArticlesQuery);
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
async function getOneArticle(req, res) {
  const articleId = parseInt(req.params.id, 10);
  const getOneArticleQuery = `SELECT * FROM article WHERE id =$1`;
  const value = [articleId];
  const results = await pool.query(getOneArticleQuery, value);
  const data = results.rows;
  if (results.rowCount < 1) {
    res.status(404).json({
      status: 'error',
      Error: 'No article found!',
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
async function deleteArticle(req, res) {
  const deleteArticleQuery = `DELETE FROM article WHERE id= $1`;
  const articleId = parseInt(req.params.id, 10);
  const value = [articleId];
  await pool.query(deleteArticleQuery, value);
  try {
    res.status(201).json({
      status: 'success',
      data: {
        message: 'Article deleted successfully!',
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      Error: 'No article found!',
    });
  }
}
export default {
  createArticle,
  updateArticle,
  getAllArticles,
  getOneArticle,
  deleteArticle,
};
