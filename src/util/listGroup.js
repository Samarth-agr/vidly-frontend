
const listGroup = (props) => {
  const {name , AllMovies} = props
  if(name === "AllItem") return AllMovies
  return AllMovies.filter((movie)=>(
      movie.genre.name === name
    ))
}

export default listGroup
