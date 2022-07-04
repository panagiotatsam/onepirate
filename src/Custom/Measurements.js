import React, { useEffect, useState } from "react";
import { auth, db, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Reminders.css";
import AppFooter from "./modules/views/AppFooter";
import withRoot from "./modules/withRoot";
import AppAppBarLogout from "./modules/views/AppAppBarLogout";
import ProductHeroMenu from "./modules/views/ProductHeroMenu";

function Measurements() {
  const [user, loading, error] = useAuthState(auth);
  const [firstName, setFirstName] = useState("");
  const [bloodPressure, setBloodPressure] = useState([]);
  const [bmi, setBmi] = useState([]);
  const [heartRate, setHeartRate] = useState([]);

  const history = useHistory();

  const fetchUserUid = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setFirstName(data.firstName);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/home");

    fetchUserUid();
  }, [user, loading]);

  const fetchBloodPressure = () => {
    return db
      .collection("users")
      .doc(user?.uid)
      .collection("blood pressure")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var measurementsData = element.data();
          setBloodPressure((arr) => [...arr, measurementsData]);
        });
      });
  };

  const fetchBMI = () => {
    return db
      .collection("users")
      .doc(user?.uid)
      .collection("body mass index")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var measurementsData = element.data();
          setBmi((arr) => [...arr, measurementsData]);
        });
      });
  };

  const fetchHeartRate = () => {
    return db
      .collection("users")
      .doc(user?.uid)
      .collection("heart rate")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var measurementsData = element.data();
          setHeartRate((arr) => [...arr, measurementsData]);
        });
      });
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/home");

    fetchBloodPressure();
  }, [user, loading]);

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/home");

    fetchBMI();
  }, [user, loading]);

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/home");

    fetchHeartRate();
  }, [user, loading]);

  return (
    <React.Fragment>
      <AppAppBarLogout />
      <ProductHeroMenu />
      <div className="reminders__container">
        <div className="reminders__buttongroup">
          <center>
            <br />
            <br />
            <h2>About Blood Pressure</h2>
            <br />
          </center>
          <div class="scrollme">
            <div class="col">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Systolic</th>
                    <th scope="col">Diastolic</th>
                    <th scope="col">Result</th>
                  </tr>
                </thead>
                {bloodPressure.length ? (
                  bloodPressure.map((measurementsData, index) => (
                    <Frame
                      date={measurementsData.bloodPressureDate}
                      systolic={measurementsData.numberSystolic}
                      diastolic={measurementsData.numberDiastolic}
                      result={measurementsData.bloodPressureResult}
                      index={index}
                    />
                  ))
                ) : (
                  <Loader />
                )}
              </table>
            </div>
          </div>
          ,
          <center>
            <br />
            <br />
            <h2>About Body Mass Index</h2>
            <br />
          </center>
          <div class="scrollme">
            <div class="col">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Weight</th>
                    <th scope="col">Height</th>
                    <th scope="col">Bmi</th>
                    <th scope="col">Result</th>
                  </tr>
                </thead>
                {bmi.length ? (
                  bmi.map((measurementsData, index) => (
                    <Frame1
                      date={measurementsData.bmiDate}
                      numberWeight={measurementsData.numberWeight}
                      numberHeight={measurementsData.numberHeight}
                      bmi={measurementsData.bmi}
                      bmiResult={measurementsData.bmiResult}
                      index={index}
                    />
                  ))
                ) : (
                  <Loader />
                )}
              </table>
            </div>
          </div>
          ,
          <center>
            <br />
            <br />
            <h2>About Heart Rate</h2>
            <br />
          </center>
          <div class="scrollme">
            <div class="col">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Heart Rate</th>
                    <th scope="col">Result</th>
                  </tr>
                </thead>
                {heartRate.length ? (
                  heartRate.map((measurementsData, index) => (
                    <Frame3
                      date={measurementsData.heartRateDate}
                      numberRate={measurementsData.numberRate}
                      heartRateResult={measurementsData.heartRateResult}
                      index={index}
                    />
                  ))
                ) : (
                  <Loader />
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      <AppFooter />
    </React.Fragment>
  );
}

const Loader = () => {
  return (
    <td colSpan="4">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </td>
  );
};

const Frame = ({ date, systolic, diastolic, type, result, index }) => {
  console.log(
    date + " " + systolic + " " + diastolic + " " + type + " " + result
  );
  return (
    <tbody>
      <tr>
        <td class="m-2">{index + 1}</td>
        <td>{date}</td>
        <td>{systolic}</td>
        <td>{diastolic}</td>
        <td>{result}</td>
      </tr>
    </tbody>
  );
};
const Frame1 = ({
  date,
  numberWeight,
  numberHeight,
  bmi,
  bmiResult,
  index,
}) => {
  console.log(
    date +
      " " +
      numberWeight +
      " " +
      numberHeight +
      " " +
      bmi +
      " " +
      bmiResult +
      " "
  );
  return (
    <tbody>
      <tr>
        <td class="m-2">{index + 1}</td>
        <td>{date}</td>
        <td>{numberWeight}</td>
        <td>{numberHeight}</td>
        <td>{bmi}</td>
        <td>{bmiResult}</td>
      </tr>
    </tbody>
  );
};
const Frame3 = ({ date, numberRate, heartRateResult, index }) => {
  console.log(date + " " + numberRate + " " + heartRateResult + " ");
  return (
    <tbody>
      <tr>
        <td class="m-2">{index + 1}</td>
        <td>{date}</td>
        <td>{numberRate}</td>
        <td>{heartRateResult}</td>
      </tr>
    </tbody>
  );
};

export default withRoot(Measurements);
