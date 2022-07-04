import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";

const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.secondary.light,
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src={require("../../../assets/productCurvyLines.png")}
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          About
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <img
                  className={classes.image}
                  src={require("../../../assets/Public-health-icon.svg")}
                  alt="suitcase"
                />
                <Typography variant="h6" className={classes.title}>
                  Health
                </Typography>
                <Typography variant="h5">
                  {
                    "Health is a state of complete physical, mental and social well being. "
                  }
                  {
                    "A healthy lifestyle keeps you fit, energetic and at reduced risk for disease."
                  }
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <img
                  className={classes.image}
                  src={require("../../../assets/productValues2.svg")}
                  alt="graph"
                />
                <Typography variant="h6" className={classes.title}>
                  HealthBe
                </Typography>
                <Typography variant="h5">
                  {
                    "How you feel affects every single day of your life, which is why you work so hard to get well and stay well. "
                  }
                  {
                    "You're on a journey to health and wellness. HealhBe is right here with you."
                  }
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <img
                  className={classes.image}
                  src={require("../../../assets/productValues3.svg")}
                  alt="clock"
                />
                <Typography variant="h6" className={classes.title}>
                  Health Chatbot
                </Typography>
                <Typography variant="h5">
                  {
                    "A healthcare chatbot is a new technology that conducts a conversation with users via auditory "
                  }

                  {
                    "or textual methods in order to help users with guidance, medication management and dosage and symptom tracking."
                  }
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
