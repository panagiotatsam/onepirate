import React, { useEffect, useState } from "react";
import { auth, db, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Reminders.css";
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';

function BMI() {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [bmi , setBmi] = useState([]);

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
     
        return db.collection("users").doc(user?.uid).collection("measurements").where("measurementType", "==", "BMI").get().then(
              querySnapshot => {
                  querySnapshot.forEach(element => {
                      var measurementsData = element.data();
                      setBmi(arr => [...arr, measurementsData]);

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
        <h2>Body Mass Index(BMI) Details</h2>
        <br/>
        </center>
      
    {
        
        bmi.map((measurementsData) => (
        <Frame date={measurementsData.measurementDate} 
               type={measurementsData.measurementType}
               numberWeight={measurementsData.numberWeight} 
               numberHeight={measurementsData.numberHeight}
               bmi={measurementsData.bmi}
               bmiResult={measurementsData.bmiResult}
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

const Frame = ({date , type , numberWeight, numberHeight, bmi, bmiResult}) => {
    console.log(date + " " + numberWeight + " " + numberHeight + " " + bmi + " " + bmiResult + " " +type);
    return (
        <center>
            <div className="reminders">
              
              <p><b>DATE</b> : {date}</p>


              <p><b>TYPE</b> : {type}</p>
              
              
              <p><b>WEIGHT</b> : {numberWeight}</p>
              
              
              <p><b>HEIGHT</b> : {numberHeight}</p>
              
              
              <p><b>BMI</b> : {bmi}</p>


              <p><b>RESULT</b> : {bmiResult}</p>
              
             

            </div>
        </center>
    );


}

export default withRoot(BMI);