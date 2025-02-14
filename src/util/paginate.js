import _ from 'lodash'
const paginate = (props) => {
    const {pageSize , active , Movies} = props;
    const startIndex = (active-1)*pageSize
    return  _(Movies).slice(startIndex , startIndex + pageSize ).value()
}

export default paginate
