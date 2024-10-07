import React, { useEffect, useState } from 'react';
import Images from '../Components/Outletcomponents/Images';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { fetchUserData, DeleteData } from '../firebase/fetchDeleteDataServices';

export const ImagePage = () => {
  const [imgData, setImgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const view = useSelector(state=>state.tools.showMode); // State for view type
  const userId = useSelector(state => state.user.userInfo.uid);

  const fetchImgData = async () => {
    try {
      const data = await fetchUserData(userId, 'images');
      setImgData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (storagePath, collectionName, id) => {
    try {
      await DeleteData(storagePath, collectionName, id);
      setImgData(prevData => prevData.filter(image => image.id !== id));
    } catch (error) {
      setError('Failed to delete image: ' + error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchImgData();
    }
  }, [userId]);

  if (loading) {
    return <div className="text-center text-lg">Loading images...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
 
      <div className={classNames('flex flex-wrap justify-center w-full gap-4', { 'flex-col': view === 'list' })}>
        {imgData.length > 0 ? (
          imgData.map(d => (
            <Images data={d} key={d.id} onDelete={handleDelete} view={view} />
          ))
        ) : (
          <div>No images available</div>
        )}
      </div>
    </div>
  );
};
