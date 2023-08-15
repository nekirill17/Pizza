import React, { useState } from "react"

const Categories = ({value, onClickCatrgory}) => {


  const arrOfPizza = ["Все", "Мясные", "Вегетрианские", "Гриль", "Острые", "Закрытые"]


  return (
    <div className='categories'>
      <ul>
        {arrOfPizza.map((categoryName, i) => {
          return (
            <li
              key={i}
              onClick={() => onClickCatrgory(i)}
              className={value === i ? "active" : ""}
            >
              {categoryName}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories
