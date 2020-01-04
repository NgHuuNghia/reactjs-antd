import React, { Component } from 'react'
import TaskItem from './TaskItem';

class TaskList extends Component {

    constructor(props){
        super(props);
        this.state={
            totalElement : this.props.tasks.length,
            quantum:10,
            quantumElement:10
        }
    }

    UNSAFE_componentWillMount(){
        if(this.state.totalElement<this.state.quantum){
            this.setState({
                quantumElement:this.state.totalElement  
            })
        }

    }

    UNSAFE_componentWillReceiveProps(nextProps){
        
        var {quantum,totalElement} = this.state;

        if(totalElement > nextProps.tasks.length){
            this.setState({
                totalElement:nextProps.tasks.length,
                quantum:quantum,
                quantumElement: nextProps.tasks.length > quantum ? quantum : nextProps.tasks.length
            })
        }
        if(totalElement < nextProps.tasks.length){
            this.setState({
                totalElement:nextProps.tasks.length,
                quantum:quantum,
                quantumElement: nextProps.tasks.length > quantum ? quantum : nextProps.tasks.length
            })

        }


    }

    changeQuantum = (e) => {
        var quantum = e.target.value;
        var quantumElement = quantum > this.state.totalElement ? this.state.totalElement : quantum;
        this.setState({
            quantum:quantum,
            quantumElement:quantumElement
        })
    }

    render() {

        var { tasks } = this.props;
        var elementTask = tasks.map((task, index) => {
            return <TaskItem onUpdateTaskList={this.props.onUpdateTask} onDeleteTask={this.props.onDeleteTask} onUpdateStatusList={this.props.onUpdateStatus} key={task.id} index={index} task={task} />
        });
        elementTask.splice(this.state.quantumElement);

        return (
            <div className="list-task" style={{marginBottom:'40px'}}>
                <div style={{marginBottom:'10px'}} className="pagination">
        <span><strong>Total {this.state.totalElement} </strong>from 1 to {this.state.quantumElement }</span>
                    <select style={{marginLeft:'5px'}} onChange={this.changeQuantum} value={this.state.quantum} name="selectQuantum" id="selectQuantum">
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span>&nbsp; rows per page</span>
                </div>
                <table>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elementTask}
                    </tbody>

                </table>
            </div>


        )
    }

}

export default TaskList

// ant design table + pagination
// <Table
//     dataSource={...}
//     pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}
// >