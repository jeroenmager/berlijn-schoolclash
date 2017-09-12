import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  button,
  Navigator
} from 'react-native';      //Import components for this file.

var HomeScreen = require('./app/HomeScreen')
var Maps = require('./app/Maps')
var Results = require('./app/Results')
var Settings = require('./app/Settings')        //Require other files in this file.
var CameraPage = require('./app/CameraPage')        //Require other files in this file.

class NavigateFiles extends Component {

    render() {
        return (
            <Navigator
                initialRoute = {{
                    id: 'HomeScreen',       // Navigate to initialRoute (HomeScreen)
                }}
                renderScene={
                  (route, navigator) => this.navigatorRenderScene(route, navigator)     //Navigate to the scene
                }

                configureScene={(route, routeStack) =>
                    Navigator.SceneConfigs.PushFromRight        //Navigate with PushFromRight animation
                    }
            />
        )
    }

    navigatorRenderScene(route, navigator) {
        _navigator = navigator;
        switch (route.id) {
            case 'HomeScreen':
                return(<HomeScreen navigator={navigator} title='HomeScreen' />);
            case 'Maps':
                return(<Maps navigator={navigator} title='Maps' />);
            case 'Results':
                return(<Results navigator={navigator} title='Results' data={route.data} />);
            case 'Settings':
                return(<Settings navigator={navigator} title='Settings' data={route.data} />);
            case 'CameraPage':
                return(<CameraPage navigator={navigator} title='CameraPage' data={route.data} />);      //Navigate to the file/page where the route.id is the same as the case
        }
    }
}




AppRegistry.registerComponent('SchoolClash', () => NavigateFiles);
