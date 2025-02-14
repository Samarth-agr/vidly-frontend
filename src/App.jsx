import { useEffect, useState } from 'react'
import './App.css'
import {getMovies , deleteMovie} from '../services/movieService'
import Pagination from './Components/Pagination'
import paginate from './util/paginate'
import ListGroup from './Components/ListGroup'
import listGroup from './util/listGroup'
import _ from 'lodash'
import MovieTable from './Components/MovieTable'
import NavBar from './Components/NavBar'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getCurrentUser } from '../services/authService'

function App() {
  const pageSize = 4;
  const [AllMovies, setAllMovies] = useState([])
  const [Movies , setMovies] = useState([])
  const [active , setActive] = useState(1)
  const [groupActive , setGroupActive] = useState("AllItem")
  const [sortOrder , setSortOrder] = useState("asc")
  const [searchQuery , setSearchQuery] = useState("")
  const [user , setUser] = useState() //will store the logged user


  useEffect(()=>{
    const user = async()=>{
      const currentUser = await getCurrentUser();
      setUser(currentUser) 
    }
    const fetchedMovie = async()=>{
      const {data} = await getMovies()
      setAllMovies(data)
      setMovies(data)
    }

    user();
    fetchedMovie()
  },[])

  function handelPageChange(page){
    setActive(page)
  }

  async function handelDelete(id) {
    const originalMovies = [...AllMovies];
    const deletedMovies = AllMovies.filter(movie => movie._id !== id);
    
    setAllMovies(deletedMovies);
    setMovies(deletedMovies);
  
    try {
      await deleteMovie(id);
    } catch (err) {
      toast.error("You don't have permission to delete this movie.");
      
      setAllMovies(originalMovies);
      setMovies(originalMovies);
    }
  
    if (groupActive !== "AllItem") {
      const groupMovie = listGroup({ name: groupActive, AllMovies: deletedMovies });
      setMovies(groupMovie);
    }
  }
  

  function handelGroup(name){
      setSearchQuery("")
      setGroupActive(name)
      setActive(1)
      const groupMovie = listGroup({name , AllMovies})
      setMovies(groupMovie)
  }

  function handelSort(name){
    const sorted = _.orderBy(AllMovies , [name], [sortOrder])
    setAllMovies(sorted)
    sortOrder === 'asc' ? setSortOrder("desc") : setSortOrder("asc")
    groupActive === "AllItem" ? setMovies(sorted) : setMovies(listGroup({name : groupActive , AllMovies : sorted}))
  }

  function handelChange(e){
    const query = e.currentTarget.value.toLowerCase()
    setSearchQuery(query)
    setGroupActive(null)
    setActive(1)
    const filteredMovies = AllMovies.filter((m) =>
      m.title.toLowerCase().startsWith(query)
    );
    setMovies(filteredMovies)
  }

  const movie = paginate({pageSize , active , Movies})


  if(getMovies().length === 0) return "No data in db" 
  return (
    <>
      <ToastContainer/>
      <NavBar user = {user}/>
        <div className='d-flex m-4'>
          <ListGroup handelGroup = {handelGroup} active = {groupActive}/>
           <div className='d-flex flex-column flex-fill'>
          {user &&
           <div className="d-inline-block">
            <Link to = "/movie/new" className="btn btn-primary m-2">Add Movie</Link>
           </div>}
           <div>
            <label htmlFor='search'></label>
            <input type='text' className='form-control' placeholder='Search...' id='search' value={searchQuery} onChange={handelChange}></input>
           </div>
           <p className='m-2'>Showing {Movies.length} in Database</p>
            <MovieTable handelSort = {handelSort} movie = {movie} handelDelete = {handelDelete} user = {user}/>
            <Pagination pageSize = {pageSize} pageCount = {Movies.length} handelPageChange = {handelPageChange} active = {active}/>
           </div>
        </div>
    </>
  );
}

export default App
