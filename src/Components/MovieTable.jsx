import React from 'react'
import Movie from '../Movie'
const MovieTable = (props) => {
    const {handelSort , movie , handelDelete , user} = props
  return (
    <table className='table table-secondary table-fixed '>
        <thead>
        <tr>
          <th className= "w-25 user-select-none" onClick={()=> handelSort("title")}>Movie</th>
          <th className= "w-20 user-select-none" onClick={()=> handelSort("genre.name")}>Genre</th>
          <th className= "w-15 user-select-none" onClick={()=> handelSort("numberInStock")}>Stock</th>
          <th className= "w-15 user-select-none" onClick={()=> handelSort("dailyRentalRate")}>Rating</th>
        </tr>
        </thead>
        <tbody>
        {movie.map((movie) =>(
          <Movie 
          id = {movie._id}
          title = {movie.title}
          genre = {movie.genre.name}
          numberInStock = {movie.numberInStock}
          dailyRentalRate = {movie.dailyRentalRate}
          handelDelete = {handelDelete}
          user = {user}
          key = {movie._id}
          />
        ))
      }
      </tbody>
      </table>
  )
}

export default MovieTable
