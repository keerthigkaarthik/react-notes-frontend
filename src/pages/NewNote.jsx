import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getCsrfToken from '../utils/getCsrfToken'

const NewNote = () => {
    const [note, setNote] = useState({
        title: '',
        body: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const createNote = async () => {
        if (isSubmitting) return
        
        setIsSubmitting(true)
        try {
            const defaultTitleNote = {
                ...note,
                title: note.title.trim() || 'No title'
            }

            const response = await fetch(`/api/newnote`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken()
                },
                body: JSON.stringify(defaultTitleNote)
            })

            if (!response.ok) {
                throw new Error('Failed to create note')
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error creating note:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleBack = async (e) => {
        e.preventDefault()
        if (note.body.trim() || note.title.trim()) {
            await createNote()
        }
        navigate('/')
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3 onClick={handleBack}>&larr;</h3>
                <button 
                    onClick={handleBack}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Done'}
                </button>
            </div>
            <textarea
                className='title-textarea'
                onChange={(e) => setNote({...note, title: e.target.value})}
                value={note.title}
                placeholder="Untitled Note"
                maxLength={30}
            ></textarea>
            <textarea
                onChange={(e) => setNote({...note, body: e.target.value})}
                value={note.body}
                placeholder="Start writing here..."
            ></textarea>
        </div>
    )
}

export default NewNote