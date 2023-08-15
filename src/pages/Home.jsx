import React, { useEffect, useState } from "react"
import Categories from "../components/Categories"
import Sort from "../components/Sort"
import Skeleton from "../components/PizzaBlock/Skeleton"
import PizzaBlock from "../components/PizzaBlock/PizzaBlock"

const Home = () => {

    useEffect(() => {
        fetch("https://64d2440bf8d60b174361c22f.mockapi.io/items")
          .then((res) => {
            return res.json()
          })
          .then((arr) => {
            setPizzas(arr)
            setIsLoading(false)
          })
          window.scrollTo(0,0);
      }, [])

    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...Array(6)].map((el, i) => <Skeleton key={i} />)
          : pizzas.map((el) => <PizzaBlock key={el.id} {...el} />)}
      </div>
    </div>
  )
}

export default Home
