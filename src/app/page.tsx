import Header from './components/header'
import Patches from './components/patches'
import { getServerSession } from 'next-auth'



export default async function Home() {
  const session =  await getServerSession()

  return (
    <>
     <Header {...session}/>
     <Patches/>
    </>
  )
}