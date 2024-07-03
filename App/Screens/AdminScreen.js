import React, { useEffect, useState } from 'react'
import { StyleSheet,View,Text, TouchableOpacity, ScrollView, Animated, Image, TextInput} from 'react-native'
import { background, icon } from '../../constants';
import MapScreen from './MapScreen';
import { useDispatch, useSelector } from 'react-redux';
import { addBuilding, removeBuilding } from '../../state/mongoDBSlice';
import axios from 'axios'
import { setChangeData } from '../../state/universalSlice';
import { Buffer } from 'buffer';

const AdminScreen = ({navigation}) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarWidth,setSidebarWidth] = useState(-290)
  const {buildingData, defBuildingInfo } = useSelector(state => state.mongoDB)
  const {changeData} = useSelector(state => state.universal)
  const [getData,setGetData] = useState(false)
  const [userData,setUserData] = useState([])
  const [verifyData,setVerifyData] = useState([])

  const [name,handleName] = useState('')
  const [studentNumber,handleStudentNumber] = useState('')
  const [password,handlePassword] = useState('')
  const [refImage,handleRefImage] = useState('')
  const [verified,handleVerify] = useState('')
  const [email,handleEmail] = useState('')
  const [phone,handlePhone] = useState('')

  const [showCardCont,setShowCardCont] = useState('')
  const [showUpdateModal,setUpdateModal] = useState(false)
  const [clicked,setClicked ] = useState()
  const [mapData,setMapData] = useState([])


  useEffect(() => {


   axios.get('https://backendnorsumaps.onrender.com/getAccount')
 .then((res) => {
 
   let newData = res.data.filter((item) => {
      return item.verified == false
   })
   let verifyData = res.data.filter((item) => {
      return item.verified == true
   })
   setUserData(verifyData)
   setVerifyData(newData)

 })
  },[changeData])

 

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if(sidebarOpen){
      setSidebarWidth(0)  
    }else{
     setSidebarWidth(-290)   
    }
    // sidebarWidth.value = withSpring(sidebarOpen ? 0 : 200); // Adjust sidebar width as needed
  };

  const [latitude,setLatitude] = useState()
  const [longitude,setLongitude] = useState()
  const {buildingNew,currentUser} = useSelector(state => state.universal)
  const dispatch = useDispatch()
  // const [data,setData] = useState([])


  const handleAdd = () => {

   //   dispatch(addBuilding({data: [{latitude: parseFloat(latitude) , longitude: parseFloat(longitude) }]}))
     setOpenPreview(true)
  }

  const handleAll = () => {
    console.log('working')
    setGetData(item => !item)
  }

  const handleUserClicked = (val) => {
   
      console.log(val)

      if(showCardCont){
         setClicked(val)
      }else{
         setClicked('')
      }
  }

const [changeKey,setChangeKey] = useState()
 
const handleUpdate = (id) => {

    const exist = userData.filter((item) => {
        return item.studentid == id
    })
    handleName(exist[0].name)
    handleStudentNumber(exist[0].studentid)
    handlePhone(exist[0].phone)
    handleEmail(exist[0].email)
    handleRefImage(exist[0].refImage)
    handleVerify(exist[0].verified)
    handlePassword(exist[0].password)

    setChangeKey(exist[0]._id)
}

const handleSubmit = () => {

    axios.put('https://backendnorsumaps.onrender.com/updateUser', { 
      name: name,
      email: email,
      phone: phone,
      refImage: refImage,
      verified: verified,
      studentid: studentNumber,
      password: password,
      id: changeKey
    }).then(res => console.log(res))
    .catch(err => console.log(err))

    dispatch(setChangeData())
}

const handleDelete = (id) => {
     axios.delete(`https://backendnorsumaps.onrender.com/deleteUser/${id}`)
     .then(res => console.log(res))
    .catch(err => console.log(err))
}

