import React, { useEffect, useState } from 'react';
import Codes from '../Components/Outletcomponents/Codes';
import { useSelector } from 'react-redux';
import { fetchUserData, DeleteData } from '../firebase/fetchDeleteDataServices'; // Adjust the path as necessary

export const CodePage = () => {
    const userId = useSelector(state => state.user.userInfo.uid); // Get user ID from state
    const collectionName = "codes"; // Set collection name to "codes"
    const [codeData, setCodeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const view = useSelector(state => state.tools.showMode);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) {
                    const data = await fetchUserData(userId, collectionName);
                    console.log(data);
                    setCodeData(data);
                } else {
                    throw new Error('User ID is not defined');
                }
            } catch (err) {
                setError(err.message || 'An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]); // Fetch data when userId changes

    const handleDelete = async (id) => {
        const filePath = `path/to/your/code/${id}`; // Adjust to your file path
        await DeleteData(filePath, collectionName, id);
        setCodeData(prevData => prevData.filter(code => code.id !== id)); // Update local state
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='flex flex-wrap gap-4 md:gap-6 self-start'>
            {codeData.map((code, index) => (
                <Codes key={index} info={code} view={view} onDelete={handleDelete} />
            ))}
        </div>
    );
};
