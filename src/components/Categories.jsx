import React, { useState } from "react"

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const arrOfPizza = ["Все", "Мясные", "Вегетрианские", "Гриль", "Острые", "Закрытые"]
  const handleClick = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className='categories'>
      <ul>
        {arrOfPizza.map((value, i) => {
          return (
            <li
              key={i}
              onClick={() => handleClick(i)}
              className={activeIndex === i ? "active" : ""}
            >
              {value}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories
