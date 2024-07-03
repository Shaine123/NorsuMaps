import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../constants/logo'
import { icon } from '../../constants'
import * as ScreenOrientation from 'expo-screen-orientation';
import { setPortrateOrientation } from '../../state/universalSlice'
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated'

const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const MapDetailScreen = ({navigation}) => {

  const {mapData, portrateOrientation} = useSelector(state => state.universal)

  const dispatch = useDispatch()

  useEffect(() => {
      if(portrateOrientation == true){
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
      }else{
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
        console.log('ScreenLeft')
      }
  }, [portrateOrientation])
 
  const handlePress = async () => {
     console.log('working')
     
  }
 const showDetail = useSharedValue(0)
 const zIndex = useSharedValue(-2)
 const animatedStyle = useAnimatedStyle(() => {
    return {
       opacity: showDetail.value,
       zIndex: zIndex.value
    }
 })

 const [openDetails,setOpenDetails] = useState(true)

 const showIconBtn = () => {

    if(openDetails){
      showDetail.value = withTiming(1,{duration: 500})
      zIndex.value = withTiming(3,{duration: 500})
      setOpenDetails(false)
    }else{
      showDetail.value = withTiming(0,{duration: 500})
      zIndex.value = withTiming(-2,{duration: 500})
      setOpenDetails(true)
    }
   
 }
  return (
    <View style = {styles.container}>
      <Animated.View style = {[styles.infoContainer,animatedStyle]}>
        <Image style = {styles.subInfoImage} source={mapData.image} alt = {mapData.key}/>
        <Text style = {styles.subInfoText}>{mapData.name}</Text>
      </Animated.View>    
       {/* <View style = {styles.headerInfo}>
          <Text style = {styles.headerText}>{mapData.name}</Text>
       </View> */}
       <ImageBackground style = {styles.mapImage} source={mapData.map}/>
       {/* <View style = {styles.subInfoContainer}>
          <View style = {styles.subInfoCard}>
              <Image style = {styles.subInfoImage} source={mapData.image} alt = {mapData.key}/>
              <Text style = {styles.subInfoText}>{mapData.name}</Text>
          </View>
          <Image style = {styles.logoImage} source={logo.Norsu} alt='norsu'/>
          <Text style = {styles.mapAdditionalText}>Number of Rooms {mapData.numRoom}</Text>
          <View style = {styles.heartIconContainer}>
                  <Image
                    source={mapData.status == 'true' ? icon.HeartColored: icon.Heart}
                    alt='heart'
                    style = {styles.heartIcon}
                  />
          </View>
       </View> */}
       <View style = {styles.controlBar}>
        <TouchableOpacity onPress= {()=>{
           navigation.navigate('Main')
           dispatch(setPortrateOrientation({status: true}))
           }}>
          <Image
            source={icon.Home}
            alt='home'
            style = {styles.controlIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {handlePress()}}>
          <Image
            source={icon.LocationIconColored}
            alt='bookmark'
            style = {styles.controlIcon}
          />
        </TouchableOpacity>
          <Image
            source={icon.User}
            alt='user'
            style = {styles.controlIcon}
          />
       </View>
       <TouchableOpacity style = {styles.infoBtn} onPress={showIconBtn}>
         <Image
            source={icon.InfoIcon}
            alt = 'info'
            style = {styles.infoIconImage}
         />
       </TouchableOpacity>
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
     width: '30%',
     marginLeft: 15,
     marginRight: 15,
     marginTop: 45,
     backgroundColor: 'white',
     borderRadius: 25,
     zIndex: 2
   },
   headerText: {
     fontWeight: 'bold',
     fontSize: 30,
     alignSelf: 'center',
     marginTop: 15
   },
   mapImage: {
     width: '100%',
     height: 400,
     position: 'absolute'
   },
   subInfoContainer: {
     height: 120,
     width: '93%',
     marginLeft: 15,
     marginRight: 15,
     backgroundColor: 'white',
     borderRadius: 10,
     position: 'absolute',
     bottom: 150
   },
   subInfoCard: {
      position: 'relative'
   },
   subInfoImage: {
     height: 250,
     width: 240,
     borderRadius: 10,
     top: 20,
     left: 15,
     position: 'absolute',
   },
   subInfoText: {
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: 280,
      marginLeft: 60
   },
   logoImage: {
     height: 50,
     width: 50,
     position: 'absolute',
     right: 15,
     top: 60
   },
   mapAdditionalText: {
     color: 'gray',
     position: 'absolute',
     right: 55,
     top: 15,
     fontSize: 15
   },
   heartIconContainer: {
     backgroundColor: 'white',
     height: 35,
     width: 35,
     paddingLeft: 6,
     paddingTop: 8,
     borderRadius: 25,
     position: 'absolute',
     zIndex: 2,
     right: 5,
     marginTop: 6,
     marginRight: 5
   },
   heartIcon: {
     height: 20,
     width: 20
   },
   controlBar: {
    height: 60,
    width: '30%',
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 70,
    borderRadius: 40,
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  controlIcon: {
    height: 25,
    width: 25
  },
  infoBtn: {
     position: 'absolute',
     right: 20,
     top: 330,
  },
  infoIconImage: {
     height: 40,
     width: 40
  },
  infoContainer: {
     position: 'absolute',
     zIndex: 3,
     width: 500,
     height: 350,
     backgroundColor: 'white',
     left: 230,
     top: 10,
     borderRadius: 15
  }
})
export default MapDetailScreen
