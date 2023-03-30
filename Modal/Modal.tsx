import React, { useEffect } from 'react'
import ReactModal from 'react-modal'
import Icon from '../Icon/Icon'
import './Modal.scss'

interface IModal {
  modalIsOpen: boolean
  isCloseIcon?: boolean
  className?: string
  onRequestClose: () => void
  shouldCloseOnOverlayClick?: boolean
}

const Modal: React.FC<IModal> = props => {
  const { modalIsOpen, onRequestClose, children, isCloseIcon = true, className = 'modal', shouldCloseOnOverlayClick = true } = props

  useEffect(() => {
    document.body.style.setProperty('--scrollbarWidth', `${window.innerWidth - document.documentElement.clientWidth}px`)
  }, [])

  return (
    <ReactModal isOpen={modalIsOpen} onRequestClose={onRequestClose} shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}>
      <div className={className}>
        {isCloseIcon ? (
          <div className="modal__close" onClick={() => onRequestClose()}>
            <Icon name="close" />
          </div>
        ) : null}
        {children}
      </div>
    </ReactModal>
  )
}

export default Modal
