import * as React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "./firebase";
import "./Reset.css";
import withRoot from "./modules/withRoot";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/forgot-password");
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
        <div className="reset">
          <div className="reset__container">
            <input
              type="text"
              className="reset__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <button
              className="reset__btn"
              onClick={() => sendPasswordResetEmail(email)}
            >
              Send password reset email
            </button>

            <div>
              Don't have an account? <Link to="/sign-up">Sign Up</Link> now.
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(ForgotPassword);
