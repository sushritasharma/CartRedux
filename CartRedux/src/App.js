import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { useEffect } from "react";
import CartContainer from "./components/CartContainer";
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotal,getCartItems } from "./features/cart/cartSlice";
function App() {

  const {cartItems,isLoading}= useSelector((state)=> state.cart);
  const {isOpen}= useSelector((store)=> store.modal);
  const dispatch= useDispatch();

  useEffect(()=> {
    dispatch(calculateTotal());
  }, [cartItems])

  useEffect(()=> {
    dispatch(getCartItems())
  },[])

  if(isLoading) {
    <div className="loading"><h1>Loading</h1></div>
  }
  return (
    <main>

      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App;
