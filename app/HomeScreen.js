import SplashScreen from 'react-native-splash-screen'
import TaskDescriptionAndroid from 'react-native-android-taskdescription'
import Form from 'react-native-form';
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
    TextInput,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';       //Import components for this file.

var HomeScreen = React.createClass({

    getInitialState() {
        return {
            isConnected: null,      //Create state isConnected with value null
            disabled: true,
            username: '',
            password: '',
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

     updatePassword(text) {
          this.setState({password: text});
          this.checkDisabled();
     },

      updateUsername(text) {
          this.setState({username: text});
          this.checkDisabled();
      },

      checkDisabled() {
          if(this.state.username != '' && this.state.password != '') {
              this.setState({ disabled: false });
          } else {
              this.setState({ disabled: true });
          }
      },

    _handleConnectivityChange: function(isConnected) {
        this.setState({
            isConnected,        //If connection changes from true to false (or false to true) update the state
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

        function submit(values, connected, navigator) {
          if(connected) {
              values['action'] = 'login';
              console.log(values);
              var http = new XMLHttpRequest();
              var url = "http://cityclash.icthardenberg.nl/backend/login.php";
              var params = JSON.stringify(values);
              http.open("POST", url, true);
              //Send the proper header information along with the request
              http.setRequestHeader("Content-type", "application/json");
              http.onreadystatechange = function() {//Call a function when the state changes.
                  if(http.readyState == 4 && http.status == 200) {
                      var answer = http.responseText.split(",");
                      if(answer[12] == "true") {
                        var id = "Maps";
                        navigator.replace({id,});
                      } else if(answer[12] == "false") {
                       alert("De code komt niet overeen");
                      } else {
                        alert(http.responseText);
                      }
                  }
              }
              http.send(params);
          } else {
            Alert.alert('No internet!',
                    'Please check your connection');
          }
        }
        return(
            <View style={{flex: 1, backgroundColor: '#459695'}}>
             <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-250} style={{flexGrow: 1}}>
                <ScrollView>
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
                                style={{width: 300, height: 300, marginTop: 30}}
                                source={require('./img/logo.png')}
                            />
                        </View>
                        <Text style={styles.welcome}>
                            WELCOME TO{'\n'}
                            SCHOOLCLASH
                        </Text>


                        <Form ref="form">
                            <View>
                                <Text style={styles.instructions}>SchoolClash Code:</Text>
                                <TextInput type="TextInput" name="code" />
                                <Button
                                    onPress={() => {                                // onPress button Start
                                        submit(this.refs.form.getValues(), this.state.isConnected, this.props.navigator)
                                    }}
                                    title="Start"
                                    color="#E73C2A"
                                    accessibilityLabel="Start"
                                />
                            </View>
                        </Form>
                    </View>
                </ScrollView>
             </KeyboardAvoidingView>
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