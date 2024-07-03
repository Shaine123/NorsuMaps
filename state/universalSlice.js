import { createSlice } from "@reduxjs/toolkit";

const universalSlice = createSlice({
   name: 'universal',
   initialState: { 
      data: [],
      currentSearch: '',
      mapData: [],
      dbMainData : [],
      imageModal: false,
      newImage: '',
      userCredentials: '',
      currentUser: '',
      portrateOrientation: true,
      buildingNew: [],
      changeData: false,
      account: [{
         name: 'cj',
         studentid: 20200445,
         email: 'jhonwick@gmail.com',
         phone: '09411112',
         password: 'password'
      }]
   },
   reducers: {
      searchResult: (state,{payload}) => {
         state.data = payload.data
         state.currentSearch = payload.search
      },
      alterSearch: (state) => {
          state.currentSearch = ''
          console.log('wiped')
      },
      MapDetail: (state,{payload}) => {
          state.mapData = {   
            name: payload.name ,
            image: payload.image,
            key: payload.key,
            status: payload.status ,
            map: payload.map
         }
      },
      populateDatabase: (state,{payload})=>{
          state.dbMainData = payload.data
      },
      openImageModal: (state,{payload}) => {
          console.log(payload.status)
          state.imageModal = payload.status
      },
      saveNewImage: (state,{payload}) => {
          state.newImage = payload.photo
          console.log('photoReducer')
          console.log(payload.photo)
      },
      setUserCredentianls: (state, {payload}) => { 
          state.userCredentials = payload.userInfo
      },
      setCurrentUser: (state, {payload}) => {
         state.currentUser = payload.name
      },
      setPortrateOrientation: (state, {payload}) => {
          console.log('working')
          console.log(payload.status)
          state.portrateOrientation = payload.status
      },
      addNewBuilding: (state, {payload}) => {
          state.buildingNew = [{
              title: payload.title,
              floor: payload.floor,
              rooms: payload.rooms,
              ground: payload.ground,
              second: payload.second,
              third: payload.third,
              fourth: payload.fourth
          }]

          console.log('daad')
      },
      newAccount: (state,{payload}) => {
         state.account = [...state.account,{
              name: payload.name,
              studentid: payload.studentid,
              phone: payload.phone,
              email: payload.email,
              password: payload.password
         }]

         console.log(state.account)
      },
      setChangeData: (state) => {
           state.changeData = !state.changeData
      }
   }
})

export const {
   searchResult,
   alterSearch,
   MapDetail,
   populateDatabase,
   openImageModal,
   saveNewImage,
   setUserCredentianls,
   setPortrateOrientation,
   addNewBuilding,
   newAccount,
   setCurrentUser,
   setChangeData
} = universalSlice.actions


export default universalSlice.reducer