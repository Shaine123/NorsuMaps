import React, { useEffect, useRef, useState, useTransition } from 'react'
import { StyleSheet, Text, Animated, TouchableOpacity, Image , Dimensions, Share} from 'react-native'
import { View } from 'react-native'
import { SIZES, background, icon } from '../../constants'
import { WebView } from 'react-native-webview'
import MapView, { Marker,PROVIDER_GOOGLE, Polyline, Callout, Polygon } from 'react-native-maps';
import { setUpTests, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSelector } from 'react-redux'
import building from '../../constants/building'
import * as Location from 'expo-location'
import * as Speech from 'expo-speech';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios'


const { width, height } = Dimensions.get('window'); 
const AdminMapScreen = ({navigation}) => {

  const [userLocation,setUserLocation] = useState('')
 
  const origin = {latitude: 9.352500, longitude: 122.837384}
  const destination = {latitude:   9.352324    , longitude: 122.838399  }
  const googleAPI ="AIzaSyAZAsLOJeH_KeY41YE_U7QkP_Oi3RM1KOU"


 const [userDestination,setUserDestination] = useState('')
 const [distance,setDistance] = useState('')
 const [duration,setDuration] = useState('')
  

 
  const [region, setRegion] =useState({
    latitude: 9.352500, // Initial latitude (e.g., San Francisco)
    longitude: 122.837384, // Initial longitude (e.g., San Francisco)
    latitudeDelta:  0.001,
    longitudeDelta: 0.001,
  });

  const [route, setRoute] = useState([]);
  const [nextTurn, setNextTurn] = useState('');

  const handleDirectionsReady = (result) => {
    setRoute(result.coordinates);

    if (result.legs && result.legs.length > 0) {
      const steps = result.legs[0].steps;
      if (steps && steps.length > 0) {
        const instruction = steps[0].maneuver ? steps[0].maneuver.instruction : null;
        if (instruction) {
          setNextTurn(instruction);
        }
      }
    }
  };

  useEffect(() => {
    if (nextTurn) {
      Speech.speak(nextTurn);
    }
  }, [nextTurn]);

  const [newBuildingData,setNewBuildingData] = useState([])
  useEffect(() => {
    axios.get('https://backendnorsumaps.onrender.com/getBuilding')
  .then((res) => {
    setNewBuildingData(res.data)
  })
   },[])
  useEffect(() => {
     const getPermissions = async () => {
       let {status} = await Location.requestForegroundPermissionsAsync()
       if(status !== 'granted'){
         console.log('Please Grant Perminssion')
         return ''
       }

       let currentLocation = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        accuracy: Location.Accuracy.High
       })
      //  console.log(currentLocation)
       setUserLocation({latitude: currentLocation.coords.latitude , longitude: currentLocation.coords.longitude  })
       setRegion({
        latitude: currentLocation.coords.latitude, // Initial latitude (e.g., San Francisco)
        longitude: currentLocation.coords.longitude, // Initial longitude (e.g., San Francisco)
        latitudeDelta:  0.001,
        longitudeDelta: 0.001,
       })
       
      Location.watchPositionAsync({ distanceInterval: 10 }, (newLocation) => {
        setRegion({
          latitude: newLocation.coords.latitude,
          longitude: newLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      });

     }
     getPermissions()
  },[])
    

 

  const mapsData = [
    {
       id: 1,
       title: 'IT Building and Library' ,
       description: 'Thsi Building has 2 floors',
       latitude:  9.353699 ,
       longitude: 122.836321,
       latitudeText: null,
       longitudeText: null ,
       textInfo: 'IT Building',
       uri: require('../../assets/icon/buildingDef1.png') ,
    },
    {
       id: 2,
      title: "Amphi" ,
      description: " This Amphi Area" ,
      latitude: 9.353206 ,
      longitude: -237.161560 ,
      latitudeText: 9.353226  ,
      longitudeText: -237.161560 ,
      textInfo: 'Amphi' ,
      uri: require('../../assets/icon/buildingDef1.png') ,
   },
   {
     id: 3,
    title: 'CBA Building' ,
     description: 'CBA consist of 2 floors' ,
    textInfo: 'CBA Building' ,
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.353911  ,
    longitude: 122.836058,
    latitudeText: 9.353953,
    longitudeText:  122.836037,
  },
   {
     id: 4,
    title: 'ECP Building',
    description: 'Norsu Generator' ,
    textInfo: 'Electrical Power Center',
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.352890 ,
    longitude:  122.836552,
    latitudeText: 9.352916,
    longitudeText: 122.836568 ,
  },
  {
     id: 5,
    title: 'Norsu Cannteen',
    description: 'Norsu Public Canteen' ,
    textInfo: 'Norsu Canteen ' ,
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude:  9.353078 ,
    longitude: 122.837478 ,
    latitudeText:  9.353112,
    longitudeText: 122.837485 ,
  },
  {
     id: 6,
     title: "Avr Building" ,
    description: "This is the AVR Building" ,
    textInfo: 'AVR Building' ,
    uri:  require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.353657 ,
    longitude: 122.836621 ,
    latitudeText: 9.353705 ,
    longitudeText:  122.836632 ,
  },
  {
    id: 7,
     title: "Registrar/Accounting Building",
    description: "This is the Registrar/Accounting Building" ,
    textInfo: 'Registrar/Accounting Building' ,
    uri:  require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.352464 ,
    longitude: 122.837693,
    latitudeText: 9.352501 ,
    longitudeText: 122.837704 ,
  },
  {
    id: 8,
      title: "Campus Clinic Building Building" ,
    description: "This is the Campus Clinic Building Building" ,
    textInfo: 'Campus Clinic Building' ,
    uri:  require('../../assets/icon/buildingDef1.png'),
    latitude: 9.352755 ,
    longitude: 482.838202,
    latitudeText: 9.352770 ,
    longitudeText: 482.838178,
  },
  {
    id: 9,
    title: "Accreditation Room" ,
    description: "Accreditation Room" ,
    textInfo: 'Accreditation Room' ,
    uri:  require('../../assets/icon/buildingDef1.png'),
    latitude: 9.352678 ,
    longitude: 122.838348 ,
    latitudeText:  9.352705 ,
    longitudeText:  482.838361,
  },
  {
    id: 10,
     title: "Office of the University President" ,
    description: "Office of the University President",
    textInfo: 'Office of the University President' ,
    uri:  require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.352620,
    longitude: 122.838467 ,
    latitudeText: 9.352573,
    longitudeText: 482.838420,
  },
  {
    id: 11,
    title:  "Old Research Office",
    description: "Old Research Office" ,
    textInfo: 'Old Research Office' ,
    uri:  require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.352646 ,
    longitude:  122.838520,
    latitudeText: 9.352657 ,
    longitudeText: 482.838538 ,
  },
  {
   id: 12,
    title: "SG Office" ,
    description: "SG Office" ,
    textInfo: '"SG Office"' ,
    uri:  require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.352537  ,
    longitude: 482.838597 ,
    latitudeText: 9.352552  ,
    longitudeText: 482.838597,
  },
  {
   id: 13,
    title: "HR",
    description: "HR" ,
    textInfo:"HR" ,
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.352505  ,
    longitude: 482.838645  ,
    latitudeText: 9.352465  ,
    longitudeText: 482.838645 ,
  },
    
  {
   id: 14,
   title: " Student Center ",
    description: " Student Center ",
    textInfo: " Student Center " ,
    uri:require('../../assets/icon/buildingDef1.png')  ,
    latitude: 9.352376  ,
    longitude: 122.839009  ,
    latitudeText: 9.352318  ,
    longitudeText: 122.839003 ,
  },
    
  {
   id: 15,
   title: " CAS Building " ,
    description: " This is the CAS Building" ,
    textInfo: 'CAS Building ' ,
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.352981  ,
    longitude: 122.838826  ,
    latitudeText: 9.352931 ,
    longitudeText: 122.838826,
  },
    
  {
   id: 16,
     title: " CAF " ,
    description:  " CAF ",
    textInfo: " CAF " ,
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.352854  ,
    longitude:  482.837937  ,
    latitudeText: 9.352865  ,
    longitudeText: 482.837937 ,
  },
    
  {
   id: 17,
    title: " TBD1 ",
    description: " TBD1 ",
    textInfo: " TBD1 " ,
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude:  9.352568 ,
    longitude: 482.838678  ,
    latitudeText: 9.352578  ,
    longitudeText: 482.838678,
  },
    
  {
   id: 18,
    title: " TBD3 ",
    description: " TBD 3" ,
    textInfo: " TBD 3" ,
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.352394 ,
    longitude: 482.838409 ,
    latitudeText:   9.352414 ,
    longitudeText: 482.838409,
  },
    
  {
   id: 19,
    title: " TBD2 " ,
    description: " TBD2 " ,
    textInfo: " TBD2 ",
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.352324  ,
    longitude: 482.838409 ,
    latitudeText: 9.352334 ,
    longitudeText:  482.838409 ,
  }, 
  {
   id: 20,
    title: " 2 Rooms CBA/CED " ,
    description: " 2 Rooms CBA/CED" ,
    textInfo: '2 Rooms CBA/ CED',
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.353233  ,
    longitude: 482.837780  ,
    latitudeText: 9.353253  ,
    longitudeText: 482.837780 ,
  },
  {
   id: 21,
    title:" 2 CED Rooms",
    description: " CED8 && CED9" ,
    textInfo: '2 CED Rooms CED8 && CED9' ,
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.353195  ,
    longitude: 482.837871  ,
    latitudeText: 9.353155  ,
    longitudeText: 482.837871 ,
  },
    
  {
   id: 22,
     title: "4 Rooms" ,
    description: " Ass. Campus Admin, CED10, 2 No Label Rooms" ,
    textInfo: '4 Rooms',
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.353145  ,
    longitude:  482.838000  ,
    latitudeText: 9.353165  ,
    longitudeText: 482.838000 ,
  },
  {
   id: 23,
    title: "Old Midwiffery Building",
    description: " Old Midwiffery Building B" ,
    textInfo: ' Old Midwiffery Building B' ,
    uri:require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.353095  ,
    longitude:  482.838107  ,
    latitudeText: 9.353045  ,
    longitudeText: 482.838107 ,
  },
  {
   id: 24,
    title: "New Building" ,
    description: "New Building" ,
    textInfo: "New Building" ,
    uri: require('../../assets/icon/buildingDef1.png') , 
    latitude: 9.353045  ,
    longitude: 482.838230  ,
    latitudeText: 9.353065  ,
    longitudeText: 482.838230 ,
  },
  {
   id: 25,
    title: "CAS SG Office" ,
    description: "CAS SG Office" ,
    textInfo: "CAS SG Office" ,
    uri: require('../../assets/icon/buildingDef1.png') , 
    latitude: 9.352944  ,
    longitude:  482.838493  ,
    latitudeText: 9.352960  ,
    longitudeText: 482.838493 ,
  },
    
  {
   id: 26,
    title: "TBD 4" ,
    description: "TBD 4" ,
    textInfo: "TBD 4" ,
    uri: require('../../assets/icon/buildingDef1.png') , 
    latitude: 9.352752  ,
    longitude: 482.838570  ,
    latitudeText:  9.352772  ,
    longitudeText: 482.838570 ,
  },
    
  {
   id: 27,
   title: "Care Building" ,
    description: "Care Building" ,
    textInfo: "Care Building" ,
    uri: require('../../assets/icon/buildingDef1.png') , 
    latitude: 9.353377  ,
    longitude:  482.838075  ,
    latitudeText: 9.353392  ,
    longitudeText: 482.838075 ,
  },
    
  {
   id: 28,
    title: "SAS Building",
    description: "SAS Building" ,
    textInfo: "SAS Building" ,
    uri: require('../../assets/icon/buildingDef1.png') , 
    latitude: 9.353440  ,
    longitude: 482.838118  ,
    latitudeText: 9.353455 ,
    longitudeText: 482.838118 ,
  },
    
  {
   id: 29,
    title: "Campus Administrator Building" ,
    description: "Campus Administrator Building" ,
    textInfo: "Campus Administrator Building" ,
    uri: require('../../assets/icon/buildingDef1.png') , 
    latitude: 9.353313 ,
    longitude: 482.838125  ,
    latitudeText: 9.353275  ,
    longitudeText: 482.838125 ,
  },
    
  {
   id: 30,
    title: "CCJE Building" ,
    description: "CCJE Building",
    textInfo: "CCJE Building" ,
    uri: require('../../assets/icon/buildingDef1.png') , 
    latitude: 9.353684  ,
    longitude: 482.838020 ,
    latitudeText: 9.353700 ,
    longitudeText: 482.838640,
  },
    
  {
    id: 31,
    title: " Stock Room" ,
    description: "This is the stock room" ,
    textInfo: 'Stock Room',
    uri: require('../../assets/icon/buildingDef1.png') , 
    latitude: 9.353458  ,
    longitude: 482.838640 ,
    latitudeText: 9.353478 ,
    longitudeText: 482.838640 ,
  },
    
  {
   id: 32,
   title: " CIT Building" ,
    description: "This is the CIT Building" ,
    textInfo: 'CIT Building',
    uri: require('../../assets/icon/buildingDef1.png') , 
    latitude: 9.353128 ,
    longitude: 482.839309 ,
    latitudeText: 9.353148 ,
    longitudeText: 482.839309,
  },
    
  {
    id: 33,
    title: " Automotive Labs" ,
    description: "This is the Automotive Labs",
    textInfo: 'Automotive Labs Builidng',
    uri: require('../../assets/icon/buildingDef1.png')  ,
    latitude: 9.352918  ,
    longitude: 482.839411  ,
    latitudeText: 9.352938  ,
    longitudeText: 482.839411 ,
  },
  {
    id: 34,
    title: " Rooms CIT" ,
    description: "3 Rooms in this Building" ,
    textInfo: 'Additional Rooms',
    uri: require('../../assets/icon/buildingDef1.png')  ,
    latitude: 9.352874 ,
    longitude: 482.839476 ,
    latitudeText:  9.352834 ,
    longitudeText: 482.839476 ,
  },
  {
    id: 35,
    title: " CAS Rooms " ,
    description: "This building consist of CAS Rooms",
    textInfo: 'CAS Rooms' ,
    uri: require('../../assets/icon/buildingDef1.png')  ,
    latitude: 9.353134  ,
    longitude:  482.839762 ,
    latitudeText: 9.353154 ,
    longitudeText: 482.839762 ,
  },
  {
    id: 36,
    title: " Academic Building " ,
    description: "This building is the Academic Building" ,
    textInfo: 'Academic Building',
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.354143  ,
    longitude: 482.837885 ,
    latitudeText:  9.354093 ,
    longitudeText: 482.837885 ,
  },
  {
    id: 37,
    title:  " CCJE and CIT Room ",
    description: "This building is for the CCJE and CIT Department",
    textInfo: 'CCJE and CIT Building' ,
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.353710 ,
    longitude: 482.838740 ,
    latitudeText: 9.353740  ,
    longitudeText:  482.838740 ,
  },
  {
    id: 38,
    title: " Ball Field",
    description: "This is the Ball Field Area" ,
    textInfo: ' Ball Field Area',
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.354361 ,
    longitude: 482.839132  ,
    latitudeText: 9.354380 ,
    longitudeText: 482.839132 ,
  },
  {
    id: 39,
    title:  " Nursery Area",
    description: "This is the Nursery Area",
    textInfo: 'Nursery Area'   ,
    uri: require('../../assets/icon/buildingDef1.png') ,
    latitude: 9.353423  ,
    longitude: 482.836140 ,
    latitudeText: 9.353453  ,
    longitudeText: 482.836140,
  },
  ]
  
  
  const {defBuildingInfo} = useSelector(state => state.mongoDB)
  const {buildingNew,currentUser} = useSelector(state => state.universal)


 // location section ends here

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       console.error('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setRegion({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     });
  //   })();
  // }, []);

  //images sections starts here
  const customMarkerIcon = require('../../assets/icon/buildingIcon1.png');
  const defBuilding = require('../../assets/icon/buildingDef1.png')
  const canteenBuilding = require('../../assets/icon/canteen1.png')
  //images section stops here


  const customMapStyle = [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [
        { hue: 'black' }, // Change the hue to adjust the color
        { saturation: 100 } // Desaturate the color to make it less vibrant
      ]
    }
  ];
//Custon roaad coordinates start here
  const customRoadCoordinates = [
    { latitude: 9.353292, longitude: 122.836745 }, // Example road coordinates
    { latitude: 9.352964, longitude: 122.836595 },
  ];
  const customRoadCoordinates1 = [
    { latitude: 9.352895, longitude: 482.838660}, // Example road coordinates
    { latitude: 9.353296, longitude: 482.837699 },
  ];
  const customRoadCoordinates2 = [
    { latitude: 9.353027, longitude: 482.838220}, // Example road coordinates
    { latitude: 9.353001, longitude: 482.838349},
  ];
  const customRoadCoordinates3 = [
    { latitude: 9.353470, longitude: 482.837775}, // Example road coordinates
    { latitude: 9.353340, longitude: 482.838035},
  ];
  const customRoadCoordinates4 = [
    { latitude: 9.353649, longitude: 482.837848}, // Example road coordinates
    { latitude: 9.353223, longitude: 482.838837},
  ];
  
  const customRoadCoordinates5 = [
    { latitude: 9.352948, longitude: 122.837452}, // Example road coordinates
    { latitude: 9.352461, longitude: 122.837265},
  ];
//Custom road coordinates ends here

  const marker = { 
     coordinate: {latitude: 9.353699  , longitude: 122.836321 } ,
     title: 'IT Building',
     description: 'IT Building and Library'
  }
  const mapViewRef = useRef(null)

  useEffect(() => {
    // if (mapViewRef.current) {
    //   mapViewRef.current.animateToRegion(region, 500); // Zoom to the specified region with duration of 1000ms
    // }
  }, [region]);

  const movTo = async () => {
    //  const camera = await mapViewRef.current.getCamere()
    //  if(camera){
    //    camera.center = userLocation
    //    mapViewRef.current.animateCamera(camera,{duration: 1000})
    //  }

  }
 useEffect(() => {
  movTo()
  console.log('working useEffect')
 }, [userLocation])

 

  const popUpHeight = useSharedValue(0);
  const [openPop,setPop] = useState(false)
  const [popInfo,setPopInfo] = useState([])
  const [dataPopInfo, setDataPopInfo] = useState([])
  const [openText,setOpenText] = useState([0,-6])
  const [test,setState] = useState()

  const handleMarkerPress = (id) => {
    console.log('working')
    console.log(id)
   setDataPopInfo([])
    const newData = defBuildingInfo.filter((item) => {
        return item.id === id
    })
    if(newData.length > 0){
      newData[0].buildingData.secondRoom.map((item) => {
        console.log(item)
      })
    }
    setPopInfo(newData)
     setPop(item => !item)
  };

  

  const handleMarkerPressDB = (id) => {
    setPopInfo([])
    const newData = newBuildingData.filter((item) => {
      return item._id === id
  })
   console.log(newData)
   setDataPopInfo(newData)
  setPop(item => !item)
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarWidth,setSidebarWidth] = useState(-290)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if(sidebarOpen){
      setSidebarWidth(0)  
    }else{
     setSidebarWidth(-290)   
    }
    // sidebarWidth.value = withSpring(sidebarOpen ? 0 : 200); // Adjust sidebar width as needed
  };



   const test1 =  ['/buildingDef1.png']
   const dum = 'AVR'

   const [sample,setSample] = useState([ '../../assets/icon/buildingDef1.png'])



