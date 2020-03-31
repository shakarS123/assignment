import React, { Component } from 'react';
import axios from "axios";

import { Modal, Button, Dropdown } from "react-bootstrap"

class Create_user extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedIndex: 0,
            userList: [],
            selectedUserDetail: [],
            selectedUser:""
        }
    }
    componentDidMount() {
        var url = "./userData.json";
        axios(url, {
            method: "GET"
        }).then(response => {
            console.log(response);
            var data = response.data && response.data.members ? response.data.members : [];
            this.setState({ userList: data });
        });
    }
    handleSelectUser = (data, name) => {
        this.setState({ selectedUserDetail: data, selectedUser: name, showModal: true })
    }
    hideModal = () =>{
        this.setState({showModal: false, selectedUserDetail: []})
    }
    handleDate = (e) => {
        console.log("gf")
        this.setState({selectedIndex:e.target.value})
    }
    render() {
        console.log(this.state.selectedUserDetail)
        const { userList, selectedUserDetail , selectedIndex, selectedUser} = this.state;
        return (
            <div>
                <div className="user-List">
                    <h5>User List</h5>
                </div>
                {
                    userList.length > 0 ? (
                        userList.map((data, index) => {
                            console.log(data)
                            return (
                                <div className="user-list-container" key={index} onClick={()=> this.handleSelectUser(data.activity_periods, data.real_name)}>
                                    <div className="profile"></div>
                                    <div className="user-id">{data.id}</div>
                                    <div className="user-name">{data.real_name}</div>

                                </div>
                            )
                        })
                    ) : ""
                }
                <Modal show={this.state.showModal} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>User Time Range  {" ( " + selectedUser +" )"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <select className="form-control mb-3" onChange={(e)=>{this.handleDate(e)}}>
                        {
                            selectedUserDetail.length>0?(
                                selectedUserDetail.map((data, index) => {
                                    console.log(data)
                                    let date = data.start_time.split(" ");
                                    console.log(date);
                                    return(
                                        <option key={index} value={index}>{date[0] + date[1]}</option>
                                    )
                                })
                            ):""
                        }
                    </select>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="date-label">Start Time</div>
                            <div>{  selectedUserDetail&&selectedUserDetail[selectedIndex]&&selectedUserDetail[selectedIndex].start_time}</div>
                        </div>
                        <div className="col-sm-6">
                            <div className="date-label">End Time</div>
                            <div>{ selectedUserDetail&&selectedUserDetail[selectedIndex]&&selectedUserDetail[selectedIndex].end_time}</div>
                        </div>
                    </div>
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideModal}>
                            Close
                        </Button>
                        
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}


export default Create_user;