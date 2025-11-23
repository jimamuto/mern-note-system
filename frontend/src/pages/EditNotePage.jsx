import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NoteForm from '../components/NoteForm.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import toast from 'react-hot-toast'

const EditNotePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/notes/${id}`)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || 'Failed to fetch note')
        }
        
        const noteData = await response.json()
        setNote(noteData)
      } catch (error) {
        toast.error(error.message || 'Error fetching note')
        console.error('Error:', error)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id, navigate])

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to update note')
      }
      
      toast.success('Note updated successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Error updating note')
      console.error('Error:', error)
      throw error
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!note) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-error">Note not found</h2>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-base-content">Edit Note</h1>
        <p className="text-base-content/70 mt-2">Update your note content</p>
      </div>
      
      <NoteForm 
        initialData={note} 
        onSubmit={handleSubmit} 
        isEditing={true}
      />
    </div>
  )
}

export default EditNotePage