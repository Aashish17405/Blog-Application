const Blog = require('../models/Blog');

const getBlogs = async (req,res) => {
    try{
        console.log("getBlogs called")
        const blogs = await Blog.find({});
        if(!blogs){
            res.status(404).json({message: "No blog found"});
        }
        res.status(200).json(blogs)
    }catch(e){
        console.log("Error:" + e);
        res.status(500).json({message:"Server Error"});
    }
}

const getBlogsByID = async (req, res) => {
    try{
        console.log(req.params.id)
        const blogId = req.params.id;
        const blog = await Blog.find({id: blogId});
        if(!blog){
            res.status(404).json({message: "no blog found with the id"})
        }
        res.status(200).json(blog);
    }catch(e){
        console.log("Error: " + e);
        res.status(500).json({message: "Server Error"})
    }
}

const createBlog = async (req,res) => {
    try{
        console.log("createBlog called")
        const { title, description, category, id } = req.body;
        const newBlog = new Blog({ id, title,description, category });
        await newBlog.save();
        res.status(201).json(newBlog);
    }catch(e){
        console.log("Error: " + e);
        res.status(500).json({message: "Server Error"})
    }
}

const updateBlog = async (req,res) => {
    try{
        console.log(req.body);
        const { description, category, id } = req.body;
        const updatedBlog = await Blog.findOneAndUpdate({_id: id}, {$set:{description: description, category: category}},{new: true});
        if(!updateBlog){
            res.status(404).json({message: "Couldn't find and Update"})
        }
        res.status(200).json({message: "Succesfully updated the blog"});
    }catch(e){
        console.log('Error: '+e);
        res.status(500).json({message: "Server Error"})
    }
}

const deleteBlog = async (req,res) => {
    try{
        console.log(req.params);
        const id = req.params.id;
        // console.log(id)
        const deletedBlog = await Blog.findOneAndDelete({id: id});
        if(!deletedBlog){
            res.status(404).json({message: "Couldn't find and delete"})
        }
        res.status(200).json({message: "Succesfully deleted the blog"});
    }catch(e){
        console.log('Error: '+e);
        res.status(500).json({message: "Server Error"})
    }
}


module.exports = {
    getBlogs,
    getBlogsByID,
    createBlog,
    deleteBlog,
    updateBlog
}