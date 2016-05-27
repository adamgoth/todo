import React from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
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
      <TextInput
        style={styles.input}
        value={this.state.task}
        onChangeText={(text) => this.setState({task: text})}
      />

      <TouchableHighlight
        style={styles.button}
        underlayColor={'gray'}
        onPress={this.onAddPress}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableHighlight>

      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />

    </View>


  },
  onAddPress: function() {
    var newDs = [];
    newDs = this.state.ds;
    newDs.push(this.state.task);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newDs),
      task: ''
    });
  },
  onRemovePress: function(task) {
    console.log(task)
    var newDs = [];
    newDs = this.state.ds;
    var i = newDs.indexOf(task);
    console.log(i);
    newDs.splice(i, 1);
    console.log(newDs);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newDs),
      task: ''
    });
    console.log(newDs);
    console.log(this.state.dataSource);
  },
  renderRow: function(task, sec, id) {
    return (
      <View style={styles.taskRow}>
        <Text style={styles.checkbox}>√</Text>
        <Text style={styles.taskText}>{task}{id}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          underlayColor={'gray'}
          onPress={() => this.onRemovePress(task)}>
          <Text style={styles.removeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  input: {
    padding: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    width: 250,
    alignSelf: 'center'
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin: 10,
    alignSelf: 'center'
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 15
  },
  taskRow: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10
  },
  taskText: {
    flex: 10
  },
  checkbox: {
    flex: 1
  },
  removeButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    alignSelf: 'center'
  },
  removeButtonText: {
    flex: 1,
    alignSelf: 'center',
  }
});

AppRegistry.registerComponent('todo', () => ToDo);