const [openVerify,setOpenVerify] = useState(false)
const verifyAccount = () => {
   setOpenVerify(item => !item)
}
const [loadslip,setLoadslip] = useState('')
const [verifyId,setVerifyId] = useState()
const [sendEmail,setSendEmail] = useState()
const [newFile,setNewFile] = useState()
const [openView,setOpenView] = useState(false)
const openViewModal = async (id) => {
   const data = verifyData.filter((item) => {
        return item._id == id
   })
   // setLoadslip(data[0].refImage)
   setVerifyId(data[0]._id)
   setNewFile(data[0].fileName)
   setSendEmail(data[0].email)
   setOpenView(item => !item)

   try {
      const res = await axios.get(`https://backendnorsumaps.onrender.com/files/${data[0].fileName}`, {
       responseType: 'arraybuffer',
     })
  
     const base64 = Buffer.from(res.data, 'binary').toString('base64');
     setLoadslip(`data:image/jpeg;base64,${base64}`);
   } catch (err) {
     console.error('Download Error: ', err);
   }

}

const verify = () => {

   const data = verifyData.filter((item) => {
      return item._id == verifyId
 })

 console.log(data)
   axios.put('https://backendnorsumaps.onrender.com/updateUser', { 
      name: data[0].name,
      email: data[0].email,
      phone: data[0].phone,
      verified: true,
      refImage: data[0].refImage,
      studentid: data[0].studentid,
      password: data[0].password,
      id: verifyId
    }).then(res => console.log(res))
    .catch(err => console.log(err))

    dispatch(setChangeData())
}
const test = '1717397739384-photo.jpg'
const fetchImage = async () => {
   // try {
   //     const res = await axios.get(`https://backendnorsumaps.onrender.com/files/${newFile}`, {
   //      responseType: 'arraybuffer',
   //    })
   
   //    const base64 = Buffer.from(res.data, 'binary').toString('base64');
   //    setLoadslip(`data:image/jpeg;base64,${base64}`);
   //  } catch (err) {
   //    console.error('Download Error: ', err);
   //  }
 };
 
 const sendConfirmation = () => {


   axios.post('https://backendnorsumaps.onrender.com/send-email', { 
      to: `${sendEmail}`,
      subject: 'Verifiction',
      text: 'Congratiolations You Are Verified',
      html: '<p>Congratulations Your Account has been Verified</p>'
    }).then(res => console.log(res))
    .catch(err => console.log(err))
 }


  return (
  <View style = {styles.container}>
   <Image source={background.SubBG} alt='sub' style = {styles.mainBG}/>
    {/* <Image style = {styles.backgroundImage} source={background.BG4} alt='bg4' /> */}
    <TouchableOpacity style = {styles.sidebarBtn} onPress={toggleSidebar}>
           <Image style = {styles.imageNav} source={icon.Menu} alt='1'/>
       </TouchableOpacity>
       <Animated.View style={[styles.sidebar, {left: sidebarWidth}]}>
       <TouchableOpacity style = {styles.closeSidebar} onPress={toggleSidebar}>
         <Image style = {styles.closeImage} source={icon.Close} alt='close'/>
       </TouchableOpacity>
        <View style = {styles.profileContainer}>
           <Image source={icon.DummyProfile} alt='dummy' style = {styles.profileNew}/>
        </View>
        <Text style = {styles.profileText}>{currentUser}</Text>
       <View style = {styles.sidebarControls}>
       <TouchableOpacity style = {styles.navBtn} onPress={()=>{ navigation.navigate('AdminMap') }}>
           <Image style = {styles.navIcons} source={icon.newMapIcon} alt='building'/>
           <Text  style = {styles.navText}>View Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.navBtn} onPress={()=>{ 
              dispatch(setChangeData())
              navigation.navigate('BuildingList')
              }}>
          <Image style = {styles.navIcons} source={icon.newAddBuilding} alt='emergency'/>
           <Text style = {styles.navText}>Add Building</Text>
          </TouchableOpacity>
        <TouchableOpacity style = {styles.navBtn} onPress={()=>{ navigation.navigate('BuildingInfo')}}>
           <Image style = {styles.navIcons} source={icon.newBuilding} alt='building'/>
           <Text  style = {styles.navText}>Building Info</Text>
          </TouchableOpacity>
        
          <TouchableOpacity style = {styles.navBtn} onPress={()=>{ navigation.navigate('Emergency')}}>
          <Image style = {styles.navIcons} source={icon.newEmergency} alt='emergency'/>
           <Text style = {styles.navText}>Emergency Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.navBtn} onPress={()=>{ navigation.navigate('Enrollment') }}>
          <Image style = {styles.navIcons} source={icon.newEnrollment} alt='enrollment'/>
           <Text style = {styles.navText}>Enrollment Process</Text>
          </TouchableOpacity>
       </View>
       <TouchableOpacity style = {styles.logoutBtn} onPress={ () => {navigation.navigate('Login')}}>
          <Text style = {styles.logOutText}>LOG OUT</Text>
       </TouchableOpacity>
      </Animated.View>
     <View style = {styles.adminContainer}>
      <Image source = {icon.AdminIcon} alt='2' style={styles.adminImage}/>
       <Text style = {styles.title}>WELCOME</Text>
       <Text style = {styles.titleSpan}>ADMIN!</Text>
       <Text style = {styles.subTitle}> LIST OF USERS</Text>
         <View style = {styles.btnContainer}>
           {
              userData ?   <Text style = {styles.usersCount}>{userData.length}</Text>
              : ''
           }
            {
              verifyData.length > 0  ?   <Text style = {styles.unVerified}>{verifyData.length}</Text>
              : ''
           }
            <TouchableOpacity style = {styles.controlBtn} onPress={() => {
                handleAll()
                setOpenVerify(false)
            }}>
               <Text  style = {styles.controlText}> Verified </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.controlBtn} onPress={() => {verifyAccount()}}>
              <Text style = {styles.controlText}> Verifiy </Text>
            </TouchableOpacity>

         </View>
         <ScrollView style = {styles.dataContainer}>
            {
               openVerify ?  verifyData.map((item,index) => {
                  return (
                        <View style = {styles.userCard}>
                             <Text style = {styles.userText}>{item.name}</Text>
                             <Text style = {styles.userId}>{item.studentid}</Text>
                             <TouchableOpacity style = {styles.verifyBtn2} onPress={() => {
                              handleDelete(item._id)
                             }}>
                               <Text>Delete</Text>
                             </TouchableOpacity>         
                             <TouchableOpacity style = {styles.verifyBtn} onPress={() => {
                                openViewModal(item._id)
                                fetchImage()
                             }}>
                               <Text>Verify</Text>
                             </TouchableOpacity>         
                        </View>
                  )
              })
              :
                userData ?  userData.map((item,index) => {
                  return (
                        <View style = {styles.userCard}>
                             <Text style = {styles.userText}>{item.name}</Text>
                             <Text style = {styles.userId}>{item.studentid}</Text>
                             <TouchableOpacity style = {styles.contBtn} onPress={() => {
                                 handleUserClicked(item.studentid)
                                
                              
                                 setShowCardCont(index)
                                 if(showCardCont === index){
                                     setShowCardCont('')
                                 }
                             }}>
                               <Image style = {styles.userImage}source={icon.ContIcon} alt='cont'/>
                             </TouchableOpacity>
                                    <View style = {[styles.userControls,showCardCont ===  index ? {display: 'block'} : {display: 'none'}]}>
                                       <TouchableOpacity style = {styles.updateBtn} onPress={() => {
                                           setUpdateModal(item => !item)
                                            handleUpdate(item.studentid)
                                           }}>
                                          <Text>Update</Text>
                                       </TouchableOpacity>
                                       <TouchableOpacity style = {styles.deleteBtn} onPress={ () => {
                                           handleDelete(item._id)
                                           dispatch(setChangeData())
                                           }}>
                                          <Text>Delete</Text>
                                       </TouchableOpacity>
                                    </View>
                        
                             
                        </View>
                  )
              })

              : ''
            }
         </ScrollView>
          {
              openView ? 
               <View style = {styles.viewModal}>
                    {/* <Text style = {styles.verifyText}>Verify Account</Text> */}
                    
                   <Image source={{uri: loadslip}}  alt = 'load' style = {styles.viewImage}/>
                    
                    <View style = {styles.viewControlBtn}>
                       <TouchableOpacity style = {styles.yesBtn} onPress={() =>{
                            verify()
                            setOpenView(item => !item)
                           sendConfirmation()
                       }}>
                          <Text style = {{color: 'white'}}>Yes</Text>
                       </TouchableOpacity >
                       <TouchableOpacity style = {styles.noBtn} onPress = {() => {
                           setOpenView(item => !item)
                       }}>
                          <Text style = {{color: 'white'}}>No</Text>
                       </TouchableOpacity>
                     </View>
               </View>
               : ''
          }
         {
             showUpdateModal ? 
             <View style = {styles.updateModal}> 
             <Text style = {styles.nameLabel}>Name</Text>
             <TextInput
               placeholder='Name'
               onChangeText={handleName}
               value={name}
               style = {styles.nameInput}
             />
             <Text style = {styles.studentNumberLabel}>Student Number</Text>
             <TextInput
               placeholder='Student Number'
               onChangeText={handleStudentNumber}
               value={studentNumber}
               style = {styles.studentNumberInput}
             />
             <Text style = {styles.passwordLabel}>Email</Text>
             <TextInput
               placeholder='Email'
               onChangeText={handleEmail}
               value={email}
               style = {styles.passwordInput}
             />
             <Text style = {styles.passwordLabel}>Password</Text>
             <TextInput
               placeholder='Password'
               onChangeText={handlePassword}
               value={password}
               style = {styles.passwordInput}
             />
             <View style = {{flexDirection: 'row', gap: 5, justifyContent: 'center', marginTop: 5}}>
               <TouchableOpacity style = {styles.submitBtn} onPress = {() => {
                   handleSubmit()
                   setUpdateModal(item => !item)
                   dispatch(setChangeData())
                   }}>
                  <Text>Submit</Text>
               </TouchableOpacity>
               <TouchableOpacity style = {styles.cancelBtn} onPress = {() => { setUpdateModal(item => !item)}}>
                  <Text>Cancel</Text>
               </TouchableOpacity>
             </View>
             </View>
              : ''
         }


