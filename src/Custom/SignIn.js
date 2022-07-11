import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import "./SignIn.css";
import withRoot from "./modules/withRoot";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/dashboard");
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
        <div className="login">
          <div className="login__container">
            <Typography
              variant="h4"
              gutterBottom
              marked="center"
              align="center"
            >
              Sign In
            </Typography>
            <Typography variant="body2" align="center">
              <div>
                <Link to="/sign-up"> Not a member yet? </Link>
              </div>
            </Typography>
            <br />
            <input
              type="text"
              className="login__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <input
              type="password"
              className="login__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              className="login__btn"
              onClick={() => signInWithEmailAndPassword(email, password)}
            >
              Login
            </button>

            <Typography align="center">
              <div>
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Typography>
          </div>
        </div>
      </div>

      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignIn);
