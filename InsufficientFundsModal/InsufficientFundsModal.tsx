import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInsufficientFundsModal } from 'src/reducers/confirmReducer'
import { AppDispatch, RootState } from 'src/store'
import Button from '../Button/Button'
import Modal from '../Modal/Modal'

const InsufficientFundsModal: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>()

  const { isOpenInsufficientFundsModal } = useSelector((state: RootState) => state.confirm)
  const dispatch: AppDispatch = useDispatch()

  const closeModal = () => {
    dispatch(setInsufficientFundsModal(false))
  }

  return (
    <Modal className="modal" modalIsOpen={isOpenInsufficientFundsModal} onRequestClose={closeModal}>
      <h2 className="modal__title">You don't have enough HC on your account</h2>
      <div className="modal__text">To get access to public streams, replenish your wallet with HC tokens in an amount <span>50000 HC</span>.</div>
      <div className="modal__buttons">
        <Button
          className="modal__btn"
          tag="link"
          href="https://pancakeswap.finance/swap/0x6D1B3fdf5096465fb8B81A9B6e734a9641b50c24"
          isLoading={isLoading}
        >
          Buy HC
        </Button>
      </div>
    </Modal>
  )
}

export default InsufficientFundsModal
