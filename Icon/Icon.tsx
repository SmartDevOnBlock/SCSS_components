import React from 'react'
import Icons from 'images/icons-sprite.svg'

interface IIcon {
  name: string
  onClick?: (e) => void
  className?: string
}

const Icon: React.FC<IIcon> = ({ name, onClick, className = '' }) => {
  return (
    <svg viewBox="0 0 16 16" className={`icon icon-${name} ${className}`} onClick={e => onClick && onClick(e)}>
      <use xlinkHref={`${Icons}#${name}`} />
    </svg>
  )
}

export default Icon
