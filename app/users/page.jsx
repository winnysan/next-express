'use client'
import { useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data.users)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main>
      <h1>Fetch users</h1>

      <button onClick={fetchUsers} type="button">
        Fetch
      </button>

      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  )
}

export default Users
