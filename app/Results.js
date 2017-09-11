import React, { Component } from 'react';
import {
    View,
    Text,
    AppRegistry,
    StyleSheet,
    Button,
    StatusBar,
    ScrollView,
    TouchableHighlight,
    Modal,
    Image
} from 'react-native';

questions = fetch('http://cityclash.icthardenberg.nl/backend/questions.json')
  .then((response) => response.json())
  .then((responseJson) => {
    return questions = responseJson;
})

var Results = React.createClass({
    getInitialState() {
        return {
            modalVisible: false,
            activeMarker: null,
            activeButton: null,
            reRender: false,
            data: this.props.data
        }
    },

    navigate(id) {
        this.props.navigator.replacePrevious({
            id,
        });
    },

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    },

    openQuestion(id, givenAnswer) {
      this.setModalVisible(true);
      this.setState({activeButton: givenAnswer});
      this.setState({activeMarker: id})
    },

    saveAnswer(id, givenAnswer) {
        var newData = this.state.data;
        newData[id] = givenAnswer;
        this.setModalVisible(false);
        this.setState({data: newData});
    },

    submit() {
        var http = new XMLHttpRequest();
        var url = "http://cityclash.icthardenberg.nl/backend/backend.php";
        var params = JSON.stringify(questions);
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/json");

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                alert(http.responseText);
            }
        }
        http.send(params);
        this.navigate("HomeScreen");
    },

    render() {
    for(i = 0; i < questions.length; i++) {
        questions[i].answered =  this.state.data[i];



       for(var key in questions[i]) {
         var value = questions[i][key];
         if(value == questions[i].answered) {
            if(key != "answered") {
                questions[i].buttonAnswered = key;
            }
         }
       }
    }


    var listArr = questions.map(quest => (
        <View style={styles.questionBox} key={quest.id}>
                <Text style={styles.questionName}>{quest.name}</Text>
                <TouchableHighlight style={styles.button} onPress={() => {this.openQuestion(quest.id, quest.buttonAnswered)}}>
                    <Text style={styles.buttonText}>{this.state.data[quest.id]}</Text>
                </TouchableHighlight>
        </View>
    ));

        return(
            <View style={styles.container}>
                <StatusBar
                   backgroundColor="#2f6564"
                   barStyle="light-content"
                />

                <Text style={styles.headLine}>All questions are answered!</Text>
                <ScrollView style={styles.scrollView}>
                    {listArr}
                </ScrollView>
                <TouchableHighlight onPress={() => {this.submit()}} style={styles.submit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>

             <Modal
               animationType={"slide"}
               transparent={false}
               visible={this.state.modalVisible}
               onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}
             >
               <View style={styles.qContainer}>
                   <Text style={styles.title}>{questions[this.state.activeMarker] != null? questions[this.state.activeMarker].name: "Undefined"}</Text>

                   <Image source={require('./img/stock.png')} style={{width: 300, height: 200}} />


                   <Text style={styles.question}>{questions[this.state.activeMarker] != null? questions[this.state.activeMarker].question: "Undefined"}</Text>

                   <View style={styles.buttonHolder}>
                     <TouchableHighlight
                       style={[styles.buttons, {backgroundColor: this.state.activeButton == "answer1"? "#32cd32": "#2196F3"}]}
                       onPress={() => {this.saveAnswer(this.state.activeMarker, questions[this.state.activeMarker].answer1)}}
                     >
                       <Text style={styles.buttonText}>{questions[this.state.activeMarker] != null? questions[this.state.activeMarker].answer1: "Undefined"}</Text>
                     </TouchableHighlight>
                   </View>

                   <View style={styles.buttonHolder}>
                     <TouchableHighlight
                       style={[styles.buttons, {backgroundColor: this.state.activeButton == "answer2"? "#32cd32": "#2196F3"}]}
                       onPress={() => {this.saveAnswer(this.state.activeMarker, questions[this.state.activeMarker].answer2)}}
                     >
                       <Text style={styles.buttonText}>{questions[this.state.activeMarker] != null? questions[this.state.activeMarker].answer2: "Undefined"}</Text>
                     </TouchableHighlight>
                   </View>

                   <View style={styles.buttonHolder}>
                     <TouchableHighlight
                       style={[styles.buttons, {backgroundColor: this.state.activeButton == "answer3"? "#32cd32": "#2196F3"}]}
                       onPress={() => {this.saveAnswer(this.state.activeMarker, questions[this.state.activeMarker].answer3)}}
                     >
                       <Text style={styles.buttonText}>{questions[this.state.activeMarker] != null? questions[this.state.activeMarker].answer3: "Undefined"}</Text>
                     </TouchableHighlight>
                   </View>

                   <View style={styles.buttonHolder}>
                     <TouchableHighlight
                       style={[styles.buttons, {backgroundColor: this.state.activeButton == "answer4"? "#32cd32": "#2196F3"}]}
                       onPress={() => {this.saveAnswer(this.state.activeMarker, questions[this.state.activeMarker].answer4)}}
                     >
                       <Text style={styles.buttonText}>{questions[this.state.activeMarker] != null? questions[this.state.activeMarker].answer4: "Undefined"}</Text>
                     </TouchableHighlight>
                   </View>

                   <TouchableHighlight style={styles.closeButton} onPress={() => {
                     this.setModalVisible(!this.state.modalVisible)
                   }}>
                   <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Close</Text>
                   </TouchableHighlight>

               </View>
             </Modal>
            </View>
        )
    },
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#459695',
    flex: 1,
    flexDirection: 'row',
  },

  headLine: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white',
    position: 'absolute',
    height: 30,
    top: 0,
  },

  scrollView: {
    marginTop: 55,
    flex: 1,
    marginBottom: 75,
  },

  questionBox: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 3,
    elevation: 5,
  },

  questionName: {
    fontSize: 17,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#32cd32',
    padding: 15,
    elevation: 5,
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
    margin: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  submit: {
    backgroundColor: '#E73C2A',
    padding: 15,
    elevation: 5,
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
    margin: 15,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },

  buttonText: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 17,
  },

  qContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },

  title: {
    margin: 10,
    fontSize: 25,
  },

  buttonHolder: {
    flexDirection: 'row',
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

  closeButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    elevation: 5,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 2,
  },

  question: {
    margin: 10,
    fontSize: 20,
  },

});

module.exports = Results;
