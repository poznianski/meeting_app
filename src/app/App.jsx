import React, { useState } from 'react';
import { Users } from './components/Users.jsx'
import api from "./api"

export const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
    console.log(id);
  }
  return (
    <div>

      <Users onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} users={users} />
    </div>
  );
}
