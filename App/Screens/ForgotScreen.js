import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { background } from '../../constants'
import axios from 'axios'

const ForgotScreen = () => {

  const [email,handleEmail] = useState('')
  const [newPassword,handleNewPassword] = useState('')
  const [userData,setUserData] = useState('')

  useEffect(() => {
    axios.get('https://backendnorsumaps.onrender.com/getAccount')
    .then((res) => {
     setUserData(res.data)
    })
  }, [])

  const handleSubmit = () => {
      const exist = userData.filter((item) => {
          return item.email == email
      })
      
      if(exist.length > 0) {
          axios.put('https://backendnorsumaps.onrender.com/updateUser', { 
            name: exist[0].name,
            email: exist[0].email,
            phone: exist[0].phone,
            verified: true,
            refImage: exist[0].refImage,
            studentid: exist[0].studentid,
            password: newPassword,
            id: exist[0]._id
          }).then(res => console.log(res))
          .catch(err => console.log(err))

          axios.post('https://backendnorsumaps.onrender.com/send-email', { 
            to: `${email}`,
            subject: 'Forgot Password',
            text: 'This is your New Password',
            html: `<div>
                  Congrats on changing your password!!
                  <br>
                  Email: ${email} 
                   <br>
                  NewPassword: ${newPassword}
                </div>`
          }).then(res => console.log(res))
          .catch(err => console.log(err))

      }
      handleEmail('')
      handleNewPassword('')

   }
  
  

  return (
     <View style = {styles.container}>
        <Image source = {background.SubBG} alt = 'main' style = {styles.mainBG}/>
          <View style={styles.formContainer}>
              <Text style = {styles.inputLabel}>Email</Text>
              <TextInput
                 placeholder='Enter Email'
                 value={email}
                 onChangeText={handleEmail}
                 style = {styles.input}
              />
               <Text style = {styles.inputLabel}>New Password</Text>
              <TextInput
                 placeholder='Enter Password'
                 value={newPassword}
                 onChangeText={handleNewPassword}
                 style = {styles.input}
              />
              <TouchableOpacity style = {styles.submitBtn} onPress={() => {handleSubmit()}}>
                 <Text style = {{color: 'white', textAlign: 'center'}}>Submit</Text>
              </TouchableOpacity>
          </View>
     </View>
  )
}

const styles = StyleSheet.create({
   container:{
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
   },
   mainBG: {
    position: 'absolute',
    width: '100%',
    height: '100%'
 },
 formContainer:{
    backgroundColor: 'white',
    padding: 30,
    height: 250,
    borderRadius: 10
 },
 inputLabel: {
   fontWeight: 'bold',
   fontSize: 15,
   marginBottom: 7,
   marginTop: 7
 },
 input:{
   backgroundColor: 'white',
   width: 250,
   height: 40,
   borderRadius: 7,
   paddingLeft: 20,
   borderWidth: 1,
   borderColor: 'black'
 },
 submitBtn:{
   backgroundColor: 'green',
   width: 100,
   padding: 7,
   borderRadius: 5,
   marginTop: 10,
   marginLeft: '25%'
 }
})
export default ForgotScreen
