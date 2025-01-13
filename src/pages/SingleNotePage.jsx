import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import getCsrfToken from '../utils/getCsrfToken'

const SingleNotePage = () => {
    const { id } = useParams()
    const [note, setNote] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getNote()
    }, [id])

    const getNote = async () => {
        try {
            const response = await fetch(`/api/notes/${id}`)
            if (!response.ok) {
                throw new Error('Failed to fetch note')
            }
            const data = await response.json()
            setNote(data)
        } catch (error) {
            console.error('Error fetching note:', error)
            navigate('/')
        }
    }

    const updateNote = async () => {
        if (isSubmitting) return

        setIsSubmitting(true)
        try {
            const defaultTitleNote = {
                ...note,
                title: note.title.trim() || 'No title'
            }

            const response = await fetch(`/api/notes/${id}/update`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken()
                },
                body: JSON.stringify(defaultTitleNote)
            })

            if (!response.ok) {
                throw new Error('Failed to update note')
            }

            await response.json() // Wait for the response
        } catch (error) {
            console.error('Error updating note:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const deleteNote = async () => {
        if (isSubmitting) return

        setIsSubmitting(true)
        try {
            const response = await fetch(`/api/notes/${id}/delete`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken()
                },
            })

            if (!response.ok) {
                throw new Error('Failed to delete note')
            }
            
            navigate('/', { state: { refresh: true } })
        } catch (error) {
            console.error('Error deleting note:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleBack = async () => {
        if (!note.body?.trim() && !note.title?.trim()) {
            await deleteNote()
        } else {
            await updateNote()
            navigate('/', { state: { refresh: true } })
        }
    }

    if (!note) return null

    return (
        <div className='note'>
            <div className='note-header'>
                <h3 onClick={handleBack}>&larr;</h3>
                <button 
                    onClick={deleteNote}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
            <textarea
                className='title-textarea'
                onChange={(e) => setNote({...note, title: e.target.value})}
                value={note?.title || ''}
                placeholder="Untitled Note"
                maxLength={30}
            ></textarea>
            <textarea
                onChange={(e) => setNote({...note, body: e.target.value})}
                value={note?.body || ''}
                placeholder="Start writing here..."
            ></textarea>
        </div>
    )
}

export default SingleNotePage