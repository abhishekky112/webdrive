import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify'; // Import toast from React Toastify

/**
 * Function to display notifications
 * @param {string} text - Notification text
 * @param {string} type - Type of notification (success/error)
 */
const showToast = (text, type) => {
  if (type === 'success') {
    toast.success(text);
  } else {
    toast.error(text);
  }
};

/**
 * Submit an image to Firestore and Storage
 * @param {File} imageFile - The image file to be uploaded
 * @param {string} title - Title or name of the image
 * @param {string} userId - The user ID to associate the image with
 */
export const submitImage = async ({imageFile, title, userId}) => {
  const toastId = toast.loading("Uploading image...");

  try {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${userId}/${imageFile.name}`); // Store by user ID

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, imageFile);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);

    // Save the metadata in Firestore
    const docRef = await addDoc(collection(db, 'images'), {
      title,
      url: downloadURL,
      userId,
      createdAt: Timestamp.fromDate(new Date()),
    });

    toast.update(toastId, { render: 'Image added successfully!', type: 'success', isLoading: false, autoClose: 2000 });
    console.log('Image added with ID: ', docRef.id);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error('Error adding image: ', error);
    toast.update(toastId, { render: 'Error adding image: ' + error.message, type: 'error', isLoading: false, autoClose: 2000 });
    throw error; // Rethrow the error for handling in the component
  }
};

/**
 * Submit a file to Firestore and Storage
 * @param {File} file - The file to be uploaded
 * @param {string} title - Title or name of the file
 * @param {string} userId - The user ID to associate the file with
 */
export const submitFile = async ({file, title, userId}) => {
  const toastId = toast.loading("Uploading file...");

  try {
    const storage = getStorage();
    const storageRef = ref(storage, `files/${userId}/${file.name}`); // Store by user ID

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);

    // Save the metadata in Firestore
    const docRef = await addDoc(collection(db, 'files'), {
      title,
      url: downloadURL,
      userId,
      createdAt: Timestamp.fromDate(new Date()),
    });

    toast.update(toastId, { render: 'File added successfully!', type: 'success', isLoading: false, autoClose: 2000 });
    console.log('File added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding file: ', error);
    toast.update(toastId, { render: 'Error adding file: ' + error.message, type: 'error', isLoading: false, autoClose: 2000 });
    throw error;
  }
};

/**
 * Submit a link to Firestore
 * @param {string} title - Title of the link
 * @param {string} url - URL of the link
 * @param {string} userId - The user ID to associate the link with
 */
export const submitLink = async ({title, url, userId,description}) => {
  const toastId = toast.loading("Adding link...");

  try {
    const docRef = await addDoc(collection(db, 'links'), {
      title,
      url,
      userId,
      createdAt: Timestamp.fromDate(new Date()),
      description
    });

    toast.update(toastId, { render: 'Link added successfully!', type: 'success', isLoading: false, autoClose: 2000 });
    console.log('Link added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding link: ', error);
    toast.update(toastId, { render: 'Error adding link: ' + error.message, type: 'error', isLoading: false, autoClose: 2000 });
    throw error;
  }
};

/**
 * Submit a note to Firestore
 * @param {string} title - Title of the note
 * @param {string} content - Content of the note
 * @param {string} userId - The user ID to associate the note with
 */
export const submitNote = async ({title, content, userId}) => {
  const toastId = toast.loading("Adding note...");

  try {
    const docRef = await addDoc(collection(db, 'notes'), {
      title,
      content,
      userId,
      createdAt: Timestamp.fromDate(new Date()),
    });

    toast.update(toastId, { render: 'Note added successfully!', type: 'success', isLoading: false, autoClose: 2000 });
    console.log('Note added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding note: ', error);
    toast.update(toastId, { render: 'Error adding note: ' + error.message, type: 'error', isLoading: false, autoClose: 2000 });
    throw error;
  }
};

/**
 * Submit a code snippet to Firestore
 * @param {Object} codeData - The code data to submit
 * @param {string} codeData.title - The title of the code
 * @param {string} codeData.code - The actual code
 * @param {string} codeData.language - The programming language
 * @param {string} codeData.userId - The user ID associated with the code
 */
export const submitCode = async ({ title, code, language, userId }) => {
  const toastId = toast.loading("Adding code...");

  try {
    const docRef = await addDoc(collection(db, 'codes'), {
      title,
      code,
      language,
      userId,
      createdAt: new Date().toISOString(),
    });

    toast.update(toastId, { render: 'Code added successfully!', type: 'success', isLoading: false, autoClose: 2000 });
    console.log('Code added with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding code:', error);
    toast.update(toastId, { render: 'Error adding code: ' + error.message, type: 'error', isLoading: false, autoClose: 2000 });
    throw error;
  }
};
