import React from 'react'
import Navbar from "./_components/navbar"

const LandingPageLayout = ({children}: {
  children:React.ReactNode
}) => {
  return (
    <><Navbar />{children}</>
  )
}

export default LandingPageLayout