import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity , KeyboardAvoidingView, Image} from 'react-native'
import { SIZES, background, icon } from '../../constants'
import { addData } from '../../database/database'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { newAccount } from '../../state/universalSlice'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { RNS3 } from 'react-native-aws3';


const S3_BUCKET = 'norsubucket';
const REGION = 'Asia Pacific (Sydney) ap-southeast-2';
const ACCESS_KEY = 'AKIA47CR3TMFHOHRTGKEr';
const SECRET_KEY = 'jp3cIpl+2/OM2FnieYVmT7mGgP/JSoBwTxWRYQUM';

const SignUpScreen = ({navigation}) => {


  const [name,handleName] = useState('')
  const [studentNumber,handleStudentNumber] = useState('')
  const [password,handlePassword] = useState('')
  const [email,handleEmail] = useState('')
  const [phone,handlePhone] = useState('')
  const [selectedItem, setSelectedItem] = useState('Is there Any Rooms?');
  const [isOpen, setIsOpen] = useState(false); // State to track whether dropdown is open or closed
  const [selectedValue, setSelectedValue] = useState(null); // State to track the selected value



  const [savedUri, setSavedUri] = useState('');
  const [upImageName,setUpImageName] = useState()
  // Define the data for the dropdown
  const dropdownData = [
    { label: 'Avatar1', value: 'avatar1', image: require('../../assets/icon/avatar1.png') },
    { label: 'Avatar2', value: 'avatar2', image: require('../../assets/icon/avatar2.png')},
    { label: 'Avatar3', value: 'avatar3', image: require('../../assets/icon/avatar3.png') },
    { label: 'Avatar4', value: 'avatar4', image: require('../../assets/icon/avatar4.png') },
  ];

  const [test,setTest] = useState()
   const dispatch = useDispatch()
  const handleSubmit = () => {

    
    // axios.post('https://backendnorsumaps.onrender.com/register', {
    //   name: name,
    //   email: email,
    //   phone: phone,
    //   studentid: studentNumber,
    //   password: password,
    //   refImage: savedUri,
    //   fileName: upImageName,
    //   verified: false,
    // }).then(res => console.log(res))
    // .catch(err => console.log(err))

    // console.log('work')
   dispatch(newAccount({
    name: name,
      email: email,
      phone: phone,
      studentid: studentNumber,
      password: password
   }))
    
  }

  const [imagePaths, setImagePaths] = useState([]);
  const [upImage,setUpImage] = useState()

  const [selectedImagePath, setSelectedImagePath] = useState(null);

  const addImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setUpImage(result.assets[0].uri)
        // console.log(result)
        setSelectedImagePath(result.assets[0].uri);
        setImagePaths([...imagePaths, result.uri]);
        saveImage(result.assets[0].uri)
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const encryptPassword = (pwd) => {
    const shift = 3; // Example shift for Caesar Cipher
    const encryptedArray = pwd.split('').map((char) => {
      const charCode = char.charCodeAt(0);
      // Encrypt only letters (example using a Caesar Cipher-like shift)
      if (charCode >= 65 && charCode <= 90) { // Uppercase A-Z
        return String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) { // Lowercase a-z
        return String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
      }
      return char; // Non-letter characters remain the same
    });
    return encryptedArray.join('');
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
      const res = await axios.post('https://backendnorsumaps.onrender.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUpImageName(res.data.file.filename)
      axios.post('https://backendnorsumaps.onrender.com/register', {
        name: name,
        email: email,
        phone: phone,
        studentid: studentNumber,
        password: encryptPassword(password),
        refImage: savedUri,
        fileName: res.data.file.filename,
        verified: false,
      }).then(res => console.log(res))
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

const [isDropdownVisible, setDropdownVisible] = useState(false);

const toggleDropdown = () => {
  setDropdownVisible(!isDropdownVisible);
};

  return (
    <KeyboardAvoidingView style= {{flex: 1}}>
     <View style = {styles.container}>
      <Image source = {background.SubBG} alt = 'main' style = {styles.mainBG}/>
      <View style = {styles.formContainer}>
         <Text style = {styles.title}>Sign Up</Text>
         <View style = {{flexDirection: 'row', gap: 5}}>
         <Text style = {{fontSize: SIZES.medium}}>
            Already have an account? 
          </Text>
          <Text 
             style = {{color:'blue', marginTop: 2}}
             onPress={()=>{navigation.navigate('Login')}}
             >
                  Login
            </Text>
         </View>
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
          <Text style = {styles.passwordLabel}>Load Slip</Text>
          <TouchableOpacity style = {styles.passwordInput} onPress={() => {addImage()}}>
              <Text style = {{color: 'lightgray', marginTop: 9}}>
                 {
                    savedUri !== '' ? 
                    <Text style = {{color: 'black' }}>{'Image Saved'}</Text>
                    : 'Insert LoadSlip Image'
                 }
              </Text>
          </TouchableOpacity> 

     {/* <Text style = {styles.passwordLabel}>Avatar</Text> */}
             {/* <View style={styles.container2}>
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
               </View> */}

         <TouchableOpacity 
          style = {styles.signUpBtn}
          onPress={()=>{
              handleSubmit()
              uploadImage()
              navigation.navigate('Login')
            }}
          >
           <Text style = {{color: 'black', textAlign: 'center'}} >Sign Up</Text>
         </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>
   
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
   container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   title: { 
     fontSize: SIZES.xxLarge,
     fontWeight: 'bold'
   },
   nameLabel: {
     fontSize: SIZES.medium,
     marginTop: 20,
     marginBottom: 7
   },
   formContainer : {
     width: '87%',
     marginBottom: 80,
     backgroundColor: 'white',
     paddingLeft: 15,
     paddingRight: 15,
     paddingTop: 30,
     paddingBottom: 20,
     borderRadius: 15
   },
   nameInput: {
     height: 50,
     width: '100%',
     borderColor: 'black',
     borderWidth: 1,
     paddingLeft: 15
   },
   studentNumberLabel: {
    fontSize: SIZES.medium,
    marginTop: 15,
    marginBottom: 7
   },
   studentNumberInput: {
    height: 50,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 15
   },
   passwordLabel: {
    fontSize: SIZES.medium,
    marginTop: 15,
    marginBottom: 7
   },
   passwordInput: {
    height: 50,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 15
   },
   signUpBtn: {
     backgroundColor: 'gray',
     paddingTop: 10,
     paddingBottom: 10,
     borderRadius: 20,
     marginTop: 40
   },
   mainBG: {
      position: 'absolute',
      width: '100%',
      height: '100%'
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
})
