import React from 'react'
import { Image, Linking, Text, TouchableOpacity } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { background, icon } from '../../constants'
import { useSelector } from 'react-redux'

const UserScreen = ({navigation}) => {
  const {userCredentials} = useSelector(state => state.universal)
  return (
     <View style={styles.container}>
        <View style={styles.userBackground}>
           <View style = {styles.controlContainer}>
              <TouchableOpacity style = {{position: 'absolute', left: 10}} onPress={()=>{
                 navigation.navigate('Main')
              }}>
                <Image style= {styles.controlIcon}  source={icon.WhiteLArrow} alt=''/>
              </TouchableOpacity>
              <Text style = {styles.controlText}>Profile</Text>
           </View>
           {
               
                 <View style = {styles.userInfoContainer}>
                    <Image
                       source = {icon.DummyProfile}
                       alt = 'user'
                       style = {styles.userIcon}
                    />
                   <Text style = {{fontWeight: 'bold', fontSize : 25}}>Rejhane Graciadas</Text>
                     <View style = {styles.grayLine}></View>
                    <Text style={{width:250, color: 'gray', lineHeight: 20, marginTop: 20}}>"Navigation in Life is like using GPS - set your destination, trust your instincts , and enjoy the detours along the way"</Text>
                 </View>

             }
           <View style = {styles.personalInfoContainer}>
              <Text style = {styles.personalInfoText}>Personal Info</Text>
             <View style = {styles.perSubInfoContainer}>
                 <Image
                   source={icon.Mail}
                   alt='img'
                   style = {styles.perInfoIcon}
                 />
                 <Text style = {{color:'gray' , fontSize:17}}>Email</Text>
                 <Text style = {{fontSize:17 , fontWeight: 'bold'}}> dummy@hotmail.com</Text>
              </View>
             <View style = {[styles.perSubInfoContainer,{
                borderTopRightRadius:0,
                borderTopLeftRadius:0,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }]}>
                 <Image
                   source={icon.Phone}
                   alt='img'
                   style = {styles.perInfoIcon}
                 />
                 <Text style = {{color:'gray' , fontSize:17}}>Phone</Text>
                 <Text style = {{fontSize:17 , fontWeight: 'bold', marginLeft: 55}}> 09648614432</Text>
              </View>
           </View>
           <View style = {styles.utilitiesContainer}>
               <Text style = {styles.utilitiesText}>Utilities</Text>
               <TouchableOpacity style={styles.utilitiesBtnContainer} onPress={()=>{
                      Linking.openURL("mailto: karmaakubane@gmail.com")
               }}>
                  <Image
                    source ={icon.Question}
                    alt = 'ad'
                    style = {styles.utilitiesIcon}
                  />
                  <Text style = {{color:'gray' , fontSize:17 , marginRight: 140}}>Help</Text>
                  <Image
                    source = {icon.CarretNext}
                    alt = 'ads'
                    style = {styles.utilitiesIcon2}
                  />
               </TouchableOpacity>
               <TouchableOpacity style={[styles.utilitiesBtnContainer,{
                     borderTopRightRadius:0,
                     borderTopLeftRadius:0,
               }]} onPress={()=>{
                   navigation.navigate('UserDetail')
               }}>
                  <Image
                    source ={icon.UserProf}
                    alt = 'ad'
                    style = {styles.utilitiesIcon}
                  />
                  <Text style = {{color:'gray' , fontSize:17 , marginRight: 90}}>Profile Detail</Text>
                  <Image
                    source = {icon.CarretNext}
                    alt = 'ads'
                    style = {styles.utilitiesIcon2}
                  />
               </TouchableOpacity>
               <TouchableOpacity style={[styles.utilitiesBtnContainer,{
                     borderTopRightRadius:0,
                     borderTopLeftRadius:0,
                     borderBottomLeftRadius: 20,
                     borderBottomRightRadius: 20,
               }]} onPress={()=>{
                  navigation.navigate('Login')
               }}>
                  <Image
                    source ={icon.Logout}
                    alt = 'ad'
                    style = {styles.utilitiesIcon}
                  />
                  <Text style = {{
                      color:'gray' , 
                      fontSize:17 , 
                      marginRight: 120
                      }}>Log Out</Text>
                  <Image
                    source = {icon.CarretNext}
                    alt = 'ads'
                    style = {styles.utilitiesIcon2}
                  />
               </TouchableOpacity>
           </View>
        </View>
     </View>
  )
}

const styles = StyleSheet.create({
   container : {
     flex: 1,
     backgroundColor :'whitesmoke',
   },
   userBackground: {
      width: '100%',
      height: 250,
      backgroundColor: '#1E90FF',
      position: 'absolute',
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      zIndex: 1,
      top: 0
   },
   controlContainer:{
      width: '100%',
      height: 50,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 30,
     },
   controlIcon: {
     height:20,
     width: 20,
   },
   controlText: {
     fontSize: 20,
     fontWeight: 'bold',
     color: 'white'
   },
   userInfoContainer: {
     width: '90%',
     height: 280,
     backgroundColor: 'white',
     marginLeft: 20,
     marginRight: 20,
     marginTop: 100,
     paddingTop: 20,
     borderRadius: 15,
     shadowColor: 'black',
     shadowOffset: {width: 10 , height: 15},
     shadowOpacity: 10,
     shadowRadius: 5,
     display: 'flex',
     alignItems: 'center',
     gap: 10
   },
   userIcon: {
     width: 70,
     height: 70,
     borderRadius: 100
   },
   grayLine: {
     height: 1,
     width: '80%',
     backgroundColor: 'lightgray',
     marginTop: 20
   },
   personalInfoContainer:{
     width: '90%',
     height: 210,
     marginLeft: 20,
     marginRight: 20,
     gap: 5
   },
   perSubInfoContainer:{
    width: '100%',
    height: 65,
    backgroundColor: '#ececec',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
   },
   personalInfoText:{
     fontSize: 19,
     fontWeight: 'bold',
     marginBottom: 10,
     marginTop: 15
   },
   perInfoIcon:{
     width: 25,
     height: 25
   },
   utilitiesContainer: {
    width: '90%',
    height: 280,
    marginLeft: 20,
    marginRight: 20,
    gap: 5
   },
   utilitiesText: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
   },
   utilitiesBtnContainer: {
    width: '100%',
    height: 65,
    backgroundColor: '#ececec',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
   },
   utilitiesIcon:{
     height: 25,
     width: 25
   },
   utilitiesIcon2:{
    height: 20,
    width: 20
   }
})
export default UserScreen
