import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

const ViewNotePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const API_BASE = import.meta.env.VITE_API_BASE_URL

  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

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

  const handleDelete = async () => {
    if (!window.confirm('Delete this note?')) return

    try {
      setDeleting(true)
      const response = await fetch(`${API_BASE}/api/notes/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete')

      toast.success('Note deleted')
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{note.title}</h1>
      <p className="whitespace-pre-wrap text-lg">{note.content}</p>

      <div className="flex gap-3">
        <Link className="btn btn-primary" to={`/edit/${note._id}`}>Edit</Link>
        <button onClick={handleDelete} disabled={deleting} className="btn btn-error">
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

export default ViewNotePage
