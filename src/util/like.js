import { getMovie } from "../../services/fakeMovieService"

function like(id) {

  const movie = getMovie(id)  
  return movie.like
}

export default like
