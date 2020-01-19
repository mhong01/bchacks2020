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

class AddMePage extends React.Component<any, any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      // errorMsg: null,
      // isLoggedIn: false,
      redirectToReferrer: false,
      to: "/maps"
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  ShowMapPage() {
    this.setState({ redirectToReferrer: true });
    this.setState({ to: "/maps" });
  }

  render() {
    const num = Math.floor(Math.random() * 100 + 1);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50
        }}
      >
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=12453uyguguyg" />
      </div>
    );
  }
}

export default AddMePage;
