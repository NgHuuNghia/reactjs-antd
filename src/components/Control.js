import React, { Component } from 'react'
import Search from './Search';
import { Button, Upload, Icon, message } from "antd";

class Control extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasklist: null
        }
    }

    onAddListTask = (info) => {
        info.fileList = info.fileList.slice(-1);
        if (info.file.status !== 'uploading') {
            // console.log(info.file);
            // console.log(info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            //read data
            let reader = new FileReader();
            reader.readAsText(info.file.originFileObj);
            reader.onload = (e) => {
                // console.log(JSON.parse(e.target.result)); // data\
                var tasks = JSON.parse(e.target.result).tasks;
                // console.log(tasks);
                this.setState({
                    tasklist: tasks
                })

                // tra ve component app
                this.props.importTask(this.state.tasklist);
            }

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

    }

    render() {

        const file = {

            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            multiple: false,
            showUploadList: false,
        };

        return (
            <div className="control">
                <div className="add-list-task-json">
                    <Upload onChange={this.onAddListTask} accept=".json" {...file}>
                        <Button style={{background:'greenyellow'}}>
                        <Icon type="import" />Import list task (.json)
                        </Button>
                    </Upload>
                </div>
                <div className='search-sort' >
                    <Search filterName={this.props.onFilter}></Search>
                </div>

            </div>

        )
    }

}

export default Control