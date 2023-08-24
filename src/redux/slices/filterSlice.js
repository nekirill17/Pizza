import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentPage: 1,
    categoryId: 0,
    sortType: {
        name: "популярности",
        sortProperty: "rating"
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state,action) {
            state.categoryId =  action.payload
        },
        setSortType(state,action) {
            state.sortType = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilters(state,action) {
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId)
        } 
    }
})

export const {setCategoryId,setSortType, setCurrentPage,setFilters} = filterSlice.actions;
export default filterSlice.reducer; 