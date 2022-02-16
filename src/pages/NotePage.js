import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = ({match, history}) => {

    let noteId = match.params.id
    let [note, setNote] = useState(null)


    useEffect(() => {
      getNote()
    }, [noteId])


    // Get Notes
    let getNote = async () => {
      if (noteId === 'new') return
      let response = await fetch(`http://localhost:5000/notes/${noteId}`)
      let data = await response.json()
      setNote(data)
    }


    // Create Notes
    let createNote = async () => {
      await fetch(`http://localhost:5000/notes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...note, 'updated': new Date()})
      })
    }


    // Update Notes
    let updateNote = async () => {
      await fetch(`http://localhost:5000/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...note, 'updated': new Date()})
      })
    }


    // Handle Submission on Updating or Deleting
    let handleSubmit = () => {

      if(noteId !== 'new' && !note.body) {
        deleteNote()
      }else if(noteId!== 'new') {
        updateNote()
      }else if(noteId === 'new' && noteId !== null) {
        createNote()
      }
      
      history.push('/')
    }


    // Delete Notes
    let deleteNote = async () => {
      await fetch(`http://localhost:5000/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      })
      history.push('/')
    }
    

  return (

    <div className='note'>
      <div className='note-header'>

        {/* Arrow Left */}
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>

        {/* Add / Delete Button */}
        {noteId !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ): (
          <button onClick={handleSubmit}>Done</button>
        )}
        

      </div>

        {/* Notes Text Area */}
        <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>

    </div>

  )
}

export default NotePage
