import React from 'react'
import { Link } from 'react-router-dom'

const NoteCard = ({ note, onDelete, isDeleting }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const truncateContent = (content, maxLength = 100) => {
    if (!content) return 'No content'
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  const handleDelete = () => {
    if (note && note._id) {
      onDelete(note._id)
    }
  }

  if (!note) return null

  return (
    <div className="card bg-base-100 w-full shadow-sm">
      <div className="card-body">
        <h2 className="card-title text-primary">{note.title || 'Untitled'}</h2>
        <p className="text-base-content/70">
          {truncateContent(note.content)}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs opacity-60">
            {formatDate(note.updatedAt || note.createdAt)}
          </span>
          <div className="card-actions justify-end">
            <Link to={`/note/${note._id}`} className="btn btn-ghost btn-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Link>
            <Link to={`/edit/${note._id}`} className="btn btn-ghost btn-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Link>
            <button 
              onClick={handleDelete}
              className="btn btn-ghost btn-sm text-error"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteCard