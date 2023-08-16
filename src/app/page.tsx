"use client"
import Header from './components/header'
import LandingPage from './components/landingPage'
import Patches from './components/patches'
import Sidebar from './components/sidebar'
import { useState } from 'react'
import { SessionContextValue, useSession } from 'next-auth/react'

export default function Home() {
  const  {data: session , status}:SessionContextValue = useSession()
  const [isClosed , setisClosed] = useState<boolean>(true)


  return (
    <>
    <LandingPage/>
      <Sidebar isClosed={isClosed} setIsClosed={setisClosed} session={session}/>
      <Header  isClosed={isClosed} setIsClosed={setisClosed} session={session}/>
      <Patches/>
    </>
  )
}