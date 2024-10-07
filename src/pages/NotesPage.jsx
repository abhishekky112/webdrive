import React, { useEffect, useState } from 'react';
import Notes from '../Components/Outletcomponents/Notes';
import { useSelector } from 'react-redux';
import { fetchUserData, DeleteData } from '../firebase/fetchDeleteDataServices'; // Adjust the path as necessary

export const NotesPage = () => {
    const userId = useSelector(state => state.user.userInfo.uid); // Get user ID from state
    const collectionName = "notes"; // Set collection name to "notes"
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const view = useSelector(state=>state.tools.showMode); // State for view mode

    const fetchNotes = async () => {
        try {
            const data = await fetchUserData(userId, collectionName);
            setNotes(data);
        } catch (error) {
            setError('Error fetching notes: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (filePath, id) => {
        try {
            await DeleteData(filePath, collectionName, id); // Call your delete function
            setNotes(prevNotes => prevNotes.filter(note => note.id !== id)); // Update local state
        } catch (error) {
            setError('Error deleting note: ' + error.message);
        }
    };

    

    useEffect(() => {
        if (userId) {
            fetchNotes();
        }
    }, [userId]);

    if (loading) {
        return <div className="text-center text-lg">Loading notes...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col w-full">
         
            <div className='flex flex-wrap gap-4 md:gap-6 self-start'>
            {notes.map((note) => (
                    <Notes key={note.id} data={note} view={view} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};
