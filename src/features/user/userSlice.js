import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService.";
import {toast} from "react-toastify"
import { getNumFacture } from "../../util/api";
 export const registerUser = createAsyncThunk(
    "auth/register", async(userData,thunkAPI) =>{

try{
return await authService.register(userData)
}

        catch(error){
return thunkAPI.rejectWithValue(error)
        }
    }

 )

 export const loginUser = createAsyncThunk(
    "auth/login", async(userData,thunkAPI) =>{

try{
return await authService.login(userData)
}

        catch(error){
return thunkAPI.rejectWithValue(error)
        }
    }

 )
  export const getUserProductWishlist = createAsyncThunk(
    "user/wishlist", async (thunkAPI) => {
        try {
return await authService.getUserWishlist();
        } catch(error){
            return thunkAPI.rejectWithValue(error)

        }
    }
  ) 
  export const addProdToCart = createAsyncThunk(
    "user/cart/add", async (cartdata, thunkAPI) => {
        try {
return await authService.addToCart(cartdata);
        } catch(error){
            return thunkAPI.rejectWithValue(error)

        }
    }
  ) 
  export const getUserCart = createAsyncThunk(
    "user/cart/get", async (thunkAPI) => {
        try {
return await authService.getCart();
        } catch(error){
            return thunkAPI.rejectWithValue(error)

        }
    }
  ) 

  export const getOrders= createAsyncThunk(
    "user/order/get", async ( thunkAPI) => {
        try {
return await authService.getUserOrders();
        } catch(error){
            return thunkAPI.rejectWithValue(error)

        }
    }
  ) 

  export const numfac = createAsyncThunk(
    "user/fac/get", async ( thunkAPI) => {
        try {
return await getNumFacture();
        } catch(error){
            return thunkAPI.rejectWithValue(error)

        }
    }
  ) 




  export const deleteCartProduct = createAsyncThunk(
    "user/cart/product/delete", async ( cartItemId, thunkAPI) => {
        try {
return await authService.removeProductFromCart(cartItemId);
        } catch(error){
            return thunkAPI.rejectWithValue(error)

        }
    }
  )
  export const emptyCartu = createAsyncThunk(
    "user/cart/delete-cart", async ( thunkAPI) => {
        try {
            
return await authService.emptyCart();
        } catch(error){
            return thunkAPI.rejectWithValue(error)

        }
    }
  )
  export const updateCartProduct = createAsyncThunk(
    "user/cart/product/update", async ( cartDetail, thunkAPI) => {
        try {
return await authService.updateProductFromCart(cartDetail);
        } catch(error){
            return thunkAPI.rejectWithValue(error)

        }
    }
  )

  export const updateProfile = createAsyncThunk(
    "user/profile/update", async ( data, thunkAPI) => {
        try {
return await authService.updateUser(data);
        } catch(error){
            return thunkAPI.rejectWithValue(error)

        }
    }
  )


  export const createAnOrder = createAsyncThunk(
    "user/cart/create-order", async ( orderDetail, thunkAPI) => {
        try {
return await authService.createOrder(orderDetail);
        } catch(error){
            return thunkAPI.rejectWithValue(error)

        }
    }
  )
  export const forgetpasswordToken = createAsyncThunk(
    "user/password/token", async ( data, thunkAPI) => {
        try {
return await authService.forgetPassToken(data);
        } catch(error){
            return thunkAPI.rejectWithValue(error)

        }
    }
  )
  export const resetPassword = createAsyncThunk(
    "user/password/reset", async ( data, thunkAPI) => {
        try {
return await authService.resetPass(data);
        } catch(error){
            return thunkAPI.rejectWithValue(error)

        }
    }
  )

 const getCustomerfromLocalStorage = localStorage.getItem("customer")
 ? JSON.parse(localStorage.getItem("customer"))
 : null;
 const initialState = {
    user: getCustomerfromLocalStorage,
    wishlist:[],
    cartProducts:[],
    cart:[],
      isError:false,
    isSuccess:false,
    isLoading: false,
    message:""
 }
  export const authSlice = createSlice ({
    name:"auth",
    initialState: initialState,
    reducers:[],
    extraReducers:(builder) => (
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading = true;
        }).addCase(registerUser.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createUser = action.payload;
            console.log(action)
            if (state.isSuccess === true){
                toast.success("User Created Successfully") ;
            }
        }).addCase(registerUser.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isError === true){
                toast.error(action.payload.response.data.message) ;
            }
        }).addCase(loginUser.pending,(state)=>{
            state.isLoading = true;
        }).addCase(loginUser.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            console.log(action)
  
   
            if (state.isSuccess === true){
             
                toast.success("User Logged In Successfully") ;
            }
        }).addCase(loginUser.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isError === true){
                toast.error(action.payload.response.data.message) ;
            }
        }).addCase(getUserProductWishlist.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getUserProductWishlist.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.wishlist = action.payload.data;
            state.isSuccess = true;
        
       state.message ="Wishlist Products Fetched Successfully ! "
        }).addCase(getUserProductWishlist.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
       
        }).addCase(addProdToCart.pending,(state)=>{
            state.isLoading = true;
        }).addCase(addProdToCart.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
     
            state.isSuccess = true;
            state.cart = action.payload.data;
            if(state.isSuccess){
                toast.success("product add to cart")
             }
                 
        }).addCase(addProdToCart.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
       
        }).addCase(getUserCart.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getUserCart.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
     
            state.isSuccess = true;
            state.cartProducts = action.payload;
    
                 
        }).addCase(getUserCart.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
       
        })
        .addCase(deleteCartProduct.pending,(state)=>{
            state.isLoading = true;
        }).addCase(deleteCartProduct.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
     
            state.isSuccess = true;
            state.deletedProductCart = action.payload;
            if(state.isSuccess){
                toast.success("Product Deleted From Cart Successfully")
             }
                 
        }).addCase(deleteCartProduct.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isSuccess=== false){
                toast.error("Something Went Wrong !")
             }
        })  .addCase(updateCartProduct.pending,(state)=>{
            state.isLoading = true;
        }).addCase(updateCartProduct.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
     
            state.isSuccess = true;
            state.updatedProductCart = action.payload;
            if(state.isSuccess){
                toast.success("Product Updated From Cart Successfully")
             }
                 
        }).addCase(updateCartProduct.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isSuccess=== false){
                toast.error("Something Went Wrong !")
             }
        }) .addCase(createAnOrder.pending,(state)=>{
            state.isLoading = true;
        }).addCase(createAnOrder.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
     
            state.isSuccess = true;
            state.orderedProduct = action.payload;
            if(state.isSuccess){
                toast.success("ordered Successfully")
             }
                 
        }).addCase(createAnOrder.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isSuccess=== false){
                toast.error("Something Went Wrong !")
             }
        })
        .addCase(getOrders.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getOrders.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
     
            state.isSuccess = true;
            state.getorderedProduct = action.payload;
       
                 
        }).addCase(getOrders.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
           
        })       .addCase(updateProfile.pending,(state)=>{
            state.isLoading = true;
        }).addCase(updateProfile.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
     
            state.isSuccess = true;
            state.updatedUser = action.payload;
          
            if(state.isSuccess){
                let currentUserData = JSON.parse( localStorage.getItem("customer"))
                let newUserData = {
                    _id: currentUserData?._id,
                    token: currentUserData?.token,
                    firstname: action?.payload?.firstname,
                   lastname: action?.payload?.lastname,
                   email: action?.payload?.email,
                   mobile: action?.payload?.mobile,
                }
                localStorage.setItem("customer", JSON.stringify(newUserData))
                state.user = newUserData;
                toast.success("Profile Updated Successfully")
             }
                 
        }).addCase(updateProfile.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isSuccess=== false){
                toast.error("Something Went Wrong !")
             }
        }).addCase(forgetpasswordToken.pending,(state)=>{
            state.isLoading = true;
        }).addCase(forgetpasswordToken.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
     
            state.isSuccess = true;
            state.token = action.payload;
            if(state.isSuccess){
                toast.success("Email Sent Successfully")
             }
                 
        }).addCase(forgetpasswordToken.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isSuccess=== false){
                toast.error("Something Went Wrong !")
             }
        }).addCase(resetPassword.pending,(state)=>{
            state.isLoading = true;
        }).addCase(resetPassword.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
     
            state.isSuccess = true;
            state.pass = action.payload;
            if(state.isSuccess){
                toast.success("Password Updated Successfully")
             }
                 
        }).addCase(resetPassword.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isSuccess=== false){
                toast.error("Something Went Wrong !")
             }
        }) 
        .addCase(emptyCartu.pending,(state)=>{
            state.isLoading = true;
        }).addCase(emptyCartu.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
     
            state.isSuccess = true;
            state.deletedCart = action.payload;
        
                 
        }).addCase(emptyCartu.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
           
        }) .addCase(numfac.pending,(state)=>{
            state.isLoading = true;
        }).addCase(numfac.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
     
            state.isSuccess = true;
            state.numfac = action.payload;
        
                 
        }).addCase(numfac.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
           
        })  
        
    )
  })


  export default authSlice.reducer;