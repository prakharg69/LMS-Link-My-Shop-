import React from 'react'
import { useParams } from 'react-router-dom'
function Login() {
    const {role} = useParams()
  return (
    <div>{role}</div>
  )
}

export default Login