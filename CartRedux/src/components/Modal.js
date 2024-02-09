import { closeModal } from "../features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
const Modal = () => {
    const dispatch = useDispatch();
    return (
        <aside className="modal-container">
            <div className="modal">
                <h4>REMOVE ALL ITEMS FROM YOUR SHOPPING CART?</h4>
                <div className="btn-container">
                    <button type="button" className="btn confirm-btn" onClick={()=> {
                        dispatch(clearCart());
                        dispatch(closeModal());
                    }}>CONFIRM</button>
                    <button type="button" className="btn clear-btn" onClick={()=> {
                        dispatch(closeModal());
                    }}>CANCEL</button>
                </div>
            </div>
        </aside>
    )
};

export default Modal;