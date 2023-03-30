import React from 'react'
import LoaderView from '../LoaderView/LoaderView'
import './Button.scss'

interface IButton {
  btnType?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  isLoading?: boolean
  onClick?: (e) => void
  type?: 'blue' | 'red' | 'red-outline' | 'blue-outline' | 'pink' | 'pink-outline' | 'white' | 'back'
  size?: 'small'
  tag?: 'link'
  href?: string
}

const Button: React.FC<IButton> = props => {
  const { btnType = 'button', children, className = '', disabled, isLoading, onClick, type = 'blue', size, tag, href } = props

  const sizeClassName = size ? `btn-${size}` : ''
  const typeClassName = type ? `btn-${type}` : ''
  const loadingClassName = isLoading ? `btn-loading` : ''

  const handleClick = e => {
    if (onClick && !isLoading) onClick(e)
  }

  const renderBody = isLoading ? <LoaderView small /> : children

  return tag === 'link' ? (
    <a href={href} className={`btn ${sizeClassName} ${typeClassName} ${className} ${loadingClassName}`} target="_blank">
      {renderBody}
    </a>
  ) : (
    <button
      className={`btn ${sizeClassName} ${typeClassName} ${className}`}
      disabled={isLoading || disabled}
      onClick={e => handleClick(e)}
      type={btnType}
    >
      {renderBody}
    </button>
  )
}

export default Button
