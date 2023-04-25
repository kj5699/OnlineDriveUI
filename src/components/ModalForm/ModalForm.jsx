import React, { useEffect, useRef } from 'react'
import Button from '../Button'

const ModalForm = ({initialValue, buttonLabel, onSubmit, error, setFormError, placeHolder}) => {
  const inputRef = useRef(initialValue);
  const onChangehandler = () => {
    console.log(inputRef.current.value);
    setFormError(null);
  }
  const onClickHandler = (event) => {
    console.log('This Clicked');
    event.preventDefault();
    onSubmit(inputRef.current.value);
  }
  useEffect(()=>{
    inputRef.current.value = initialValue;
  },[initialValue])
  return (
    <div className='w-full'>
        <div className='mb-4'>
        <input ref={inputRef} 
            type='text'
            className={`rounded w-full border ${error? 'border-main-red' :'border-main-primary'}  text-main-primary text-sm rounded-lg p-2`}
            onChange={onChangehandler}
            placeholder = {placeHolder}
        />
        {error && <div className='text-xs text-main-red'>{error}</div>}
        </div>
        <Button label={buttonLabel} onClick={onClickHandler} />
    </div>
  )
}

export default ModalForm;