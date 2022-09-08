import React from 'react'
import { Link } from 'react-router-dom';

function Pagination(props) {
  return (
    <>
      <div>
        <p>Page: {props.page} Total pages: {props.lastpage}</p>
        <div className='buttons'>{props.page > 1 &&
          <Link to={'/rates/' + (props.page - 1)}><button>Previous</button></Link>
        }
          {props.page < props.lastpage &&
            <Link to={'/rates/' + (props.page - -1)}><button>Next</button></Link>
          }
        </div>
      </div>
    </>
  )
}

export default Pagination