import React, {useContext, useEffect, useState} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { firestore } from '../../firebase/config';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  // const {} = useContext(FirebaseContext)
  const [products, setProducts] = useState([]);
  const [newproducts, setNewProducts] = useState([]);
  const {setPostDetails} = useContext(PostContext);
  const navigate  = useNavigate()


  useEffect(()=>{
    firestore.collection('products').orderBy('createdAt', 'desc').get().then((snapshot) => {
      const allPost = snapshot.docs.map((product) =>{
        return{
          ...product.data(),
          id:product.id,
        }
      })
      // console.log(allPost)
      setProducts(allPost)

    });

    firestore.collection('products')
    .get()
    .then((snapshot) => {
      const newPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      setNewProducts(newPost);
    });
  },[]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards" >
    {products.map((product) => (
               <div
               onClick={() => {
                setPostDetails(product)
                  navigate('/view')
               }}
               className="card"
             >
               <div className="favorite">
                 <Heart></Heart>
               </div>
               <div className="image">
                 <img src={product.url} alt="" />
               </div>
               <div className="content">
                 <p className="rate">&#x20B9; {product.price}</p>
                 <span className="kilometer">{product.category}</span>
                 <p className="name"> {product.name}</p>
               </div>
               <div className="date">
                 <span>{product.createdAt}</span>
               </div>
             </div>
    ) )
       
          
    }


        </div>



      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">


{
  newproducts.map((product) => (
  
    <div  onClick={() => {
      setPostDetails(product)
        navigate('/view')
     }} className="card">
                    <div className="favorite">
                      <Heart></Heart>
                    </div>
                    <div className="image">
                      <img src={product.url} alt="" />
                    </div>
                    <div className="content">
                 <p className="rate">&#x20B9; {product.price}</p>
                 <span className="kilometer">{product.category}</span>
                 <p className="name"> {product.name}</p>
               </div>
               <div className="date">
                 <span>{product.createdAt}</span>
               </div>
                  </div>
    ))
}


        </div>
      </div>
    </div>
  );
}

export default Posts;
