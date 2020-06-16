import { Pool } from 'pg';
import config from '../config';

const pool = new Pool({
  connectionString: config.DATABASE_URL,
});

// Create a comment
async function createComment(req, res) {
  const { comment } = req.body;
  const userId = req.user.id;
  const articleId = parseInt(req.params.id, 10);
  const creatCommentQuery = `INSERT INTO comment (article_id,comment, user_id) VALUES ($1, $2, $3)`;
  const checkField = comment && userId;
  // ALTER TABLE comment DROP CONSTRAINT comment_article_id_fkey  const checkField = comment && userId;
  const values = [articleId, comment, userId];
  if (!checkField) {
    res.status(400).json({
      status: 'error',
      Error: 'No comment written!',
    });
  } else {
    await pool.query(creatCommentQuery, values);
    try {
      res.status(201).json({
        status: 'success',
        data: {
          message: 'Comment created successfully!',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
// Edit comment
async function editComment(req, res) {
  const updateCommentQuery = `UPDATE comment SET comment = $1 WHERE id = $2`;
  const commentId = parseInt(req.params.id, 10);
  const { comment } = req.body;
  const checkField = comment && commentId;
  const values = [comment, commentId];
  if (!checkField) {
    res.status(400).json({
      status: 'error',
      Error: 'No comment updated!',
    });
  } else {
    await pool.query(updateCommentQuery, values);
    try {
      res.status(201).json({
        status: 'success',
        data: {
          message: 'Comment updated successfully!',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
async function getAllComments(req, res) {
  const getAllCommentsQuery = `SELECT * FROM comment order by created_at desc`;
  const results = await pool.query(getAllCommentsQuery);
  const data = results.rows;

  try {
    res.status(201).json({
      status: 'success',
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      Error: 'No comment found!',
    });
  }
}

async function deleteComment(req, res) {
  const deleteCommentQuery = `DELETE FROM article WHERE id= $1`;
  const commentId = parseInt(req.params.id, 10);
  const value = [commentId];
  await pool.query(deleteCommentQuery, value);
  try {
    res.status(201).json({
      status: 'success',
      data: {
        message: 'Comment deleted successfully!',
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      Error: 'No comments found!',
    });
  }
}

export default {
  createComment,
  editComment,
  deleteComment,
  getAllComments,
};
