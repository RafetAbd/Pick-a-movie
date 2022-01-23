import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from '../../store/modal'
import JoinRoom from "../joinRoom/Joinroom";
import './modal.css'

const Modal = () => {

    const dispatch = useDispatch();

    const modalState = useSelector((state) => {
        
        return state.modal
    })

    const close = () => {
        dispatch(closeModal())

    }
    if (!modalState) return null;
    return (
        <>
            <div className="screen" onClick={() => close()}>
                <div className="child" onClick={(e) => e.stopPropagation()}>
                    <div>
                        <div>
                            <h2>Join A Room</h2>
                            <JoinRoom />
                        </div>
                        <button onClick={() => close()} className="cancel-modal-button" style={{ textDecoration: 'none' }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;