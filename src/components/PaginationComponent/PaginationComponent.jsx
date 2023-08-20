import React from "react"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from './PaginationComponent.module.scss'

const PaginationComponent = ({currentPage,setCurrentPage}) => {
    
  return (
    <div>
      <Stack className= {styles.root} spacing={2}>
        <Pagination  
        count={3} 
        page={currentPage}
        onChange={(_, num) => setCurrentPage(num)}
        />
      </Stack>
    </div>
  )
}

export default PaginationComponent
