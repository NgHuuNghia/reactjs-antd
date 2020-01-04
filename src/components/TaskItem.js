import React, { Component } from 'react'
import { Button } from "antd";

class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatusList(this.props.task.id);
    }

    onDeleteTaskItem = () => {
        this.props.onDeleteTask(this.props.task.id);
    }

    onUpdateTaskItem = () => {
        this.props.onUpdateTaskList(this.props.task.id);
    }

    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td onClick = {this.onUpdateStatus}>{task.status === true ? 'active' : 'non-active'}</td>
                <td className='action'>
                    <Button onClick={this.onUpdateTaskItem} type='primary' className='btn-task-item'> Sửa </Button>
                    <Button onClick = {this.onDeleteTaskItem} type='danger' className='btn-task-item'> Xóa </Button>
                </td>
                
            </tr>
        )
    }

}

export default TaskItem