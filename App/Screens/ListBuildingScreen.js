import React, { useEffect, useState } from 'react'
import { Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { background, icon } from '../../constants'
import { addBuilding, editBuilding } from '../../state/mongoDBSlice'
import { addNewBuilding, setChangeData } from '../../state/universalSlice'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios'

const ListBuildingScreen = ({navigation}) => {

   const [buildData,setBuildingData] = useState([])
   const {changeData} = useSelector(state => state.universal)
   useEffect(() => {
      axios.get('https://backendnorsumaps.onrender.com/getBuilding')
      .then((res) => {
      setBuildingData(res.data)
 })
   },[changeData])

   
  const [newBuildingData,setNewBuildingData] = useState([])
  useEffect(() => {
    axios.get('https://backendnorsumaps.onrender.com/getBuilding')
  .then((res) => {
    setNewBuildingData(res.data)
  })
   },[])
   
   const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarWidth,setSidebarWidth] = useState(-290)
  const {buildingData, defBuildingInfo } = useSelector(state => state.mongoDB)
  const {buildingNew} = useSelector(state => state.universal)
  const dipatch = useDispatch()


  const [latitude,setLatitude] = useState()
  const [longitude,setLongitude] = useState()
  const [selectedItem, setSelectedItem] = useState('Is there Any Rooms?');
  const [noRoomsText,setNoRoomsText] = useState();
  const [title,setTitle] = useState()
  const [description,setDescription] = useState()
  const [textInfo,setTextInfo] = useState()
  const [latitudeText,setLatitudeText] = useState()
  const [longitudeText,setLongitudeText] = useState()
  const [floor,setFloor] = useState()
  const [rooms,setRooms] = useState()
  const [ground,setGround] = useState()
  const [second,setSecond] = useState()
  const [third,setThird] = useState()
  const [fourth,setFourth] = useState()
  const [buildImg,setBuildImg] = useState()

  const [groundArr,setGroundArr] = useState([])
  const [secondArr,setSecondArr] = useState([])
  const [thirdArr,setThirdArr] = useState([])
  const [fourthArr,setFourthArr] = useState([])


  //forms vakue

  
  const [openPreview,setOpenPreview] = useState(false)
  const dispatch = useDispatch()

  const toggleSidebar = () => {
   setSidebarOpen(!sidebarOpen);
   if(sidebarOpen){
     setSidebarWidth(0)  
   }else{
    setSidebarWidth(-290)   
   }
   // sidebarWidth.value = withSpring(sidebarOpen ? 0 : 200); // Adjust sidebar width as needed
 };

 const handleAdd = () => {

   //   dispatch(addBuilding({data: [{latitude: parseFloat(latitude) , longitude: parseFloat(longitude) }]}))
     setOpenPreview(true)
  }
  const [savedUri, setSavedUri] = useState('');
  const handleSubmit = ()=> {
    console.log(floor)
   //   dipatch(addNewBuilding({
   //    title: title,
   //    floor: floor,
   //    rooms: rooms,
   //    ground: ground,
   //    second: second,
   //    third: third,
   //    fourth: fourth
   //   }))

   // console.log('addBuilding')

    axios.post('https://backendnorsumaps.onrender.com/addBuilding', {
      latitude: latitude,
      longitude: longitude,
      latitudeText: latitudeText,
      longitudeText: longitudeText,
      title: title,
      description: description,
      noRooms: selectedItem,
      noRoomsText:noRoomsText,
      textInfo: textInfo,
      numFloors: floor,
      numRooms: rooms,
      grounds: groundArr,
      seconds: secondArr,
      thirds: thirdArr,
      fourths: fourthArr,
      newImage: savedUri
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
   //     console.log(groundArr)
  }

  const [imagePaths, setImagePaths] = useState([]);
  const [selectedImagePath, setSelectedImagePath] = useState(null);
  const [upImage,setUpImage] = useState()

  const addImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImagePath(result.assets[0].uri);
        setUpImage(result.assets[0].uri)
        setBuildImg(result.assets[0].uri)
        setImagePaths([...imagePaths, result.uri]);
        saveImage(result.assets[0].uri)
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const uploadImage = async () => {
   console.log(upImage)
   const formData = new FormData();
   formData.append('file', {
     uri: upImage,
     name: 'photo.jpg',
     type: 'image/jpeg',
   });

   try {
     const res = await axios.post('https://backendnorsumaps.onrender.com/uploadBuildingImg', formData, {
       headers: { 'Content-Type': 'multipart/form-data' },
     });
   //   setUpImageName(res.data.file.filename)
   axios.post('https://backendnorsumaps.onrender.com/addBuilding', {
      latitude: latitude,
      longitude: longitude,
      latitudeText: latitudeText,
      longitudeText: longitudeText,
      title: title,
      description: description,
      noRooms: selectedItem,
      textInfo: textInfo,
      numFloors: floor,
      numRooms: rooms,
      grounds: groundArr,
      seconds: secondArr,
      thirds: thirdArr,
      fourths: fourthArr,
      newImage:  res.data.file.filename
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
   } catch (err) {
     console.error(err);
   }
 };

  const saveImage = async (uri) => {
   const filename = uri.split('/').pop();
   const newPath = FileSystem.documentDirectory + filename;

   try {
     await FileSystem.copyAsync({
       from: uri,
       to: newPath,
     });
     setSavedUri(newPath);
     console.log('Image saved', 'Image has been saved locally for persistent access.');
   } catch (error) {
     console.error('Error saving image:', error);
     console.log('Error', 'There was an error saving the image.');
   }
 };

//   console.log(savedUri)

const [floorNumber,setFloorNumber] = useState(0)
const [openDetails,setOpenDetails] = useState(false)
const addedBuilding = (identifier) => {
   setFloorNumber(identifier)
   setOpenDetails(item => !item)
}
const deleteAddedBuilding = (text) => {

   if(floorNumber == 1){
      const newArr = groundArr.filter((item) => {
          return  item !== text
       })
      setGroundArr(newArr)
   }else if(floorNumber == 2){
      const newArr = secondArr.filter((item) => {
         item !== text
     })
     setSecondArr(newArr)
   }
   else if(floorNumber == 3){
      const newArr = thirdArr.filter((item) => {
         item !== text
     })
     setThirdArr(newArr)
   }
   else if(floorNumber == 4){
      const newArr = fourthArr.filter((item) => {
         item !== text
     })
     setFourthArr(newArr)
   }
}

let updateBuildingInfo = []
const [updateId,setUpdateId] = useState('')
const [openBuildingUp,setOpenBuildingUp] = useState(false)
const updateBuilding = (id) => { 

    const info = buildData.filter((item) => {
        return item._id == id
     })

   
     setLatitude(JSON.stringify(info[0].latitude))
     setLongitude(JSON.stringify(info[0].longitude))
     setTitle(info[0].title)

     setTextInfo(info[0].textInfo)
     setLatitudeText(JSON.stringify(info[0].latitudeText))
     setLongitudeText(JSON.stringify(info[0].longitudeText))
     setFloor(JSON.stringify(info[0].numFloors))
     setRooms(JSON.stringify(info[0].numRooms))
     setDescription(info[0].description)
   //   setGround()
   //   setSecond()
   //   setThird()
   //   setFourth()
     setBuildImg(info[0].uri)
     setGroundArr(info[0].roomGroundFloor)
     setSecondArr(info[0].roomSecondFloor)
     setThirdArr(info[0].roomThirdFloor)
     setFourthArr(info[0].roomFourthFloor)
     setOpenBuildingUp(item => !item)
     setUpdateId(info[0]._id)
     console.log(info[0].buildingNewImage)
}

const submitUpdated = () => {
   
   axios.put('https://backendnorsumaps.onrender.com/updateBuilding', {
      id: updateId,
      latitude: latitude,
      longitude: longitude,
      latitudeText: latitudeText,
      longitudeText: longitudeText,
      title: title,
      description: description,
      noRooms: selectedItem,
      noRoomsText: noRoomsText,
      textInfo: textInfo,
      numFloors: floor,
      numRooms: rooms,
      grounds: groundArr,
      seconds: secondArr,
      thirds: thirdArr,
      fourths: fourthArr,
      newImage: savedUri
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

const deleteBuilding = (id) => {
   axios.delete(`https://backendnorsumaps.onrender.com/deleteBuilding/${id}`)
   .then(res => console.log(res))
   .catch(err => console.log(err))
}

const [isDropdownVisible, setDropdownVisible] = useState(false);

const toggleDropdown = () => {
  setDropdownVisible(!isDropdownVisible);
};

const selectItem = (item) => {
  setSelectedItem(item);
  setDropdownVisible(false);
};


// Use the code bellow if you want to add more buildings
const test = () => {
     
    defBuildingInfo.map((item) => {
      axios.post('https://backendnorsumaps.onrender.com/addBuilding', {
         latitude: item.latitude,
         longitude: item.longitude,
         latitudeText: item.latitudeText,
         longitudeText: item.longitudeText,
         title: item.title,
         description: item.description,
         noRooms: item.buildingData.noRooms,
         noRoomsText: item.buildingData.noRoomsText,
         textInfo: item.textInfo,
         numFloors: item.buildingData.numberOfFloors,
         numRooms: item.buildingData.numberOfRooms,
         grounds: item.buildingData.groundRoom,
         seconds: item.buildingData.firstRoom,
         thirds: item.buildingData.secondRoom,
         fourths: item.buildingData.thirdRoom,
         newImage: item.uri
       })
       .then(res => console.log(res))
       .catch(err => console.log(err))
    })
}

  return (
    <View style = {styles.container}>
       <Image style = {styles.subBG} source={background.SubBG} alt='sub'/>
        {/* <TouchableOpacity style = {styles.sidebarBtn} onPress={toggleSidebar}>
           <Image style = {styles.imageNav} source={icon.Menu} alt='1'/>
       </TouchableOpacity>
       <Animated.View style={[styles.sidebar, {left: sidebarWidth}]}>
       <TouchableOpacity style = {styles.closeSidebar} onPress={toggleSidebar}>
         <Image style = {styles.closeImage} source={icon.Close} alt='close'/>
       </TouchableOpacity>
        <View style = {styles.profileContainer}>
           <Image source={icon.DummyProfile} alt='dummy' style = {styles.profileNew}/>
        </View>
        <Text style = {styles.profileText}>REJHANE O.GRACIADAS</Text>
       <View style = {styles.sidebarControls}>
        <TouchableOpacity style = {styles.navBtn} onPress={()=>{ navigation.navigate('BuildingInfo')}}>
           <Image style = {styles.navIcons} source={icon.newBuilding} alt='building'/>
           <Text  style = {styles.navText}>Building Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.navBtn} onPress={()=>{ }}>
           <Image style = {styles.navIcons} source={icon.newMapIcon} alt='building'/>
           <Text  style = {styles.navText}>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.navBtn} onPress={()=>{ navigation.navigate('BuildingList')}}>
          <Image style = {styles.navIcons} source={icon.newAddBuilding} alt='emergency'/>
           <Text style = {styles.navText}>Add Building</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.navBtn} onPress={()=>{ navigation.navigate('Emergency')}}>
          <Image style = {styles.navIcons} source={icon.newEmergency} alt='emergency'/>
           <Text style = {styles.navText}>Emergency Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.navBtn} onPress={()=>{ }}>
          <Image style = {styles.navIcons} source={icon.newEnrollment} alt='enrollment'/>
           <Text style = {styles.navText}>Enrollment Process</Text>
          </TouchableOpacity>
       </View>
       <TouchableOpacity style = {styles.logoutBtn} onPress={ () => {navigation.navigate('Login')}}>
          <Text style = {styles.logOutText}>LOG OUT</Text>
       </TouchableOpacity>
      </Animated.View>   */}
       <ScrollView>
       <Text style = {styles.subTitle}> List of Buildings</Text>
        {/* <View style = {styles.addBuildingContainer}>
           <View>
              <TextInput
                value={latitude}
                onChangeText={setLatitude}
                placeholder='Input Latitude'
                style = {styles.addLocInput}
              />
               <TextInput
                value={longitude}
                onChangeText={setLongitude}
                placeholder='Input Longitude'
                style = {styles.addLocInput}
              />
           </View>
          
        </View> */}
        <TouchableOpacity style = {styles.locBtn} onPress={() => {
            handleAdd()
            // test()
         }}>
              <Text style = {{color: 'black', fontWeight: 'bold', fontSize: 20}}> ADD</Text>
           </TouchableOpacity>
   
          {
             openPreview ? 

             <View style = {styles.newBuildingModal}>
             <Text style = {styles.newBuildingModalTitle}>Add New Building</Text>
               <TextInput
                 value={latitude}
                 onChangeText={setLatitude}
                 placeholder='Input Latitude'
                 style = {styles.addLocInput}
               />
                <TextInput
                 value={longitude}
                 onChangeText={setLongitude}
                 placeholder='Input Longitude'
                 style = {styles.addLocInput}
                 />
                   <TextInput
                 value={latitudeText}
                 onChangeText={setLatitudeText}
                 placeholder='Input Longitude Text'
                 style = {styles.addLocInput}
                 />
                  <TextInput
                 value={longitudeText}
                 onChangeText={setLongitudeText}
                 placeholder='Input Longitude Text'
                 style = {styles.addLocInput}
                 />
               <Text style = {styles.newBuildingSubText}>Buildign Details</Text>
                <TextInput
                 value={title}
                 onChangeText={setTitle}
                 placeholder='Enter Title'
                 style = {styles.addLocInput}
                  /> 
                 <TextInput
                 value={description}
                 onChangeText={setDescription}
                 placeholder='Enter Description'
                 style = {styles.addLocInput}
                  /> 
                <View style={styles.container2}>
                  <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
                  <Text style={styles.selectedItem}>{selectedItem}</Text>
                  </TouchableOpacity>
                  {isDropdownVisible && (
                  <View style={styles.dropdown}>
                     <TouchableOpacity onPress={() => selectItem(true)} style={styles.dropdownItem}>
                        <Text>YES</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => selectItem(false)} style={styles.dropdownItem}>
                        <Text>NO</Text>
                     </TouchableOpacity>
                  </View>
                  )}
               </View>
               <TextInput
                 value={noRoomsText}
                 onChangeText={setNoRoomsText}
                 placeholder='Enter No Rooms Info'
                 style = {styles.addLocInput}
                  /> 
                 <TextInput
                 value={textInfo}
                 onChangeText={setTextInfo}
                 placeholder='Enter Text Information'
                 style = {styles.addLocInput}
                  /> 
                  <TextInput
                  value={floor}
                  onChangeText={setFloor}
                  placeholder='Enter Number Of Floors'
                  style = {styles.addLocInput}
                  /> 
                  <TextInput
                  value={rooms}
                  onChangeText={setRooms}
                  placeholder='Enter Number Of Rooms'
                  style = {styles.addLocInput}
               />
               <View style = {styles.addBuildingContainer}>
                  <TextInput
                     value={ground}
                     onChangeText={setGround}
                     placeholder='Enter Room Name Ground Floor'
                     style = {[styles.addBuildingMore]}
                  />
                  <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                       addedBuilding(1)
                  }}>
                      <Image source={icon.DetailIcon} alt='white' style = {styles.addBuildingIconImage}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                       groundArr.push(ground)
                       setGround('')
                  }}>
                     <Image source={icon.AddIconWhite} alt='white' style = {styles.addBuildingIconImage}/>
                  </TouchableOpacity>
               </View>
              
               <View style = {styles.addBuildingContainer}>
                     <TextInput
                        value={second}
                        onChangeText={setSecond}
                        placeholder='Enter Room Name Second Floor'
                        style = {[styles.addBuildingMore]}
                     />
                  <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                       addedBuilding(2)
                  }}>
                      <Image source={icon.DetailIcon} alt='white' style = {styles.addBuildingIconImage}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                       secondArr.push(second)
                       setSecond('')
                  }}>
                     <Image source={icon.AddIconWhite} alt='white' style = {styles.addBuildingIconImage}/>
                  </TouchableOpacity>
               </View>
               <View style = {styles.addBuildingContainer}>
                  <TextInput
                     value={third}
                     onChangeText={setThird}
                     placeholder='Enter Room Name Third Floor'
                     style = {[styles.addBuildingMore]}
                  />
                  <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                       addedBuilding(3)
                  }}>
                      <Image source={icon.DetailIcon} alt='white' style = {styles.addBuildingIconImage}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                       thirdArr.push(third)
                       setThird('')
                  }}>
                     <Image source={icon.AddIconWhite} alt='white' style = {styles.addBuildingIconImage}/>
                  </TouchableOpacity>
               </View>
               <View style = {styles.addBuildingContainer}>
                  <TextInput
                     value={fourth}
                     onChangeText={setFourth}
                     placeholder='Enter Room Name Fourth Floor'
                     style = {[styles.addBuildingMore]}
                  />
                  <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                       addedBuilding(4)
                  }}>
                      <Image source={icon.DetailIcon} alt='white' style = {styles.addBuildingIconImage}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                       fourthArr.push(fourth)
                       setFourth('')
                  }}>
                     <Image source={icon.AddIconWhite} alt='white' style = {styles.addBuildingIconImage}/>
                  </TouchableOpacity>
               </View>
               <TouchableOpacity style = {styles.addNewImage} onPress={() => {addImage()}}>
                  <Text style = {{color: 'white'}}>Add New Building Image</Text>
               </TouchableOpacity> 

          <View style = {{flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
           <TouchableOpacity style = {styles.cancelBtn} onPress={() => {
                setOpenPreview(false)
               //   dispatch(removeBuilding())
                }}>
             <Text style = {{color: 'white'}}>Cancel</Text>
           </TouchableOpacity>
           <TouchableOpacity style = {styles.submitBtn} onPress={() => {
            //   handleSubmit()
              uploadImage()
              setOpenPreview(false)
              }}>
             <Text style = {{color: 'white'}}>Submit</Text>
           </TouchableOpacity>
         </View>
                  
       
          </View>
           : ''
          }

          {
              openBuildingUp ? 
              <View style = {styles.newBuildingModal}>
              <Text style = {styles.newBuildingModalTitle}>Update Building</Text>
                <TextInput
                  value={latitude}
                  onChangeText={setLatitude}
                  placeholder='Input Latitude'
                  style = {styles.addLocInput}
                />
                 <TextInput
                  value={longitude}
                  onChangeText={setLongitude}
                  placeholder='Input Longitude'
                  style = {styles.addLocInput}
                  />
                <Text style = {styles.newBuildingSubText}>Buildign Details</Text>
                 <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder='Enter Title'
                  style = {styles.addLocInput}
                   /> 
                  <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder='Enter Description'
                  style = {styles.addLocInput}
                   /> 
               <View style={styles.container2}>
                  <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
                  <Text style={styles.selectedItem}>{selectedItem}</Text>
                  </TouchableOpacity>
                  {isDropdownVisible && (
                  <View style={styles.dropdown}>
                     <TouchableOpacity onPress={() => selectItem(true)} style={styles.dropdownItem}>
                        <Text>YES</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => selectItem(false)} style={styles.dropdownItem}>
                        <Text>NO</Text>
                     </TouchableOpacity>
                  </View>
                  )}
               </View>
               <TextInput
                 value={noRoomsText}
                 onChangeText={setNoRoomsText}
                 placeholder='Enter No Rooms Info'
                 style = {styles.addLocInput}
                  /> 
                  <TextInput
                  value={textInfo}
                  onChangeText={setTextInfo}
                  placeholder='Enter Text Information'
                  style = {styles.addLocInput}
                   /> 
                <TextInput
                  value={latitudeText}
                  onChangeText={setLatitudeText}
                  placeholder='Input Latitude Text'
                  style = {styles.addLocInput}
                  />
                     <TextInput
                  value={longitudeText}
                  onChangeText={setLongitudeText}
                  placeholder='Input Longitude Text'
                  style = {styles.addLocInput}
                  />
                   <TextInput
                   value={floor}
                   onChangeText={setFloor}
                   placeholder='Enter Number Of Floors'
                   style = {styles.addLocInput}
                   /> 
                   <TextInput
                   value={rooms}
                   onChangeText={setRooms}
                   placeholder='Enter Number Of Rooms'
                   style = {styles.addLocInput}
                />
                <View style = {styles.addBuildingContainer}>
                   <TextInput
                      value={ground}
                      onChangeText={setGround}
                      placeholder='Enter Room Name Ground Floor'
                      style = {[styles.addBuildingMore]}
                   />
                   <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                        addedBuilding(1)
                   }}>
                       <Image source={icon.DetailIcon} alt='white' style = {styles.addBuildingIconImage}/>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                        groundArr.push(ground)
                        setGround('')
                   }}>
                      <Image source={icon.AddIconWhite} alt='white' style = {styles.addBuildingIconImage}/>
                   </TouchableOpacity>
                </View>
               
                <View style = {styles.addBuildingContainer}>
                      <TextInput
                         value={second}
                         onChangeText={setSecond}
                         placeholder='Enter Room Name Second Floor'
                         style = {[styles.addBuildingMore]}
                      />
                   <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                        addedBuilding(2)
                   }}>
                       <Image source={icon.DetailIcon} alt='white' style = {styles.addBuildingIconImage}/>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                        secondArr.push(second)
                        setSecond('')
                   }}>
                      <Image source={icon.AddIconWhite} alt='white' style = {styles.addBuildingIconImage}/>
                   </TouchableOpacity>
                </View>
                <View style = {styles.addBuildingContainer}>
                   <TextInput
                      value={third}
                      onChangeText={setThird}
                      placeholder='Enter Room Name Third Floor'
                      style = {[styles.addBuildingMore]}
                   />
                   <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                        addedBuilding(3)
                   }}>
                       <Image source={icon.DetailIcon} alt='white' style = {styles.addBuildingIconImage}/>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                        thirdArr.push(third)
                        setThird('')
                   }}>
                      <Image source={icon.AddIconWhite} alt='white' style = {styles.addBuildingIconImage}/>
                   </TouchableOpacity>
                </View>
                <View style = {styles.addBuildingContainer}>
                   <TextInput
                      value={fourth}
                      onChangeText={setFourth}
                      placeholder='Enter Room Name Fourth Floor'
                      style = {[styles.addBuildingMore]}
                   />
                   <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                        addedBuilding(4)
                   }}>
                       <Image source={icon.DetailIcon} alt='white' style = {styles.addBuildingIconImage}/>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.addBuildingBtn} onPress={() => {
                        fourthArr.push(fourth)
                        setFourth('')
                   }}>
                      <Image source={icon.AddIconWhite} alt='white' style = {styles.addBuildingIconImage}/>
                   </TouchableOpacity>
                </View>
                <TouchableOpacity style = {styles.addNewImage} onPress={() => {addImage()}}>
                   <Text style = {{color: 'white'}}>Add New Building Image</Text>
                </TouchableOpacity> 
 
           <View style = {{flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
            <TouchableOpacity style = {styles.cancelBtn} onPress={() => {
                 setOpenPreview(false)
                 setOpenBuildingUp(item => !item)
                //   dispatch(removeBuilding())
                 }}>
              <Text style = {{color: 'white'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.submitBtn} onPress={() => {
               submitUpdated()
               setOpenPreview(false)
               }}>
              <Text style = {{color: 'white'}}>Submit</Text>
            </TouchableOpacity>
          </View>
                   
        
           </View>
           : '' 
            
          }


        {/* <View style = {styles.mapContainer}>
          {
           openPreview ? <MapScreen data = {buildingData}/> 
            :
             ''
          }

        </View> */}
        <ScrollView style = {styles.mapContainer}>
           {/* {
                defBuildingInfo.map((item) => {
                  return (
                     <View style = {styles.buildingCard}>
                        <View style = {styles.buildCardTextContainer}>
                            <Text style = {styles.buildingCardText}>{item.title}</Text>
                         </View>
                         <TouchableOpacity onPress={() => {
                             updateBuilding(item.id)
                         }}>
                            <Text>Update</Text>
                         </TouchableOpacity>
                         <TouchableOpacity>
                            <Text>Delete</Text>
                         </TouchableOpacity>
                     </View>
                  )
               })
           } */}
           {
               buildData.length > 0 ? buildData.map((item) => {
                  return (
                     <View style = {styles.buildingCard}>
                        <View style = {styles.buildCardTextContainer}>
                            <Text style = {styles.buildingCardText}>{item.title}</Text>
                         </View>
                         <TouchableOpacity style = {styles.updatedBtn} onPress={() => {
                             updateBuilding(item._id)
                         }}>
                            <Text>Update</Text>
                         </TouchableOpacity>
                         <TouchableOpacity style = {styles.deletedBtn} onPress={() => {
                             deleteBuilding(item._id)
                             dispatch(setChangeData())
                         }}>
                            <Text>Delete</Text>
                         </TouchableOpacity>
                     </View>
                  )
               })
               : ''
           }
        </ScrollView>
       {/* {
          openPreview ? 
          <View style = {{flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
          <TouchableOpacity style = {styles.cancelBtn} onPress={() => {
               setOpenPreview(false)
              
               }}>
            <Text style = {{color: 'white'}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.submitBtn}>
            <Text style = {{color: 'white'}}>Submit</Text>
          </TouchableOpacity>
        </View>
         :
          ''
       } */}
       </ScrollView>
       
       {
          openDetails ? 
          <View style = {styles.addedBuildingModal}>
          <ScrollView style = {styles.addedBuildingContainer}>
          {
             floorNumber == 1 ? 
             groundArr.map((item) => {
                 return (
                    <>
                      <View style = {styles.addedBuildingText}>
                          <View style = {{ height: 'auto', width: 150}}>
                             <Text style = {styles.addedBuildingSubText}>{item}</Text>
                          </View>
                          {/* <TouchableOpacity style = {styles.addedBuildingBtn}>
                             <Text style = {styles.addedBuildingBtnText}>Edit</Text>
                          </TouchableOpacity> */}
                          <TouchableOpacity  style = {styles.addedBuildingBtn} onPress={() => {
                             deleteAddedBuilding(item)
                          }}>
                             <Text style = {styles.addedBuildingBtnText}>Delete</Text>
                          </TouchableOpacity>
                      </View>
                    </>
                 )
             })
             :  
             floorNumber == 2 ? 
             secondArr.map((item) => {
                 return (
                    <>
                      <View style = {styles.addedBuildingText}>
                         <View style = {{ height: 'auto', width: 150}}>
                             <Text style = {styles.addedBuildingSubText}>{item}</Text>
                          </View>
                          {/* <TouchableOpacity style = {styles.addedBuildingBtn}>
                             <Text style = {styles.addedBuildingBtnText}>Edit</Text>
                          </TouchableOpacity> */}
                          <TouchableOpacity  style = {styles.addedBuildingBtn}>
                             <Text style = {styles.addedBuildingBtnText}>Delete</Text>
                          </TouchableOpacity>
                      </View>
                    </>
                 )
             })
             :
             floorNumber == 3 ? 
             thirdArr.map((item) => {
                 return (
                    <>
                      <View style = {styles.addedBuildingText}>
                         <View style = {{ height: 'auto', width: 150}}>
                             <Text style = {styles.addedBuildingSubText}>{item}</Text>
                          </View>
                          {/* <TouchableOpacity style = {styles.addedBuildingBtn}>
                             <Text style = {styles.addedBuildingBtnText}>Edit</Text>
                          </TouchableOpacity> */}
                          <TouchableOpacity  style = {styles.addedBuildingBtn}>
                             <Text style = {styles.addedBuildingBtnText}>Delete</Text>
                          </TouchableOpacity>
                      </View>
                    </>
                 )
             })
             :
             floorNumber == 4 ? 
             fourthArr.map((item) => {
                 return (
                    <>
                      <View style = {styles.addedBuildingText}>
                         <View style = {{ height: 'auto', width: 150}}>
                             <Text style = {styles.addedBuildingSubText}>{item}</Text>
                          </View>
                          {/* <TouchableOpacity style = {styles.addedBuildingBtn}>
                             <Text style = {styles.addedBuildingBtnText}>Edit</Text>
                          </TouchableOpacity> */}
                          <TouchableOpacity  style = {styles.addedBuildingBtn}>
                             <Text style = {styles.addedBuildingBtnText}>Delete</Text>
                          </TouchableOpacity>
                      </View>
                    </>
                 )
             })
             :
             ''
          }
          </ScrollView>
          <View style = {{flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
           <TouchableOpacity style = {styles.cancelBtn} onPress={() => {
                setOpenDetails(item => !item)
               //   dispatch(removeBuilding())
                }}>
             <Text style = {{color: 'white'}}>Cancel</Text>
           </TouchableOpacity>
           <TouchableOpacity style = {styles.submitBtn} onPress={() => {
              setOpenDetails(item => !item)
              }}>
             <Text style = {{color: 'white'}}>Ok</Text>
           </TouchableOpacity>
         </View>
       </View>
       : 
       ''
       }
    
    </View>
  )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
   },
   title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 90,
    marginLeft: 10
  },
  btnContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15
  },
  controlBtn:{
     width: 100,
     height: 50,
     backgroundColor: '#416165',
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 7,
     marginTop: 20,
     elevation: 3
  },
  controlText:{
    color: 'white'
  },
  dataContainer: {
    borderColor: '#416165',
    width: '95%',
    height: 400,
    borderWidth: 1,
    marginLeft: 9,
    marginRight: 8,
    marginTop: 15,
    borderRadius: 5,
    elevation: 4
  },
  subTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20
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
 navIcons: {
   width: 30,
   height: 30
},
navText: {
   color: 'white',
   fontSize: 20
},
navBtn: {
 marginBottom: 10,
 paddingBottom: 15,
 width: 200,
 flexDirection: 'row',
 alignItems: 'center',
 gap: 15
},
imageNav: {
  height: 50,
  width: 50
},
backgroundImage: {
  position: 'absolute',
  width: '100%',
  height: '100%'
},
addBuildingContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10
},
addLocInput: {
 borderColor: '#416165',
 borderWidth: 1,
 height: 40,
 width: '100%',
 marginTop: 10,
 borderRadius: 7,
 paddingLeft: 8
},
addBuildingMore: {
   borderColor: '#416165',
   borderWidth: 1,
   height: 40,
   width: '62%',
   marginTop: 10,
   borderRadius: 7,
   paddingLeft: 8
},
locBtn: {
 width: 110,
 height: 50,
 marginLeft: 10,
 backgroundColor: 'gray',
 justifyContent: 'center',
 alignItems: 'center',
 borderRadius: 12,
 marginTop: 20,
 elevation: 3
},
mapContainer: {
 borderColor: '#416165',
 width: '95%',
 height: 'auto',
 borderWidth: 1,
 marginLeft: 9,
 marginRight: 8,
 marginTop: 15,
 borderRadius: 5,
 backgroundColor: 'white',
 padding: 17
},
submitBtn: {
  backgroundColor: '#3F704D',
  height: 40,
  width: 90,
  borderRadius: 7,
  alignItems: 'center',
  justifyContent: 'center'
},
cancelBtn: {
 backgroundColor: '#BA110C',
 height: 40,
 width: 90,
 borderRadius: 7,
 alignItems: 'center',
 justifyContent: 'center'
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
    fontSize: 20,
    marginLeft: 30,
    marginTop: 15
 },
 closeSidebar: {
    marginLeft: 20,
    marginTop: 20
 },
 closeImage: {
    width: 30,
    height: 30
 },
 logoutBtn: {
   position: 'absolute',
   bottom: 15,
   left: 95
},
logOutText: {
  color: 'white',
  fontSize: 15
},
buildingCard: {
   borderWidth: 1,
   borderColor: '#3F704D',
   marginTop: 7,
   marginBottom: 7,
   height: 'auto',
   width: 270,
   minHeight: 45,
   borderRadius: 5,
   paddingLeft: 5,
   gap: 1,
   flexDirection: 'row',
   alignItems: 'center'
},
buildCardTextContainer:{
    width: 150,
},
buildingCardText: {
   fontSize: 19,
   fontWeight: 'bold',
   marginTop: 10
},
newBuildingModal: {
   borderWidth: 1,
   borderColor: 'black',
   width: '92%',
   position: 'absolute',
   top: 70,
   left: 15,
   paddingLeft: 15,
   paddingRight: 15,
   borderRadius: 6,
   paddingBottom: 20,
   paddingTop: 10,
   backgroundColor: 'white',
   zIndex: 3
},
newBuildingModalTitle: {
   fontSize: 22,
   fontWeight: 'bold'
},
roomNameContainer: {
  flexDirection :'row',
  alignItems: 'center',
  gap: 5
},
addIconImage: {
   height: 40,
   width: 40
},
subBG:{
   position:'absolute',
   width: '100%',
   height: '100%'
},
addNewImage: {
    height: 40,
    width: '100%',
    backgroundColor: '#3F704D',
    paddingLeft: 10,
    paddingTop: 10,
    marginTop: 10,
    borderRadius: 10
},
addBuildingContainer:{
    flexDirection: 'row',
    alignItems: 'center',
},
addBuildingBtn: {
   height: 40,
   width: 40,
   backgroundColor: '#3F704D',
   borderRadius: 10,
   padding: 5,
   marginTop: 7,
   marginLeft: 8
},
addBuildingIconImage:{
    height: 30,
    width: 30
},
addedBuildingModal:{
   backgroundColor: 'white',
   borderColor: 'black',
   borderWidth: 1,
   borderRadius: 10,
   width: '70%',
   height: 300,
   position: 'absolute',
   top: 0
},
addedBuildingContainer:{
   padding: 20
},
addedBuildingText:{
    flexDirection: 'row',
    alignItems:'center',
    borderBottomColor: 'lightgray',
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderWidth: 1,
    paddingBottom: 5,
    gap: 5
},
addedBuildingSubText:{
   fontSize: 20,
   fontWeight: 'bold',

},
addedBuildingBtn:{  
   backgroundColor: '#BA110C',
   height: 30,
   width: 50,
   paddingTop: 5,
   borderRadius: 5
},
addedBuildingBtnText:{
    color: 'white',
    textAlign: 'center'
},
container2: {
   width: '100%',
   marginTop: 10,
 },
 dropdownHeader: {
   padding: 10,
   backgroundColor: 'transparent',
   borderColor:  '#416165',
   borderWidth: 1,
   borderRadius: 5
 },
 selectedItem: {
   fontSize: 16,
   color: 'lightgray'
 },
 dropdown: {
   backgroundColor: 'transparent',
   borderColor:  '#416165',
   borderWidth: 1,
   marginTop: 5,
   borderRadius: 5
 },
 dropdownItem: {
   padding: 10,
   borderBottomWidth: 1,
   borderBottomColor: '#eee',
 },
 updatedBtn: {
   backgroundColor: '#D9CFA4',
   padding: 5,
   borderRadius: 5,
   borderColor: 'black',
   borderWidth: 1
 },
 deletedBtn: {
  backgroundColor: '#F19B76',
  padding: 5,
  borderRadius: 5,
  borderColor: 'black',
  borderWidth: 1
 }
})
export default ListBuildingScreen
