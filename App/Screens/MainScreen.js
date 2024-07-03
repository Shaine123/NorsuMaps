import React, { useEffect, useRef, useState } from 'react'
import { Button, Dimensions, Image, ImageBackground, PanResponder, StyleSheet, Text, TextInput, View, TouchableOpacity,  FlatList, Linking   } from 'react-native'
import { background, icon } from '../../constants'

import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'
import BottomSheet from '../../component/BottomSheet'
import {} from 'react-native-gesture-handler'
import logo from '../../constants/logo'
import { center } from '@shopify/react-native-skia'
import { useDispatch, useSelector } from 'react-redux'
import { MapDetail, populateDatabase, searchResult, setPortrateOrientation } from '../../state/universalSlice'
import { Touchable } from 'react-native'
import { addLocation, deleteAllValues, deleteAllValuesUser, getData } from '../../database/database'
import locationData from '../../assets/data/locationData'
import * as ScreenOrientation from 'expo-screen-orientation';


const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const MainScreen =  ({navigation}) => {
 
  const {portrateOrientation} = useSelector(state => state.universal)

  useEffect(() => {
    if(portrateOrientation == true){
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }else{
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
    }

  },[portrateOrientation])
  //This line of code gets the data of the user 

  const {userCredentials} = useSelector(state => state.universal)

  const dispatch = useDispatch()
  const [search,handleSearch] = useState('')
  const {dbMainData} = useSelector(state => state.universal)

 //Comment this line of code when adding data that is not connected to the database

  // const [location, setLocation] = useState(locationData)
  const [location, setLocation] = useState([...dbMainData])
 
  

  const [college] = useState([
     {name: 'CAS', image: logo.CAS , key: '1'},
     {name: 'CBA', image: logo.CBA, key: '2'},
     {name: 'CIT', image: logo.CIT, key: '3'},
     {name: 'CTED', image: logo.CTED, key: '4'}
  ])

  const [bookMark,setBookMark] = useState(false)

  const favoritBuilding = (val) => {
    const newData = location.map((item) => {
       if(item.KEY == val){
         if(item.STATUS == 'true'){
            return {...item, STATUS : 'false'}
         }else{
            return {...item, STATUS : 'true'}
         }
       }else{
          return item
       }
    })
     setLocation(newData)
       
      deleteAllValues()
      newData.map(item => {
                addLocation(item.Name, item.Image, item.NumberOfRoom, item.RoomDetail, item.KEY, item.STATUS, item.Map)
            })
      dispatch(populateDatabase({data:newData}))

  }
  const handleKeyPress = () => {
    navigation.navigate('SearchScreen')
  }

  useEffect(()=>{
    dispatch(searchResult({data: location ,search : search}))
  },[search])

  
  return (
      <View style = {styles.container}>
        <View style= {styles.profileSection}>
            <Text style = {styles.profileText}>Where do you want to go?</Text>
            {/* {
               userCredentials.map((item) => {
                  return (
                    <Image style={styles.profileContainer} source={item.Profile} alt='prof'/>
                  )
               })
            } */}
            <Image style={styles.profileContainer} source={icon.DummyProfile}/>
        </View>
      <View style = {styles.searchContainer}>
       <Image style = {styles.searchIcon}source={icon.Magnifying} alt='mag'/>
       <TextInput
          placeholder='Search'
          value={search}
          onChangeText={handleSearch}
          style = {styles.search}
          onSubmitEditing={handleKeyPress}
        />
       </View>
       <View style ={styles.locationContainer}>
          <Text style = {styles.locationText}>NORSU Buildings</Text>
          <FlatList
            data={location}
            renderItem={({item}) => (
               <View style = {styles.buildingCard}>
               <TouchableOpacity style = {{zIndex: 2}} onPress={()=>{
                 favoritBuilding(item.KEY)
                 }}> 
                 <View style = {styles.heartIconContainer}>
                  <Image
                    source={item.STATUS == 'true' ? icon.HeartColored: icon.Heart}
                    alt='heart'
                    style = {styles.heartIcon}
                  />
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                   dispatch(MapDetail({
                    name: item.Name ,
                    image: item.Image,
                    numRoom: item.NumberOfRoom,
                    roomDetil: item.RoomDetail,
                    key: item.KEY,
                    status: item.STATUS ,
                    map: item.Map
                  }))
                  dispatch(setPortrateOrientation({status: false}))
                   navigation.navigate('MapDetail')
                   }}>
                  <Image
                    source={item.Image}
                    alt='img'
                    style = {styles.buildingImage}
                  />
                </TouchableOpacity>
                 <Text style = {styles.buildingText}>{item.Name}</Text>
               </View>
            
            )}
            horizontal = {true}
            extraData={bookMark}
          />
       </View>
       <Text style = {styles.collegesText}>Colleges</Text>
       <View style = {styles.collegesContainer}>
         <View style = {styles.collegeCard}>
                <Image
                 source={logo.CAS}
                 alt= 'cas'
                 style = {styles.collegeLogo}
               />
               <Text>CAS</Text>
          </View>
         <View style = {styles.collegeCard}>
                <Image
                 source={logo.CBA}
                 alt= 'cba'
                 style = {styles.collegeLogo}
               />
               <Text>CBA</Text>
          </View>
         <View style = {styles.collegeCard}>
                <Image
                 source={logo.CIT}
                 alt= 'cit'
                 style = {styles.collegeLogo}
               />
               <Text>CIT</Text>
          </View>
         <View style = {styles.collegeCard}>
                <Image
                 source={logo.CTED}
                 alt= 'cted'
                 style = {styles.collegeLogo}
               />
               <Text>CTED</Text>
          </View>
         <View style = {styles.collegeCard}>
                <Image
                 source={logo.CCJE}
                 alt= 'ccje'
                 style = {styles.collegeLogo}
               />
               <Text>CTED</Text>
          </View>
         <View style = {styles.collegeCard}>
                <Image
                 source={logo.CAF}
                 alt= 'caf'
                 style = {styles.collegeLogo}
               />
               <Text>CTED</Text>
          </View>
       </View>
       <View style = {styles.controlBar}>
          <Image
            source={icon.Home}
            alt='home'
            style = {styles.controlIcon}
          />
          <TouchableOpacity onPress={()=>{
             navigation.navigate('BookMark')
            //  Linking.openURL("mailto: shaineberdida@gmail.com")
            //Use the following code when adding new Info
            // deleteAllValues()
            // location.map(item => {
            //     addLocation(item.name,item.image, item.numberOfRooms,item.roomDetails, item.key, item.status, item.map)
            // })
            // deleteAllValuesUser()
          }}>
            <Image
              source={icon.BookMark}
              alt='bookmark'
              style = {styles.controlIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
             navigation.navigate('User')
          }}>
            <Image
              source={icon.User}
              alt='user'
              style = {styles.controlIcon}
            />
          </TouchableOpacity>
       </View>
      </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: 'white',
       paddingLeft: 15,
       paddingRight: 15
    },
    profileSection: {
       flexDirection: 'row',
       marginTop: 45,
       gap: 110,
    },
   profileContainer: {
     width: 55,
     height: 55,
     borderRadius: 40,
     marginTop: 12,
     marginLeft: 15
   },
   profileText: {
     fontWeight: 'bold',
     fontSize: 30,
     width: 185
   },
   search: {
     height: 55,
     width: '97%',
     backgroundColor: '#E8E9EB',
     borderRadius: 15,
     paddingLeft: 60,
     fontSize: 18
   },
   searchContainer: {
     position: 'relative',
     marginTop: 30
   },
   searchIcon: {
     position: 'absolute',
     zIndex: 2,
     height: 40,
     width: 40,
     marginTop: 7,
     marginLeft: 10
   },
   locationText: {
     fontWeight: 'bold',
     fontSize: 24,
     marginTop: 35,
     marginBottom: 20
   },
   buildingCard: {
     width: 179,
     height: 240,
     borderColor: '#D3D3D3',
     borderWidth: 1,
     marginLeft: 5,
     marginRight: 5,
     borderRadius: 10,
     backgroundColor: 'white',
     overflow: 'hidden'
   },
   buildingImage: {
      height: 150,
      width: 179,
      borderRadius: 10
   },
   buildingText: {
     fontSize: 19,
     fontWeight: 'bold',
     marginTop: 10,
     marginLeft: 10
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
     marginTop: 5
   },
   heartIcon: {
     height: 20,
     width: 20
   },
   collegeCard: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    height: 80,
    width: 80,
    borderRadius: 10
   },
   collegesContainer: {
     flexDirection: 'row',
     flexWrap: 'wrap',
     alignItems: 'center',
     justifyContent: 'center',
     gap: 15
   },
   collegeLogo: { 
     height: 50,
     width: 50
   },
   collegesText: {
     fontWeight: 'bold',
     fontSize: 19,
     marginTop: 20,
     marginBottom: 15
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
     left: 30
   },
   controlIcon: {
     height: 25,
     width: 25
   }
})

