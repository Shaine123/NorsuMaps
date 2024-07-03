import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('navigation.db')
//Create Table norsumap
const initiateDatabase = () => {
   db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS norsumap (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, StudentID INTEGER, Email TEXT, Phone INTEGER, Password Text);',
        [],
        () => {
          console.log('Table created successfully');
        },
        (_, error) => {
          console.error('Error creating table:', error);
        }
      )
   })
}
const initiateUserDatabase = () => {
   db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS norsumapusers (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, StudentID INTEGER, Email TEXT, Phone INTEGER, Password Text);',
        [],
        () => {
          console.log('Table created successfully');
        },
        (_, error) => {
          console.error('Error creating table:', error);
        }
      )
   })
}
const initiateUserDatabase2 = () => {
  db.transaction((tx) => {
     tx.executeSql(
       'CREATE TABLE IF NOT EXISTS norsumapusers2 (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, StudentID INTEGER, Email TEXT, Phone INTEGER, Password Text, Profile VARBINARY);',
       [],
       () => {
         console.log('Table New created successfully');
       },
       (_, error) => {
         console.error('Error creating table:', error);
       }
     )
  })
}
//Create Table norsudata
const initiateDatabase2 = () => {
   db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS norsudata (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Image TEXT, NumberOfRoom TEXT, RoomDetail TEXT, KEY Text, STATUS BOOLEAN, Map TEXT );',
        [],
        () => {
          console.log('Second Table created successfully');
        },
        (_, error) => {
          console.error('Error creating table:', error);
        }
      )
   })
}
const initiateLocationDatabase = () => {
   db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS norsudataloc (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Image TEXT, NumberOfRoom TEXT, RoomDetail TEXT, KEY Text, STATUS BOOLEAN, Map TEXT );',
        [],
        () => {
          console.log('Second Table created successfully');
        },
        (_, error) => {
          console.error('Error creating table:', error);
        }
      )
   })
}

//Insert data to table norsumap 
const addData = (Name, StudentID, Email, Phone, Password, Profile) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'INSERT INTO norsumapusers2 (Name, StudentID, Email, Phone, Password, Profile) VALUES (?, ?, ?, ?, ?, ?);',
        [Name, StudentID, Email, Phone, Password, Profile],
        (_, result) => {
          console.log('Data added successfully');
        },
        (_, error) => {
          console.error('Error adding data:', error);
        }
      );
    },
    null,
    null
  );
};

//Insert data to table norsudata
const addLocation = (Name, Image, NumberOfRoom, RoomDetail, Key, Status, Map) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'INSERT INTO norsudataloc (Name, Image, NumberOfRoom, RoomDetail, Key, Status, Map) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [Name, Image, NumberOfRoom, RoomDetail, Key, Status, Map],
        (_, result) => {
          console.log('Table2 Data added successfully');
        },
        (_, error) => {
          console.error('Error adding data:', error);
        }
      );
    },
    null,
    null
  );
};
const getData = callback => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM norsumapusers2;',
        [],
        (_, result) => {
          const rows = result.rows;
          const items = [];
          for (let i = 0; i < rows.length; i++) {
            items.push(rows.item(i));
          }
          callback(items);
        },
        (_, error) => {
          console.error('Error getting all items:', error);
        }
      );
    },
    null,
    null
  );
}
const getLocationData = callback => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM norsudataloc;',
        [],
        (_, result) => {
          const rows = result.rows;
          const items = [];
          for (let i = 0; i < rows.length; i++) {
            items.push(rows.item(i));
          }
          callback(items);
        },
        (_, error) => {
          console.error('Error getting all items:', error);
        }
      );
    },
    null,
    null
  );
}

const deleteAllValues = () => {
  db.transaction((tx) => {
    // Replace 'yourTableName' with the actual name of your table
    tx.executeSql('DELETE FROM norsudataloc;', [], (_, results) => {
      console.log('Rows deleted:', results.rowsAffected);
    },
    (error) => {
      console.error('Error deleting rows:', error);
    });
  });
};

const deleteAllValuesUser = () => {
  db.transaction((tx) => {
    // Replace 'yourTableName' with the actual name of your table
    tx.executeSql('DELETE FROM norsumapusers;', [], (_, results) => {
      console.log('Rows deleted:', results.rowsAffected);
    },
    (error) => {
      console.error('Error deleting rows:', error);
    });
  });
};

export {
          initiateDatabase,
          initiateDatabase2,
          initiateLocationDatabase,
          initiateUserDatabase,
          initiateUserDatabase2,
          addData,
          addLocation,
          getData,
          getLocationData,
          deleteAllValues,
          deleteAllValuesUser
        }