import React, { useEffect, useState } from "react";
import { auth, db, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Reminders.css";
import AppFooter from "./modules/views/AppFooter";
import withRoot from "./modules/withRoot";
import AppAppBarLogout from "./modules/views/AppAppBarLogout";
import ProductHeroMenu from "./modules/views/ProductHeroMenu";

function Questionnaires() {
  const [user, loading, error] = useAuthState(auth);
  const [firstName, setFirstName] = useState("");
  const [questionnaire, setQuestionnaire] = useState([]);

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

  const fetchQuestionnaires = () => {
    return db
      .collection("users")
      .doc(user?.uid)
      .collection("questionnaires")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var QuestionnairesData = element.data();
          setQuestionnaire((arr) => [...arr, QuestionnairesData]);
        });
      });
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/home");

    fetchQuestionnaires();
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
            <h2>About Questionnaires</h2>
            <br />
          </center>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Created At</th>
                <th scope="col">Feeling</th>
                <th scope="col">Symptoms</th>
              </tr>
            </thead>
            {questionnaire.length ? (
              questionnaire.map((QuestionnairesData, index) => (
                <Frame
                  createdAt={QuestionnairesData.createdAt}
                  feeling={QuestionnairesData.questionnaireFeeling}
                  symptoms={QuestionnairesData.questionnaireSymptom}
                  index={index}
                />
              ))
            ) : (
              <Loader />
            )}
          </table>
          ,
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

const Frame = ({ createdAt, feeling, symptoms, index }) => {
  console.log(createdAt + " " + feeling + " " + symptoms);
  return (
    <tbody>
      <tr>
        <td class="m-2">{index + 1}</td>
        <td>{createdAt}</td>
        <td>{feeling}</td>
        <td>{symptoms}</td>
      </tr>
    </tbody>
  );
};

export default withRoot(Questionnaires);
