import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Joi from 'joi-browser';
import { useNavigate } from 'react-router-dom';
import { getGenres } from '../../services/genreService';
import { getMovies, saveMovie } from '../../services/movieService';
import InputForm from './InputForm';

const MovieForm = () => {
  const [Genres , setGenres] = useState([]);

  useEffect(()=>{
    const fetchGenres = async()=>{
      const {data} = await getGenres()
      setGenres(data)
    }
    fetchGenres();
  })
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    genre: "",
    rate: "",
    stock: "",
  });
  const [error, setError] = useState({
    title: "",
    genre: "",
    rate: "",
    stock: "",
  });

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    stock: Joi.number().min(1).required().label("Number In Stock"),
    rate: Joi.number().min(0).max(5).required().label("Rate"),
  };

  function handelChange(e) {
    const account = { ...data };
    account[e.target.name] = e.target.value;
    setData(account);
  }

  function validate() {
    const validateError = Joi.validate(data, schema, { abortEarly: false });
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

  function mapToview(data) {
    return {
      "title": data.title,
      "genreId": data.genre,
      "numberInStock": data.stock,
      "dailyRentalRate": data.rate,
    };
  }

  function handelSubmit(e) {
    e.preventDefault();
    if (validate()) {
      const save = mapToview(data);
      saveMovie(save);
      navigate('/');
    } 
    else console.log('failed');
  }

  return (
    <>
      <NavBar />
      <h1 className="m-2 p-2">Movie Form</h1>
      <form onSubmit={handelSubmit}>
        <InputForm
          name="title"
          label="Title"
          value={data.title}
          onChange={handelChange}
          error={error.title}
        />
        <div className="m-2 p-3">
          <label htmlFor="genre" className="form-label">Genres</label>
          <select
            className="form-select form-select mb-3 w-25"
            aria-label="Large select example"
            id="genre"
            name="genre"
            value={data.genre}
            onChange={handelChange}
          >
            <option value="">Select a Genre</option>
            {Genres.map((genre) => (
              <option value={genre._id} key={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
          {error.genre && <div className="alert alert-danger w-25">{error.genre}</div>}
        </div>
        <InputForm
          name="stock"
          label="Number In Stock"
          value={data.stock}
          onChange={handelChange}
          error={error.stock}
        />
        <InputForm
          name="rate"
          label="Rate"
          value={data.rate}
          onChange={handelChange}
          error={error.rate}
          type="number"
        />
        <button type="submit" className="btn btn-primary m-4 p-2">
          Save
        </button>
      </form>
    </>
  );
};

export default MovieForm;
