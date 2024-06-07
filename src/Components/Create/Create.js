import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { storage, firestore } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';


const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(null)
  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext)
  const [nameError, setNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [imageError, setImageError] = useState('');
  const date = new Date();
  const navigate = useNavigate()

  const handleSubmit = () => {
    let valid = true;

    if (!name || name.trim() === ''){
      setNameError('Please enter a name.')
      valid = false;
      return

    }else{
      setNameError('');
    }

    if (!category) {
      setCategoryError('Please enter a category.');
      valid = false;
      return
    } else {
      setCategoryError('');
    }

    if (!price || price <= 0) {
      setPriceError('Please enter a valid price.');
      valid = false;
      return
    } else {
      setPriceError('');
    }

    if (!image) {
      setImageError('Please select an image file.');
      valid = false;
      return
    } else {
      setImageError('');
    }

    if (valid) {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`images/${image.name}`);
      
      imageRef.put(image).then((snapshot) => {
        console.log('Image uploaded successfully!', snapshot);
  
        imageRef.getDownloadURL().then((url) => {
          console.log('Image URL:', url);
          setImageError('');
          firestore.collection('products').add({
            name,
            category,
            price,
            url,
            userId:user.uid,
            createdAt: date.toDateString()
          })
          navigate('/')
          
          
        }).catch((error) => {
          console.error('Error getting the download URL:', error);
        });
      }).catch((error) => {
        console.error('Error uploading image:', error);
      });
    } 
  };

  return (
    <Fragment>
      <Header />
      <div className="container">

        <div className="centerDiv">
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <span className="error">{nameError}</span>}
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
             {categoryError && <span className="error">{categoryError}</span>}

            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input 
            className="input"
             type="number" 
             id="price" 
             name="Price"
             value={price}
              onChange={(e) => setPrice(e.target.value)} />
              {priceError && <span className="error">{priceError}</span>}
            <br />
            
          <br />
          {image && (
            <img
              alt="Posts"
              className="uploadedImage"
              src={URL.createObjectURL(image)}
            />
          )}

            <br />
            <input onChange={(e) => {
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            {imageError && <span className='error'>{imageError}</span>}
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
        </div>
    </Fragment>
  );
};

export default Create;
