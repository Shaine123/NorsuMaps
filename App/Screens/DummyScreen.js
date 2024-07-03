import React from 'react'
import { StyleSheet, View , Text, Image} from 'react-native'

const DummyScreen = () => {

  const maps = [
      {
         id: 1,
         text: 'this is a building',
         uri: require('../../assets/icon/canteen1.png')
      }
  ]
  return (
     <View style = { styles.container}>
          {
              maps.map((item) => {
                  return (
                      <View>
                         <Text>{item.text}</Text>
                         <Image source={item.uri} alt = 'tet'/>
                      </View>
                  )
                  
              })
          }
     </View>
  )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
   }
})

export default DummyScreen
