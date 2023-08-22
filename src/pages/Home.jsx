import React, { useContext, useEffect, useState } from "react"
import Categories from "../components/Categories"
import Sort from "../components/Sort"
import Skeleton from "../components/PizzaBlock/Skeleton"
import PizzaBlock from "../components/PizzaBlock/PizzaBlock"
import PaginationComponent from "../components/PaginationComponent/PaginationComponent"
import { SearchContext } from "../App"
import { useSelector, useDispatch } from "react-redux"
import { setCategoryId } from "../redux/slices/filterSlice"

const Home = () => {
  const categoryId = useSelector((state) => state.filterSlice.categoryId)
  const sortType = useSelector((state) => state.filterSlice.sortType.sortProperty)
  const dispatch = useDispatch();

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)


  const onChangeCtaegory = (id) => {
    dispatch(setCategoryId(id));
  }

  const { searchValue } = useContext(SearchContext);
  useEffect(() => {
    setIsLoading(true)
    const order = sortType.includes("-") ? "asc" : "desc"
    const sortBy = sortType.replace("-", "")
    const category = categoryId > 0 ? `category=${categoryId}` : ""
    const search = searchValue ? `&search=${searchValue}` : ""

    fetch(
      `https://64d2440bf8d60b174361c22f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => {
        return res.json()
      })
      .then((arr) => {
        setPizzas(arr)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage])

  const items = pizzas.map((el) => <PizzaBlock key={el.id} {...el} />)
  const skeletons = [...Array(6)].map((el, i) => <Skeleton key={i} />)

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onClickCatrgory={onChangeCtaegory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : items}</div>
      <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default Home
