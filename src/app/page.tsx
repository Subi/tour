"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Header from './components/header'
import Patches from './components/patches'

export default function Home() {

  return (
    <>
     <Header/>
     <Patches/>
    </>
  )
}