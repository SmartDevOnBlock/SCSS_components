import React from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { close } from 'src/reducers/notificationReducer'
import { AppDispatch, RootState } from 'src/store'
import Button from '../Button/Button'
import './Notification.scss'

const Notification: React.FC = () => {
  const { isOpen, isPositive, title, text } = useSelector((state: RootState) => state.notification)
  const dispatch: AppDispatch = useDispatch()

  const closeModal = () => {
    dispatch(close())
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={{ overlay: { zIndex: 1000 } }}>
      <div className="notification">
        <div className="notification__img">
          {/* {isPositive ? <img src={require('images/done.svg')} alt="" /> : <img src={require('images/fail.svg')} alt="" />} */}
        </div>
        <div className="notification__title">{title}</div>
        <div className="notification__description">{text}</div>
        <div className="notification__btns">
          <Button className="notification__btn" onClick={closeModal}>
            Understand
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default Notification
