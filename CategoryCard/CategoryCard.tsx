import React from 'react'
import { useHistory } from 'react-router-dom'
import { StreamCategoryType } from 'src/generated/graphql'
import './CategoryCard.scss'

interface ICategoryCard {
  data: StreamCategoryType
}

const CategoryCard: React.FC<ICategoryCard> = React.memo(props => {
  const { id, title, photo } = props.data
  const history = useHistory()

  const handleClick = () => {
    history.push(`/category/${id}`)
  }

  return (
    <div className="category-card" onClick={handleClick}>
      <div className="category-card__img">
        <img src={photo} alt="" />
      </div>
      <div className="category-card__content">
        <div className="category-card__name">{title}</div>
        <div className="category-card__bg">
          <div className="category-card__bg-pink"></div>
          <div className="category-card__bg-blue"></div>
        </div>
      </div>
    </div>
  )
})

export default CategoryCard
