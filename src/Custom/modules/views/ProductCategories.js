import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexWrap: "wrap",
  },
  imageWrapper: {
    position: "relative",
    display: "block",
    padding: 0,
    borderRadius: 0,
    height: "40vh",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      height: 100,
    },
    "&:hover": {
      zIndex: 1,
    },
    "&:hover $imageBackdrop": {
      opacity: 0.15,
    },
    "&:hover $imageMarked": {
      opacity: 0,
    },
    "&:hover $imageTitle": {
      border: "4px solid currentColor",
    },
  },
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
    {
      url:
        //"https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1449710146567-1e282fa41f2f?auto=format&fit=crop&w=870&q=80",
      title: "Swimming",
      width: "40%",
    },
    {
      url: "https://images.unsplash.com/photo-1603665409265-bdc00027c217?auto=format&fit=crop&w=435&q=80",
      title: "Fitness",
      width: "20%",
    },
    {
      url: "https://images.unsplash.com/photo-1619408985784-fee9f291eb02?auto=format&fit=crop&w=387&q=80",
      title: "Walking",
      width: "40%",
    },
    {
      url: "https://images.unsplash.com/photo-1585830812416-a6c86bb14576?auto=format&fit=crop&w=1169&q=80",
      title: "Medication",
      width: "38%",
    },
    {
      url: "https://images.unsplash.com/photo-1542444592-e6880e286bb9?auto=format&fit=crop&w=361&q=80",
      title: "Nutrition",
      width: "38%",
    },
    {
      url: "https://images.unsplash.com/photo-1533418651874-33b2cdcd0c5e?auto=format&fit=crop&w=687&q=80",
      title: "Ηydration",
      width: "24%",
    },
    {
      url: "https://images.unsplash.com/photo-1609587611471-be23d7344d81?auto=format&fit=crop&w=1170&q=80",
      title: "Sleep",
      width: "40%",
    },
    {
      url: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1170&q=80",
      title: "Examination",
      width: "20%",
    },
    {
      url: "https://images.unsplash.com/photo-1598901865264-4f5f30954532?auto=format&fit=crop&w=1197&q=80",
      title: "Relax",
      width: "40%",
    },
  ];

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        Tips for a healthy life
      </Typography>
      <div className={classes.images}>
        {images.map((image) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);
