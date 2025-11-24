import React from 'react'
import { useNavigate } from 'react-router-dom'
import NoteForm from '../components/NoteForm.jsx'
import toast from 'react-hot-toast'
import { API_URLS } from '../config.js'

const CreateNotePage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(API_URLS.notes, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to create note')

      toast.success('Note created successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-base-content">Create New Note</h1>
      <NoteForm onSubmit={handleSubmit} />
    </div>
  )
}

export default CreateNotePage
