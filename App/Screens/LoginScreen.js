import React, { useEffect, useState } from 'react'
import {View, Text, SafeAreaView,StyleSheet, ImageBackground, Image, TextInput, Button, TouchableOpacity, ActivityIndicator} from 'react-native'
import { background, FONT, icon, SIZES} from '../../constants'
import { getData, getLocationData } from '../../database/database'
import { useDispatch, useSelector } from 'react-redux'
import { populateDatabase, setCurrentUser, setUserCredentianls } from '../../state/universalSlice'
import building from '../../constants/building'
import axios from 'axios'



const LoginScreen = ({navigation}) => {

const dispatch = useDispatch()
const [data,setData] = useState() 
const [userData,setUserData] = useState()

useEffect(()=>{    
  getLocationData(item => {
    dispatch(populateDatabase({data:item}))
   
 })
 getData(items => {
    setData(items)
    
    // dispatch(setUserCredentianls({userInfo: items}))
 });

 axios.get('https://backendnorsumaps.onrender.com/getAccount')
 .then((res) => {
  setUserData(res.data)
 })
  },[])


  const [user,handleUser] = useState('')
  const [password,handlePassword] = useState('')

  const [showPassword,setShowPassowrd] = useState(true)
  const [invalidName, setInvalidName] = useState(false)
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [loading,setLoading] = useState(false)
  const {account} = useSelector(state => state.universal)

  let promp = ''

  const decryptPassword = (pwd) => {
    const shift = 3; // Example shift for Caesar Cipher
    const decryptedArray = pwd.split('').map((char) => {
      const charCode = char.charCodeAt(0);
      // Decrypt only letters (example using a Caesar Cipher-like shift)
      if (charCode >= 65 && charCode <= 90) { // Uppercase A-Z
        return String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) { // Lowercase a-z
        return String.fromCharCode(((charCode - 97 - shift + 26) % 26) + 97);
      }
      return char; // Non-letter characters remain the same
    });
    return decryptedArray.join('');
  };

 const handleSubmit = async () =>{
   dispatch(setCurrentUser({name: user}))
   const exist = await userData.filter((item) => {
     return item.name == user
   })

   if(exist.length > 0){
     promp = ''
     setInvalid(false)
     const newPassword = decryptPassword(exist[0].password)
     console.log(newPassword)
     if(exist[0].name == user && password == exist[0].password){
        if(exist[0].verified == true){
          navigation.navigate('Main')
        }
     }else{
        setInvalid(true)
        promp = 'password or username'
     }
   }else{
       setInvalid(true)
      promp == 'account does not exist'
   }

  if(user == 'admin' && password == 'password'){
    navigation.navigate('Admin')
  }else{

  }
 
  //comment the below when developing
  // navigation.navigate('Admin')
 }
  //   navigation.navigate('Main')
  //   //  setTimeout(() => {
  //   //    setLoading(false)
     
  //   //  }, 1000)
  //   //  setTimeout(()=>{
  //   //   setLoading(false)
  //   // 
  //   //  },[500])
  // }
    // try{
    //   data.map((item) => {
    //      if(item.Name !== user && item.Password !== password){
    //          const nameValidity = item.Name == user ? false : user == '' ? false : true 
    //          setInvalidName(nameValidity) 
    //          const passwordValidity = item.Password == password ? false : password == '' ? false : true 
    //          setInvalidPassword(passwordValidity)
    //          console.log('wrong')
    //      }else{
    //       setInvalidName(false) 
    //       setInvalidPassword(false)
    //       navigation.navigate('Main')
    //      }
    //   })

    // }catch(error){
    //   console.log(error)
    // }
 
 

 const handleShowPassword = () => {
   setShowPassowrd(item => !item)
 }

//  console.log(userData)
 console.log(user)
 console.log(password)
  return (
     <View style = {style.container}>
      <Image source={building.LoginBG} alt='log' style = {style.loginBackground}/>
       {
         loading ?  <ActivityIndicator size="large" color="#0000ff" style={style.loadingIndicator} />

         :
     <>
         <View style = {style.loginContainer}>
              <Text style = {style.userLabel}>USERNAME</Text>
              {invalidName ? <Text style={{color:'red'}}>Username does not exist</Text> : ''}
              {invalid ? <Text style={{color:'red'}}>{promp}</Text> : ''}

              <TextInput
                placeholder='Enter UserName'
                value={user}
                onChangeText={handleUser}
                style = {style.userInput}
              />
              <Text style = {style.passwordLabel}>PASSWORD</Text>
              {invalidPassword ? <Text style={{color:'red'}}>Password is Incorrect</Text> : ''}
             <View style={{position: 'relative'}}>
              <TouchableOpacity style={style.passwordContainer} onPress={handleShowPassword}>
                <Image
                  source={showPassword ? icon.CloseEye : icon.OpenEye}
                  alt='eye'
                  style = {style.passwordIcon}
                />
              </TouchableOpacity>
              <TextInput
                placeholder='Enter Password'
                value={password}
                onChangeText={handlePassword}
                style = {style.passwordInput}
                secureTextEntry ={showPassword}
              />
            </View>
              <TouchableOpacity style = {style.forgotContainer}>
              <Text style = {style.forgotText} onPress={() =>{navigation.navigate('ForgotPassword')}}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style = { style.loginBtn}
                onPress={()=>{
                    handleSubmit()
                  }}
                >
                <Text style = {{textAlign: 'center', color: 'black', fontWeight: 'bold'}} >LOGIN</Text>
              </TouchableOpacity>
              <Text style = {{marginLeft: '20%', marginTop: 30}}>
                Don't have an account ?
                    <Text style = {{color: 'blue', marginLeft: 10}} onPress={()=>{navigation.navigate('SignUp')}} >  SignUp</Text>
              </Text>
         </View>

      
        </>
       }
     </View>
  )
}

