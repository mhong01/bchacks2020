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

class AddNotifierPage extends React.Component<any, any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      // errorMsg: null,
      // isLoggedIn: false,
      redirectToReferrer: false,
      to: "/maps"
    };

    this.ShowMapPage = this.ShowMapPage.bind(this);
  }

  ShowMapPage() {
    this.setState({ redirectToReferrer: true });
    this.setState({ to: "/maps" });
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            // onClick={this.OnSignIn}
          >
            Add Member
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

export default AddNotifierPage;
