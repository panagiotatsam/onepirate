import React from "react";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import withRoot from "./modules/withRoot";
import AppFooter from "./modules/views/AppFooter";
import AppAppBarLogout from "./modules/views/AppAppBarLogout";
import KommunicateChat from "./chat";
import ProductHeroMenu from "./modules/views/ProductHeroMenu";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);

  const history = useHistory();

  const fetchUserUid = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) return history.replace("/dashboard");

    fetchUserUid();
  }, [user, loading]);

  return (
    <React.Fragment>
      <AppAppBarLogout />
      <ProductHeroMenu />
      <KommunicateChat />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Dashboard);
