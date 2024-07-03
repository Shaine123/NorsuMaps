import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image,} from 'react-native'
import { icon } from '../../constants'
import UploadModal from '../../component/UploadModal'
import { useDispatch, useSelector } from 'react-redux'
import { openImageModal } from '../../state/universalSlice'

function UserDetailScreen({navigation}) {

  const {imageModal, newImage, userCredentials} = useSelector(state => state.universal) 
  const dispatch = useDispatch()

  console.log('userDetailScreen')
  console.log(newImage)
  const [imageModals,setImageModal] = useState(false)
  const handlePress = () => {
     console.log('clicked')
      dispatch((openImageModal({status: true})))
  }
  return (
     <View style = {styles.container}> 
       <TouchableOpacity style = {styles.navControlBtn} onPress={()=>{
          navigation.navigate('User')
       }}>
         <Image
           source={icon.LeftArrow}
           alt ='ctrbtn'
           style = {styles.navIcon}
         />
       </TouchableOpacity>
       <View style = {styles.circle}></View>
       <View style = {styles.mainBackground}>
           <View style = {styles.profileContainer}>
             {
               
                    <Image
                    source={newImage ? {uri: newImage} : userCredentials[0].Profile}
                    alt='pp'
                    style = {styles.profileIcon1}
                  />
             }
              <TouchableOpacity style = {styles.cameraBtn} onPress={handlePress}>
                <Image
                  source={icon.Camera}
                  alt='pp'
                  style = {styles.profileIcon2}
                />
              </TouchableOpacity>
           </View>
           <TouchableOpacity style = {styles.editIconContainer}> 
               <Image
                 source={icon.EditIcon}
                 alt = 'edit'
                 style = {styles.editIcon}
               />
           </TouchableOpacity>
       </View>
       <View style = {styles.infoContainer}>
          <Text style = {styles.label}>Name</Text>
          <Text style = {styles.mainText}>Rejhane Graciadas</Text>
          <View style = {styles.line}></View>
          <Text style = {styles.label}>Student Number</Text>
          <Text style = {styles.mainText}>20200333</Text>
           <View style = {styles.line}></View>
          <Text style = {styles.label}>Email</Text>
          <Text style = {styles.mainText}>dummy@hotmail.com</Text>
           <View style = {styles.line}></View>
          <Text style = {styles.label}>Phone</Text>
          <Text style = {styles.mainText}>09648614432</Text>
           <View style = {styles.line}></View>
       </View>
       {
         imageModal ? <UploadModal control = {()=>{handlePress()}}/> : ''
       }
     </View>
  )
}

const styles = StyleSheet.create({
   container:{
     flex: 1,
     backgroundColor: 'white'
   },
   mainBackground:{
      width: '100%',
      height: 250,
      backgroundColor: '#D3D3D3',
      position: 'absolute',
      zIndex: -1
   },
   circle:{
     height: 100,
     width: 100,
     borderRadius: 60,
     backgroundColor: '#D3D3D3',
     position: 'absolute',
     right: -10,
     top: 200,
     zIndex: -1
   },
   profileContainer:{
      height: 120,
      width: 120,
      marginLeft: 150,
      marginTop: 80,
   },
   cameraBtn: {
     marginLeft: 80,
     marginTop: -40,
     backgroundColor: 'white',
     height: 50,
     width: 50,
     borderRadius: 30,
     justifyContent: 'center',
     alignItems: 'center'
   },
   profileIcon1:{
    height: 120,
    width: 120,
    borderRadius: 80
   },
   profileIcon2:{
     height: 30,
     width: 30
   },
   navControlBtn:{
    marginTop: 30,
    marginLeft: 10
   },
   navIcon:{
     height: 20,
     width: 20,
   },
   infoContainer:{
     marginTop: 220,
     marginLeft: 20
   },
   label:{
    color: 'gray',
    marginBottom: 10,
    marginTop: 10
   },
   line:{
     height: 1,
     width: '65%',
     backgroundColor: 'lightgray',
     marginTop: 5
   },
   mainText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black'
   },
   editIconContainer: {
      position: 'absolute',
      right: 23,
      top: 248
   },
   editIcon: {
     width: 40,
     height: 40,
   }
})
export default UserDetailScreen
