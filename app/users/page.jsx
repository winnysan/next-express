'use client'
import { useEffect, useState } from 'react'
import { useGetUsersQuery } from '../redux/slices/usersApiSlice'

const Users = () => {
  const [users, setUsers] = useState([])

  const { data, refetch } = useGetUsersQuery()

  useEffect(() => {
    setUsers(data?.users)
  }, [data])

  return (
    <main>
      <h1>Fetch users</h1>

      <button onClick={refetch} type="button">
        Refetch
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
