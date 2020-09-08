import React, {Component} from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';

export default class AddPage extends Component {

    state = {
        redirect: false,
        toDashboard: false,
        isLoading: false
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const token = localStorage.getItem('token');
        const url = 'https://gowtham-rest-api-crud.herokuapp.com/employees';
        const name = document.getElementById('inputName').value;
        const email = document.getElementById('inputEmail').value;
        const emppassword = document.getElementById('inputEmppassword').value;
        const empusername = document.getElementById('inputEmpusername').value;

        let bodyFormData = new FormData();
        bodyFormData.set('name', name);
        bodyFormData.set('email', email);
        bodyFormData.set('empusername', empusername);
        bodyFormData.set('emppassword', emppassword);
        bodyFormData.set('token', token);
        axios.post(url, bodyFormData)
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
                                <li className="breadcrumb-item active">Add</li>
                            </ol>
                        </div>
                        <div className="container-fluid">
                            <div className="card mx-auto">
                                <div className="card-header">Tambah Data</div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputNama" className="form-control" placeholder="Masukan Nama" required="required" autoFocus="autofocus" />
                                                        <label htmlFor="inputName">Masukan Nama</label>
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
                                                        <input type="text" id="inputempusername" className="form-control" placeholder="Masukan Username " required="required" />
                                                        <label htmlFor="inputempusername">Masukan Username Baru</label>
                                                    </div>
                                                </div>
												</div>
											 </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputempuserpassword" className="form-control" placeholder="Masukan Password " required="required" />
                                                        <label htmlFor="inputemppassword">Masukan Password Baru</label>
                                                    </div>
                                                </div>
												</div>
											 </div>
                                        <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Tambah Data &nbsp;&nbsp;&nbsp;
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
                                    <span>Test<div>{(new Date().getFullYear())}</div></span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}