if(popInfo.length > 0){
  popInfo[0].buildingData.secondRoom.map((item) => {
     return ( 
       console.log(item)
     )
  })
}

const a  = [{dummy:'AVR.jpg'}]

const build = '../../assets/building/' + a[0].dummy

const edgePadding = {
   top: 10,
   right: 10,
   bottom: 10,
   left: 10
}
const traceRoute = () => {
   mapViewRef.current.fitToCoordinates([origin,userDestination],edgePadding)
}

const traceRouteOnReady = (result) => {
  console.log("working distance")
  console.log(result.distance)
  setDistance(result.distance)
  setDuration(result.duration * 3.5)

  setRoute(result.coordinates);

  if (result.legs && result.legs.length > 0) {
    const steps = result.legs[0].steps;
    if (steps && steps.length > 0) {
      const instruction = steps[0].maneuver ? steps[0].maneuver.instruction : null;
      if (instruction) {
        setNextTurn(instruction);
      }
    }
  }
}

useEffect(() => {
  if (nextTurn) {
    Speech.speak(nextTurn);
  }
}, [nextTurn]);

const shareLocation = () => {
  Share.share({
    message: `Check out my location: https://maps.google.com/maps?q=${origin.latitude},${origin.longitude}`,
  });
}



  return (
    <View style={styles.container}>
    

      {
        distance !== '' ? 
        <View style = {styles.routeInfoContainer}>
                <Text style = {{marginTop: 10}}>Distance: {distance.toFixed(2)} km</Text>
                <Text>Duration: {Math.ceil(duration)} min</Text>
         </View>
         : ''
      }

       <TouchableOpacity style = {styles.shareBtn} onPress={() => {shareLocation()}}>
          <Image style = {styles.shareBtnImage} source={icon.ShareIcon} alt='share'/>
       </TouchableOpacity>
              
      {
         region && (
             
      <MapView  // gym building
        ref={mapViewRef}
        style={styles.map} 
        initialRegion={region}
        region={region}
        provider={PROVIDER_GOOGLE} // Set provider to PROVIDER_GOOGLE
        showsUserLocation={true} // Show user's location
        showsCompass={true} // Show compass
        customMapStyle={customMapStyle} // Apply custom map style
        minZoomLevel={20} // Set the minimum zoom level
        maxZoomLevel={25} // Set the maximum zoom level
      >
      {region && <Marker coordinate={{latitude: 9.352415, longitude: 122.837338}} />}
      <Marker coordinate={{latitude: 9.352399, longitude: 122.837338}}>
         <Text>Norsu Entrance Gate</Text>
      </Marker>
   
     <Marker
       coordinate={{latitude: 9.352066,  longitude: 122.838364}}
     />
      <Marker coordinate={{latitude: 9.352066,  longitude: 122.838364}}>
         <Text>Norsu Exit Gate</Text>
      </Marker>

      {
         newBuildingData.length > 0 ? 
          newBuildingData.map((item) => {
              return (
              <>
                 <Marker // Amphi
                coordinate={{latitude: item.latitude , longitude: item.longitude }}
                title= {item.title}
                description= {item.description}
                image={require(`../../assets/icon/buildingDef1.png`)}
                anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
                style = {styles.marker}
                onPress={() => {
                  handleMarkerPressDB(item._id)
                  setUserDestination({latitude: item.latitude , longitude: item.longitude })
                  traceRoute()
                }}
                key={item._id}
                />
                 <Marker coordinate={{latitude: item.latitudeText , longitude: item.longitudeText }}>
                      <Text>{item.textInfo}</Text>
                 </Marker>


              </>
                
       

              )
          })
        : ''
      }

      {/* {

         defBuildingInfo.map((item) => {
           return (
              <>
                  <Marker // Amphi
                    coordinate={{latitude: item.latitude , longitude: item.longitude }}
                    title= {item.title}
                    description= {item.description}
                    image={require(`../../assets/icon/buildingDef1.png`)}
                    anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
                    style = {styles.marker}
                    onPress={() => {
                      handleMarkerPress(item.id)
                      setUserDestination({latitude: item.latitude , longitude: item.longitude })
                      traceRoute()
                    }}
                    key={item.id}
                  /> 
                {
                   item.latitudeText !== null ? 
                    <Marker coordinate={{latitude: item.latitudeText , longitude: item.longitudeText }}>
                      <Text>{item.textInfo}</Text>
                     </Marker>
                     :
                     ''
                }
               
              </>
           )
         })
      } */}
       {
          region ? 
           <Marker
            coordinate={{latitude: region.latitude, longitude: region.longitude}}
            image={require(`../../assets/icon/originIcon.png`)}
            anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
            style = {styles.marker}
            />
           :
           ''
           
       }
      {/* <Marker // gym building
        coordinate={region1}
        title='IT Building and Library'
        description= 'Thsi Building has 2 floors'
        image={defBuilding}
        anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
        // style = {styles.marker}
      />
        latitude: 9.352620,
   longitude: 122.838510

      <Marker // Amphi
        coordinate={region2}
        title="Amphi"
        description=" This Amphi Area"
        image={defBuilding}
        anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
        style = {styles.marker}
      /> */}
       
       <Marker coordinate={{latitude: 9.352461, longitude: 122.837265}}/> 

      
        {
           userDestination !== '' ? <>
             <MapViewDirections
              origin={region}
              destination={userDestination}
              apikey={googleAPI}
              strokeColor='lightblue'
              strokeWidth={6}
              onReady={traceRouteOnReady}
            />
               <Marker
                coordinate={{latitude: userDestination.latitude , longitude: userDestination.longitude}}
                image={require(`../../assets/icon/destinationIcon.png`)}
                anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
                style = {styles.marker}
                />
           </>
             
         : 
          ''
        }
        
      <Polyline
        coordinates={customRoadCoordinates}
        strokeColor="white" // Set custom road color
        strokeWidth={15} // Set custom road width
      /> 
          <Polyline
        coordinates={customRoadCoordinates5}
        strokeColor="white" // Set custom road color
        strokeWidth={15} // Set custom road width
      /> 
     <Polygon
        coordinates={[
          { latitude: 9.352967 ,longitude: 122.836557 },
          { latitude: 9.352911, longitude: 122.836627},
          { latitude: 9.352837, longitude: 122.836600},
          { latitude: 9.352874, longitude: 122.836503},
        ]}
        strokeColor="#BBD2FF"
        fillColor="#E6F7FF"
      />


       <Polyline
        coordinates={customRoadCoordinates1}
        strokeColor="white" // Set custom road color
        strokeWidth={20} // Set custom road width
      /> 

    <Polyline
        coordinates={customRoadCoordinates3}
        strokeColor="white" // Set custom road color
        strokeWidth={20} // Set custom road width
      /> 
     <Marker coordinate={{latitude: 9.352431 , longitude: 122.837260}}>
           <Text>Student Hallway</Text>
     </Marker>

     <Marker coordinate={{latitude:  9.352560 , longitude: 122.838510}}>
           <Text>Office</Text>
     </Marker>
    

      <Polygon  //CCJE Building 
        coordinates={[
          { latitude: 9.353796 ,longitude: 482.837950},
          { latitude: 9.353724, longitude: 482.838134},
          { latitude: 9.353585, longitude: 482.838085},
          { latitude: 9.353657, longitude: 482.837885},
        ]}
        strokeColor="#BBD2FF"
        strokeColorTop ='red'
        fillColor="#E6F7FF"
      />
       <Polyline // ccje path
        coordinates={customRoadCoordinates4}
        strokeColor="white" // Set custom road color
        strokeWidth={20} // Set custom road width
      /> 

<Polygon  // Amphi Building
        coordinates={[
          { latitude: 9.353408 ,longitude: 482.838284},
          { latitude: 9.353274, longitude: 482.838593},
          { latitude: 9.353010, longitude: 482.838490},
          { latitude: 9.353151, longitude: 482.838155},
        ]}
        strokeColor="#BBD2FF"
        fillColor="#E6F7FF"
      />

       <Polygon  // Cas Building
        coordinates={[
          { latitude: 9.353278 ,longitude: 482.838930},
          { latitude: 9.353200, longitude: 482.839129},
          { latitude: 9.352743, longitude: 482.838944},
          { latitude: 9.352820, longitude: 482.838722},
        ]}
        strokeColor="#BBD2FF"
        fillColor="#E6F7FF"
      />

  <Polygon  // CAS Rooms
        coordinates={[
          { latitude: 9.353244 ,longitude: 482.839755},
          { latitude: 9.353207, longitude: 482.839878},
          { latitude: 9.352782, longitude: 482.839750},
          { latitude: 9.352820, longitude: 482.839631},
        ]}
        strokeColor="#BBD2FF"
        fillColor="#E6F7FF"
      />

     <Polygon  //Nursery Building
        coordinates={[
          { latitude: 9.353549 ,longitude: 482.835945},
          { latitude: 9.353382, longitude: 482.836369},
          { latitude: 9.353117, longitude: 482.836283},
          { latitude: 9.353276, longitude: 482.835833},
        ]}
        strokeColor="#BBD2FF"
        fillColor="#E6F7FF"
      />

    </MapView>

         )
      }
      
     {
        openPop ? 
         popInfo.length > 0 ? 
        <Animated.View style={[styles.popUp]}> 


        <TouchableOpacity style = {styles.modalCloseBtn} onPress={() => {handleMarkerPress()}}> 
           <Image source={icon.BackIcon} style = {styles.modalImage}/>
        </TouchableOpacity>
        <View style = {styles.modalImageContainer}>

          {
             popInfo[0].uri == 1 ? 
             <Image style = {styles.modalMainImage} source={building.AVR} alt='cba'/>
             : 
             popInfo[0].uri == 2 ?
             <Image style = {styles.modalMainImage} source={building.AcademicBuilding} alt='cba'/> 
             :
             popInfo[0].uri == 3 ?
             <Image style = {styles.modalMainImage} source={building.Accreditation1} alt='cba'/> 
             :
             popInfo[0].uri == 4 ?
             <Image style = {styles.modalMainImage} source={building.Accreditation2} alt='cba'/> 
             :
             popInfo[0].uri == 5 ? 
             <Image style = {styles.modalMainImage} source={building.Alumni} alt='cba'/>  
             :
             popInfo[0].uri == 6 ? 
             <Image style = {styles.modalMainImage} source={building.Ballfield} alt='cba'/>  
             :
             popInfo[0].uri == 7 ? 
             <Image style = {styles.modalMainImage} source={building.Canteen} alt='cba'/>  
             :
             popInfo[0].uri == 8 ? 
             <Image style = {styles.modalMainImage} source={building.Gym} alt='cba'/>  
             :
             popInfo[0].uri == 9 ? 
             <Image style = {styles.modalMainImage} source={building.ITBuild} alt='cba'/>  
             :
             popInfo[0].uri == 10 ? 
             <Image style = {styles.modalMainImage} source={building.Nursery} alt='cba'/>  
             :
             popInfo[0].uri == 11 ?
             <Image style = {styles.modalMainImage} source={building.CBABuild} alt='cba'/>  
             :
             popInfo[0].uri == 12 ?
             <Image style = {styles.modalMainImage} source={background.ECP} alt='cba'/>  
             :
             popInfo[0].uri == 13 ?
             <Image style = {styles.modalMainImage} source={background.Registry} alt='cba'/>  
             :
             popInfo[0].uri == 14 ?
             <Image style = {styles.modalMainImage} source={background.CAF} alt='cba'/>  
             :
             popInfo[0].uri == 15 ?
             <Image style = {styles.modalMainImage} source={background.CampusClinic} alt='cba'/>
             :
             popInfo[0].uri == 16 ?
             <Image style = {styles.modalMainImage} source={building.Accreditation1} alt='cba'/>
             :
             popInfo[0].uri == 17 ?
             <Image style = {styles.modalMainImage} source={background.Alumni} alt='cba'/>
             :
             popInfo[0].uri == 18 ?
             <Image style = {styles.modalMainImage} source={background.OfficePresident} alt='cba'/>
             :
             popInfo[0].uri == 19 ?
             <Image style = {styles.modalMainImage} source={background.SSG} alt='cba'/>
             :
             popInfo[0].uri == 20 ?
             <Image style = {styles.modalMainImage} source={background.CCJESG} alt='cba'/>
             :
             popInfo[0].uri == 21 ?
             <Image style = {styles.modalMainImage} source={background.HR} alt='cba'/>
             :
             popInfo[0].uri == 22 ?
             <Image style = {styles.modalMainImage} source={background.OldResearch} alt='cba'/>
             :
             popInfo[0].uri == 23 ?
             <Image style = {styles.modalMainImage} source={background.Class5} alt='cba'/>
             :
             popInfo[0].uri == 24 ?
             <Image style = {styles.modalMainImage} source={background.CASSG} alt='cba'/>
             :
             popInfo[0].uri == 25 ?
             <Image style = {styles.modalMainImage} source={background.Class1} alt='cba'/>
             :
             popInfo[0].uri == 26 ?
             <Image style = {styles.modalMainImage} source={background.Class2} alt='cba'/>
             :
             popInfo[0].uri == 27 ?
             <Image style = {styles.modalMainImage} source={background.Class3} alt='cba'/>
             :
             popInfo[0].uri == 28 ?
             <Image style = {styles.modalMainImage} source={background.Class4} alt='cba'/>
             :
             popInfo[0].uri == 29 ?
             <Image style = {styles.modalMainImage} source={background.CASBuilding} alt='cba'/>
             :
             popInfo[0].uri == 30 ?
             <Image style = {styles.modalMainImage} source={background.Amphi} alt='cba'/>
             :
             popInfo[0].uri == 31 ?
             <Image style = {styles.modalMainImage} source={background.OfficeAdministrator} alt='cba'/>
             :
             popInfo[0].uri == 32 ?
             <Image style = {styles.modalMainImage} source={background.CARE} alt='cba'/>
             :
             popInfo[0].uri == 33 ?
             <Image style = {styles.modalMainImage} source={background.SAS} alt='cba'/>
             :
             popInfo[0].uri == 34 ?
             <Image style = {styles.modalMainImage} source={background.CEDBuilding} alt='cba'/>
             :
             popInfo[0].uri == 35 ?
             <Image style = {styles.modalMainImage} source={background.CCJEFaculty} alt='cba'/>
             :
             popInfo[0].uri == 36 ?
             <Image style = {styles.modalMainImage} source={background.SupplyProperty} alt='cba'/>
             :
             popInfo[0].uri == 37 ?
             <Image style = {styles.modalMainImage} source={background.Academic} alt='cba'/>
             :
             popInfo[0].uri == 38 ?
             <Image style = {styles.modalMainImage} source={background.StudentCenter} alt='cba'/>
             :
             popInfo[0].uri == 39 ?
             <Image style = {styles.modalMainImage} source={background.CJJECIT} alt='cba'/>
             :
             popInfo[0].uri == 40 ?
             <Image style = {styles.modalMainImage} source={background.CITBuilding} alt='cba'/>
             :
             popInfo[0].uri == 41 ?
             <Image style = {styles.modalMainImage} source={background.CITBuilding2} alt='cba'/>
             :
             popInfo[0].uri == 42 ?
             <Image style = {styles.modalMainImage} source={background.CASBuilding2} alt='cba'/>
             :
             popInfo[0].uri == 43 ?
             <Image style = {styles.modalMainImage} source={background.CASBuilding2} alt='cba'/>
             : 
             <Image style = {styles.modalMainImage} source={{uri: popInfo[0].uri}} alt='cba'/>  

          }
       
        </View>
        <Text style = {styles.modalMainText}>{popInfo[0].title}</Text>
        <Text style = {styles.modalSubText}> {popInfo[0].buildingData.numberOfFloors} STORY BUILDING </Text>
        <Text style = {styles.modalSubText}> NO. OF ROOMS: {popInfo[0].buildingData.numberOfRooms}</Text>
        {/* 
            The following code controls the pop up for each marker presssed
         */}

         {
              popInfo[0].buildingData.noRooms == true ? 
              <View style = {{marginTop: 10, marginBottom: 10}}>
              <Text style = {styles.modalSubText}> {popInfo[0].buildingData.noRoomsText}</Text>
             </View>
             : ''
         }

        {
           popInfo[0].buildingData.numberOfFloors == 1 ?  popInfo[0].buildingData.noRooms !== true ? 
          // <View style = {{marginTop: 10, marginBottom: 10}}>
          //  <Text style = {styles.modalSubText}> Ground Floor:  </Text>
          //  <Text style = {styles.modalSubText}> This Area Only Consist of One Floor</Text>
          // </View>
          popInfo[0].buildingData.numberOfRooms !== 0 ?
          <>
            <View style = {{marginTop: 10, marginBottom: 10}}>
              <Text style = {styles.modalSubText}> Ground Floor: {popInfo[0].buildingData.groundFloorNumRooms}  </Text>
                {
                    popInfo.length > 0 ? 
                    popInfo[0].buildingData.groundRoom.map((item) => {
                        return (
                          <Text style = {styles.modalSubText}> {item}</Text>
                        )
                    })
                    : ''
                }
            
              </View>
          </>
             :  
         <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> Ground Floor:  </Text>
           <Text style = {styles.modalSubText}> This Area Only Consist of One Floor</Text>
          </View>
           
              : ''
             
             : ''
        }

        {
           popInfo[0].buildingData.numberOfFloors == 2 ? 
        <>
         <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> Ground Floor: {popInfo[0].buildingData.groundFloorNumRooms}  </Text>
             {
                 popInfo[0].buildingData.groundRoom.map((item) => {
                     return (
                       <Text style = {styles.modalSubText}> {item}</Text>
                     )
                 })
             }
        
          </View>
          <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> First Floor: {popInfo[0].buildingData.firstFloorNumRooms}  </Text>
             {
                 popInfo[0].buildingData.firstRoom.map((item) => {
                     return (
                       <Text style = {styles.modalSubText}> {item}</Text>
                     )
                 })
             }
        
          </View>

          <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> Second Floor: {popInfo[0].buildingData.secondFloorNumRooms}  </Text>
             {
                  popInfo.length > 0 ? 
                  popInfo[0].buildingData.secondRoom.map((item) => {
                    return (  
                          <Text  style = {styles.modalSubText}> {item}</Text>
                    )
                })
                : ''
             }
        
          </View>
          
          </>
             :  ''
          
            
        }

       {
           popInfo[0].buildingData.numberOfFloors == 3 ? 
        <>
         <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> Ground Floor: {popInfo[0].buildingData.groundFloorNumRooms}  </Text>
             {
                 popInfo.length > 0 ? 
                 popInfo[0].buildingData.groundRoom.map((item) => {
                     return (
                       <Text style = {styles.modalSubText}> {item}</Text>
                     )
                 })
                 : ''
             }
        
          </View>
          <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> First Floor: {popInfo[0].buildingData.firstFloorNumRooms}  </Text>
             {
               popInfo.length > 0 ? 
                 popInfo[0].buildingData.firstRoom.map((item) => {
                     return (
                       <Text style = {styles.modalSubText}> {item}</Text>
                     )
                 })
                : ''
             }
        
          </View>

          <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> Second Floor: {popInfo[0].buildingData.secondFloorNumRooms}  </Text>
             {
                  popInfo.length > 0 ? 
                  popInfo[0].buildingData.secondRoom.map((item) => {
                    return (  
                          <Text  style = {styles.modalSubText}> {item}</Text>
                    )
                })
                : ''
             }
        
          </View>
          
          </>
             :  ''
          
            
        }

     {
           popInfo[0].buildingData.numberOfFloors == 4 ? 
        <>
         <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> Ground Floor: {popInfo[0].buildingData.groundFloorNumRooms}  </Text>
             {
                 popInfo[0].buildingData.groundRoom.map((item) => {
                     return (
                       <Text style = {styles.modalSubText}> {item}</Text>
                     )
                 })
             }
        
          </View>
          <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> First Floor: {popInfo[0].buildingData.firstFloorNumRooms}  </Text>
             {
                 popInfo[0].buildingData.firstRoom.map((item) => {
                     return (
                       <Text style = {styles.modalSubText}> {item}</Text>
                     )
                 })
             }
        
          </View>

          <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> Second Floor: {popInfo[0].buildingData.secondFloorNumRooms}  </Text>
             {
                 popInfo[0].buildingData.secondRoom.map((item) => {
                     return (
                       <Text style = {styles.modalSubText}> {item}</Text>
                     )
                 })
             }
        
          </View>

          <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> Third Floor: {popInfo[0].buildingData.thirdFloorNumRooms}  </Text>
             {
                 popInfo[0].buildingData.thirdRoom.map((item) => {
                     return (
                       <Text style = {styles.modalSubText}> {item}</Text>
                     )
                 })
             }
        
          </View>
          
          </>
             :  ''
          
            
        }
     
       </Animated.View>
       : ''
       : ''
     }

{
        openPop ? 
         dataPopInfo.length > 0 ? 
        <Animated.View style={[styles.popUp]}> 


        <TouchableOpacity style = {styles.modalCloseBtn} onPress={() => {handleMarkerPress()}}> 
           <Image source={icon.BackIcon} style = {styles.modalImage}/>
        </TouchableOpacity>
        <View style = {styles.modalImageContainer}>

        {
             dataPopInfo[0].buildingNewImage == 1 ? 
             <Image style = {styles.modalMainImage} source={building.AVR} alt='cba'/>
             : 
             dataPopInfo[0].buildingNewImage == 2 ?
             <Image style = {styles.modalMainImage} source={building.AcademicBuilding} alt='cba'/> 
             :
             dataPopInfo[0].buildingNewImage == 3 ?
             <Image style = {styles.modalMainImage} source={building.Accreditation1} alt='cba'/> 
             :
            dataPopInfo[0].buildingNewImage == 4 ?
             <Image style = {styles.modalMainImage} source={building.Accreditation2} alt='cba'/> 
             :
             dataPopInfo[0].buildingNewImage == 5 ? 
             <Image style = {styles.modalMainImage} source={building.Alumni} alt='cba'/>  
             :
             dataPopInfo[0].buildingNewImage == 6 ? 
             <Image style = {styles.modalMainImage} source={building.Ballfield} alt='cba'/>  
             :
             dataPopInfo[0].buildingNewImage == 7 ? 
             <Image style = {styles.modalMainImage} source={building.Canteen} alt='cba'/>  
             :
            dataPopInfo[0].buildingNewImage == 8 ? 
             <Image style = {styles.modalMainImage} source={building.Gym} alt='cba'/>  
             :
             dataPopInfo[0].buildingNewImage == 9 ? 
             <Image style = {styles.modalMainImage} source={building.ITBuild} alt='cba'/>  
             :
             dataPopInfo[0].buildingNewImage == 10 ? 
             <Image style = {styles.modalMainImage} source={building.Nursery} alt='cba'/>  
             :
             dataPopInfo[0].buildingNewImage == 11 ?
             <Image style = {styles.modalMainImage} source={building.CBABuild} alt='cba'/>  
             :
             dataPopInfo[0].buildingNewImage == 12 ?
             <Image style = {styles.modalMainImage} source={background.ECP} alt='cba'/>  
             :
             dataPopInfo[0].buildingNewImage == 13 ?
             <Image style = {styles.modalMainImage} source={background.Registry} alt='cba'/>  
             :
             dataPopInfo[0].buildingNewImage == 14 ?
             <Image style = {styles.modalMainImage} source={background.CAF} alt='cba'/>  
             :
             dataPopInfo[0].buildingNewImage == 15 ?
             <Image style = {styles.modalMainImage} source={background.CampusClinic} alt='cba'/>
             :
            dataPopInfo[0].buildingNewImage == 16 ?
             <Image style = {styles.modalMainImage} source={building.Accreditation1} alt='cba'/>
             :
            dataPopInfo[0].buildingNewImage == 17 ?
             <Image style = {styles.modalMainImage} source={background.Alumni} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 18 ?
             <Image style = {styles.modalMainImage} source={background.OfficePresident} alt='cba'/>
             :
            dataPopInfo[0].buildingNewImage == 19 ?
             <Image style = {styles.modalMainImage} source={background.SSG} alt='cba'/>
             :
            dataPopInfo[0].buildingNewImage == 20 ?
             <Image style = {styles.modalMainImage} source={background.CCJESG} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 21 ?
             <Image style = {styles.modalMainImage} source={background.HR} alt='cba'/>
             :
            dataPopInfo[0].buildingNewImage == 22 ?
             <Image style = {styles.modalMainImage} source={background.OldResearch} alt='cba'/>
             :
            dataPopInfo[0].buildingNewImage == 23 ?
             <Image style = {styles.modalMainImage} source={background.Class5} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 24 ?
             <Image style = {styles.modalMainImage} source={background.CASSG} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 25 ?
             <Image style = {styles.modalMainImage} source={background.Class1} alt='cba'/>
             :
            dataPopInfo[0].buildingNewImage == 26 ?
             <Image style = {styles.modalMainImage} source={background.Class2} alt='cba'/>
             :
            dataPopInfo[0].buildingNewImage == 27 ?
             <Image style = {styles.modalMainImage} source={background.Class3} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 28 ?
             <Image style = {styles.modalMainImage} source={background.Class4} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 29 ?
             <Image style = {styles.modalMainImage} source={background.CASBuilding} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 30 ?
             <Image style = {styles.modalMainImage} source={background.Amphi} alt='cba'/>
             :
            dataPopInfo[0].buildingNewImage == 31 ?
             <Image style = {styles.modalMainImage} source={background.OfficeAdministrator} alt='cba'/>
             :
            dataPopInfo[0].buildingNewImage == 32 ?
             <Image style = {styles.modalMainImage} source={background.CARE} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 33 ?
             <Image style = {styles.modalMainImage} source={background.SAS} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 34 ?
             <Image style = {styles.modalMainImage} source={background.CEDBuilding} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 35 ?
             <Image style = {styles.modalMainImage} source={background.CCJEFaculty} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 36 ?
             <Image style = {styles.modalMainImage} source={background.SupplyProperty} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 37 ?
             <Image style = {styles.modalMainImage} source={background.Academic} alt='cba'/>
             :
            dataPopInfo[0].buildingNewImage == 38 ?
             <Image style = {styles.modalMainImage} source={background.StudentCenter} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 39 ?
             <Image style = {styles.modalMainImage} source={background.CJJECIT} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 40 ?
             <Image style = {styles.modalMainImage} source={background.CITBuilding} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 41 ?
             <Image style = {styles.modalMainImage} source={background.CITBuilding2} alt='cba'/>
             :
             dataPopInfo[0].buildingNewImage == 42 ?
             <Image style = {styles.modalMainImage} source={background.CASBuilding2} alt='cba'/>
             :
            dataPopInfo[0].buildingNewImage == 43 ?
             <Image style = {styles.modalMainImage} source={background.CASBuilding2} alt='cba'/>
             : 
             <Image style = {styles.modalMainImage} source={{uri:dataPopInfo[0].buildingNewImage}} alt='cba'/>   

          }
        </View>
        <Text style = {styles.modalMainText}>{dataPopInfo[0].title}</Text>
        <Text style = {styles.modalSubText}> {dataPopInfo[0].numFloors} STORY BUILDING </Text>
        <Text style = {styles.modalSubText}> NO. OF ROOMS: {dataPopInfo[0].numRooms}</Text>
        {/* 
            The following code controls the pop up for each marker presssed
         */}

         {
              dataPopInfo[0].noRooms == true ? 
              <View style = {{marginTop: 10, marginBottom: 10}}>
              <Text style = {styles.modalSubText}> {dataPopInfo[0].noRoomsText}</Text>
             </View>
             : ''
         }
         
        {
           //Changes happend Below
           dataPopInfo[0].numFloors == 1 ?  dataPopInfo[0].noRooms !== true ? 
           // <View style = {{marginTop: 10, marginBottom: 10}}>
           //  <Text style = {styles.modalSubText}> Ground Floor:  </Text>
           //  <Text style = {styles.modalSubText}> This Area Only Consist of One Floor</Text>
           // </View>
           dataPopInfo[0].numRooms !== 0 ?
          <>
            <View style = {{marginTop: 10, marginBottom: 10}}>
              <Text style = {styles.modalSubText}> Ground Floor: {dataPopInfo[0].roomGroundFloor.length}  </Text>
                {
                    dataPopInfo.length > 0 ? 
                    dataPopInfo[0].roomGroundFloor.map((item) => {
                        return (
                          <Text style = {styles.modalSubText}> {item}</Text>
                        )
                    })
                    : ''
                }
            
              </View>
          </>
             :  
         <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> Ground Floor:  </Text>
           <Text style = {styles.modalSubText}> This Area Only Consist of One Floor</Text>
          </View>
           
              : ''
              :''
        }

        {
           dataPopInfo[0].numFloors == 2 ? 
        <>
            <View style = {{marginTop: 10, marginBottom: 10}}>
              <Text style = {styles.modalSubText}> Ground Floor: {dataPopInfo[0].roomGroundFloor.length}  </Text>
                {
                    dataPopInfo.length > 0 ? 
                    dataPopInfo[0].roomGroundFloor.map((item) => {
                        return (
                          <Text style = {styles.modalSubText}> {item}</Text>
                        )
                    })
                    : ''
                }
            
              </View>
          <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> Second Floor: {dataPopInfo[0].roomSecondFloor.length}  </Text>
             {
                 dataPopInfo[0].roomSecondFloor.map((item) => {
                     return (
                       <Text style = {styles.modalSubText}> {item}</Text>
                     )
                 })
             }
        
          </View>
          </>
             :  ''
          
            
        }

       {
            dataPopInfo[0].numFloors == 3 ? 
        <>
         <View style = {{marginTop: 10, marginBottom: 10}}>
              <Text style = {styles.modalSubText}> Ground Floor: {dataPopInfo[0].roomGroundFloor.length}  </Text>
                {
                    dataPopInfo.length > 0 ? 
                    dataPopInfo[0].roomGroundFloor.map((item) => {
                        return (
                          <Text style = {styles.modalSubText}> {item}</Text>
                        )
                    })
                    : ''
                }
            
              </View>
         <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> Second Floor: {dataPopInfo[0].roomSecondFloor.length}  </Text>
             {
                 dataPopInfo[0].roomSecondFloor.map((item) => {
                     return (
                       <Text style = {styles.modalSubText}> {item}</Text>
                     )
                 })
             }
        
          </View>

          <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> Third Floor: {dataPopInfo[0].roomThirdFloor.length}  </Text>
             {
                  dataPopInfo.length > 0 ? 
                  dataPopInfo[0].roomThirdFloor.map((item) => {
                    return (  
                          <Text  style = {styles.modalSubText}> {item}</Text>
                    )
                })
                : ''
             }
        
          </View>
          
          </>
             :  ''
          
            
        }

     {
          dataPopInfo[0].numFloors  == 4 ? 
        <>
          <View style = {{marginTop: 10, marginBottom: 10}}>
              <Text style = {styles.modalSubText}> Ground Floor: {dataPopInfo[0].roomGroundFloor.length}  </Text>
                {
                    dataPopInfo.length > 0 ? 
                    dataPopInfo[0].roomGroundFloor.map((item) => {
                        return (
                          <Text style = {styles.modalSubText}> {item}</Text>
                        )
                    })
                    : ''
                }
            
              </View>
         <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> Second Floor: {dataPopInfo[0].roomSecondFloor.length}  </Text>
             {
                 dataPopInfo[0].roomSecondFloor.map((item) => {
                     return (
                       <Text style = {styles.modalSubText}> {item}</Text>
                     )
                 })
             }
        
          </View>

          <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> Third Floor: {dataPopInfo[0].roomThirdFloor.length}  </Text>
             {
                  dataPopInfo.length > 0 ? 
                  dataPopInfo[0].roomThirdFloor.map((item) => {
                    return (  
                          <Text  style = {styles.modalSubText}> {item}</Text>
                    )
                })
                : ''
             }
        
          </View>
          <View style = {{marginTop: 10, marginBottom: 10}}>
           <Text style = {styles.modalSubText}> Fourth Floor: {dataPopInfo[0].roomFourthFloor.length}  </Text>
             {
                 dataPopInfo[0].roomFourthFloor.map((item) => {
                     return (
                       <Text style = {styles.modalSubText}> {item}</Text>
                     )
                 })
             }
        
          </View>
          
          </>
             :  ''
          
            
        }
     
       </Animated.View>
       : ''
       : ''
     }
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
     width: 150,
     height: 150
  },
  text: {
    position: 'absolute',
    color: 'red',
    fontSize: 20,
    top: 0,
    left: 0
  },
  popUp: {
    position: 'absolute',
    // bottom: -100,
    left: '5%',
    right: 0,
    backgroundColor: 'none',
    padding: 20,
    backgroundColor: '#0C066B',
    height: height > 600 ? "75%" : "110%",
    width: width > 500 ? "70%" : '90%',
    borderRadius: 7,
    marginTop: '30%',
    opacity: 1,
    zIndex: 4
  },
  mainContainer: {
     backgroundColor: 'red'
  },
  sidebar: {
    backgroundColor: '#0C066B',
    elevation: 4,
    height: '100%',
    width:290,
    position: 'absolute',
    zIndex: 4,
  
  },
  sidebarBtn: {
     height: 40,
     width: 90,
     position: 'absolute',
     top: 20,
     zIndex: 3,
     borderRadius: 5,
     left: 10,
     textAlign: 'center'
  },
  sidebarControls: {
     marginTop: 100,
     marginLeft: 20
  },
  sidebarIcon: {
     height: 40,
     width: 40
  },
  closeBtn:{ 
    width: 80,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'lightblue',
    position: 'absolute',
    right: 20,
    top: 20
  },
  popupImage: {
     height: 180,
     width: 180,
     position: 'absolute',
     borderRadius: 5,
     top: 0,
     left: 10 
  },
  textContainer: {
     marginTop: 200,
     marginLeft: 15
  },
  textInfo: {
     fontSize: 17,
     borderBottomWidth: 1,
     borderBottomColor: 'lightgray',
     borderBottomStyle: 'solid',
     paddingBottom: 10
  },
  navBtn: {
    marginBottom: 10,
    borderTopColor: '#0C066B',
    borderLeftColor: '#0C066B',
    borderRightColor:  '#0C066B' ,
    borderBottomColor: 'lightgray',
    paddingBottom: 15,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  navIcons: {
     width: 30,
     height: 30 
  },
  navText: {
     color: 'white',
     fontSize: 20
  },
  logoutBtn: {
     position: 'absolute',
     bottom: 15,
     left: 80,
     backgroundColor: 'gray',
     height: 40,
     width: 120,
     borderRadius: 20,
  },
  logOutText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 15
  },
  profileContainer:{
     height: 150,
     width: 150,
     backgroundColor: 'white',
     borderRadius: 120,
     paddingLeft: 15,
     paddingTop: 15,
     marginLeft: 60,
     marginTop: 30
  },
  profileNew:{
     width: 120,
     height: 120,
  },
  profileText: {
     color: 'white',
     fontSize: 30,
     marginTop: 15,
     marginRight:15,
     textAlign: 'center'
  },
  closeSidebar: {
     marginLeft: 20,
     marginTop: 20
  },
  closeImage: {
     width: 30,
     height: 30
  },
  modalCloseBtn: {
    width: width > 500 ? '30%' : '30%',
    height: height > 600 ? '15%' : '15%',
    backgroundColor: 'white',
    borderRadius: 500,
    borderWidth: 8,
    borderColor: '#E5C408',
    paddingLeft: '5%',
    paddingTop: '4%',
    marginTop: -70,
    marginLeft: 100
  },
  modalImage: {
    width: width > 500 ?  '40%' : '60%',
    height: height > 500 ? '60%': '50%',
  },
  modalImageContainer: {
    width: width > 500 ? '45%' : '90%',
    height: height > 600 ? '30%' : '45%' ,
    backgroundColor: 'white',
    marginLeft: '5%',
    borderRadius: 7,
    marginTop: 15,
    padding: 10
  },
  modalMainText: {
     color: 'white',
     fontWeight: 'bold',
     fontSize: 22,
     textAlign: 'center',
     marginTop: 5,
     marginBottom: 10
  },
  modalSubText: {
     color: 'white',
     fontSize: 15
  },
  modalMainImage: {
      width: width > 500 ? '45%' : '100%',
    height: height > 600 ? '100%' : '45%' ,
     borderRadius: 7
  },
  loadingIndicator: {
    marginBottom: 20, // Add some margin to separate the loading indicator from the button
  },
  routeInfoContainer:{
     position: 'absolute',
     borderWidth: 1,
     borderColor: 'black',
     width: '70%',
     height: 70,
     top: 40,
     marginLeft: '15%',
     zIndex: 3,
     backgroundColor: 'white',
     borderRadius: 10,
     paddingLeft: 15
  },
   shareBtn: {
      borderWidth: 1,
      borderColor: 'lightgray',
      width: 35,
      height: 35,
      padding: 5,
      position: 'absolute',
      zIndex: 1,
      bottom: 30,
      left: 15,
      borderRadius: 5
   },
   shareBtnImage: {
      height: 20,
      width: 20
   }
})
export default AdminMapScreen
