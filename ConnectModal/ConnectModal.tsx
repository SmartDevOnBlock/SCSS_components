import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAddressNonce, useSignIn } from 'src/generated/graphql'
import { getWeb3 } from 'src/helper'
import { setConnectModal, setInsufficientFundsModal } from 'src/reducers/confirmReducer'
import { close, setNotification } from 'src/reducers/notificationReducer'
import { setProfile } from 'src/reducers/userReducer'
import { AppDispatch, RootState } from 'src/store'
import Web3 from 'web3'
import Button from '../Button/Button'
import Modal from '../Modal/Modal'
import './ConnectModal.scss'

const ConnectModal: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>()

  const web3 = new Web3(window.ethereum)
  const { isOpenConnectModal } = useSelector((state: RootState) => state.confirm)
  const chainId = useSelector((state: RootState) => state.info.preferences?.chainId)
  const chainName = useSelector((state: RootState) => state.info.preferences?.chainName)
  const chainRpc = useSelector((state: RootState) => state.info.preferences?.chainRpc)
  const amountForSiteUsage = useSelector((state: RootState) => state.info.preferences?.amountForSiteUsage)
  const dispatch: AppDispatch = useDispatch()

  const [, getNonce] = useAddressNonce()
  const [, signIn] = useSignIn()

  const closeModal = () => {
    dispatch(setConnectModal(false))
  }

  const handleChainChange = (id: number, name: string, rpcUrl: string) => {
    window.ethereum
      .request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${id.toString(16)}` }],
      })
      .then(() => dispatch(close()))
      .catch(err => {
        if (err.code === 4902) {
          window.ethereum
            .request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${id.toString(16)}`,
                  chainName: name,
                  rpcUrls: [rpcUrl],
                },
              ],
            })
            .then(() => dispatch(setNotification({ title: 'Network added' })))
            .catch(() => dispatch(close()))
        }
      })
  }

  const handleConnect = async () => {
    setLoading(true)
    const [chain, address, error] = await getWeb3(chainId, chainName)

    if (error) {
      if (window.ethereum && !chain) {
        handleChainChange(chainId, chainName, chainRpc)
      }
      dispatch(setNotification({ title: 'Error', text: error, isPositive: false }))
      setLoading(false)
      closeModal()
      return false
    }

    getNonce({ address })
      .then(async res => {
        const response = res.data.addressNonce
        const error = response.runtimeError

        if (error) {
          console.error(error.message)
          dispatch(setNotification({ title: error.message, isPositive: false }))
          return false
        }

        const nonce = response.nonce
        const signature = await web3.eth.personal.sign(nonce, address, nonce)

        signIn({ address, signature })
          .then(res => {
            const response = res.data.signIn
            const runtimeError = response.runtimeError

            if (runtimeError) {
              dispatch(setInsufficientFundsModal(true))
              return false
            }

            dispatch(setProfile(response.user))
            dispatch(setNotification({ title: 'Successfully connected to streams' }))
          })
          .catch(err => console.error(err))
          .finally(() => {
            closeModal()
            setLoading(false)
          })
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
        closeModal()
      })
  }

  return (
    <Modal className="modal" modalIsOpen={isOpenConnectModal} onRequestClose={closeModal}>
      <h2 className="modal__title">Do you want to see the stream?</h2>
      <div className="modal__text">
        To access public streams, you need to connect your Metamask and have HC tokens in your account in an amount{' '}
        <span>{amountForSiteUsage} HC</span>.
      </div>
      <div className="modal__buttons">
        <Button className="modal__btn" type="pink" onClick={handleConnect} isLoading={isLoading} disabled={isLoading}>
          Connect
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
}

export default ConnectModal
