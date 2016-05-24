import React from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

var ToDo = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    return {
      ds: [],
      dataSource: ds,
      task: '',
    }
  },

  render() {
    return <View style={styles.container}>
      <Text>Enter a task:</Text>
      <TextInput
        style={styles.input}
        value={this.state.task}
        onChangeText={(text) => this.setState({task: text})}
      />

      <TouchableHighlight
        style={styles.button}
        underlayColor={'gray'}
        onPress={this.onPress}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableHighlight>

      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />

    </View>


  },
  onPress: function() {
    var newDs = [];
    newDs = this.state.ds;
    newDs.push(this.state.task);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newDs),
      task: ''
    })
  },
  renderRow: function(task) {
    return <Text style={styles.taskRow}>{task}</Text>
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  input: {
    padding: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 250,
    alignSelf: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: 'black',
    margin: 10
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 15
  },
  taskRow: {
    flex: 1,
    margin: 5
  }
});

AppRegistry.registerComponent('todo', () => ToDo);
