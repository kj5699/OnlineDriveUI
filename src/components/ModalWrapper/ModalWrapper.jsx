import { customStyles } from '@/constants/constant';
import Image from 'next/image';
import React from 'react'
import Modal from 'react-modal';
import styles from "./styles.module.scss";

const ModalWrapper = ({isOpen, onClose, label, children}) => {
  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onClose}>
        <div className= {styles.modalWrapper}>
          <div className={styles.closeIcon} onClick={onClose} >
            <Image alt='' src='/assets/close.png' width={16} height={16}></Image>
          </div>
          <div className="mb-6 text-lg">{label}</div>
          {children}
        </div>
      </Modal>
  )
}

export default ModalWrapper;