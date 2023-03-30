import React from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { closeConfirm } from 'src/reducers/confirmReducer'
import { RootState } from 'src/store'
import Button from '../Button/Button'

const ConfirmModal: React.FC = () => {
  const { isOpen, title, text, cancelButton, confirmButton, onConfirm, onCancel } = useSelector((state: RootState) => state.confirm)
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(closeConfirm())
    onCancel && onCancel()
  }

  const handleConfirm = () => {
    closeModal()
    onConfirm && onConfirm()
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <div className="modal">
        {title ? <div className="modal__title">{title}</div> : null}
        {text ? <div className="modal__text">{text}</div> : null}
        <div className="modal__buttons">
          <Button className="modal__btn" type="pink" onClick={closeModal}>
            {cancelButton}
          </Button>
          <Button className="modal__btn" onClick={handleConfirm}>
            {confirmButton}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
