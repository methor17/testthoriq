import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

export default class Register extends Component {

    state = {
        nama: '',
        username: '',
        password: '',
        redirect: false,
        authError: false,
        isLoading: false,
    };

    handleusernameChange = event => {
        this.setState({ username: event.target.value });
    };
    handlePwdChange = event => {
        this.setState({ password: event.target.value });
    };
    handleNamaChange = event => {
        this.setState({ nama: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const url = 'https://gowtham-rest-api-crud.herokuapp.com/register';
        const username = this.state.username;
        const password = this.state.password;
        const nama = this.state.nama;
        let bodyFormData = new FormData();
        bodyFormData.set('username', username);
        bodyFormData.set('nama', nama);
        bodyFormData.set('password', password);
        axios.post(url, bodyFormData)
            .then(result => {
                this.setState({isLoading: false});
                if (result.data.status !== 'fail') {
                    this.setState({redirect: true, authError: true});
                }else {
                    this.setState({redirect: false, authError: true});
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ authError: true, isLoading: false });
            });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Register</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input id="inputnama" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} placeholder="Nama" type="text" name="nama" onChange={this.handleNamaChange} autoFocus required/>
                                    <label htmlFor="inputnama">Masukan Nama</label>
                
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-label-group">
                                    <input id="inputusername" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} placeholder="Alamat Email" type="text" name="username" onChange={this.handleEmailChange} autoFocus required/>
                                    <label htmlFor="inputusername">Masukan Username</label>
                                    <div className="invalid-feedback">
                                        Tolong masukan Username yang valid. atau Username sudah tersedia
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" className="form-control" id="inputPassword" placeholder="******"  name="password" onChange={this.handlePwdChange} required/>
                                    <label htmlFor="inputPassword">Password</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Register &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to={''}>Login Akun-mu</Link>
                            <Link className="d-block small" to={'#'}>Lupa Password?</Link>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        );
    }
}


