import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";

export default class EditPage extends Component {

    constructor(props) {
        super(props);
        this.url = 'https://gowtham-rest-api-crud.herokuapp.com/employees';
        this.token = localStorage.getItem('token');
    }

    state = {
        id: '',
        redirect: false,
        isLoading: false
    };

    componentDidMount() {
        const id = this.props.location.search[4];
        axios.get(this.url + '/'  + id, { params: { token: this.token}})
            .then(response => {
                const emp = response.data.employee;
                this.setState({id: emp.id });
                document.getElementById('inputNama').value = emp.nama;
                document.getElementById('inputEmail').value = emp.email;
                document.getElementById('inputempusername').value = emp.emp_username;
                document.getElementById('inputemppassword').value = emp.emp_password;
            })
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
        
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const token = localStorage.getItem('token');
        const url = 'https://gowtham-rest-api-crud.herokuapp.com/employees/'+ this.state.id;
        const nama = document.getElementById('inputNama').value;
        const email = document.getElementById('inputEmail').value;
        const empusername = document.getElementById('inputempusername').value;
        const emppassword = document.getElementById('inputemppassword').value;
        axios.put(url, { nama: nama, email:email, emp_username:empusername, emppassword:emppassword, token:token })
            .then(result => {
                if (result.data.status) {
                    this.setState({redirect: true, isLoading: false})
                }
            })
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/dashboard' />
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Edit</li>
                            </ol>
                        </div>
                        <div className="container-fluid">
                            <div className="card mx-auto">
                                <div className="card-header">Employee Edit</div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputNama" className="form-control" placeholder="Masukan Nama" required="required" autoFocus="autofocus" />
                                                        <label htmlFor="inputNama">Masukan Nama</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputPhone" className="form-control" placeholder="Enter Phone" required="required" />
                                                        <label htmlFor="inputPhone">Enter Phone</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="email" id="inputEmail" className="form-control" placeholder="Alamat Email" required="required" />
                                                        <label htmlFor="inputEmail">Masukan Email</label>
                                                    </div>
                                                </div>
											</div>
										</div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputEmpusername" className="form-control" placeholder="Masukan Username" required="required" />
                                                        <label htmlFor="inputEmpusername">Enter Username</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputemppassword" className="form-control" placeholder="Masukan Password" required="required"/>
                                                        <label htmlFor="inputemppassword">Masukan Password</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Update Employee &nbsp;&nbsp;&nbsp;
                                            {isLoading ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            ) : (
                                                <span></span>
                                            )}
                                        </button>
                                    </form>
                                    {this.renderRedirect()}
                                </div>
                            </div>
                        </div>

                        <footer className="sticky-footer">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Test</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}


