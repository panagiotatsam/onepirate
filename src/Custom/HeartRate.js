import React, { useEffect, useState } from "react";
import { auth, db, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Reminders.css";
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';

function HeartRate() {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [heartRate , setHeartRate] = useState([]);

  const history = useHistory();

  const fetchUserUid = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/Dashboard");

    fetchUserUid();
  }, [user, loading]);

  
  const fetchMeasurements = () => {
     
        return db.collection("users").doc(user?.uid).collection("measurements").where("measurementType", "==", "heart rate").get().then(
              querySnapshot => {
                  querySnapshot.forEach(element => {
                      var measurementsData = element.data();
                      setHeartRate(arr => [...arr, measurementsData]);

                  });
              }
          )
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/Dashboard");

    fetchMeasurements();
  }, [user, loading]);


        

  return (
    <React.Fragment>
    <AppAppBar />
    <div className="reminders__container">
      <div className="reminders__buttongroup">
        
        <center>
        <br/>
        <br/>
        <h2>Heart Rate Details</h2>
        <br/>
        </center>
      
    {
        
        heartRate.map((measurementsData) => (
        <Frame date={measurementsData.measurementDate} 
               type={measurementsData.measurementType}
               numberRate={measurementsData.numberRate} 
               heartRateResult={measurementsData.heartRateResult}
               />
        ))


          
        
    }

    <button className="dashboard__btn"  onClick={logout}>
          Logout
    </button>
    </div>
    </div>
    
    <AppFooter />
  </React.Fragment>

);
}

const Frame = ({date , type , numberRate, heartRateResult}) => {
    console.log(date + " " + numberRate + " " + heartRateResult + " " + type);
    return (
        <center>
            <div className="reminders">
              
              <p><b>DATE</b> : {date}</p>


              <p><b>TYPE</b> : {type}</p>
              
              
              <p><b>NUMBER HEART RATE</b> : {numberRate}</p>
              


              <p><b>RESULT</b> : {heartRateResult}</p>
              
             

            </div>
        </center>
    );


}

export default withRoot(HeartRate);