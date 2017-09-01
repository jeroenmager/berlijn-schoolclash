import React, {Component} from 'react';
import {
    View,
    Text,
    AppRegistry,
    StyleSheet,
    Navigator,
    Button,
    StatusBar,
    Alert,
    Switch,
    ToolbarAndroid,
    AsyncStorage,
} from 'react-native';      //Import components for this file.

var Settings = React.createClass({

    componentDidMount: function() {
        AsyncStorage.getItem("satelliteIsOn").then((value) => {
            this.setState({"satelliteIsOn": value  == 'On' ? true:false});      //Check if satelliteIsOn is enabled, if yes set to true, if not set to false
        }).done();
    },

    navigate(id) {
        this.props.navigator.pop({
            id,     //Navigates to previous page using a pop
        });
    },

    getInitialState() {
        return { };
    },

    backToHomeScreen: function() {
       this.navigate('HomeScreen')      // Navigate back to HomeScreen
    },

    render: function() {
        return(
            <View style={styles.container}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title="Settings"
                    titleColor="white"
                    navIcon={require('./img/back-icon-white@2x.android.png')}       //Icon back arrow
                    onIconClicked={() => {this.backToHomeScreen()}}                 //onPress navigate to HomeScreen
                />
                <StatusBar
                    backgroundColor="#2f6564"
                    barStyle="light-content"                                        //Bar on top of your mobile (The bar where you can find your battery percentage for example)
                />

                <View style={styles.setting1}>
                   <Text style={styles.text}>Enable Satelliteview </Text>
                   <Switch
                        style={styles.switch}
                        disabled={false}
                        onValueChange={(value) => {this.saveData(value ? 'On' : 'Off'); this.setState({satelliteIsOn: value})}}     //On value change, switch value from on to off (or off to on)
                        value={this.state.satelliteIsOn}                                                                            // Sets value
                        onTintColor="#32cd32"
                        thumbTintColor="white"
                        tintColor="#E53935"
                    />
                </View>

                <View style={styles.setting2}>
                   <Text style={styles.text}>Viration</Text>
                   <Switch
                        style={styles.switch}
                        disabled={false}
                        onValueChange={(value) => this.setState({vibrationIsOn: value})}        //This button is not working yet
                        value={this.state.vibrationIsOn}
                        onTintColor="#32cd32"
                        thumbTintColor="white"
                        tintColor="#E53935"
                    />
                </View>
        </View>
        );
    },

    saveData: function(value) {
        AsyncStorage.setItem("satelliteIsOn", value);       //Save the current value
        this.setState({"satelliteIsOn": value})             //Set state to satelliteIsOn with its current value
    }
});


const styles = StyleSheet.create({      //Styling (Camelcase)
  container: {
    flex: 1,
    backgroundColor: '#459695',
  },

   toolbar: {
     backgroundColor: '#397978',
     height: 56,
     alignSelf: 'stretch',
   },

   text: {
    fontWeight: "bold",
    color: "white",
    position: 'absolute',
    marginTop: 17,
    left: 20,
    fontSize: 18,
   },

   switch: {
    right: 20,
    marginTop: 17,
   },

   setting1: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "white",
   },

   setting2: {
      height: 56,
      borderBottomWidth: 1,
      borderBottomColor: "white",
   },

   setting3: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "white",
   },

});

module.exports = Settings;      //Export module to use this module in other files
AppRegistry.registerComponent('SchoolClash', () => Settings);