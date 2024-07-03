import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity,ImageBackground, Text, Image } from 'react-native'
import { background, icon } from '../../constants'
import { useSelector } from 'react-redux'
import axios from 'axios'

const ProfileScreen = () => {

  const [userData,setUserData] = useState([])
  const {buildingNew,currentUser} = useSelector(state => state.universal)
  
  useEffect(() => {
    axios.get('https://backendnorsumaps.onrender.com/getAccount')
    .then((res) => {
     setUserData(res.data)
    })
  },[])
  
  const data = userData.filter((item) => {
     return item.name == currentUser
  })




  return (
    <View style = {styles.container}>
    <ImageBackground
      source={background.ProfileBG}
      style = {styles.imageContainer}
    />
    <View style = {styles.profileMain}>    
     <View  style = {styles.profileContainer}>
       <Image source={icon.DummyProfile} alt='dummy' style = {styles.profileNew}/>
    </View>
    <View style = {styles.profileInfo}>
       {
           data.length > 0 ? <>
             <Text style = {styles.mainText}>{data[0].name}</Text>
             <Text style = {styles.mainText}>{data[0].studentid}</Text>
             <Text style = {styles.mainText}>{data[0].email}</Text>
           </>
           : ''
       }
    </View>
    </View>
   
 </View>
  )
}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

 },
 imageContainer: {
   width: '100%',
   height: '100%',
   position: 'absolute',
   top: 0
 },
 profileMain: {
   marginTop: 190,
   marginLeft: 120   
 },
 profileContainer:{
  height: 170,
  width: 170,
  backgroundColor: 'white',
  borderRadius: 120,
  paddingLeft: 15,
  paddingTop: 15,
},
profileNew:{
  width: 140,
  height: 140,
},
profileInfo: {
  backgroundColor: 'white',
  width: '100%',
  height: 150,
  marginLeft: -60,
  padding: 15,
  marginTop: 10,
  borderRadius: 15
},
mainText:{
  fontWeight: 'bold',
  fontSize: 20,
  textAlign: 'center',
  borderWidth: 1,
  borderBottomColor: 'lightgray',
  borderTopColor: 'white',
  borderLeftColor: 'white',
  borderRightColor: 'white',
  marginTop: 5
}
 })

export default ProfileScreen
