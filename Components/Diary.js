import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { db } from './dbconfig';
import { Input, Button, Icon, ListItem, CheckBox, Text } from '@rneui/themed';

export default function Diary() {
    const [med, setMed] = useState('');
    const [amount, setAmount] = useState('');
    const [items, setItems] = useState([{id: 1, amount: '1', med: 'Vitamin A', isChecked: false}]);

    useEffect(() => {
        // create list of vitamin -table
        db.transaction(tx => {
            tx.executeSql('create table if not exists items (id integer primary key not null, amount text, med text, checked integer);');
        }, null, updateList);
    }, []);

    // save a vitamin
    const saveItem = () => {
        if (amount && med) {
            db.transaction(tx => {
                tx.executeSql('insert into items (amount, med) values (?, ?);', [amount, med]);
            }, null, updateList)
        }
        else {
            Alert.alert("Warning", "Type amount and vitamin first")
        }
    }

    // update med list
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from items', [], (_, { rows }) => {
                const newItems = rows._array.map(item => ({ ...item, isChecked: false }));
                setItems(newItems);
                setAmount('');
                setMed('');
            });
        });
    }

    // delete item
    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql('delete from items where id = ?;', [id]);
        }, null, updateList);
    }

    const listSeparator = () => {
        return(
            <View style={{ height: 5, backgroundColor: "#fff", width: "80%", marginLeft: "10%" }} />
        );
    }

    return(
        <View style={styles.container}>
            <Text h4="true">Click the calendar to log completion</Text>
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
                                onPress={() => deleteItem(item.id)}
                            />
                        )}
                    >
                        <CheckBox
                            checked={item.isChecked}
                            onPress={() => {
                                const newItems = [...items];
                                const index = newItems.findIndex(i => i.id === item.id);
                                newItems[index].isChecked = !newItems[index].isChecked;
                                setItems(newItems);
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.med}</ListItem.Title>
                            <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem.Swipeable>
                }
                data={items}
                ItemSeparatorComponent={listSeparator}
            />
            <Button onPress={saveItem}>
                ADD
                <Icon name="add" color="white" style={{marginLeft: 10}} />
            </Button>
            <Input 
                placeholder='Vitamin'
                value={med}
                onChangeText={med => setMed(med)}
            />
            <Input 
                placeholder='Amount'
                value={amount}
                onChangeText={amount => setAmount(amount)}
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