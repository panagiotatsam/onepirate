import * as React from "react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "./firebase";
import "./SignUp.css";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import "./modules/views/ProductHeroMenu.css";
import ProductHeroLayout from "./modules/views/ProductHeroLayout";
import { withStyles } from "@material-ui/core/styles";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const signup = () => {
    registerWithEmailAndPassword(firstName, lastName, phone, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/sign-in");
  }, [user, loading]);

  return (
    <React.Fragment>
      <AppAppBar />
      <div
        style={{
          backgroundImage: `url("https://images.unsplash.com/flagged/photo-1578686588548-7826677e649e?&auto=format&fit=crop&w=1170&q=80")`,
          backgroundColor: "#7fc7d9", // Average color of the background image.
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="register">
          <div className="register__container">
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="center"
            >
              Sign Up
            </Typography>
            <Typography variant="body2" align="center">
              <div>
                <Link to="/sign-in"> Already have an account? </Link>
              </div>
            </Typography>

            <br />

            {/* <Grid container spacing={2}>
            <Grid item xs={12} sm={6}> */}
            <input
              type="text"
              className="register__textBox"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />

            {/* </Grid>
            <Grid item xs={12} sm={6}> */}
            <input
              type="text"
              className="register__textBox"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />

            {/* </Grid>
          </Grid> */}
            <input
              type="number"
              className="register__textBox"
              value={phone}
              onChange={(e) => setPhone(e.target.valueAsNumber)}
              placeholder="Phone Number"
            />
            <input
              type="text"
              className="register__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <input
              type="password"
              className="register__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button className="register__btn" onClick={signup}>
              Register
            </button>
          </div>
        </div>
      </div>

      <AppFooter />
    </React.Fragment>
  );
}
export default withRoot(SignUp);
