import { useState,useEffect } from 'react'

function AddBlog(){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:4000/api/actions/createBlog',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    category
                })
            });
            if(response.ok){
                setTitle('');
                setCategory('');
                setDescription('');
                alert('Succesfully created new blog');
            }
        }catch(e){
            alert('error creating new blog')
            console.log('Error!'+e);
        }
    }

    return <div>
        <h1>Add Blog</h1>
        <form onSubmit={handleSubmit}>
            <label>Title: </label><input type="text" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="title of the blog"/><br></br>
            <label>Description: </label><textarea type="textbox" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Description of the blog"/><br></br>
            <label>Category: </label><input type="text" onChange={(e) => setCategory(e.target.value)} value={category} placeholder="Category of the blog"/><br></br>
            <button>Create</button>
        </form>
    </div>
}

export default AddBlog;