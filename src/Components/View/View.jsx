import React, {useEffect, useState, useContext} from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { firestore } from '../../firebase/config';

function View() {

  const [userDetails, setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)
  // const [details, setDetails] = useState()
  useEffect(() => {
    if (postDetails && postDetails.userId) {
      // setDetails(postDetails)
      const { userId } = postDetails;
      console.log('User ID:', userId);
      console.log('Post Details:', postDetails);

      firestore.collection('users').where('id', '==', userId).get()
        .then((res) => {
          if (!res.empty) {
            res.forEach(doc => {
              setUserDetails(doc.data());
            });
          } else {
            console.log('No matching documents found.');
          }
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
    else{
      console.log("ERROROROOROROR");
      
    }
  }, [postDetails]);


  return (
    <div className="viewParentDiv">
      <div className="imageContainer">
        <div className="arrow left">&lt;</div>
        <div className="imageShowDiv">
          <img src={postDetails?.url} alt="" />
        </div>
        <div className="arrow right">&gt;</div>
      </div>
      <div className="detailsSection">
        <div className="productDetails">
          <div className="price">&#x20B9; {postDetails?.price}</div>
          <div className="name">{postDetails?.name}</div>
          <div className="category">{postDetails?.category}</div>
          <div className="date">{postDetails.createdAt}</div>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <div className="sellerStatus">
              <img src="https://statics.olx.in/external/base/img/verified-user-icon.png" alt="verified seller" />
              <span>Verified Seller</span>
            </div>
            <div className="sellerName">{userDetails.username}</div>
            <div className="sellerPhone">{userDetails.phone}</div>
            
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
