import { Session } from 'inspector'
import Header from './components/header'
import LandingPage from './components/landingPage'
import Patches from './components/patches'
import { getServerSession } from 'next-auth'
import { IProfileProps } from './components/profile'

export default async function Home() {
  const session =  await getServerSession()
  return (
    <>
    {/* <LandingPage/> */}
      <Header {...session}/>
      <Patches/>
    </>
  )
}