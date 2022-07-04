import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Reminders.css";
import withRoot from "./modules/withRoot";
import AppFooter from "./modules/views/AppFooter";
import AppAppBarLogout from "./modules/views/AppAppBarLogout";
import ProductHeroMenu from "./modules/views/ProductHeroMenu";

function Reminders() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [reminder, setReminder] = useState([]);

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
    if (!user) return history.replace("/home");

    fetchUserUid();
  }, [user, loading]);

  const fetchReminders = () => {
    return db
      .collection("users")
      .doc(user?.uid)
      .collection("reminders")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var remindersData = element.data();
          setReminder((arr) => [...arr, remindersData]);
        });
      });
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/home");

    fetchReminders();
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
            <h2>About Reminders</h2>
            <br />
          </center>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Reason</th>
              </tr>
            </thead>
            {reminder.length ? (
              reminder.map((remindersData, index) => (
                <Frame
                  date={remindersData.reminderDate}
                  time={remindersData.reminderTime.toLocaleString()}
                  reason={remindersData.reminderReason}
                  index={index}
                />
              ))
            ) : (
              <Loader />
            )}
          </table>
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

const Frame = ({ date, time, reason, index }) => {
  console.log(date + " " + time + " " + reason);
  return (
    <tbody>
      <tr>
        <td class="m-2">{index + 1}</td>
        <td>{date}</td>
        <td>{time}</td>
        <td>{reason}</td>
      </tr>
    </tbody>
  );
};

export default withRoot(Reminders);
