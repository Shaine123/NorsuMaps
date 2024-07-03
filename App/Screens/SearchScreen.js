import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { icon } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { MapDetail, alterSearch } from '../../state/universalSlice'

const SearchScreen = ({navigation}) => {
  const [search,handleSearch] = useState('')
  const dispatch = useDispatch()
  const {currentSearch,data} = useSelector(state => state.universal)
  const [searchData,setSearchData] = useState(data)

  //Pagination to check the location of the building the student intends to visit
  const searchResult = searchData.filter((item) => {
      return search.toLowerCase() !== '' ? item.Name.toLowerCase().includes(search.toLowerCase()) : currentSearch.toLowerCase() !== '' ? item.Name.toLowerCase().includes(currentSearch.toLowerCase()) : item
  })

  console.log(currentSearch)

  useEffect(()=>{
    if(search !== ''){
      dispatch(alterSearch())
    } 
  },[search])

  return (
    <View style = {styles.container}>
       <View style = {styles.searchContainer}>
       <Image style = {styles.searchIcon}source={icon.Magnifying} alt='mag'/>
       <TextInput
          placeholder='Search'
          value={search !== '' ?  search : currentSearch}
          onChangeText={handleSearch}
          style = {styles.search}
       
        />
       </View>
       <FlatList
          data={searchResult}
          renderItem={({item})=>(
            <View style = {styles.buildingCard}>
              <TouchableOpacity onPress={()=>{
                 dispatch(MapDetail({
                  name: item.Name ,
                  image: item.Image,
                  key: item.KEY,
                  status: item.STATUS ,
                  map: item.Map
                }))
                 navigation.navigate('MapDetail')
                 }}>
                <Image
                  source={item.Image}
                  alt={item.KEY}
                  style = {styles.buildingImage}
                />
              </TouchableOpacity>
              <Text style = {styles.buildingText}>{item.Name}</Text>
              <View style = {styles.bottomColor}></View>
            </View>
          )}
          extraData={search}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15
  },
  search: {
    height: 55,
    width: '100%',
    backgroundColor: '#E8E9EB',
    borderRadius: 5,
    paddingLeft: 60,
    fontSize: 18
  },
  searchContainer: {
    position: 'relative',
    marginTop: 30,
    marginBottom: 20
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 2,
    height: 40,
    width: 40,
    marginTop: 7,
    marginLeft: 10
  },
  buildingCard: {
   borderColor: '#D3D3D3',
   borderWidth: 1,
   height: 320,
   marginTop: 5,
   marginBottom: 5,
   borderRadius: 10,
   padding: 10,
   position: 'relative',
   overflow: 'hidden'
  },
  buildingImage:{
    height: 230,
    width: 360,
    borderRadius: 10
  },
  buildingText: {
     fontWeight: 'bold',
     fontSize: 25,
     marginTop: 5
  },
  bottomColor: { 
     position: 'absolute',
     height: 5,
     width: 500,
     backgroundColor: '#1E90FF',
     bottom: 0
  }
})

export default SearchScreen
