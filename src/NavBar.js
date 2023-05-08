import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    height: "100%",
    margin: "0 8px",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

function Navbar({ manifest }) {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Your Website Name
        </Typography>
        <nav>
          {Object.keys(manifest).map((slug) => (
            <Button
              key={slug}
              href={`?page=${slug}`}
              color="inherit"
              variant="text"
              className={classes.button}
            >
              {manifest[slug].title}
            </Button>
          ))}
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
