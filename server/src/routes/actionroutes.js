const express = require('express');
const { getBlogs, getBlogsByID, createBlog, deleteBlog,updateBlog } = require('../controllers/controller');

const router = express.Router();

router.get('/',getBlogs);
router.get('/:id',getBlogsByID);
router.post('/createBlog', createBlog);
router.delete('/deleteBlog/:id', deleteBlog);
router.put('/updateBlog', updateBlog);

module.exports = router;