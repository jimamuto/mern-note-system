import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NoteList from '../components/NoteList.jsx'
import toast from 'react-hot-toast'
import { API_URLS } from '../config.js'

const HomePage = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URLS.notes)
      if (!response.ok) throw new Error('Failed to fetch notes')
      const data = await response.json()
      setNotes(data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const deleteNote = async (id) => {
    try {
      setDeletingId(id)
      const response = await fetch(API_URLS.noteById(id), { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete note')
      toast.success('Note deleted')
      setNotes(notes.filter((note) => note._id !== id))
    } catch (error) {
      toast.error(error.message)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Notes</h1>
        <Link to="/create" className="btn btn-primary">New Note</Link>
      </div>

      <NoteList
        notes={notes}
        loading={loading}
        deletingId={deletingId}
        onDeleteNote={deleteNote}
      />
    </div>
  )
}

export default HomePage
