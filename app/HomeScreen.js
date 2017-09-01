import SplashScreen from 'react-native-splash-screen'
import TaskDescriptionAndroid from 'react-native-android-taskdescription'
import React, { Component } from 'react';
import {
    View,
    Text,
    AppRegistry,
    StyleSheet,
    Navigator,
    Button,
    StatusBar,
    Image,
    NetInfo,
    Alert,
    Vibration,
    TouchableHighlight,
    ToolbarAndroid,
} from 'react-native';       //Import components for this file.

var HomeScreen = React.createClass({

    getInitialState() {
        return {
            isConnected: null,      //Create state isConnected with value null
        };
    },

    componentDidMount: function() {
        SplashScreen.hide();        // If component is mounted, hide splashscreen (SplashScreen replaces the white screen with an image when app is launched).
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectivityChange
        );
        NetInfo.isConnected.fetch().done(
            (isConnected) => { this.setState({isConnected}); }      // If internet is connected, set the state isConnected.
        );
    },

    componentWillUnmount: function() {
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleConnectivityChange      //Removes the event listeners change and _handleConnectivityChange from isConnected
        );
    },

    _handleConnectivityChange: function(isConnected) {
        this.setState({
            isConnected,        //If connection changes from true to false (or false to true) update the state
        });
    },

    navigate(id) {
        this.props.navigator.replace({
            id,     //Replaces the page with page given
        });
    },

    navigateSettings(id) {
        this.props.navigator.push({
            id,     //Pushes (settings) page on top of current page
        });
    },

    checkConnection() {
        NetInfo.isConnected.fetch().then(isConnected => {
          if (isConnected) {
             return true;       //If connected to internet, return true
          };
        });
    },

    ifNotConnectedToWifi: function() {
        Vibration.vibrate();                        // If not connected, Vibrate + Alert
        Alert.alert(
            'ERROR!',
            'No internet connection.\nPlease try again.',
            [
                {text: 'RETRY',
                    onPress: () =>                  //onPress Retry
                    this.state.isConnected ?        //Is internet connected now?
                    this.navigate('Maps'):          //If Yes, Navigate to Maps
                    Alert.alert(                    //If No, Alert
                        'ERROR!',
                        'Still no internet connection.\nTry again later!',
                    )
                },
            ]
        )
    },

    render: function() {
        return(
            <View style={styles.container}>
                    <TouchableHighlight style={styles.locationSettings} onPress={() => { this.navigateSettings('Settings') }}>
                        <Image
                            style={styles.settingIcon}
                            source={require('./img/settings.png')}      //Settings Icon, onPress, navigate to settings page
                        />
                    </TouchableHighlight>
                <TaskDescriptionAndroid backgroundColor="#2f6564" label="SchoolClash" />
                <StatusBar
                    backgroundColor="#2f6564"
                    barStyle="light-content"        //Bar on top of your mobile (The bar where you can find your battery percentage for example)
                />
                <View>
                    <Image
                        style={{width: 300, height: 300, marginTop: 50}}
                        source={require('./img/logo.png')}
                    />
                </View>
                <Text style={styles.welcome}>
                    WELCOME TO{'\n'}
                    SCHOOLCLASH
                </Text>
                <Text style={styles.instructions}>
                    _______________
                </Text>
                <Text style={styles.instructions}>
                    Click on the button below{'\n'}
                    to start the tour.
                </Text>
                <Button
                    onPress={() => {                                // onPress button Start
                        this.state.isConnected ?                    // Is internet connected?
                        this.navigate('Maps'):                      // If Yes, Navigate to Maps
                        this.ifNotConnectedToWifi()                 // IF Not, call function ifNotConnectedToWifi
                    }}
                    title="Start"
                    color="#E73C2A"
                    accessibilityLabel="Start"
                />
          </View>
        );
    },
});


const styles = StyleSheet.create({      //Styling (Camelcase)
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#459695',
  },
  welcome: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    marginTop: 20,
    color: 'white',
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
    color: 'white',
  },

  locationSettings: {
    position: 'absolute',
    top: 20,
    right: 20,
  },

  settingIcon: {
    height: 35,
    width: 35,
  },
});

module.exports = HomeScreen;        //Export module to use this module in other files
AppRegistry.registerComponent('SchoolClash', () => HomeScreen);