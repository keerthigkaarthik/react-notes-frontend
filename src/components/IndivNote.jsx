import React from 'react'
import { Link } from 'react-router-dom'

const IndivNote = ({note}) => {

  const getReadableDate = (date) => {
    return new Date(date).toLocaleDateString()
  }

  return (
    <Link to={`/notes/${note.id}`}>
      <div className='notes-list-item'>
        <h3>{note.title}</h3>
        <p><span>{getReadableDate(note.updated)}</span></p>
      </div>
    </Link>
  )
}

export default IndivNote