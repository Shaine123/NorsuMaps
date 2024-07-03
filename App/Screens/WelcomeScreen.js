import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SIZES, background } from '../../constants'

const WelcomeScreen = ({navigation}) => {
  return (
    <View style = {styles.container}>
       <ImageBackground
         source={background.MainBG}
         style = {styles.imageContainer}
       />
       <View style = {styles.content}>
           <TouchableOpacity 
             style = {styles.signUpBtn}
             onPress={()=>{navigation.navigate('SignUp')}}
            >
             <Text style ={{color: 'white', fontSize: 20, textAlign: 'center'}}>Sign Up</Text>
           </TouchableOpacity>
           <TouchableOpacity 
             style = {styles.loginBtn}
             onPress={()=>{navigation.navigate('Login')}}
             >
             <Text  style ={{color: 'white', fontSize: 20, textAlign: 'center'}} >Log In</Text>
           </TouchableOpacity>
       </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: 'white',
       alignItems: 'center',
       justifyContent: 'center',
    },
    imageContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0
    },
    content: {
       marginTop: 500,
       justifyContent: 'center',
       alignItems: 'center'
    },
    subText: {
      fontSize: SIZES.medium,
      color: 'gray'
    },
    mainText: {
       fontSize: SIZES.xxLarge,
       fontWeight: 'bold'
    },
    signUpBtn: { 
      backgroundColor: '#E5C408',
      width: 160,
      height: 45,
      paddingTop: 7,
      paddingBottom: 10,
      borderRadius: 20,
      marginBottom: 12,
      marginTop: 30
    },
    loginBtn: { 
      backgroundColor: '#E5C408',
      width: 160,
      height: 45,
      paddingTop: 7,
      paddingBottom: 10,
      borderRadius: 20
    }

})