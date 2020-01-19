import React, { useContext } from "react";

import {
  Container,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider
} from "@material-ui/core";
import axios from "axios";
import { API_GET_NOTIFIER } from "../config/endpoint";
import { state } from "../state";
import { getNotifier } from "../Controllers/data";

class NotifiersPage extends React.Component<any, any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      // errorMsg: null,
      // isLoggedIn: false,
      redirectToReferrer: false,
      to: "/notifier"
    };
  }

  componentWillMount() {}

  async componentDidMount() {
    const users = await getNotifier(state.userId);

    this.setState({ notifiers: users });
  }

  ShowMapPage() {
    this.setState({ redirectToReferrer: true });
    this.setState({ to: "/maps" });
  }

  render() {
    const num = Math.floor(Math.random() * 100 + 1);
    let content = [];

    console.log(this.state);

    for (let item in this.state.notifiers) {
      content.push(
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src={
                "https://api.adorable.io/avatars/" +
                num.toString() +
                "/abott@adorable.png"
              }
            />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
      );
      content.push(<Divider variant="inset" component="li" />);
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            maxWidth: 500
          }}
        >
          <List></List>

          <div
            style={{
              padding: "10 10 10 10"
            }}
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              //   onClick={this.OnSignIn}
            >
              Add member to notify when you are in danger zone
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default NotifiersPage;
