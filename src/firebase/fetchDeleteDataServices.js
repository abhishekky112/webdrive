import { db } from './firebaseConfig'; // Firebase Firestore configuration
import { collection, query, where, getDocs, addDoc, Timestamp, doc, deleteDoc } from 'firebase/firestore'; // Firestore functions
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'; // Firebase Storage functions
import { toast } from 'react-toastify'; // For toast notifications

/**
 * Fetch user-specific data from Firestore
 * @param {string} userId - The user ID to fetch data for
 * @param {string} collectionName - The name of the collection to fetch data from
 * @returns {Promise<Array>} - A promise that resolves to an array of documents
 */
export const fetchUserData = async (userId, collectionName) => {
  const q = query(collection(db, collectionName), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Delete a file from Firebase Storage and its document from Firestore
 * @param {string} filePath - The path to the file in Firebase Storage
 * @param {string} collectionName - The Firestore collection name
 * @param {string} docId - The document ID in Firestore
 */
export const DeleteData = async (filePath, collectionName, docId) => {
  // Create a promise wrapped in toast.promise for deletion
  const deletePromise = toast.promise(
    (async () => {
      if (["images", "files"].includes(collectionName)) {
        const storage = getStorage();
        const fileRef = ref(storage, filePath);

        // Delete the file from Firebase Storage
        await deleteObject(fileRef);
      }

      // Delete the file document from Firestore
      const fileDocRef = doc(db, collectionName, docId);
      await deleteDoc(fileDocRef);

      return `${collectionName} deleted successfully!`; // Return success message
    })(),
    {
      pending: `Deleting ${collectionName}...`,
      success: (msg) => msg, // Show success message
      error: (err) => err, // Show error message
      autoClose: 2000,
    }
  );
};
