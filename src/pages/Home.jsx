import React, { useEffect, useState } from "react"
import Categories from "../components/Categories"
import Sort from "../components/Sort"
import Skeleton from "../components/PizzaBlock/Skeleton"
import PizzaBlock from "../components/PizzaBlock/PizzaBlock"

const Home = () => {

    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryID] = useState(0)
    const [sortType, setSortType] = useState(0)

    useEffect(() => {
        setIsLoading(true)
        if (categoryId ===0) { 
            fetch(
                "https://64d2440bf8d60b174361c22f.mockapi.io/items")
              .then((res) => {
                return res.json()
              })
              .then((arr) => {
                setPizzas(arr)
                setIsLoading(false)
              })
              window.scrollTo(0,0);
        } else {
            fetch(
                "https://64d2440bf8d60b174361c22f.mockapi.io/items?category=" + categoryId)
              .then((res) => {
                return res.json()
              })
              .then((arr) => {
                setPizzas(arr)
                setIsLoading(false)
              })
              window.scrollTo(0,0);
        }
        
      }, [categoryId])

    
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value = {categoryId} onClickCatrgory={(id) => setCategoryID(id)} />
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
