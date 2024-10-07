import React, { useEffect, useState } from 'react'
import Links from '../Components/Outletcomponents/Links'
import { DeleteData, fetchUserData } from '../firebase/fetchDeleteDataServices';
import { useSelector } from 'react-redux';

export const LinkPage = () => {
  const [linkData, setLinkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userinfo=useSelector(state=>state.user.userInfo);
  const view=useSelector(state=>state.tools.showMode)

  const handleDelete = async (filePath, id) => {
    try {
        console.log(filePath)
        await DeleteData(filePath, 'links', id); // Call your delete function
        setLinkData(linkData => linkData.filter(data => data.id !== id)); // Update local state
    } catch (error) {
        setError('Error deleting note: ' + error.message);
    }
};  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example endpoint; modify according to your real API
        const response = await fetchUserData(userinfo.uid,'links');
    
        
        console.log(response)
        setLinkData(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className='w-full overflow-auto'>
      {linkData.length > 0 ? (
        linkData.map((x, i) => <Links data={x} deleteLink={handleDelete} view={view} key={i} />)
      ) : (
        <div>No links available</div>
      )}
    </div>
  );
}
