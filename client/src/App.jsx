import './App.css'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import AddBlog from './pages/AddBlog'
import ViewBlogs from './pages/ViewBlogs'

function App() {

  return (
    <div>
      <Navbar/>
        <Routes>
          <Route Component={AddBlog} path='/add-blog'/>
          <Route Component={ViewBlogs} path='/view-blog'/>
        </Routes>
    </div>
  )
}

export default App
