import React from 'react'
import _ from'lodash'
const Pagination = (props) => {
    const {pageSize , pageCount , handelPageChange , active} = props;
    const count = pageCount / pageSize
    if(count<=1) return null
    const size = _.range(1,count+1)
  return (
<>
    <nav aria-label="Page navigation example">
        <ul className="pagination">
            {size.map((item)=>(
                <li key = {item} className = {item === active ? "page-item active":"page-item"}>
                    <a className="page-link" onClick={()=> handelPageChange(item)}>{item}</a>
                </li>
            ))}
        </ul>
    </nav>
</>
  )
}

export default Pagination
