import React from 'react';
import ShoppingHub from './ShoppingHub';
import { Container, CssBaseline  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ReactDOM from 'react-dom'

const useStyles = makeStyles({
  root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh"
  }
});

function App() {
  const classes = useStyles();
  return (
    <Container disableGutters className={classes.root} maxWidth={false}>
      <CssBaseline  />
      <ShoppingHub />
    </Container>
  );
}

ReactDOM.render(<App />, document.getElementById('app'))
