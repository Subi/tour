import Header from './components/header'
import LandingPage from './components/landingPage'
import VideoReel from './components/videoReel'
import Patches from './components/patches'
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session =  await getServerSession()

  return (
    <>
    {/* <LandingPage/> */}
      <Header {...session}/>
      <VideoReel/>
     {/* <Patches/> */}
    </>
  )
}