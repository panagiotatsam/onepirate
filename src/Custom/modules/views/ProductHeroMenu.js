import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import "./ProductHeroMenu.css";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";

const backgroundImage =
  //"https://images.unsplash.com/photo-1617881770125-6fb0d039ecde?auto=format&fit=crop&w=872&q=80";

  //"https://images.unsplash.com/photo-1612540943977-98ce54bea8a1?auto=format&fit=crop&w=870&q=80";
  "https://images.unsplash.com/flagged/photo-1578686588548-7826677e649e?&auto=format&fit=crop&w=1170&q=80";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center",
  },
  button: {
    minWidth: 10,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function ProductHeroMenu(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <Typography color="inherit" align="center" variant="h2" marked="center">
        HOME
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Protect your health, Protect yourself.
      </Typography>
      <div class="container">
        <div class="row">
          <div class="col-sm-4 pt-2">
            <button class="btn button__bg btn-block">
              <a class="text-light" href="/reminders">
                Reminders
              </a>
            </button>
          </div>
          <div class="col-sm-4 pt-2">
            <button class="btn button__bg btn-block">
              <a class="text-light" href="/measurements">
                Measurements
              </a>
            </button>
          </div>
          <div class="col-sm-4 pt-2">
            <button class="btn button__bg btn-block">
              <a class="text-light" href="/questionnaires">
                Questionnaires
              </a>
            </button>
          </div>
        </div>
      </div>
      {/*       
      <ButtonGroup variant="text" aria-label="text button group">
        <Button
          color="secondary"
          variant="contained"
          size="small"
          className={classes.button}
          component="a"
          href="/Reminders"
        >
          Reminders
        </Button>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          className={classes.button}
          component="a"
          href="/Measurements"
        >
          Measurements
        </Button>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          className={classes.button}
          component="a"
          href="/Questionnaires"
        >
          Questionnaires
        </Button> 
      </ButtonGroup>*/}
    </ProductHeroLayout>
  );
}

ProductHeroMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHeroMenu);
