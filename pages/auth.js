import React from 'react'
import {useUser} from '@auth0/nextjs-auth0/client'
export default function auth() {
    const {user, error, isLoading} = useUser()

    if(user)
    console.log(user)
    else
    console.log('no user')
  return (
    <div>auth</div>
  )
}
