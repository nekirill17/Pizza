import React, { useContext, useEffect, useState } from "react"
import Categories from "../components/Categories"
import Sort, { list } from "../components/Sort"
import Skeleton from "../components/PizzaBlock/Skeleton"
import PizzaBlock from "../components/PizzaBlock/PizzaBlock"
import PaginationComponent from "../components/PaginationComponent/PaginationComponent"
import { SearchContext } from "../App"
import { useSelector, useDispatch } from "react-redux"
import { setCategoryId, setCurrentPage ,setFilters} from "../redux/slices/filterSlice"
import axios from "axios"
import qs from "qs"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()
  const categoryId = useSelector((state) => state.filterSlice.categoryId)
  const sortType = useSelector((state) => state.filterSlice.sortType.sortProperty)
  const currentPage = useSelector((state) => state.filterSlice.currentPage)
  const dispatch = useDispatch()

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const onChangeCtaegory = (id) => {
    dispatch(setCategoryId(id))
  }

  const { searchValue } = useContext(SearchContext)
  useEffect(() => {
    setIsLoading(true)
    const order = sortType.includes("-") ? "asc" : "desc"
    const sortBy = sortType.replace("-", "")
    const category = categoryId > 0 ? `category=${categoryId}` : ""
    const search = searchValue ? `&search=${searchValue}` : ""

    axios
      .get(
        `https://64d2440bf8d60b174361c22f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setPizzas(res.data)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage])

  useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sortType,
      categoryId,
      currentPage
    })
    navigate(`?${queryString}`)
  }, [categoryId, sortType, searchValue, currentPage])

  const items = pizzas.map((el) => <PizzaBlock key={el.id} {...el} />)
  const skeletons = [...Array(6)].map((el, i) => <Skeleton key={i} />)
  const onChangePage = (number) => dispatch(setCurrentPage(number))

  useEffect(() => {
    if (window.location.search) {
        const params = qs.parse(window.location.search.substring(1));
        const sort = list.find(obj => obj.sortProperty === params.sortProperty)
        dispatch(
            setFilters({
                ...params,
                sort,
            })
        )
    }
  },[])

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onClickCatrgory={onChangeCtaegory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : items}</div>
      <PaginationComponent currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home
