import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import IndivNote from '../components/IndivNote'
import NewNoteButton from '../components/NewNoteButton'

const AllNotes = () => {
    const [notes, setNotes] = useState([])
    const location = useLocation()

    useEffect(() => {
        getNotes()
    }, [location.state?.refresh, location.key])

    const getNotes = async () => {
        try {
            const response = await fetch('/api/notes/', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                }
            })
            if (!response.ok) {
                throw new Error('Failed to fetch notes')
            }
            const data = await response.json()
            setNotes(data)
        } catch (error) {
            console.error('Error fetching notes:', error)
        }
    }

    return (
        <div className='notes'>
            <div className='notes-header'>
                <h2 className='notes-title'>&#9782; Notes</h2>
                <p className='notes-count'>{notes.length}</p>
            </div>
            <div className='notes-list'>
                {notes.map((note) => (
                    <IndivNote note={note} key={note.id}/>
                ))}
            </div>
            <NewNoteButton />
        </div>
    )
}

export default AllNotes