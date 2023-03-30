import React from 'react'
import './LoaderView.scss'

interface ILoaderView {
  small?: boolean
}

const LoaderView: React.FC<ILoaderView> = React.memo(({ small }) => {
  return <div className={`loader-heart ${small ? 'loader-heart--small' : ''}`} />
})

export default LoaderView
