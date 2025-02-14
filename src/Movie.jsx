import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
const Movie = (props) => {
    const {id , title , genre , numberInStock , dailyRentalRate , handelDelete , user} = props
    const [Like , setLike] = useState(false)
  return (
    <>
      <tr key={id}>
           {user && 
           <td>
            <Link to = {`/movie/${id}`} >
              {title}
            </Link>
           </td>
           }
           {!user && 
            <td>{title}</td>
           }
            <td>{genre}</td>
            <td>{numberInStock}</td>
            <td>{dailyRentalRate}</td>
            {
              user && 
              <>
              <td><span onClick={()=> {setLike(!Like)}}>
              {Like ? (<i className="fa-solid fa-heart"></i>) : (<i className="fa-regular fa-heart"></i>)}
              </span>
              </td>
          <td><button className='btn btn-danger' onClick={()=> handelDelete(id)}>Delete</button></td>
              </>
          }
        </tr>
    </>
  )
}

export default Movie
