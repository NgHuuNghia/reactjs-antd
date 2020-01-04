import React, { Component } from 'react';
import './App.css';
//lodash
import _ from 'lodash';
//css
import 'antd/dist/antd.css';
import { Typography } from 'antd';
import { Row, Col } from 'antd';
//component
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
//antd
const { Title } = Typography;
//lib
const randomstring = require("randomstring");
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskEditing : null,
      filter: {
        name:''
      }
    }
  }

  UNSAFE_componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
    else {
      this.generateData();
    }
  }


  
  generateData() {
    var tasks = [
      {
        id: randomstring.generate(10),
        name: 'Hoc Lap Trinh',
        status: true
      },
      {
        id: randomstring.generate(10),
        name: 'DI choi',
        status: true
      },
      {
        id: randomstring.generate(10),
        name: 'đi ngủ',
        status: false
      }
    ];

    this.setState({
      tasks: tasks
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));

  }

  onSubmitTask = (data) => {
    
    var {tasks} = this.state;

    if(data.id === '') {
      // add
      data.id = randomstring.generate(10);
      tasks.push(data);
    }
    else{
      //update
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks:tasks,
      taskEditing : null
    })
    localStorage.setItem('tasks',JSON.stringify(this.state.tasks));     
  }

  onUpdateStatus = (id) => {

    var index = this.findIndex(id);
    var {tasks} = this.state;
    
    if(index!== -1){
      tasks[index].status = !tasks[index].status;
    }
    this.setState({
      tasks:tasks,
      taskEditing : null
    })
    localStorage.setItem('tasks',JSON.stringify(this.state.tasks));

  }

  findIndex = (id) => {
    var {tasks} = this.state;
    return _.findIndex(tasks,(task) => {
      return task.id === id;
    })
  }

  onDeleteTask = (id) => {
    var index = this.findIndex(id);
    var {tasks} = this.state;
    
    if(index!== -1){
      tasks.splice(index,1);
    }
    this.setState({
      tasks:tasks,
      taskEditing:null
    })
    localStorage.setItem('tasks',JSON.stringify(this.state.tasks));
  }

  onUpdateTask = (id) => {
    var index = this.findIndex(id);
    var {tasks} = this.state;
    var taskEdit = tasks[index];
    
    this.setState({
      taskEditing:taskEdit
    })

    this.setState({
      tasks:tasks
    })
    localStorage.setItem('tasks',JSON.stringify(this.state.tasks));
  }

  onFilter = (nameFilter) => {
    this.setState({
      filter:{
        name:nameFilter.toLowerCase()
      }
    })
  }

  importTask = (taskList) => {
    //create id for taskList
    for(let task of taskList){
      task.id = randomstring.generate(10);
    }
    var {tasks} = this.state;
    tasks.push(...taskList);
    
    this.setState({
      tasks:tasks,
      taskEditing:null
    });
    localStorage.setItem('tasks',JSON.stringify(this.state.tasks));

  }

  render() {

    var { tasks,taskEditing,filter } = this.state;
    if(filter.name !== ''){
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().includes(filter.name) === true;
        });
    } 
    return (
      <div className="container">
        <Title level={2} className='title'> QUẢN LÝ CÔNG VIỆC</Title>
        <Row>
          <Col span={0}>
          </Col>
          <Col span={32}>
            <div className="main">
            <TaskForm  task={taskEditing} onSubmitTask={this.onSubmitTask}/>
              <Control importTask = {this.importTask} onFilter={this.onFilter}></Control>
              <TaskList onUpdateTask = {this.onUpdateTask} onDeleteTask={this.onDeleteTask}  onUpdateStatus = {this.onUpdateStatus} tasks={tasks}></TaskList>
            </div>
          </Col>
        </Row>

      </div>
    )
  }
}




export default App;
