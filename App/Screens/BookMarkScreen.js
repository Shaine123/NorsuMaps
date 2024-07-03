import React, { useEffect } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { icon } from '../../constants'
import logo from '../../constants/logo'
import { MapDetail } from '../../state/universalSlice'
import * as ScreenOrientation from 'expo-screen-orientation';
import { setPortrateOrientation } from '../../state/universalSlice'

const BookMarkScreen = ({navigation}) => {

  const {dbMainData} = useSelector(state => state.universal)
  const dispatch = useDispatch()
  const newData = dbMainData.filter(item => item.STATUS == 'true')

  const {mapData, portrateOrientation} = useSelector(state => state.universal)
 
  
  useEffect(() => {
    if(portrateOrientation == true){
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }else{
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
      console.log('ScreenLeft')
    }
}, [portrateOrientation])
   
  return (
     <View style = {styles.container}>
      <View style = {styles.headerInfo}>
          <Text style = {styles.headerText}>Book Marked</Text>
      </View>
      <FlatList
       data={newData}
       renderItem={({item}) => (
         <TouchableOpacity onPress={()=>{
          dispatch(MapDetail({
            name: item.Name ,
            image: item.Image,
            key: item.KEY,
            status: item.STATUS ,
            map: item.Map
          }))
          dispatch(setPortrateOrientation({status: false}))
           navigation.navigate('MapDetail')
     
         }}>
          <View style = {styles.bookMarkContainer}>
            <Image
               source={item.Image}
               alt={item.KEY}
               style ={styles.bookMarkImage}
            />
            <View style = {styles.bookMarkTextContainer}>
                <Text style={styles.bookMarkText}>{item.Name}</Text>
                <Text style={styles.bookMarkTextSub}>Number Of Rooms 4</Text>
            </View>
            <Image
              source={logo.Norsu}
              alt='norsu'
              style= {styles.norsuImage}
            />
            <View style = {styles.sideColor}></View>
            <View style = {styles.sideColorRight}></View>
          </View>
         </TouchableOpacity>
       )}
      />
        <View style = {styles.controlBar}>
        <TouchableOpacity onPress= {()=>{navigation.navigate('Main')}}>
          <Image
            source={icon.Home}
            alt='home'
            style = {styles.controlIcon}
          />
        </TouchableOpacity>
          <Image
            source={icon.BookMark}
            alt='bookmark'
            style = {styles.controlIcon}
          />
          <Image
            source={icon.User}
            alt='user'
            style = {styles.controlIcon}
          />
       </View>
     </View>
  )
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: 'white',
   },
   headerInfo: {
     height: 80,
     width: '93%',
     marginLeft: 15,
     marginRight: 15,
     marginTop: 45,
     backgroundColor: 'white',
     borderColor: '#D3D3D3',
     borderWidth: 1,
     borderRadius: 10,
     zIndex: 2,
     marginBottom: 10
   },
   headerText: {
     fontWeight: 'bold',
     fontSize: 30,
     alignSelf: 'center',
     marginTop: 15
   },
   bookMarkContainer: {
       height: 70,
       width: '93%',
       borderColor: '#D3D3D3',
       borderRadius: 10,
       borderWidth: 1,
       marginLeft: 15,
       marginTop: 5,
       marginBottom: 5,
       overflow: 'hidden',
       position: 'relative',
       flexDirection: 'row'
   },
   bookMarkImage: {
      height: 55,
      width: 55,
      borderRadius: 10,
      zIndex: 3,
      position: 'absolute',
      marginTop: 5,
      marginLeft: 5,
   },
   sideColor: {
     width: 25,
     height: 75,
     backgroundColor: '#1E90FF',
     position: 'absolute',
     left: 0
   },
   sideColorRight:{
    width: 5,
    height: 75,
    backgroundColor: '#1E90FF',
    position: 'absolute',
    right: 0
   },
   bookMarkText: { 
     marginLeft: 80,
     marginTop : 5,
     fontSize: 20,
     fontWeight: 'bold'
   },
   bookMarkTextSub: { 
     marginLeft: 80,
     marginTop : 5,
     fontSize: 12,
    color: 'gray'
   },
   norsuImage: { 
     position: 'absolute',
     top: 5,
     height: 35,
     width: 35,
     right: 10,
   },
   controlBar: {
    height: 60,
    width: '95%',
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 70,
    borderRadius: 40,
    position: 'absolute',
    bottom: 20,
    left: 10
  },
  controlIcon: {
    height: 25,
    width: 25
  }
})

export default BookMarkScreen
