import React, { useContext } from "react";

import {
  Container,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Link
} from "@material-ui/core";
import axios from "axios";
import {
  RADAR_ROOT_URL,
  RADAR_TOKEN,
  API_GEOFENCES_URL
} from "../config/endpoint";
import Home from "./Home";

import * as firebase from "firebase";
const app = firebase.initializeApp({
  apiKey: "AIzaSyA6AoXrKO3xNx85kWENROXM-PN0tSK7iEw",
  authDomain: "cool-phalanx-265623.firebaseapp.com",
  databaseURL: "https://cool-phalanx-265623.firebaseio.com",
  projectId: "cool-phalanx-265623",
  storageBucket: "cool-phalanx-265623.appspot.com",
  messagingSenderId: "653910519437",
  appId: "1:653910519437:web:97a040c87bfe3dc8fdbcc4",
  measurementId: "G-9NSRNZ2GV1"
});

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

class LoginPage extends React.Component<any, any, any> {
  constructor(props: any) {
    super(props);
    this.OnSignIn = this.OnSignIn.bind(this);

    this.state = {
      // errorMsg: null,
      // isLoggedIn: false,
      redirectToReferrer: false,
      to: "/maps",
      geofences: []
    };

    // this.ShowMapPage = this.ShowMapPage.bind(this);
    this.ShowNotifierPage = this.ShowNotifierPage.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    // example to call Radar API
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: RADAR_TOKEN
    };

    axios
      .get(API_GEOFENCES_URL, {})
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log("ERR: " + err);
      });
  }

  async OnSignIn() {
    this.props.history.push("/home");
  }
  async OnSignInWithGoogle() {
    let emptyMsg: string = "";
    // if ((this.state.email == null || this.state.email.trim() === "")
    // 	|| (this.state.password == null || this.state.password.trim() === "")) {
    // 	emptyMsg = "Invalid input!";
    // }

    // if (emptyMsg.trim() !== "") {
    // 	this.setState({
    // 		emptyMsg: emptyMsg,
    // 	})
    // } else {
    // 	let user = await UserControllerInstance.SignInUser(this.state.email, this.state.password);

    // 	if(user == null) {
    // 		this.setState({errorMsg: "Invalid email/password"})
    // 	} else {
    // 		this.setState({isLoggedIn: true})
    // 	}
    // }
    await firebase.auth().signInWithRedirect(provider);

    firebase
      .auth()
      .getRedirectResult()
      .then(function(result: any) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;

        console.log("yesss");
        console.log(user);
        this.ShowMapPage();
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error);
        // ...
      });
  }

  async ShowNotifierPage() {
    this.props.history.push("/notifier");
  }

  render() {
    let content: any = null;
    // if(this.state.isLoggedIn || UserControllerInstance._IsSignedIn) {
    // 	content = <h1>Your are logged in!</h1>
    // 	console.log(this.state);
    // } else {
    console.log(this.state);
    content = (
      <div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => this.setState({ email: e.currentTarget.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => this.setState({ password: e.currentTarget.value })}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.OnSignIn}
          >
            Sign In
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.ShowNotifierPage}
          >
            Sign In With Google
          </Button>
          {this.state.errorMsg != null && <div>{this.state.errorMsg}</div>}
        </form>
      </div>
    );
    // }
    return (
      <Container component="main" maxWidth="xs">
        {content}
      </Container>
    );
  }
}

export default LoginPage;
