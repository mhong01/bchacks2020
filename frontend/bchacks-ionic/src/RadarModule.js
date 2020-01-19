import Radar from 'radar-sdk-js';

export function RadarModule(){
    console.log("hdhd");

    Radar.initialize("prj_test_pk_bb4f8d245ce35a2bd1bdee047976cb814a3f7a79");
    Radar.trackOnce(function(status, location, user, events) {
        if (status === Radar.STATUS.SUCCESS) {
          if (user.place.chain.slug === 'walmart') {
            // do something
            console.log("is walmart");
          } else {
              console.log("not");
          }
        }
      });
    
} 


