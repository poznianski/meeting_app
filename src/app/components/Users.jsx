import React, { useState, useEffect } from 'react'
import { Pagination } from './Pagination'
import { paginate } from '../utils/paginate.js'
import { GroupList } from './GroupList.jsx'
import api from '../api'
import { UsersTable } from './UsersTable'
import { SearchStatus } from './SearchStatus.jsx'
import _ from 'lodash'
import { orderBy } from 'lodash/collection.js'

export const Users = ({ users: allUsers, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProfession, setSelectedProfession] = useState()
  const [sortBy, setSortBy] = useState({iterator: 'name', order: 'asc'})
  
  const pageSize = 8
  
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])
  
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProfession])
  
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const filteredUsers = selectedProfession
    ? allUsers.filter((user) =>
      JSON.stringify(user.profession) === JSON.stringify(selectedProfession))
    : allUsers
  
  const count = filteredUsers.length
  
  const sortedUsers = orderBy(filteredUsers, [sortBy.iterator], [sortBy.order])
  
  const userCrop = paginate(sortedUsers, currentPage, pageSize)
  
  const handleProfessionSelect = (item) => {
    setSelectedProfession(item)
  }
  
  const clearFilter = () => {
    setSelectedProfession(undefined)
  }
  
  const handleSort = (item) => {
    if (sortBy.iterator === item) {
      setSortBy((prevState) =>
        ({...prevState, order: prevState.order=== 'asc' ? 'desc': 'asc'}))
    } else {
      setSortBy({iterator: item, order: 'asc'})
    }
  }
  
  return (
    
    <div className="d-flex">
      
      
      {professions &&
        <div className="d-flex flex-column flex-shrink-0 p-3">
          
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            valueProperty="_id"
            contentProperty="name"
            selectedItem={selectedProfession}
          />
          <button onClick={clearFilter} className="btn btn-secondary mt-2">Clear all filters</button>
        </div>
        
      }
      <div className="d-flex flex-column">
        <SearchStatus length={count}/>
        {count > 0 &&
          
          <UsersTable users={userCrop} onSort={handleSort} {...rest}/>
          
        }
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    
    </div>
  
  )
}
