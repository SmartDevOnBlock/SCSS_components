import React from 'react'
import './NotFound.scss'

interface INotFound {
  title: string
  text?: string
}

const NotFound: React.FC<INotFound> = React.memo(({ title, text }) => {
  return (
    <div className="not-found">
      <div className="not-found__img">
        <img src={require('images/not-found.png')} alt="not found" />
      </div>
      <div className="not-found__content">
        <div className="not-found__title">{title}</div>
        <p className="not-found__text">{text}</p>
      </div>
    </div>
  )
})

export default NotFound
