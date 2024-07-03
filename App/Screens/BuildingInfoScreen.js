import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { background, icon } from '../../constants';
import { useSelector } from 'react-redux';
import { ZoomIn } from 'react-native-reanimated';
import axios from 'axios';

const BuildingInfoScreen = () => {
  const initialBuildings = [
    {
      name: "COLLEGE OF BUSINESS ADMINISTRATION (CBA) BUILDING",
      location: "Beside IT & Library Building",
      stories: 3,
      rooms: {
        floorone: ["CBA Faculty Room", "CBA 1 | Production Laboratory"],
        floortwo: ["CBA Faculty Room", "CBA 2"],
        floorthree: ["CBA 3", "CBA SG Office"]
      }
    },
    {
      name: "IT BUILDING & LIBRARY",
      location: "Beside CBA & AVR Building, Fronting Nursery",
      stories: 2,
      rooms: {
        floorone: ["Multimedia", "IT Office", "IT Faculty", "Stock Room", "IT101", "IT102", "IT103"],
        floortwo: ["LIBRARY"], 
        floorthree: []
      }
    },
    {
      name: "NURSERY AREA",
      location: "Fronting IT and Library Building",
      stories: 0,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "AVR",
      location: "Beside IT & Library Building, Fronting Nursery",
      stories: 1,
      rooms: {
        floorone: ["AVR"],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "GYMNASIUM",
      location: "Fronting Flagpole",
      stories: 1,
      rooms: {
        floorone: [
          "Office (Front-right wing)",
          "Comfort Rooms (Behind the Gym)",
          "Classroom (Behind the Gym)",
          "GAD Office (Behind the Gym)",
          "Classroom (Behind the Gym)",
          "Changing Room (Behind the Gym Stage)"
        ],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "GAD OFFICE",
      location: "Behind the Gym",
      stories: 0,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "ELECTRICAL POWER CENTER",
      location: "Beside Nursery, Fronting School Gymnasium",
      stories: 1,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "CANTEEN",
      location: "Beside CTED Building",
      stories: 1,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "COLLEGE OF TEACHER EDUCATION (CTED) BUILDING",
      location: "Beside Canteen",
      stories: 1,
      rooms: {
        floorone: [
          "CTED Faculty Room",
          "CED 01",
          "CED 02",
          "CED 03",
          "CED 04",
          "CTED SG Office",
          "Classroom"
        ],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "CARE CENTER",
      location: "Fronting CTED Building, Beside SAS Office",
      stories: 0,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "STUDENT AFFAIR SERVICES OFFICE (SAS)",
      location: "Fronting CED Building, Beside CARE Center",
      stories: 0,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "OFFICE OF THE CAMPUS ADMINISTRATOR",
      location: "Fronting Amphitheater, Behind CARE Center and SAS Office",
      stories: 0,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "CLASSROOM BUILDING 1",
      location: "Behind CAF Building, Fronting CARE Center",
      stories: 1,
      rooms: {
        floorone: [
          "CED 6/CBA 5",
          "CED 7/CBA 6"
        ],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "CLASSROOM BUILDING 2",
      location: "Behind CAF Building, Beside Classroom Building 1",
      stories: 1,
      rooms: {
        floorone: [
          "CED 08",
          "CED 09"
        ],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "CLASSROOM BUILDING 3",
      location: "Behind CAF Building, Fronting Amphitheater",
      stories: 1,
      rooms: {
        floorone: [
          "Office of the Assistant Campus Administrator",
          "CED 10",
          "Classroom",
          "Classroom"
        ],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "OFFICE OF THE ASST. CAMPUS ADMINISTRATOR",
      location: "Classroom Building 3",
      stories: 0,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "CLASSROOM BUILDING 4",
      location: "Beside Classroom Building 3 and Accreditation Room - Phase 2",
      stories: 1,
      rooms: {
        floorone: [
          "Classroom",
          "Classroom"
        ],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "ACCREDITATION ROOM (PHASE 2) (Under-construction)",
      location: "Behind Accreditation Room, Beside Classroom Building 4 and CAS SG Office",
      stories: 0,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "CAS SG OFFICE",
      location: "Beside Accreditation Room (Phase 2)",
      stories: 0,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "CLASSROOM BUILDING 5",
      location: "Behind CAS SG Office",
      stories: 1,
      rooms: {
        floorone: [
          "Classroom"
        ],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "OLD RESEARCH & EXTENSION OFFICE",
      location: "Behind the Office of the University President",
      stories: 0,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "OFFICE OF THE UNIVERSITY PRESIDENT",
      location: "Beside Accreditation Room",
      stories: 0,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "ACCREDITATION ROOM",
      location: "Beside Clinic & Office of the University President",
      stories: 0,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "CAMPUS CLINIC",
      location: "Beside Accreditation Room",
      stories: 0,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "COLLEGE OF AGRICULTURE AND FORESTRY (CAF)",
      location: "Near Canteen & CED Building",
      stories: 2,
      rooms: {
        floorone: [
          "CAF 1",
          "CAF 2",
          "CAF Faculty Room 1",
          "CAF Faculty Room 2",
          "CAF SG Office"
        ],
        floortwo: [
          "Animal Science Laboratory",
          "CAF 6",
          "CAF 7 | Crop Science Laboratory",
          "CAF 8 | Crop Protection Laboratory"
        ],
        floorthree: []
      }
    },
    {
      name: "BUILDING 1",
      location: "Beside Entrance Gate",
      stories: 2,
      rooms: {
        floorone: ["USMO (University Security Management Office)", "Registrar Office", "Accounting Office", "Cashier"],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "ACADEMIC BUILDING",
      location: "Fronting Ballfield",
      stories: 2,
      rooms: {
        floorone: ["Wet Laboratory | Chemistry Room", "Dry Laboratory | Chemistry Room", "Biology | Laboratory Room", "Office of the Campus Research Director"],
        floortwo: ["CBA 4", "Edutech Room", "Crime | Laboratory Room", "Moot Court"],
        floorthree: []
      }
    },
    {
      name: "CCJE FACULTY",
      location: "Fronting Ballfield",
      stories: 1,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "SUPPLY & PROPERTY MGT. OFFICE",
      location: "Fronting CIT & CCJE Classrooms, Near CCJE Faculty",
      stories: 1,
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "CIT & CCJE BUILDING",
      location: "Fronting Supply and Property Mgt, Office, Behind Ballfield Stage",
      stories: 1,
      rooms: {
        floorone: ["CIT 07 | Electrical Technology", "CIT 06 | Electrical Technology", "Stock Room", "CIT 05 | Electrical Technology", "CCJE 03", "CIT SG Office", "CCJE 02", "CCJE 01"],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name: "BALLFIELD",
      location: "Fronting Academic Building, behind CIT & CCJE classrooms.",
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
     {
      name : "COLLEGE OF ARTS AND SCIENCES (CAS) BUILDING",
      location: "",
      stories: 1,
      rooms: {
        floorone: ["CAS Faculty", "CAS 13", "CAS 14", "CAS 15", "CAS 16", "CAS 17"],
        floortwo: [],
        floorthree: []
      }
     },
     {
      name: "HR BUILDING",
      location: "Beside CAS Building, Near the Exit Gate",
      stories: 1,
      rooms: {
        floorone: ["HR Office", "CCJE SG Office", "SSG Office"],
        floortwo: [],
        floorthree: []
      }
    }, 
    {
      name: "STUDENT CENTER",
      location: "Fronting HR Office",
      rooms: {
        floorone: [],
        floortwo: [],
        floorthree: []
      }
    },
    {
      name:"COLLEGE OF INDUSTRIAL TECHNOLOGY (CIT) BUILDING" ,
      location: "Behind CAS Building",
      stories: 1,
      rooms: {
        floorone: ["CIT Faculty", "Computer Technology", "CIT 02", "Office", "Automotive Technology"],
        floortwo: [],
        floorthree: []
      }
    
    },
    {
      name:"CIT BUILDING 2",
        location: "Beside CIT Building & CAS 08",
        stories: 1,
        rooms: {
          floorone: ["CIT Laboratory (Automotive)", "Classroom", "Classroom", "Classroom"],
          floortwo: [],
          floorthree: []
        }
    
    },
    {
        name:"CAS BUILDING 2",
        location: "Near Ballfield & CAF Farm",
        stories: 1,
        rooms: {
          floorone: ["CAS 01", "CAS 02", "CAS 03", "CAS 04", "CAS 05", "CAS 06", "CAS 07", "CAS 08"],
          floortwo: [],
          floorthree: []
        }
    },
    {
        name: "BUILDING 2",
        location: "Near Exit Gate",
        stories: 1,
        rooms: {
          floorone: ["Office", "Office"],
          floortwo: [],
          floorthree: []
        }
    },
    {
        name : "ALUMNI OFFICE",
        location: "Near Exit Gate",
        stories: 1,
        rooms: {
          floorone: ["Alumni Office"],
          floortwo: [],
          floorthree: []
        }
    
    },
    {
        name: "AMPHITHEATER",
        location: "Fronting Office of the Campus Administrator",
        rooms: {
          floorone: [],
          floortwo: [],
          floorthree: []
        }
    
    },
    {
        name:"CAMPUS DORM",
        location: "Dormitory inside the Campus",
        rooms: {
          floorone: [],
          floortwo: [],
          floorthree: []
        }
      
    },
    {
        name:"NORSU ARENA",
        location: "Beside the NORSU-BSC Campus",
        rooms: {
          floorone: [],
          floortwo: [],
          floorthree: []
        }
    }
  ];


  const [buildings, setBuildings] = useState([]);
  const [search, setSearch] = useState('');
  const { buildingNew, currentUser } = useSelector(state => state.universal);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editBuilding, setEditBuilding] = useState(null);
  const [buildingDetails, setBuildingDetails] = useState({
    name: '',
    location: '',
    stories: '',
    rooms: {
      floorone: [''],
      floortwo: [''],
      floorthree: ['']
    }
  });

  useEffect(() => {
    axios.get('https://backendnorsumaps.onrender.com/getBuildingSearchInfo')
    .then((res) => {
      setBuildings(res.data)
    })
  },[])

  const searchBuilding = (input) => {
    const results = buildings.filter(building => {
      if (building.name.toLowerCase().includes(input.toLowerCase())) {
        return true;
      } else {
        const rooms = Object.values(building.rooms).flat();
        return rooms.some(room => room.toLowerCase().includes(input.toLowerCase()));
      }
    });

    return results.length === 0 ? [] : results;
  }

  const searchResults = searchBuilding(search);

  const handleEdit = (building) => {
    setIsEditing(true);
    setIsAdding(false);
    setEditBuilding(building);
    setBuildingDetails(building);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setIsEditing(false);
    setBuildingDetails({
      name: '',
      location: '',
      stories: '',
      rooms: {
        floorone: [''],
        floortwo: [''],
        floorthree: ['']
      }
    });  

    // initialBuildings.map((item) => {
    //   axios.post('https://backendnorsumaps.onrender.com/addBuildingSearchInfo',{
    //     buildingInfo: item
    //   })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
    // } )
  
  };

  const handleSave = () => {
    if (isEditing) {
      const updatedBuildings = buildings.map(b =>
        b.name === editBuilding.name ? buildingDetails : b
      );
      setBuildings(updatedBuildings);
      axios.put('https://backendnorsumaps.onrender.com/editBuildingSearchInfo',{
        buildingInfo: updatedBuildings
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))

    } else if (isAdding) {
      setBuildings([...buildings, buildingDetails]);
      axios.post('https://backendnorsumaps.onrender.com/addBuildingSearchInfo',{
            buildingInfo: buildingDetails
          })
          .then(res => console.log(res))
          .catch(err => console.log(err))
    }
    setIsEditing(false);
    setIsAdding(false);
    setEditBuilding(null);
    setBuildingDetails({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
    setEditBuilding(null);
    setBuildingDetails({});
  };

  const handleInputChange = (field, value) => {
    setBuildingDetails(prevDetails => ({
      ...prevDetails,
      [field]: value
    }));
  };

  const handleRoomChange = (floor, index, value) => {
    const newRooms = { ...buildingDetails.rooms };
    newRooms[floor][index] = value;
    setBuildingDetails(prevDetails => ({
      ...prevDetails,
      rooms: newRooms
    }));
  };

  const addRoom = (floor) => {
    setBuildingDetails(prevDetails => ({
      ...prevDetails,
      rooms: {
        ...prevDetails.rooms,
        [floor]: [...prevDetails.rooms[floor], '']
      }
    }));
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={background.SubBG} alt='sub' style={styles.subBG} />
      <ScrollView>
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <View style={styles.searchContainer}>
          <Image source={icon.SearchIcon} style={styles.searchIcon} alt='w' />
          <TextInput
            placeholder='Enter Search'
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>
        {
           currentUser == 'admin' ?
           <>
            <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Building</Text>
            </TouchableOpacity>
           </>
           : ''
        }
       

        <ScrollView>
          {search !== '' ? 
            searchResults.map((item) => (
              <View key={item.name} style={styles.buildingInfoCard}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.name}</Text>
                <Text style={{ marginLeft: 15 }}>Location: {item.location}</Text>
                <Text style={{ marginLeft: 15 }}>{item.stories} Story Building</Text>
                <Text style={styles.subTitle}>First Floor:</Text>
                {item.rooms.floorone.map((room, index) => (
                  <Text key={index}>{room}</Text>
                ))}
                <Text style={styles.subTitle}>Second Floor:</Text>
                {item.rooms.floortwo.map((room, index) => (
                  <Text key={index}>{room}</Text>
                ))}
                <Text style={styles.subTitle}>Third Floor:</Text>
                {item.rooms.floorthree.map((room, index) => (
                  <Text key={index}>{room}</Text>
                ))}
                {
                   currentUser == 'admin' ? 
                   <>
                    <TouchableOpacity onPress={() => handleEdit(item)}>
                      <Text style={styles.editButton}>Edit</Text>
                    </TouchableOpacity>
                   </>
                   : ''
                }
              </View>
            ))
            : 
            buildings.map((item) => (
              <View key={item.name} style={styles.buildingInfoCard}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.name}</Text>
                <Text style={{ marginLeft: 15 }}>Location: {item.location}</Text>
                <Text style={{ marginLeft: 15 }}>{item.stories} Story Building</Text>
                <Text style={styles.subTitle}>First Floor:</Text>
                {item.rooms.floorone.map((room, index) => (
                  <Text key={index}>{room}</Text>
                ))}
                <Text style={styles.subTitle}>Second Floor:</Text>
                {item.rooms.floortwo.map((room, index) => (
                  <Text key={index}>{room}</Text>
                ))}
                <Text style={styles.subTitle}>Third Floor:</Text>
                {item.rooms.floorthree.map((room, index) => (
                  <Text key={index}>{room}</Text>
                ))}
                {
                   currentUser == 'admin' ? 
                   <>
                    <TouchableOpacity onPress={() => handleEdit(item)}>
                      <Text style={styles.editButton}>Edit</Text>
                    </TouchableOpacity>
                   </>
                   : ''
                }
        
              </View>
            ))
          }
        </ScrollView>

        {(isEditing || isAdding) && (
          <View style={styles.editModal}>
            <Text style={styles.modalTitle}>{isEditing ? 'Edit Building Info' : 'Add Building Info'}</Text>
            <TextInput
              placeholder="Building Name"
              value={buildingDetails.name}
              onChangeText={(text) => handleInputChange('name', text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Location"
              value={buildingDetails.location}
              onChangeText={(text) => handleInputChange('location', text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Stories"
              value={buildingDetails.stories.toString()}
              onChangeText={(text) => handleInputChange('stories', text)}
              style={styles.input}
            />
            <Text style={styles.subTitle}>First Floor Rooms:</Text>
            {buildingDetails.rooms.floorone.map((room, index) => (
              <TextInput
                key={index}
                value={room}
                onChangeText={(text) => handleRoomChange('floorone', index, text)}
                style={styles.input}
              />
            ))}
            <TouchableOpacity onPress={() => addRoom('floorone')} style={styles.addRoomButton}>
              <Text style={styles.addRoomButtonText}>Add Room</Text>
            </TouchableOpacity>
            <Text style={styles.subTitle}>Second Floor Rooms:</Text>
            {buildingDetails.rooms.floortwo.map((room, index) => (
              <TextInput
                key={index}
                value={room}
                onChangeText={(text) => handleRoomChange('floortwo', index, text)}
                style={styles.input}
              />
            ))}
            <TouchableOpacity onPress={() => addRoom('floortwo')} style={styles.addRoomButton}>
              <Text style={styles.addRoomButtonText}>Add Room</Text>
            </TouchableOpacity>
            <Text style={styles.subTitle}>Third Floor Rooms:</Text>
            {buildingDetails.rooms.floorthree.map((room, index) => (
              <TextInput
                key={index}
                value={room}
                onChangeText={(text) => handleRoomChange('floorthree', index, text)}
                style={styles.input}
              />
            ))}
            <TouchableOpacity onPress={() => addRoom('floorthree')} style={styles.addRoomButton}>
              <Text style={styles.addRoomButtonText}>Add Room</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  subBG: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    marginTop: 20
  },
  searchIcon: {
    marginRight: 10,
    height: 25,
    width: 25,
    position: 'absolute',
    marginLeft: 10,
    zIndex: 2
  },
  searchInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    paddingLeft: 50
  },
  buildingInfoCard: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  subTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  editButton: {
    color: 'blue',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addRoomButton: {
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  addRoomButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editModal: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    color: 'green',
    marginTop: 10,
  },
  cancelButton: {
    color: 'red',
    marginTop: 10,
  },
};

export default BuildingInfoScreen;
