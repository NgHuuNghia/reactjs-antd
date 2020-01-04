import React, { Component } from 'react'
import { Input } from "antd";

const { Search } = Input;

class search extends Component {

    onChange = (e) => {
        this.props.filterName(e.target.value); // sai, co du lieu thi phai dung state de luu tru, roi moi dung ham de xu li
    }

    render() {
        return (
            <div className="search">
                <Search onChange={ this.onChange} className='input-search'
                    placeholder="nhập tên ..."
                    size="large"
                />
            </div>

        )
    }

}

export default search