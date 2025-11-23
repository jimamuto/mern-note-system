import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NoteList from '../components/NoteList.jsx'
import toast from 'react-hot-toast'

const HomePage = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/notes')
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to fetch notes')
      }
      
      const data = await response.json()
      setNotes(data)
    } catch (error) {
      toast.error(error.message || 'Error fetching notes')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const deleteNote = async (noteId) => {
    try {
      setDeletingId(noteId)
      const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to delete note')
      }
      
      toast.success('Note deleted successfully')
      setNotes(notes.filter(note => note._id !== noteId))
    } catch (error) {
      toast.error(error.message || 'Error deleting note')
      console.error('Error:', error)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-base-content">My Notes</h1>
          <p className="text-base-content/70 mt-2">
            {notes.length} note{notes.length !== 1 ? 's' : ''} created
          </p>
        </div>
        <Link to="/create" className="btn btn-primary btn-lg">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          New Note
        </Link>
      </div>

      <NoteList 
        notes={notes} 
        loading={loading}
        onDeleteNote={deleteNote}
        deletingId={deletingId}
      />
    </div>
  )
}

export default HomePage