import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { icon } from '../constants'

import { useDispatch } from 'react-redux'
import { openImageModal, saveNewImage } from '../state/universalSlice'
const UploadModal = ({control}) => {
  const [image,setImage]= useState()
  const dispatch = useDispatch()

  // const uploadImage = async () => {
  //    try{
  //       await ImagePicker.
  //       requestCameraPermissionsAsync()
  //       let result = await ImagePicker.launchCameraAsync({
  //         cameraType: ImagePicker.CameraType.front,
  //         allowsEditing: true,
  //         aspect: [1,1],
  //         quality: 1,
  //      })
  //       if(!result.canceled){
  //          await saveImage(result.assets[0].uri)
  //       }
  //    }catch (error){
  //      alert("Error uploading image" + error.message)
  //    }
  // }

  const saveImage = async (item) => {
    //  try{
    //    setImage(item)
    //    dispatch((saveNewImage({photo: item})))
    //    dispatch(openImageModal({state: false}))
    //  }catch (error) {
    //    throw error
    //  }
  }

  const [trialImage,setTrialImage] = useState('')
  const handleImagePickerPress =  async () => {
      // let result = await ImagePicker.launchImageLibraryAsync({
      //    mediaTypes: ImagePicker.MediaTypeOptions.All,
      //    allowsEditing: true,
      //    aspect: [1,1],
      //    quality: 1,
      // })

      // if(!result.canceled) {
      //    setTrialImage(result.assets[0].uri)
      // }
  }
  return (
  <View style = {{flex: 1, height: '100%', width:'100%', position: 'absolute'}}>
    <View style = {styles.container}>
    </View>
    <View style = {styles.ImageUploadContainer}> 
            <Text style = {styles.textUpload}>Profile Photo</Text>
            <View style = {styles.btnContainer}>
              <TouchableOpacity style = {styles.uploadBtn} onPress={()=>{
               
              }}> 
                  <Image
                    source={icon.Camera}
                    alt='cam'
                    style = {styles.cameraIcon}
                  />
              </TouchableOpacity>
              <TouchableOpacity style = {styles.uploadBtn} onPress={() => {
                 handleImagePickerPress()
              }}> 
                  <Image
                    source={icon.Gallery}
                    alt='cam'
                    style = {styles.cameraIcon}
                  />
              </TouchableOpacity>
              <TouchableOpacity style = {styles.uploadBtn}> 
                  <Image
                    source={icon.Delete}
                    alt='cam'
                    style = {styles.cameraIcon}
                  />
              </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
   container:{
     backgroundColor: 'black',
     height: '100%',
     width: '100%',
     opacity: .5,
     position: 'absolute',
     top: 0,
     zIndex: 2
   },
   ImageUploadContainer:{
      width: 370,
      height: 170,
      backgroundColor: 'white',
      borderRadius: 20,
      marginLeft: 20,
      marginTop: 180,
      marginRight: 20,
      zIndex: 3
   },
   textUpload:{
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20
   },
   btnContainer:{
     flexDirection: 'row',
     gap: 20,
     marginLeft: 75,
     marginRight: 75,
     marginTop: 20
   },
   uploadBtn:{
     backgroundColor: '#D3D3D3',
     width: 60,
     height: 60,
     alignItems: 'center',
     justifyContent: 'center',
     borderRadius: 10,
     paddingRight: 3
   },
   cameraIcon: {
      height: 40,
      width: 40
   },
   imageContainer: {
     width: 100,
     height: 100,
     borderWidth: 1,
     borderColor: 'black'
   },
   imageProfile: {
     height: 85,
     width: 85
   }
}) 
export default UploadModal
