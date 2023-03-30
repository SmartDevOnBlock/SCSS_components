import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import erc20Abi from 'src/abi/erc20.abi.json'
import hotcamsAbi from 'src/abi/hotcams.abi.json'
import { ETHERS_OVERRIDES } from 'src/const'
import { formatPrice, getWeb3 } from 'src/helper'
import { setNotification } from 'src/reducers/notificationReducer'
import { AppDispatch, RootState } from 'src/store'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import Button from '../Button/Button'
import Modal from '../Modal/Modal'

interface IPrivateStreamModal {
  isOpen: boolean
  onClose: () => void
  streamId: string
  streamPrice: number
  modelAddress: string
}

const PrivateStreamModal: React.FC<IPrivateStreamModal> = React.memo(props => {
  const { isOpen, onClose, streamId, streamPrice, modelAddress } = props
  const [isLoading, setLoading] = useState<boolean>()

  const preferences = useSelector((state: RootState) => state.info.preferences)
  const chainId = useSelector((state: RootState) => state.info.preferences?.chainId)
  const chainName = useSelector((state: RootState) => state.info.preferences?.chainName)
  const history = useHistory()
  const dispatch: AppDispatch = useDispatch()
  const web3 = new Web3(window.ethereum)

  const handlePay = async () => {
    setLoading(true)
    const [chain, address, errors] = await getWeb3(chainId, chainName)

    if (errors) {
      dispatch(setNotification({ title: 'Error', text: errors, isPositive: false }))
      setLoading(false)
      console.error(errors)
      return false
    }

    const hotcamsContract = new web3.eth.Contract(hotcamsAbi as AbiItem[], preferences?.hotcamsContract)
    const paymentContract = new web3.eth.Contract(erc20Abi as AbiItem[], preferences?.paymentContract)

    const decimals = await paymentContract.methods.decimals().call()
    const price = streamPrice * 10 ** decimals

    if ((await paymentContract.methods.allowance(address, preferences?.hotcamsContract).call()) < price) {
      await paymentContract.methods
        .approve(preferences?.hotcamsContract, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
        .send({ from: address, gasPrice: ETHERS_OVERRIDES.gasPrice })
        .catch(err => {
          console.error(err)
          dispatch(setNotification({ title: 'Error', text: 'Approval error', isPositive: false }))
          setLoading(false)
        })
    }

    await hotcamsContract.methods
      .payForStream(modelAddress, price)
      .send({ from: address, gasPrice: ETHERS_OVERRIDES.gasPrice })
      .then(() => {
        onClose()
        history.push(`/stream/${streamId}`)
      })
      .catch(err => {
        console.error(err)
        onClose()
        dispatch(setNotification({ title: 'Error', text: 'Pay stream error', isPositive: false }))
        setLoading(false)
      })
  }

  return (
    <Modal className="modal" modalIsOpen={isOpen} onRequestClose={onClose}>
      <h2 className="modal__title">Do you want to see the stream?</h2>
      <div className="modal__text">
        This stream is private. To get access to it, pay <span>{formatPrice(streamPrice)} HC</span>
      </div>
      <div className="modal__buttons">
        <Button className="modal__btn" type="pink" onClick={handlePay} isLoading={isLoading} disabled={isLoading}>
          Pay
        </Button>
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
})

export default PrivateStreamModal
