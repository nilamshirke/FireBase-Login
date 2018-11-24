import React, { Component } from 'react';
var  firebase = require('firebase');
 // Initialize Firebase
var config = {
    apiKey: put_from_your_account_project_details,
    authDomain: put_from_your_account_project_details,
    databaseURL: put_from_your_account_project_details,
    projectId: put_from_your_account_project_details,
    storageBucket: put_from_your_account_project_details,
    messagingSenderId: put_from_your_account_project_details
  };
firebase.initializeApp(config);

class Authen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            err : ''
        };
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.logout = this.logout.bind(this);
    }

    signup(event) {
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        console.log(email , password);

        const auth = firebase.auth();
        var promise = auth.createUserWithEmailAndPassword(email, password);
        
        promise
        .then(object => {
            var err = "Welcome " + object.user.email;
            firebase.database().ref('/users' + object.user.uid).set({
                email: object.user.email
            });
            console.log(object.user);
            this.setState({err:err});
        })
        .catch(
            e => {
            var err = e.message;
            console.log(err);    
            this.setState({err:err});            
        });

    }

    login(event) {
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        console.log(email , password);

        const auth = firebase.auth();
        
        const promise = auth.signInWithEmailAndPassword(email, password);

        //TODO:: handle login promise
        promise.catch(e => {
            var err = e.message;
            console.log(err);
            this.setState({
                err: err
            });
        });
    }

    logout() {
        firebase.auth().signOut();
        var lout = document.getElementById('logout');

        //TODO :: welcome message to user   
        lout.classList.add('hide');

    }

    render() {

        return(
            <div>
                <input id="email" ref="email" type="email"  placeholder="Enter your Email" /><br />
                <input id="pass" ref="password" type="password"  placeholder="Enter your Password" /><br />
                <p>{this.state.err}</p>
                <button onClick={this.login}>Log In</button>
                <button onClick={this.signup}>Sign Up</button>
                <button id='logout' onClick={this.logout}>Log Out</button>
            </div>
        );

    }
}

export default Authen;