export default LoginScreen

const style = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'visible'
   },
   imageContainer: {
     width: 550,
     height: 430,
     backgroundColor: 'red',
     borderRadius: 500,
     position: 'absolute',
     top: -150,
     overflow: 'hidden',
     borderColor: 'transparent'
   },
   image: {
     width: '100%',
     height: '100%',
     objectFit: 'cover',
   },
   
   //form style
 loginContainer: {
    width: '83%',
    height: 'auto',
    backgroundColor: 'transparent',
    marginTop: 150,
    padding: 12,
    borderRadius: 15,
    zIndex: 2
  },
  title: {
     fontSize: 30,
     fontWeight: 'bold'
  },
  userLabel: {
     fontSize: 15,
     fontWeight: 'bold',
     marginTop: 30
  },
  userInput: {
    borderColor: 'black',
    height: 60,
    width: '100%',
    marginTop: 5,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 1
  },
  passwordLabel: {
    fontSize: 15,
     fontWeight: 'bold',
     marginTop: 15
  },
  passwordContainer: {
     zIndex: 2,
     width: 40,
     height: 43,
     paddingLeft: 5,
     paddingTop: 7,
     position: 'absolute',
     top: 10,
     right: 5
  },
  passwordIcon: {
    height: 30,
    width: 30,
  },
  passwordInput: { 
    borderColor: 'black',
    height: 60,
    width: '100%',
    marginTop: 5,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5
  },
  forgotContainer: {
     marginTop: 10,
     marginBottom: 30,
     marginLeft: 200
  },
  forgotText: {
     color: 'blue'
  },
  loginBtn: {
     borderRadius: 70,
     width: 140,
     height: 50,
     backgroundColor: 'gray',
     paddingTop: 15,
     paddingBottom: 10,
     marginLeft: '27%',
     marginTop: '10%'
  },
  loadingIndicator: {
    marginBottom: 20, // Add some margin to separate the loading indicator from the button
  },
  loginBackground: {
     width: '100%',
     position: 'absolute',
     height: '100%'
  }
})