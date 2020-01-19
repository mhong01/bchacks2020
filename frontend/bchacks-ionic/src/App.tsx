import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Login from "./pages/LogInPage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
// var RadarModule = require('./RadarModule');
import HttpRequests from "./Requests";
// import MapPage from "./pages/MapComponent";

import * as firebase from "firebase";
import NotifiersPage from "./pages/Notifier";
import PlacesView from "./pages/PlacesView";
// import AddMePage from "./pages/AddMe";
const App: React.FC = () => (
  <IonApp>
    {/* <script src="https://js.radar.io/v1.1.0/radar.min.js" integrity="sha384-9gzMIZTQDnuwordlQUv+j9r2TDNLAaKXhSk+p/1jZV0tlnDQ8Bu6YVmTbLIG+dRg"></script>
      <div> {RadarModule.RadarModule()}</div> */}

    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" component={Login} exact={true} />
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        {/* <Route path="/maps" component={MapPage} /> */}
        <Route path="/notifier" component={NotifiersPage} />
        <Route path="/places" component={PlacesView} />
        {/* <Route path="/addme" component={AddMePage} /> */}
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
