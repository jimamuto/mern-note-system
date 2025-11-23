import React from 'react'
import NoteCard from './NoteCard.jsx'
import LoadingSpinner from './LoadingSpinner.jsx'

const NoteList = ({ notes, loading, onDeleteNote, deletingId }) => {
  if (loading) {
    return <LoadingSpinner />
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-600">No notes yet</h3>
        <p className="text-gray-500">Create your first note to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map(note => (
        <NoteCard 
          key={note._id} 
          note={note} 
          onDelete={onDeleteNote}
          isDeleting={deletingId === note._id}
        />
      ))}
    </div>
  )
}

export default NoteList