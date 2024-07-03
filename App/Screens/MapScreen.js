import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, Animated, TouchableOpacity, Image} from 'react-native'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { SIZES, background, icon } from '../../constants'
import MapView, { Marker,PROVIDER_GOOGLE, Polyline, Callout, Polygon } from 'react-native-maps';
import { setUpTests, useSharedValue, withSpring } from 'react-native-reanimated';

const MapScreen = ({data}) => {
   //location sections starts here
   const [region, setRegion] =useState({
      latitude: 9.352500, // Initial latitude (e.g., San Francisco)
      longitude: 122.837384, // Initial longitude (e.g., San Francisco)
      latitudeDelta:  0.001,
      longitudeDelta: 0.001,
    });
  
    const [region1,setRegion1] = useState({
       latitude: 9.353699 ,
       longitude: 122.836321
    })
    const [region2,setRegion2] = useState({
      latitude: 9.353206 ,
      longitude: -237.161560
   })
   const [region2Text,setRegion2Text] = useState({
    latitude: 9.353226 ,
    longitude: -237.161560
  })
   const [region3, setRegion3] = useState({
      latitude: 9.353911 ,
      longitude:  122.836058
   })
   const [region4, setRegion4] = useState({
    latitude: 9.352890,
    longitude:  122.836552
  })
  const [region5, setRegion5] = useState({
    latitude: 9.353078,
    longitude:  122.837478
  })
  const [region6, setRegion6] = useState({
    latitude: 9.353657,
    longitude:  122.836621
  })
  const [region6Text, setRegion6Text] = useState({
    latitude: 9.353705,
    longitude: 122.836632
  })
  
  const [region7, setRegion7] = useState({
    latitude: 9.352464,
    longitude:  122.837693
  })
  const [region7Text, setRegion7Text] = useState({
    latitude: 9.352501,
    longitude:  122.837704
  })
  const [region8, setRegion8] = useState({
    latitude: 9.352755,
    longitude: 482.838202
  })
  const [region8Text, setRegion8Text] = useState({
    latitude: 9.352770,
    longitude: 482.838178
  })
  const [region9, setRegion9] = useState({
    latitude: 9.352678,
    longitude:  122.838348
  })
  const [region9Text, setRegion9Text] = useState({
    latitude: 9.352705,
    longitude: 482.838361
  })
  const [region10, setRegion10] = useState({
    latitude:9.352620,
    longitude:  122.838467
  })
  const [region10Text, setRegion10Text] = useState({
    latitude: 9.352573,
    longitude: 482.838420
  })
  const [region11, setRegion11] = useState({
    latitude:9.352646,
    longitude: 122.838520
  })
  const [region11Text, setRegion11Text] = useState({
    latitude: 9.352657,
    longitude:482.838538
  })
  const [region12, setRegion12] = useState({
    latitude: 9.352537,
    longitude: 482.838597
  })
  const [region12Text, setRegion12Text] = useState({
    latitude: 9.352552,
    longitude: 482.838597
  })
  const [region13, setRegion13] = useState({
    latitude: 9.352505,
    longitude: 482.838645
  })
  const [region13Text, setRegion13Text] = useState({
    latitude: 9.352465,
    longitude: 482.838645
  })
  const [region14, setRegion14] = useState({
    latitude:9.352376,
    longitude: 122.839009
  })
  const [region14Text, setRegion14Text] = useState({
    latitude: 9.352318,
    longitude: 122.839003
  })
  const [region15, setRegion15] = useState({
    latitude: 9.352981,
    longitude:122.838826
  })
  const [region15Text, setRegion15Text] = useState({
    latitude: 9.352931,
    longitude:122.838826
  })
  const [region16, setRegion16] = useState({
    latitude: 9.352854,
    longitude: 482.837937
  })
  const [region16Text, setRegion16Text] = useState({
    latitude: 9.352865,
    longitude: 482.837937
  })
  const [region17, setRegion17] = useState({
    latitude: 9.352568,
    longitude: 482.838678
  })
  const [region17Text, setRegion17Text] = useState({
    latitude: 9.352578,
    longitude: 482.838678
  })
  const [region18, setRegion18] = useState({
    latitude: 9.352394,
    longitude:482.838409
  })
  const [region18Text, setRegion18Text] = useState({
    latitude: 9.352414,
    longitude:482.838409
  })
  const [region19, setRegion19] = useState({
    latitude: 9.352324,
    longitude:482.838409
  })
  const [region19Text, setRegion19Text] = useState({
    latitude: 9.352334,
    longitude:482.838409
  })
  const [region20, setRegion20] = useState({
    latitude: 9.353233,
    longitude: 482.837780
  })
  const [region20Text, setRegion20Text] = useState({
    latitude: 9.353253,
    longitude: 482.837780
  })
  const [region21, setRegion21] = useState({
    latitude: 9.353195,
    longitude: 482.837871
  })
  const [region21Text, setRegion21Text] = useState({
    latitude: 9.353155,
    longitude: 482.837871
  })
  const [region22, setRegion22] = useState({
    latitude: 9.353145,
    longitude: 482.838000
  })
  const [region22Text, setRegion22Text] = useState({
    latitude: 9.353165,
    longitude: 482.838000
  })
  const [region23, setRegion23] = useState({
    latitude: 9.353095,
    longitude: 482.838107
  })
  const [region23Text, setRegion23Text] = useState({
    latitude: 9.353045,
    longitude: 482.838107
  })
  const [region24, setRegion24] = useState({
    latitude: 9.353045,
    longitude: 482.838230
  })
  const [region24Text, setRegion24Text] = useState({
    latitude: 9.353065,
    longitude: 482.838230
  })
  const [region25, setRegion25] = useState({
    latitude: 9.352944,
    longitude: 482.838493
  })
  const [region25Text, setRegion25Text] = useState({
    latitude: 9.352960,
    longitude: 482.838493
  })
  const [region26, setRegion26] = useState({
    latitude: 9.352752,
    longitude: 482.838570
  })
  const [region26Text, setRegion26Text] = useState({
    latitude: 9.352772,
    longitude: 482.838570
  })
  const [region27, setRegion27] = useState({
    latitude: 9.353377,
    longitude: 482.838075
  })
  const [region27Text, setRegion27Text] = useState({
    latitude: 9.353392,
    longitude: 482.838075
  })
  const [region28, setRegion28] = useState({
    latitude: 9.353440,
    longitude: 482.838118
  })
  const [region28Text, setRegion28Text] = useState({
    latitude: 9.353455,
    longitude: 482.838118
  })
  const [region29, setRegion29] = useState({
    latitude: 9.353313,
    longitude: 482.838125
  })
  const [region29Text, setRegion29Text] = useState({
    latitude: 9.353275,
    longitude: 482.838125
  })
  const [region30, setRegion30] = useState({
    latitude: 9.353684,
    longitude: 482.838020
  })
  const [region30Text, setRegion30Text] = useState({
    latitude: 9.353700,
    longitude: 482.838020
  })
  const [region31, setRegion31] = useState({
    latitude: 9.353458,
    longitude: 482.838640
  })
  const [region31Text, setRegion31Text] = useState({
    latitude: 9.353478,
    longitude: 482.838640
  })
  const [region32, setRegion32] = useState({
    latitude: 9.353128,
    longitude: 482.839309
  })
  const [region32Text, setRegion32Text] = useState({
    latitude: 9.353148,
    longitude: 482.839309
  })
  const [region33, setRegion33] = useState({
    latitude: 9.352918,
    longitude: 482.839411
  })
  const [region33Text, setRegion33Text] = useState({
    latitude: 9.352938,
    longitude: 482.839411
  })
  const [region34, setRegion34] = useState({
    latitude: 9.352874,
    longitude: 482.839476
  })
  const [region34Text, setRegion34Text] = useState({
    latitude: 9.352834,
    longitude: 482.839476
  })
  const [region35, setRegion35] = useState({
    latitude: 9.353134,
    longitude: 482.839762
  })
  const [region35Text, setRegion35Text] = useState({
    latitude: 9.353154,
    longitude: 482.839762
  })
  const [region36, setRegion36] = useState({
    latitude: 9.354143,
    longitude: 482.837885
  })
  const [region36Text, setRegion36Text] = useState({
    latitude: 9.354093,
    longitude: 482.837885
  })
  const [region37, setRegion37] = useState({
    latitude: 9.353710,
    longitude: 482.838740
  })
  const [region37Text, setRegion37Text] = useState({
    latitude: 9.353740,
    longitude: 482.838740
  })
  
  const [region38, setRegion38] = useState({
    latitude: 9.354361,
    longitude: 482.839132
  })
  const [region38Text, setRegion38Text] = useState({
    latitude: 9.354380,
    longitude: 482.839132
  })
  const [region39, setRegion39] = useState({
    latitude: 9.353423,
    longitude: 482.836140
  })
  const [region39Text, setRegion39Text] = useState({
    latitude: 9.353453,
    longitude: 482.836140
  })
  
  
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
    
  //Custom road coordinates ends here
  
    const marker = { 
       coordinate: {latitude: 9.353699  , longitude: 122.836321 } ,
       title: 'IT Building',
       description: 'IT Building and Library'
    }

    const mapViewRef = useRef(null)

    useEffect(() => {
      if (mapViewRef.current) {
        mapViewRef.current.animateToRegion(region, 500); // Zoom to the specified region with duration of 1000ms
      }
    }, [region]);


  return (
     <View style = {styles.container}>
    <MapView  // gym building
        ref={mapViewRef}
        style={styles.map} 
      //   region={data.length > 0 ? {latitude: data[0].latitude , longitude: data[0].longitude} : region} 
       region={region}
        provider={PROVIDER_GOOGLE} // Set provider to PROVIDER_GOOGLE
        showsUserLocation={true} // Show user's location
        showsCompass={true} // Show compass
        customMapStyle={customMapStyle} // Apply custom map style
        minZoomLevel={20} // Set the minimum zoom level
        maxZoomLevel={25} // Set the maximum zoom level
        >
        {/* {region && <Marker coordinate={data.length > 0 ? {latitude: data[0].latitude , longitude: data[0].longitude} : region} />} */}
        {region && <Marker coordinate={region} />}
        <Marker // gym building
          coordinate={region1}
          title='IT Building and Library'
          description= 'Thsi Building has 2 floors'
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          // style = {styles.marker}
        />

        <Marker // Amphi
          coordinate={region2}
          title="Amphi"
          description=" This Amphi Area"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region2Text}>
         <Text>Amphi Area</Text>
      </Marker>
        
        <Polyline
          coordinates={customRoadCoordinates}
          strokeColor="white" // Set custom road color
          strokeWidth={15} // Set custom road width
        /> 
      
      <Marker //Cba Building Marker
         coordinate={region3}
         title='CBA Building'
         description='CBA consist of 2 floors'
         image={defBuilding}
         style = {{width: 40, height: 40}}
         anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
         onPress={() => {handleMarkerPress(true)}}
      />
      <Marker
       coordinate={{latitude: 9.353953  , longitude:  122.836037}}
      >
          <Text>CBA Building</Text>
      </Marker>

      <Marker //Electical Power Building
         coordinate={region4}
         title='ECP Building'
         description='Norsu Generator'
         image={defBuilding}
         anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
      />
       <Marker
       coordinate={{latitude: 9.352916, longitude: 122.836568}}
      >
          <Text>Electrical Power Center</Text>
      </Marker>

      
      <Marker //Canteen Building
         coordinate={region5}
         title='Norsu Cannteen'
         description='Norsu Public Canteen'
         image={canteenBuilding}
         anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
      />
      <Marker coordinate={{latitude: 9.353112, longitude: 122.837485 }}>
         <Text>Norsu Canteen </Text>
      </Marker>

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

        <Marker // Avr Building
          coordinate={region6}
          title="Avr Building"
          description="This is the AVR Building"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region6Text}>
         <Text>AVR Building</Text>
      </Marker>

      <Marker // Registrarr
          coordinate={region7}
          title="Registrar/Accounting Building"
          description="This is the Registrar/Accounting Building"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region7Text}>
         <Text>Registrar/Accounting Building</Text>
      </Marker>

      <Marker // Registrarr
          coordinate={region8}
          title="Campus Clinic Building Building"
          description="This is the Campus Clinic Building Building"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region8Text}>
         <Text style = {{color: 'black'}}>Campus Clinic Building</Text>
      </Marker>
      
      <Marker // Accreditation
          coordinate={region9}
          title="Accreditation Room"
          description="Accreditation Room"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region9Text}>
         <Text style = {{color: 'black'}}>Accreditation Room</Text>
      </Marker>

      <Marker // Office of the University President
          coordinate={region10}
          title="Office of the University President"
          description="Office of the University President"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region10Text}>
         <Text style = {{color: 'black'}}>Office of the University President</Text>
      </Marker>

      <Marker // Old Research Office
          coordinate={region11}
          title="Old Research Office"
          description="Old Research Office"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region11Text}>
         <Text style = {{color: 'black'}}>Old Research Office</Text>
      </Marker>

      <Marker // SG Office
          coordinate={region12}
          title="SG Office"
          description="SG Office"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region12Text}>
         <Text style = {{color: 'black'}}>SG Office</Text>
      </Marker>

      <Marker // SG Office
          coordinate={region13}
          title="HR"
          description="HR"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region13Text}>
         <Text style = {{color: 'black'}}>HR</Text>
      </Marker>

      <Marker // SG Office
          coordinate={region14}
          title=" Student Center "
          description=" Student Center"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region14Text}>
         <Text style = {{color: 'black'}}> Student Center </Text>
      </Marker>

      <Marker // SG Office
          coordinate={region15}
          title=" CAS Building "
          description=" This is the CAS Building"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region15Text}>
         <Text style = {{color: 'black'}}> CAS Building </Text>
      </Marker>

      <Marker // CAF
          coordinate={region16}
          title=" CAF "
          description=" CAF"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region16Text}>
         <Text style = {{color: 'black'}}> CAF </Text>
      </Marker>

      
      <Marker // TBD 1
          coordinate={region17}
          title=" TBD1 "
          description=" TBD 1"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region17Text}>
         <Text style = {{color: 'black'}}> TBD1 </Text>
      </Marker>

      <Marker // TBD 2
          coordinate={region19}
          title=" TBD2 "
          description=" TBD 2"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region19Text}>
         <Text style = {{color: 'black'}}> TBD2 </Text>
      </Marker>


      <Marker // TBD 3
          coordinate={region18}
          title=" TBD3 "
          description=" TBD 3"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region18Text}>
         <Text style = {{color: 'black'}}> TBD 3 </Text>
      </Marker>

     

         <Polyline
          coordinates={customRoadCoordinates1}
          strokeColor="white" // Set custom road color
          strokeWidth={20} // Set custom road width
        /> 

        
      <Marker // TBA 3
          coordinate={region20}
          title=" 2 Rooms CBA/CED "
          description=" 2 Rooms CBA/CED"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region20Text}>
         <Text style = {{color: 'black'}}> 2 Rooms CBA/ CED </Text>
      </Marker>

      <Marker // CED Room
          coordinate={region21}
          title=" 2 CED Rooms"
          description=" CED8 && CED9"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region21Text}>
         <Text style = {{color: 'black'}}> 2 CED Rooms CED8 && CED9</Text>
      </Marker>

      <Marker // Ass Campus Admin
          coordinate={region22}
          title="4 Rooms"
          description=" Ass. Campus Admin, CED10, 2 No Label Rooms"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region22Text}>
         <Text style = {{color: 'black'}}> 4 Rooms</Text>
      </Marker>

      <Marker // Old Midwiffery Building
          coordinate={region23}
          title="Old Midwiffery Building"
          description=" Old Midwiffery Building B"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region23Text}>
         <Text style = {{color: 'black'}}> Old Midwiffery Building B</Text>
      </Marker>
   
      <Marker // New Building
          coordinate={region24}
          title="New Building"
          description=" New Building"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region24Text}>
         <Text style = {{color: 'black'}}> New Building</Text>
      </Marker>

      
      <Marker // CAS SG Office
          coordinate={region25}
          title="CAS SG Office"
          description=" CAS SG Office"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region25Text}>
         <Text style = {{color: 'black'}}> CAS SG Office</Text>
      </Marker>

      <Marker // TBD 4
          coordinate={region26}
          title="TBD 4"
          description=" TBD 4"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region26Text}>
         <Text style = {{color: 'black'}}> TBD 4</Text>
      </Marker>
     
      <Polyline
          coordinates={customRoadCoordinates3}
          strokeColor="white" // Set custom road color
          strokeWidth={20} // Set custom road width
        /> 

      <Marker // Care
          coordinate={region27}
          title="Care Building"
          description="Care Building"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region27Text}>
         <Text style = {{color: 'black'}}>Care Building</Text>
      </Marker>

      <Marker // SAS
          coordinate={region28}
          title="SAS Building"
          description="SAS Building"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region28Text}>
         <Text style = {{color: 'black'}}>SAS Building</Text>
      </Marker>

      <Marker // Campus Administrator
          coordinate={region29}
          title="Campus Administrator Building"
          description="Campus Administrator Building"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region29Text}>
         <Text style = {{color: 'black'}}>Campus Administrator Building</Text>
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

      <Marker // CCJE
          coordinate={region30}
          title="CCJE Building"
          description="CCJE Building"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region30Text}>
         <Text style = {{color: 'black'}}>CCJE Building</Text>
      </Marker>

      <Marker // Stock Room
          coordinate={region31}
          title=" Stock Room"
          description="This is the stock room"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region31Text}>
         <Text style = {{color: 'black'}}> Stock Room</Text>
      </Marker>

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

     <Marker // CIT Building
          coordinate={region32}
          title=" CIT Building"
          description="This is the CIT Building"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region32Text}>
         <Text style = {{color: 'black'}}> CIT Building</Text>
      </Marker>

      <Marker // Automotive Labs
          coordinate={region33}
          title=" Automotive Labs"
          description="This is the Automotive Labs"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region33Text}>
         <Text style = {{color: 'black'}}> Automotive Labs Builidng</Text>
      </Marker>

      <Marker // Additional Rooms
          coordinate={region34}
          title=" Rooms CIT"
          description="3 Rooms in this Building"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region34Text}>
         <Text style = {{color: 'black'}}> Additional Rooms</Text>
      </Marker>

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

      <Marker // CAS Rooms
          coordinate={region35}
          title=" CAS Rooms "
          description="This building consist of CAS Rooms"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region35Text}>
         <Text style = {{color: 'black'}}> CAS Rooms</Text>
      </Marker>

      <Marker // Academic Building
          coordinate={region36}
          title=" Academic Building "
          description="This building is the Academic Building"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region36Text}>
         <Text style = {{color: 'black'}}> Academic Building</Text>
      </Marker>

      <Marker // CCJE Rooms and CIT Rooms
          coordinate={region37}
          title=" CCJE and CIT Room "
          description="This building is for the CCJE and CIT Department"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region37Text}>
         <Text style = {{color: 'black'}}> CCJE and CIT Rooms</Text>
      </Marker>

      <Marker // Ball Field
          coordinate={region38}
          title=" Ball Field"
          description="This is the Ball Field Area"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region38Text}>
         <Text style = {{color: 'black'}}> Ball Field Area</Text>
      </Marker>

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

      <Marker // Ball Field
          coordinate={region39}
          title=" Nursery Area"
          description="This is the Nursery Area"
          image={defBuilding}
          anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
          style = {styles.marker}
        />
      <Marker coordinate={region39Text}>
         <Text style = {{color: 'black'}}> Nursery Area</Text>
      </Marker>

      {
         data.length > 0 ? data.map((item) => {
             return (
              <>
               <Marker // Ball Field
                     coordinate={{latitude: item.latitude , longitude: item.longitude}}
                     title=" Sample Building"
                     description="Sample Building"
                     image={defBuilding}
                     anchor={{ x: 0.5, y: 0.5 }}// Set custom marker icon
                     style = {styles.marker}
                  />
               <Marker coordinate={{latitude: item.latitude , longitude: item.longitude}}>
                  <Text style = {{color: 'black'}}> Sample Building</Text>
               </Marker>
              </>
             )
         })
         : ''
      }

      </MapView>
     </View>
  )
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
})
export default MapScreen
