import React, { useEffect, useState } from 'react'
import  {getGenres}  from '../../services/genreService'
const ListGroup = ({handelGroup, active}) => {
    const [genre , setGenre] = useState([])

    useEffect(()=>{
      const fetchedGenre = async()=>{
        const {data} = await getGenres();
        setGenre(data)
      }
      fetchedGenre();
    },[])
  return (
    <div className='m-2 p-2'>
     <ul className="list-group">
        <li key = "AllItems" className={"AllItem" === active ? "list-group-item active" : "list-group-item"} onClick={() => handelGroup("AllItem")}>All Items</li>
        {genre.map((item)=>(
            <li key = {item.name} className={item.name === active ? "list-group-item active" : "list-group-item"} onClick={() => handelGroup(item.name)}>{item.name}</li>
        ))}
    </ul>
    </div>
  )
}

export default ListGroup
