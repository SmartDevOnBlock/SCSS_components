import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AppStreamTypeChoices, StreamType } from 'src/generated/graphql'
import { setConnectModal } from 'src/reducers/confirmReducer'
import { AppDispatch, RootState } from 'src/store'
import Icon from '../Icon/Icon'
import PrivateStreamModal from '../PrivateStreamModal/PrivateStreamModal'
import './StreamCard.scss'

interface IStreamCard {
  data: StreamType
}

const StreamCard: React.FC<IStreamCard> = React.memo(props => {
  const { id, preview, title, viewers, model, type, price, watchCredentials } = props.data
  const [isPrivateModal, setPrivateModal] = useState<boolean>()
  const [isPrivate, setPrivate] = useState<boolean>(type === AppStreamTypeChoices.Private)

  const history = useHistory()
  const dispatch: AppDispatch = useDispatch()
  const isAuth = useSelector((state: RootState) => state.user.isAuth)

  const handleClick = () => {
    if (isAuth) {
      if (isPrivate && !watchCredentials) {
        setPrivateModal(true)
      } else {
        history.push(`/stream/${id}`)
      }
    } else {
      dispatch(setConnectModal(true))
    }
  }

  return (
    <>
      <div className="stream-card" onClick={handleClick}>
        <div className="stream-card__img">
          {preview.link ? <img src={preview.link} alt="" /> : <img src={require('assets/images/placeholder.jpg')} alt="placeholder" />}
          <div className="stream-card__play">
            <Icon name="play" />
          </div>
          {isPrivate ? <div className="stream-card__private">Private</div> : null}
        </div>
        <div className="stream-card__content">
          <div className="stream-card__name">{title}</div>
          <div className="stream-card__info">
            <span className="stream-card__nickname">{model?.nickname}</span>
            <div className="stream-card__watch">
              <span className="stream-card__number">{new Intl.NumberFormat().format(viewers)}</span>
              <Icon name="eyes" />
            </div>
          </div>
        </div>
      </div>
      <PrivateStreamModal
        streamId={id}
        streamPrice={price}
        modelAddress={model?.address}
        isOpen={isPrivateModal}
        onClose={() => setPrivateModal(false)}
      />
    </>
  )
})

export default StreamCard
