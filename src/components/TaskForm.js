import React, { Component } from 'react'
import { Form, Input, Select, Button, Modal,Icon} from 'antd'
import PropTypes from 'prop-types';

const { Option } = Select;

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: true,
            visible: false
        }
    }

    UNSAFE_componentWillMount() {
        if (this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }

    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps && nextProps.task !== null) { // edit
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
                visible:true
            })
        }

    }

    onchageName = (e) => {
        var target = e.target;
        var value = target.value;
        this.setState({
            name: value
        })
    }
    onchageStatus = (e) => {
        var targetValue = e;
        this.setState({
            status: targetValue === 'true' ? true : false
        })
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        e.preventDefault();
        this.props.onSubmitTask(this.state);
        this.setState({
            id: '',
            name: '',
            status: true,
            visible: false
        })
    };

    handleCancel = (e) => {
        this.setState({
            id: '',
            name: '',
            status: true,
            visible: false
        })
    };

    render() {
        return (
            <div className="task-form">
                 <div style={{ width: '13%',float:'right' }} className='add-task'>
                    <Button onClick={this.showModal} type='primary'> <Icon type="plus" /> Thêm công việc</Button>
                </div>
                <Modal
                    title={this.props.task === null ? 'Thêm Công Việc' : 'Sửa Công Việc'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText={this.props.task === null ? 'Thêm' : 'Sửa'}
                    cancelText="Hủy bỏ"
                >
                    <Form className="task-Form">
                     <Form.Item label="Tên:">
                         {(<Input type='text' name='name' value={this.state.name} onChange={this.onchageName} />)}
                     </Form.Item>
                     <Form.Item label="Trạng thái">
                         {(
                            <Select name='status' value={this.state.status.toString()} onChange={this.onchageStatus} >
                                <Option value={true.toString()}>active</Option>
                                <Option value={false.toString()}>non-active</Option>
                            </Select>
                        )}
                    </Form.Item>
                </Form>
                </Modal>
            </div>
        )
    }

}

//default props  : neu khong truyen vao component thi moi dung default, chu khong phai bang null la dung default
TaskForm.defaultProps = {
    nghia: 10
    // task: {
    //     id: '2121',
    //     name: 'default',
    //     status: true
    // }
}
//// propTypes
TaskForm.propTypes = {
    task: PropTypes.exact({
        id: PropTypes.string,// chuyen thanh number de xem ket qua
        name: PropTypes.string,
        status: PropTypes.bool
    })
}

export default TaskForm