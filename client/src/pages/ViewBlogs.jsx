import { useState,useEffect } from "react";

function ViewBlogs(){
    const [data,setData] = useState([]);
    const [id,SetId] = useState('');
    const [blog,setBlog] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(0);
    const [updateForm, setUpdateForm] = useState({
        id: 0,
        description: '',
        category: ''
    });

    const fetchBlogs = async () => {
        try{
            const response = await fetch('http://localhost:4000/api/actions/',{
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const finalData = await response.json();
            if(response.ok){
                setData(finalData);
            }
        }catch(e){
            console.log('Error'+e);
        }
    }

    useEffect(() => {
        fetchBlogs();
    },[]);

    async function getById() {
        try{
            const response = await fetch(`http://localhost:4000/api/actions/${id}`,{
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const blog = await response.json();
            if(response.ok){
                setBlog(blog);
                SetId('');
            }
        }catch(e){
            console.log('Error'+e)
        }
    }

    async function handleDelete(id){
        // e.preventDefault();
        try{
            console.log(id);
            const response = await fetch(`http://localhost:4000/api/actions/deleteBlog/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }})
            const deleteData = await response.json();
            if(response.ok){
                console.log(deleteData);
                fetchBlogs();
            }
        }catch(e){
            console.log('Error: '+e);
        }
    }

    function handleUpdate(formElement,value){
        setUpdateForm(prev => ({...prev,
            [formElement]:value
        }));
    }

    async function handleSubmit(e,blogId){
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:4000/api/actions/updateBlog',{
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    description: updateForm['description'] || data.find((blog) => blog._id === blogId).description,
                    category: updateForm['category'] || data.find((blog) => blog._id === blogId).category,
                    id: blogId
                })
            })
            const responseUpdate = await response.json();
            console.log(responseUpdate);
            fetchBlogs();
            setShowUpdateForm(null);
        }catch(e){
            console.log('Error: '+e);
        }
    }

    return <div>
        <h1>Blogs</h1>
        {data.length > 0 ? data.map((a) => (
            <div key={a._id}>
                {showUpdateForm === a._id ? (<div>
                    <label>Title: </label><label>{a.title}</label>
                    <input type="text" value={updateForm.description || a.description} onChange={(e) => handleUpdate('description', e.target.value)} />
                    <input type="text" value={updateForm.category || a.category} onChange={(e) => handleUpdate('category',e.target.value)} />
                    <button onClick={(e) => handleSubmit(e,a._id)}>Submit</button>
                </div>) :
                (<div>
                    <label>Title: </label><label>{a.title}</label><br></br><br></br>
                    <label>Description: </label><p>{a.description}</p>
                    <label>Category: </label><label>{a.category}</label><br></br><br></br> 
                    <button onClick={() => {
                        if (window.confirm("Are you sure you want to delete this blog?")) {
                            handleDelete(a.id);
                        }
                    }}>Delete</button>
                    <button onClick={() => setShowUpdateForm(a._id)}>Update</button>
                </div>)
                }
            </div>
        )) : 
        <p>No blogs found</p>}

        <br></br><input type="text" value={id} onChange={(e) => SetId(e.target.value)} placeholder="get the blog by id"/><button onClick={() => getById()}>Get Blog</button>
        {blog ? blog.map((b) => (
            <div key={b.id}>
                <label>Title: </label><label>{b.title}</label><br></br><br></br>
                <label>Description: </label><p>{b.description}</p>
                <label>Category: </label><label>{b.category}</label><br></br><br></br>
            </div>
        )) : <p>No blog found with the id {id}</p> }
    </div>
}

export default ViewBlogs;