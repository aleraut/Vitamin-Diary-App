import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { db } from './dbconfig';
import { Input, Button, Icon, ListItem } from '@rneui/themed';

export default function Calendar() {
    const [date,  setDate] = useState('');
    const [completes, setCompletes] = useState([]);

    useEffect(() => {
        // create list of completes -table
        db.transaction(tx => {
            tx.executeSql('create table if not exists completes (id integer primary key not null, date text);');
        }, null, updateList);
    }, []);

    // save a complete
    const saveComplete = () => {
        if (date) {
            db.transaction(tx => {
                tx.executeSql('insert into completes (date) values (?);', [date]);
            }, null, updateList)
        }
        else {
            Alert.alert("Warning", "Type date first")
        }
    }

    // update completes list
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from completes', [], (_, { rows }) => {
                setCompletes(rows._array);
                setDate('');
            });
        });
    }

    // Delete a complete
  const deleteComplete = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from completes where id = ?;', [id]);
      }, null, updateList);
  }

  const listSeparator = () => {
    return(
      <View style={{ height: 5, backgroundColor: "#fff", width: "80%", marginLeft: "10%" }} />
    );
  };

    return(
        <View style={styles.container}>
            <Button onPress={saveComplete}>
                LOG A COMPLETED DAY
                <Icon name="check" color="white" style={{marginLeft: 10}} />
            </Button>
            <Input 
                placeholder='Date (YYYY-MM-DD)'
                value={date}
                onChangeText={date => setDate(date)}
            />
            <FlatList 
                style={{marginLeft: "2%"}}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) =>
                    <ListItem.Swipeable
                        rightContent={(action) => (
                            <Button
                                containerStyle={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    backgroundColor: '#f4f4f4',
                                }}
                                type="clear"
                                icon={{ name: 'delete-outline' }}
                                onPress={() => deleteComplete(item.id)}
                            />
                        )}
                    >
                        <ListItem.Content>
                            <ListItem.Title>Vitamins taken</ListItem.Title>
                            <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem.Swipeable>
                }
                data={completes}
                ItemSeparatorComponent={listSeparator}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      flex: 1,
      backgroundColor: '#fff',
     },
     listcontainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center'
     },
  });