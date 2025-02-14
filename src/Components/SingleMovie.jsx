import React, { useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import InputForm from './InputForm';
import { getGenres } from '../../services/genreService';
import { saveMovie , getMovie} from '../../services/movieService';
import  Joi  from 'joi-browser';

const SingleMovie = () => {
  const { id } = useParams(); // Access the 'id' parameter from the route
  const navigate = useNavigate();
  const [movie , setMovie] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  })
  const [Genres,setGenres] = useState([])
  const [error, setError] = useState({
    title: "",
    genre: "",
    rate: "",
    stock: "",
  });
    
    useEffect(()=>{
      const fetchedGenre = async()=>{
        const {data} = await getGenres();
        setGenres(data)
      }
      const fetchedMovie = async (movieID)=>{
        try{
        const {data : getMov} = await getMovie(movieID)
        setMovie(mapToViewModel(getMov));
        }
        catch(ex){
          if(ex.response && ex.response.status === 404)
            navigate('/NotFound')
        }
      }
      fetchedMovie(id);
      fetchedGenre();
    },[])
    const mapToViewModel = (movie) => ({
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    });  

    const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(1).required().label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(5).required().label("Rate"),
  };
  function validate() {
    const validateError = Joi.validate(movie, schema, { abortEarly: false });
    if (!validateError.error) {
      setError({});
      return true;
    }

    const newError = {};
    validateError.error.details.forEach((err) => {
      newError[err.path[0]] = err.message;
    });
    setError(newError);
    return false;
  }

  async function handelSave(e){
    e.preventDefault()
    if(validate()){
     await saveMovie(movie)
     navigate('/')
    }
    else{
      console.log("Failed")
    }
  }
  
  function handelChange(e) {
    const account = {...movie}
    account[e.target.name] = e.target.value
    setMovie(account)
  }

  return (
    <div>
      <h1 className='m-4'>Movie Details</h1>
      <p className='m-4'>Movie ID: {id}</p>
      <form>
        <InputForm
          name="title"
          label="Title"
          value={movie.title}
          onChange={handelChange}
          error={error.title}
        />
      <div className="m-2 p-3">
        <label htmlFor="genre" className="form-label">Genres</label>
         <select
          className="form-select form-select mb-3 w-25"
          aria-label="Large select example"
          id="genre"
          name="genreId"
          value={movie.genreId}
          onChange={handelChange}
          >
         {Genres.map((genre) => (
          <option value={genre._id} key={genre._id}>
              {genre.name}
          </option>
          ))}
         </select>
         {error.genre && <div className="alert alert-danger w-25">{error.genre}</div>}
      </div>
      <InputForm
        name="numberInStock"
        label="Number In Stock"
        value={movie.numberInStock}
        onChange={handelChange}
        error={error.stock}
      />
      <InputForm
        name="dailyRentalRate"
        label="Rate"
        value={movie.dailyRentalRate}
        onChange={handelChange}
        error={error.rate}
        type="number"
      />
      <button className='btn btn-primary m-4 p-2' onClick={handelSave}>Save</button>
      </form>
    </div>
  );
};

export default SingleMovie;
