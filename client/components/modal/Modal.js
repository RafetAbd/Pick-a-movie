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
                    <JoinRoom />
                </div>
            </div>
        </>
    )
}

export default Modal;