import Camera from 'react-native-camera';
import pick from 'lodash/pick';
import haversine from 'haversine';
import Form from 'react-native-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  StatusBar,
  Vibration,
  AsyncStorage
} = ReactNative;                                    //Import components for this file.

questions = fetch('http://cityclash.icthardenberg.nl/dev/app/data/questions.php?type=app')
  .then((response) => response.json())
  .then((responseJson) => {
    return questions = responseJson;
})
//var questions = require('http://83.162.251.15/schoolclash/questions.json');
var MapView = require('react-native-maps');         //Variable questions and MapView with require
var questionScreen = "empty";

var { width, height } = Dimensions.get('window');   // Gets width + height from the mobile screen
const ASPECT_RATIO = (width / height);

const LATITUDE = 52.570583;                         //Initial latitude Berlin
const LONGITUDE = 6.63493;                          //Initial longitude Berlin

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var CustomMap = React.createClass({
  getInitialState() {
    return {
      modalVisible: false,                      //No modal visible
      marker1: true,
      activeMarker: null,                       //No active markers
      activeButton: null,                       //No active buttons
      image: null,                              //No active image
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },

      locationActiveQuestion: 0,
      markers: [],
      givenAnswers: [],
      givenButton: [],
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      images: [],
      activeQuestions: []
    };
  },

  navigate(id, data) {
      this.props.navigator.replacePrevious({
          id,
          data,                         //Replaces initial route
      });
  },

  setModalVisible(visible) {
      this.setState({modalVisible: visible});       //Make modals visible
  },

  openQuestion(id) {
    this.setState({locationActiveQuestion: 0});
    var activeQuestion = [];
     for(var i = 0; i < questions.length; i++) {
     console.log(questions[i].Location_idLocation);
     console.log(id);
        if(questions[i].Location_idLocation == id) {
        console.log("hit");
            activeQuestion.push(questions[i]);
        }
     }
     this.setState({activeQuestions: activeQuestion})
     this.setModalVisible(true);                                    //Modal is visible
     this.setState({activeButton: this.state.givenButton[id]});     //Active button with appurtenant id
     var icon = questions[0].image;                                 //Retrieves appurtenant image from json
     this.state.images[id] = icon;                                  //Icon is this.state.images[id]
  },

    navQuestions(direction){
        if(direction == "next"){
            for(var i = 0; i < this.state.activeQuestions.length; i++) {
                console.log(this.state.activeQuestions[i]);
            }
                if(this.state.locationActiveQuestion < (this.state.activeQuestions.length - 1)) {
                    this.setState({locationActiveQuestion: this.state.locationActiveQuestion + 1});
                    this.answerType(this.state.activeQuestions[this.state.locationActiveQuestion].type);
                }else{
                    alert("dit was de laatste vraag")
                }

        }else if(direction == "back"){
            if(this.state.locationActiveQuestion > 0) {
                this.setState({locationActiveQuestion: (this.state.locationActiveQuestion - 1)});
                this.answerType(this.state.activeQuestions[this.state.locationActiveQuestion].type);
            }else{
                alert("dit is de eerste vraag")
            }
        }
    },


    saveAnswer(answer, button) {
    this.state.givenAnswers[this.state.activeMarker] = answer;      //Saves answer given on question
    this.state.givenButton[this.state.activeMarker] = button;       //Saves the button you pressed
    this.state.markers[this.state.activeMarker].color = 'green';    //Give the pressed button a green color
    this.setState({activeButton: null});                            //Deactivates button

    for(i = 0; i < questions.length; i++) {                                                                 //Iteration
        if (typeof this.state.givenAnswers[i] !== 'undefined' && this.state.givenAnswers[i] !== null) {
            if(questions.length == (i + 1)) {
                this.navigate('Results', this.state.givenAnswers);                                         //If all question have been answered, show results page
            }
        } else {
            break;
        }
    }
    setTimeout(() => {this.setModalVisible(!this.state.modalVisible)}, 100);
  },

  answerType: function(type) {
    if(type == "OpenQ") {
        return(
            <Form ref="form">
                <View>
                        <View>
                            <TextInput style={{width: 300}} type="TextInput" name="myTextInput" />
                        </View>
                </View>

            </Form>
        );
    } else if(type == "MultiQ") {
        return(
                <View>
             <View style={styles.buttonHolder}>
              <TouchableHighlight
                style={[styles.buttons, {backgroundColor: this.state.activeButton == "button1"? "#32cd32": "#2196F3"}]}     //button 1
                onPress={() => {this.saveAnswer(questions[this.state.activeMarker].answer1, "button1")}}                    //onPress button, save answer for button 1
              >
                <Text style={styles.buttonText}>{questions[this.state.activeMarker] != null? this.state.activeQuestions[this.state.locationActiveQuestion].answer1: "Undefined"}</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.buttonHolder}>
              <TouchableHighlight
                style={[styles.buttons, {backgroundColor: this.state.activeButton == "button2"? "#32cd32": "#2196F3"}]}     //button 2
                onPress={() => {this.saveAnswer(questions[this.state.activeMarker].answer2, "button2")}}                    //onPress button, save answer for button 2
              >
                <Text style={styles.buttonText}>{questions[this.state.activeMarker] != null? this.state.activeQuestions[this.state.locationActiveQuestion].answer2: "Undefined"}</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.buttonHolder}>
              <TouchableHighlight
                style={[styles.buttons, {backgroundColor: this.state.activeButton == "button3"? "#32cd32": "#2196F3"}]}     //button 3
                onPress={() => {this.saveAnswer(questions[this.state.activeMarker].answer3, "button3")}}                    //onPress button, save answer for button 3
              >
                <Text style={styles.buttonText}>{questions[this.state.activeMarker] != null? this.state.activeQuestions[this.state.locationActiveQuestion].answer3: "Undefined"}</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.buttonHolder}>
              <TouchableHighlight
                style={[styles.buttons, {backgroundColor: this.state.activeButton == "button4"? "#32cd32": "#2196F3"}]}     //button 4
                onPress={() => {this.saveAnswer(questions[this.state.activeMarker].answer4, "button4")}}                    //onPress button, save answer for button 4
              >
                <Text style={styles.buttonText}>{questions[this.state.activeMarker] != null? this.state.activeQuestions[this.state.locationActiveQuestion].answer4: "Undefined"}</Text>
              </TouchableHighlight>
            </View>
            </View>
        );
    } else if(type == "PicQ") {
        return(
        <TouchableOpacity
            style={styles.camButton}
            onPress={() => {
                this.navigate('CameraPage')
            }}
        >
            <Image source={require('./img/photo.png')} style={{width: 100, height: 100}} />
        </TouchableOpacity>
        );
    }


  },

  componentDidMount: function() {
    fetch('http://cityclash.icthardenberg.nl/dev/app/data/markers_s.php?type=app')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({markers: responseJson}) ;
    })

    try {
      AsyncStorage.getItem("satelliteIsOn").then((value) => {
          this.setState({"satelliteIsOn": value  == 'On' ? 'satellite':'terrain'});     //Check if satellite view is enabled in settings
      }).done();
    } catch (error) {
      alert(error);
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,                 //latitude is current latitude
            longitude: position.coords.longitude,               //Longitude is current longitude
            latitudeDelta: LATITUDE_DELTA,                      //latitudeDelta is current position.latitudeDelta
            longitudeDelta: LONGITUDE_DELTA                     //longitudeDelta is current position.longitudeDelta
          }
        });
      },
      (error) => alert(error.message),