</View>
       
     </View>
  ) 
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: 'white',
   },
   title: {
     fontSize: 30,
     fontWeight: 'bold',
     marginLeft: 10,
     color: 'darkblue',
     width: 150,
     marginLeft: '35%',
     marginTop: 25
   },
   titleSpan:{
      fontSize: 30,
      fontWeight: 'bold',
      color: 'darkblue',
      width: 150,
      marginLeft: '40%',
   },
   adminImage:{
       position:'absolute',
       top: 30,
       left: 64
   },
   btnContainer:{
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     gap: 15,
     marginLeft: 20
   },
   controlBtn:{
      width: 80,
      height: 30,
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      marginTop: 20,
      elevation: 3
   },
   controlText:{
     color: 'white',
     fontSize: 15
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
     elevation: 4,
     paddingLeft: 14,
     paddingRight: 14,
     paddingTop: 15,
     position: 'relative'
   },
   subTitle: {
     fontSize: 25,
     fontWeight: 'bold',
     marginTop: 20,
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
locBtn: {
  width: 110,
  height: 50,
  marginLeft: 10,
  backgroundColor: '#416165',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 7,
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

  padding: 17
},
submitBtn: {
   backgroundColor: '#3F704D',
   height: 40,
   width: 80,
   borderRadius: 7,
   alignItems: 'center',
   justifyContent: 'center'
},
cancelBtn: {
  backgroundColor: '#BA110C',
  height: 40,
  width: 80,
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
  logoutBtn: {
    position: 'absolute',
    bottom: 15,
    left: 95,
    backgroundColor: 'gray',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 30,
    marginRight: 50,
    marginBottom: 10
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
    height: 45,
    borderRadius: 5,
    paddingLeft: 5
 },
 buildingCardText: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10
 },
 newBuildingModal: {
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    position: 'absolute',
    top: 400,
    left: 35,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 6,
    paddingBottom: 20,
    paddingTop: 10
 },
 newBuildingModalTitle: {
    fontSize: 22,
    fontWeight: 'bold'
 },
 userCard: {
   flexDirection: 'row',
   alignItems: 'center',
   gap: 30,
   borderWidth: 2,
   borderColor: 'gray',
   marginTop: 5,
   marginBottom: 5,
   paddingLeft: 10,
   minHeight: 40,
   height: 'auto',
   borderRadius: 5
 },
 userText:{
   fontWeight: 'bold',
   fontSize: 17,
   width: 60,
 },
 userId:{
   fontWeight: 'bold',
   fontSize: 17,
   width: 100,
 },
 userImage: {
    height: 15,
    width: 15
 },
 contBtn: {
    position: 'absolute',
    right: 15
 },
 verifyBtn:{
   position: 'absolute',
   right: 5,
   backgroundColor: '#D9CFA4',
   padding: 3,
   borderRadius: 5,
   borderWidth: 1,
   borderColor: 'black'
 },
 verifyBtn2:{
   position: 'absolute',
   right: 55,
   backgroundColor: '#D9CFA4',
   padding: 3,
   borderRadius: 5,
   borderWidth: 1,
   borderColor: 'black'
 },
 updateModal: {
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    height: 300,
    position: 'absolute',
    top: 100,
    left: 40,
    padding: 10,
    borderRadius: 10,
    zIndex: 4,
    backgroundColor: 'white'
 },
 mainBG: {
    position: 'absolute',
    width: '100%',
    height: '100%'
 },
 adminContainer:{
    backgroundColor: 'white',
    height: 'auto',
    marginTop: 100,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10
 },
 passwordInput:{
    borderWidth: 1,
    borderColor: 'lightgray',
    height: 40,
    paddingTop: 2,
    paddingLeft: 8
 },
 nameInput: {
    borderWidth: 1,
    borderColor: 'lightgray',
    height: 40,
    paddingTop: 2,
    paddingLeft: 8
 },
 studentNumberInput: {
    borderWidth: 1,
    borderColor: 'lightgray',
    height: 40,
    paddingTop: 2,
    paddingLeft: 8
 },
 usersCount: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    height: 40,
    width: 40,
    borderRadius: 30,
    position: 'absolute',
    padding: 7,
    paddingTop: 8,
    paddingLeft: 10,
    zIndex: 1,
    fontSize: 19,
    top: 0,
    left: 40,
    fontSize: 15
 },
 unVerified:{
   backgroundColor: 'white',
   borderWidth: 1,
   borderColor: 'black',
   height: 40,
   width: 40,
   borderRadius: 30,
   position: 'absolute',
   padding: 7,
   paddingLeft: 12,
   zIndex: 1,
   fontSize: 19,
   top: 0,
   left: 135,
   fontSize: 15
 },
 userControls:{
    position: 'absolute',
    backgroundColor: 'white',
    flexDirection: 'row',
    left: 90,
    gap: 7
 },
 updateBtn: {
   backgroundColor: '#D9CFA4',
   padding: 3,
   borderRadius: 5
 },
 deleteBtn:{
   backgroundColor: '#F19B76',
   padding: 3,
   borderRadius: 5
 },
 viewModal:{
   backgroundColor: 'white',
   borderWidth: 1,
   borderColor: 'black',
   position: 'absolute',
   width: '100%',
   height: 300,
   borderRadius: 10,
   zIndex: 3
 },
 viewImage:{
    width: 250,
    height: 190, 
    borderRadius: 10,
    marginTop: 15,
    marginLeft: '9%'
 },
 noBtn:{
   backgroundColor: 'red',
   padding: 10,
   paddingLeft: 25,
   paddingRight: 25,
   borderRadius: 10,
 },
 yesBtn:{
   backgroundColor: 'green',
   padding: 10,
   paddingLeft: 25,
   paddingRight: 25,
   borderRadius: 10,
 },
 viewControlBtn:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 25,
    marginLeft: '28%'
 },
 verifyText: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10
 }
})
export default AdminScreen
