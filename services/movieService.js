import http from "./httpService";

const apiEndpoint ="/movies"
export function getMovies(){
    return http.get(apiEndpoint)
}
export function getMovie(id){
    return http.get(apiEndpoint + '/' + id)
}
export function deleteMovie(id){
    return http.delete(apiEndpoint + '/' + id)
}

export function saveMovie(movie){
    if(movie._id){
        const mapToViewModel = {
            "title": movie.title,
            "genreId": movie.genreId,
            "numberInStock": movie.numberInStock,
            "dailyRentalRate": movie.dailyRentalRate,
          } 

        return http.put(apiEndpoint + '/' + movie._id , mapToViewModel)
    }

    else{
        return http.post(apiEndpoint , movie)
    }
}