//      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const newRegion = {
        latitude: position.coords.latitude,                  //Watches latitude
        longitude: position.coords.longitude,                //Watches longitude
        latitudeDelta: LATITUDE_DELTA,                       //Watches latitudeDelta
        longitudeDelta: LONGITUDE_DELTA                      //Watches longitudeDelta
      }

      const { routeCoordinates, distanceTravelled } = this.state                                        //Route distance traveled
      const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude}     //New latitude and longitude position
      const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])                          //Pick current position longitude and latitude

      this.setState({
        routeCoordinates: routeCoordinates.concat(positionLatLngs),                 //Concatenates latitude and longitude
        distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),       //Calculation for distance traveled
        prevLatLng: newLatLngs
      });

      this.onRegionChange(newRegion);
      this.onCheckMarker(newRegion);
    },
      (error) => alert(error.message),  {enableHighAccuracy: true, distanceFilter: 10, maximumAge: 500}
    );
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);     //Preventing geolocation from watching where user is whilst app is not used
    this._unsubcribeFromStore && this._unsubcribeFromStore();
    this._handleStateUpdate = () => {};
  },

  onRegionChange(region) {
    this.setState({ region });                          //If region changes, set new region
  },

  calcDistance(newLatLng) {
    const { prevLatLng } = this.state                   //Gets Latitude + longitude from previous position
    return (haversine(prevLatLng, newLatLng) || 0)      //Uses Haversine formula to calculate previous position and new position (adds this to distance traveled)
  },


  onCheckMarker(region) {
    for(i = 0; i < this.state.markers.length; i++) {                                                //Iteration
          var latlngUser = {latitude: region.latitude, longitude: region.longitude};                //Get longitude + latitude from user
//          alert(haversine(latlngUser, this.state.markers[i].coordinate, {unit: 'meter'}));
          if(haversine(latlngUser, this.state.markers[i].coordinate, {unit: 'meter'}) <= 50) {      //Checks all markers within 50 meter
             if(this.state.markers[i].color != 'green') {                                           //Check if question already answered
                this.openQuestion(this.state.markers[i].id) && Vibration.vibrate();                                        //If question is NOT answered, open modal + vibrate
             }
          }
    }
  },


  render() {

    return (
      <View style={styles.container}>
        <StatusBar
           hidden={true}        //Hides the StatusBar, the bar on top of your mobile (The bar where you can find your battery percentage for example)
        />

        <MapView
          ref="map"
          mapType={this.state.satelliteIsOn}        //MapType (Terrain or Satellite) depends on the switch in the settings page
          style={styles.map}
          region={this.state.region}                //Region is the rendered part of the map
          onRegionChange={this.onRegionChange}      //Every time location updates, it changes the region
          showsUserLocation={true}                  //Shows the location where you are standing (with a blue'ish dot)
          showsMyLocationButton={true}              //Shows the button top right, when you press it the screen will go to your current location
          toolbarEnabled={false}                    //Disabled toolbar, no toolbar on top of the page
          loadingBackgroundColor={'#f1f1f1'}        //Background color map when it is loading
          loadingEnabled={true}                     //Enabled loading screen when loading map
        >

        {this.state.markers.map((marker, index) => (
            <MapView.Marker
                key={marker.key}                    // Gets the key value from the marker
                pinColor={marker.color}             // Gets the color of the marker, red (or green if answered)
                coordinate={marker.coordinate}      // Coordinates of the location of the marker
                onPress={() => {
                    this.openQuestion(marker.id)    //onPress marker, opens a question which belongs to the marker
                }}
              >
              </MapView.Marker>
              ))}
            <MapView.Polyline
            coordinates={this.state.routeCoordinates}
            strokeColor='#19B5FE'
            strokeWidth={7}     //Polyline is the line that follows the path you have walked.
         />
        </MapView>

        <View style={styles.bubble}>
          <Text style={{textAlign: 'center'}}>Distance {parseFloat(this.state.distanceTravelled).toFixed(2)} km</Text>
        </View>

        <View style={styles.bubble}>
          <Text style={{ textAlign: 'center'}}>
            {`${this.state.region.latitude.toPrecision(7)}, ${this.state.region.longitude.toPrecision(7)}`}
          </Text>
        </View>


              <Modal
            animationType={"slide"}                                                     //Animation modal is slide
            transparent={false}
            visible={this.state.modalVisible}                                           //Makes the modal visible
            onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}     //When you press on close, modal closes
          >
          <View style={styles.qContainer}>
            <KeyboardAwareScrollView>
                <Text style={styles.title}>{this.state.activeQuestions[this.state.locationActiveQuestion] != null? this.state.activeQuestions[this.state.locationActiveQuestion].text: "Undefined"}</Text>
                <Image source={require('./img/stock.png')} style={{width: 300, height: 200}} />


                <Text style={styles.question}>{questions[this.state.locationActiveQuestion] != null? questions[this.state.locationActiveQuestion].text: "Undefined"}</Text>
                {console.log(this.state.activeQuestions[0])}
                {this.state.activeQuestions[0] != null? this.answerType(this.state.activeQuestions[this.state.locationActiveQuestion].type): <Text>Undefined</Text>}


                <View style={styles.navButtonsForm}>
                    <TouchableHighlight style={styles.lastButton} onPress={() => {
                          this.navQuestions("back");                                   //onPress back button, navigate to last question
                        }}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Vorige</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.closeButton} onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);                                    //onPress close button, close modal
                    }}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Sluiten</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.nextButton} onPress={() => {
                      this.navQuestions("next");                                    //onPress next button, navigate to next question
                    }}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Volgende</Text>
                    </TouchableHighlight>
                </View>
            </KeyboardAwareScrollView>
          </View>
              </Modal>
      </View>
    );
  },
});



