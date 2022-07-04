import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import SignIn from "./Custom/SignIn";
import SignUp from "./Custom/SignUp";
import Home from "./Custom/Home";
import ForgotPassword from "./Custom/ForgotPassword";
import Dashboard from "./Custom/Dashboard";
import Reminders from "./Custom/Reminders";
import Measurements from "./Custom/Measurements";
import Questionnaires from "./Custom/Questionnaires";
import firebase from "./Custom/firebase";
import { Link } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Router>
          <div>
            <Route exact path="/" component={() => <Redirect to="/home" />} />
            <Route exact path="/home" component={Home} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/reminders" component={Reminders} />
            <Route path="/measurements" component={Measurements} />
            <Route path="/questionnaires" component={Questionnaires} />
          </div>
        </Router>
      </>
    );
  }
}
