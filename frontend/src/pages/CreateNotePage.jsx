import React from 'react'
import { useNavigate } from 'react-router-dom'
import NoteForm from '../components/NoteForm.jsx'
import toast from 'react-hot-toast'

const CreateNotePage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to create note')
      }
      
      const newNote = await response.json()
      toast.success('Note created successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Error creating note')
      console.error('Error:', error)
      throw error
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-base-content">Create New Note</h1>
        <p className="text-base-content/70 mt-2">Add a new note to your collection</p>
      </div>
      
      <NoteForm onSubmit={handleSubmit} />
    </div>
  )
}

export default CreateNotePage