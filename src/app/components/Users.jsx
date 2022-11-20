import React, { useState, useEffect } from 'react'
import { User } from './User.jsx'
import { Pagination } from './Pagination'
import { paginate } from '../utils/paginate.js'
import { GroupList } from './GroupList.jsx'
import api from '../api'

export const Users = ({ users: allUsers, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProfession, setSelectedProfession] = useState()
  
  const count = allUsers.length
  const pageSize = 4
  
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])
  
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const filteredUsers = selectedProfession
    ? allUsers.filter((user) => user.profession === selectedProfession)
    : allUsers
  const userCrop = paginate(filteredUsers, currentPage, pageSize)
  
  const handleProfessionSelect = (item) => {
    setSelectedProfession(item)
  }
  
  return (
    <>
      {professions &&
        <GroupList
          items={professions}
          onItemSelect={handleProfessionSelect}
          valueProperty="_id"
          contentProperty="name"
          selectedItem={selectedProfession}
        />}
      
      {count > 0 &&
        <table className="table bg-dark text-light">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Traits</th>
            <th scope="col">Profession</th>
            <th scope="col">Meets</th>
            <th scope="col">Rating</th>
            <th/>
          </tr>
          </thead>
          
          
          <tbody>
          {userCrop.map((user) => (
            <User key={user._id} {...rest} {...user}/>
          ))}
          </tbody>
        </table>}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  )
}
