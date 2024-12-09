import {useNavigate} from 'react-router-dom';
function Navbar (){
    const navigate = useNavigate();
    return <div>
        <nav>
            <button onClick={() => navigate('/')}>Blog Application</button>
            <button onClick={() => navigate('/add-blog')}>Add Blog</button>
            <button onClick={() => navigate('/view-blog')}>View Blogs</button>
        </nav>
    </div>
}

export default Navbar;