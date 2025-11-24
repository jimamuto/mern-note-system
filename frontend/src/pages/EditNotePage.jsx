import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NoteForm from '../components/NoteForm.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import toast from 'react-hot-toast'

const EditNotePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const API_BASE = import.meta.env.VITE_API_BASE_URL

  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/notes/${id}`)
        if (!response.ok) throw new Error('Failed to fetch note')

        const data = await response.json()
        setNote(data)
      } catch (error) {
        toast.error(error.message)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id, navigate])

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`${API_BASE}/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to update note')

      toast.success('Note updated successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Edit Note</h1>
      <NoteForm initialData={note} onSubmit={handleSubmit} isEditing />
    </div>
  )
}

export default EditNotePage
