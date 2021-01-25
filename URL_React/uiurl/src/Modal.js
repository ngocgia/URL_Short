import React, {useEffect} from 'react';

const Modal = ({closeModal, contentModal}) =>{
    useEffect(() => {
        setTimeout(() =>{
            closeModal();
        }, 3000);
    });
   return <div className='notifi'>{contentModal}</div>;
};

export default Modal;
