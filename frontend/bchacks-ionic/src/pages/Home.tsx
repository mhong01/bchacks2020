import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import LoginPage from './LogInPage';
import Drawer from "../components/Drawer";
import MapContainer from "../lib/googleApi";
const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Drawer></Drawer>
        {/* GOOGLE MAP */}
        <MapContainer></MapContainer>
        <p style={{'marginTop' : "-20px"}}>Demo: When user moves around</p>
      </IonContent>
    </IonPage>
  );
};

export default Home;
