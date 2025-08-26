import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import api from '../lib/axios'
import RateLimitedUI from '../components/RateLimitedUI'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'
import toast from 'react-hot-toast'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false) 
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes:", error);

        if (error.response) {
          if (error.response.status === 429) {
            setIsRateLimited(true);
          } else {
            toast.error("Failed to load notes");
          }
        } else {
          toast.error("Network error or server not reachable");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar/>

      {isRateLimited && <RateLimitedUI/>}

      <div className='p-4 mx-auto mt-6 max-w-7xl'>
        {loading && <div className='py-10 text-center text-primary'>Loading notes...</div>}

        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound/>}

        {!loading && notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
