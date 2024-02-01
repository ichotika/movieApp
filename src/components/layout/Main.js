import React from 'react'
import Header from './Header'
import Tab from './Tab'

const Main = ({navigation}) => {
  return (
    <>
     <Header />
     <Tab navigation={navigation} />
     
    </>
  )
}

export default Main