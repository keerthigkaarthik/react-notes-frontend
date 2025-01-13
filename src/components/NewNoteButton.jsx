import React from 'react'
import { Link } from 'react-router-dom'

const NewNoteButton = () => {
  return (
    <div>
        <Link to="/newnote" className='floating-button'>
            <span>+</span>
        </Link>
    </div>
  )
}

export default NewNoteButton