var styles = StyleSheet.create({        //Styling (Camelcase)
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },

  qContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },

  buttonHolder: {
    flexDirection: 'row',
  },

  title: {
    margin: 10,
    fontSize: 25,
  },

  question: {
    margin: 10,
    fontSize: 20,
  },

  buttons: {
   backgroundColor: '#2196F3',
   padding: 15,
   elevation: 5,
   flex: 1,
   alignItems: 'center',
   borderRadius: 5,
   margin: 15,
   marginTop: 5,
   marginBottom: 5,
  },

  camButton: {
      borderWidth:1,
      alignItems:'center',
      justifyContent:'center',
      elevation: 5,
      width:100,
      height:100,
      backgroundColor:'#2196F3',
      borderRadius:100,
  },

  buttonText: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 17,
  },

  navButtonsForm: {
    flexDirection: 'row',
    marginTop: 70,
  },

  closeButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    elevation: 5,
    alignItems: 'flex-start',
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 2,
    marginRight: 15,
  },

  lastButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    elevation: 5,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 2,
      marginRight: 15,
  },

  nextButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    elevation: 5,
    alignItems: 'flex-end',
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 2,
  },
preview: {
   height: (Dimensions.get('window').height / 3.5),
   width: Dimensions.get('window').width
 },
capture: {
    textAlign: 'center',
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

module.exports = CustomMap;     //Export module to use this module in other files
