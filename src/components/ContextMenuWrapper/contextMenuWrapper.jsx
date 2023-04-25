import React, { useState, useRef } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import styles from "./styles.module.scss";
import Button from "../Button";
import ModalForm from "../ModalForm/ModalForm";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

const MODAL_ACTIONS = {
  delete: 'DELETE',
  rename: 'RENAME'
}

function ContextMenuWrapper({ id, children , item, onRename, onDelete}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);


  const [formError, setFormError]=useState(null);
  const itemClickHandler = (action) =>{
    setModalOpen(true);
    setModalAction(action);
  }
  const renameHandler = (newValue) => {
    onRename(item?.id, newValue).then(()=>{
      setModalOpen(false);
      setModalAction(null);
    }).catch((error)=>{
      setFormError(error.message);
    })
  }
  const deleteHandler = () => {
    onDelete(item?.id).then(()=>{
      setModalOpen(false);
      setModalAction(null);
    }).catch((error)=>{
      console.log(er);
    })
  }
  const closeHandler = () => {
    setModalOpen(false); 
    setModalAction(null); 
    setFormError(null);
  };
  return (
    <div className={'mb-4 h-full'}>
      <ContextMenuTrigger id={id} style={{height: '100%'}}>
          {children}
      </ContextMenuTrigger>
      <ContextMenu id={id} className="bg-white rounded top-4/5 left-4/5" onClick={()=>{console.log('cliddhdh')} }>
        <MenuItem  onClick={()=>itemClickHandler(MODAL_ACTIONS.rename)} className={`text-main-primary ${styles.menuItem}`}>
          Rename
        </MenuItem>  
          <MenuItem divider />
        <MenuItem  onClick={()=>itemClickHandler(MODAL_ACTIONS.delete)} className={`text-main-red ${styles.menuItem}`}>
          Delete
        </MenuItem>  
          
      </ContextMenu>
      <ModalWrapper isOpen={modalOpen} onClose={closeHandler} label={modalAction===MODAL_ACTIONS.rename ? 'Rename': 'Delete'}>
          <>
            {(modalAction ===  MODAL_ACTIONS.rename) && <ModalForm buttonLabel={'Rename'} onSubmit={renameHandler} initialValue={item?.name || ''} error={formError} setFormError={setFormError}/>}
            {(modalAction ===  MODAL_ACTIONS.delete) && 
              <div className="w-full">
                <div className="text-center text-main-red text-sm mb-4">Are you sure you want to delete {item?.name || ''}</div>
                {formError && <div className='text-xs text-main-red'>{formError}</div>}
                <Button label={"Delete"} onClick={deleteHandler} variant="danger" />
              </div>
            }
          </>
      </ModalWrapper>


    </div>
  );
}
export default ContextMenuWrapper;