import Header from './components/header'
import styles from  './main.module.css'
import Patches from './components/patches'
import { getServerSession } from 'next-auth'



export default async function Home() {
  const session =  await getServerSession()

  return (
    <>
    <main id={styles.mainWrapper}>
      
    </main>
     {/* <Header {...session}/>
     <Patches/> */}
    </>
  )
}