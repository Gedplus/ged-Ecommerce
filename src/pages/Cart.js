import React, { useEffect, useState } from 'react'
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta";
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartProduct, getUserCart, updateCartProduct } from '../features/user/userSlice';
const Cart = () => {
    const dispatch = useDispatch();
    const [quantity, setQuantity]= useState(null)
    console.log(quantity,"eee")
    const [total, setTotal]= useState(null)
    const userCartState = useSelector(state => state.auth.cartProducts)

    useEffect(()=>{
        dispatch(getUserCart())
    },[])


    useEffect(()=>{
        if(quantity !== null){
            dispatch(updateCartProduct({cartItemId: quantity?.cartItemId , newQuantity: quantity?.newQuantity}))
            setTimeout(() => {dispatch(getUserCart())} ,200)
        }

    },[quantity])
const deleteACartProduct= (id) => {
    dispatch(deleteCartProduct(id))
    setTimeout(() => {dispatch(getUserCart())} ,200)
}
const UpdatedCartProduct= (quantity) => {
    dispatch(updateCartProduct(quantity))
  
}
useEffect (() => {
    let sum = 0;
    for (let index =0 ; index < userCartState?.length; index ++){
        sum = sum + (Number (userCartState[index].quantity) * userCartState[index].price)
   
    }    setTotal(sum)  
},[userCartState])
    return (
        <>  <Meta title={"Cart"} />
        <BreadCrumb title="Cart" />
        <Container class1="cart-wrapper home-wrapper-2 py-5">  <div className='row'>
                    <div className='col-12'>
<div className='cart-header py-3 d-flex justify-content-between align-items-center'>
<h4 className='cart-col-1'>Produit</h4>
<h4 className='cart-col-2'>Prix</h4>
<h4 className='cart-col-3'>Quantité</h4>
<h4 className='cart-col-4'>Total</h4>



</div>


{
    userCartState && userCartState?.map((item , index)=>{
        return(<div key={index} className='cart-data py-3 mb-2 d-flex justify-content-between align-items-center'>
        <div className='cart-col-1 gap-15 d-flex align-items-center'>
        <div className='w-25'>
            <img src={item?.productId?.images[0]?.url} alt='product image' className='img-fluid' />
        </div>
        <div className='w-75'><p >{item?.productId.title}</p>
        <p >Taille: S</p>
        <p className='d-flex gap-3'>Couleur:  <ul className="colors ps-0"><li style={{backgroundColor: item?.color.title}}></li></ul> </p></div>
        
        </div>
        <div className='cart-col-2'>
        <h5 className='price'>${item?.price}</h5>
        
        
        </div>
        <div className='cart-col-3 d-flex align-items-center gap-15'>
        <div>
        <input className='form-control' type='number' name='' id='' min={1} max={10}  value={ quantity?.cartItemId == item?._id && quantity?.newQuantity ? quantity?.newQuantity : item?.quantity} onChange={(e)=> {setQuantity({cartItemId:item?._id, newQuantity:e.target.value})}}/>
        
        </div>
        <div>
            <AiFillDelete onClick={() =>{deleteACartProduct(item?._id)}} className='text-danger'/>
        </div>
        
        </div>
        <div className='cart-col-4'>
        <h5 className='price'>${item?.price  * item?.quantity} </h5>
        </div>
        </div>)
    })
}

       
         
         
                    </div>
                    <div className='col-12 py-2 mt-4'>
      <div className='d-flex justify-content-between align-items-baseline'>
      <Link to="/product" className="button">Continuer vos achats</Link>
      </div>
      {(total !== null || total !== 0) &&      <div className='d-flex flex-column align-items-end'>
        <h4>SubTotal: $ {total}</h4>
        <p>Taxes et frais d'expédition calculés à la caisse</p>
        <Link to="/checkout" className='button'>checkout</Link>
      </div>}

                    </div>
                    
                    
                    
                    </div></Container>
       
        </>
    )
}
export default Cart