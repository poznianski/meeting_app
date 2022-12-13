import { User } from './User.jsx'

export const UsersTable = ({ users, onSort, ...rest}) => {
  return (
    <table className="table bg-dark text-light">
      <thead>
      <tr>
        <th onClick={() => onSort('name')}scope="col">Name</th>
        <th scope="col">Traits</th>
        <th onClick={() => onSort('profession.name')}scope="col">Profession</th>
        <th onClick={() => onSort('completedMeetings')}scope="col">Meets</th>
        <th onClick={() => onSort('rate')}scope="col">Rating</th>
        <th onClick={() => onSort('bookmark')}scope="col">Bookmark</th>
        <th/>
      </tr>
      </thead>
    
    
      <tbody>
      {users.map((user) => (
        <User key={user._id} {...rest} {...user}/>
      ))}
      </tbody>
    </table>
  )
}
