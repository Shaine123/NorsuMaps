import { Extrapolate } from '@shopify/react-native-skia'
import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import { StyleSheet, View , Text} from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 70
function BottomSheet() {
  const translateY = useSharedValue(0)
   console.log(SCREEN_HEIGHT)
  const context = useSharedValue({y : 0})

  const gesture = Gesture.Pan().onStart(() => {
      context.value = {y : translateY.value}
  }).onUpdate((event) => {
     translateY.value = event.translationY + context.value.y
     translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
  }).onEnd(() => {
     if(translateY.value > -SCREEN_HEIGHT / 3){
       translateY.value = withSpring(-SCREEN_HEIGHT / 6)
     }else if(translateY.value < -SCREEN_HEIGHT / 1.5){
      translateY.value = withSpring(MAX_TRANSLATE_Y)
     }
  })


  useEffect(() => {
     translateY.value = withSpring(-SCREEN_HEIGHT/6)
  }, [])
  const rBottomSheetStyle = useAnimatedStyle(() => {
     const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 70, MAX_TRANSLATE_Y],
      [25,5],
      Extrapolate.CLAMP
     )
       return {
          borderRadius,
          transform: [{translateY : withSpring(translateY.value)}]
       }
  })
  return (
    <GestureDetector gesture = {gesture}>    
      <Animated.View style = {[styles.bottomSheet, rBottomSheetStyle]}>
        <View style = {styles.line}/>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
   bottomSheet: {
     height: SCREEN_HEIGHT,
     width: '100%',
     backgroundColor: 'black', 
     position: 'absolute',
     top: SCREEN_HEIGHT,
     borderRadius: 25,
     zIndex: 2
   },
   line: {
     width: 75,
     height: 8,
     backgroundColor: 'white',
     borderRadius: 15,
     alignSelf: 'center',
     marginVertical: 15
   }
})

export default BottomSheet
