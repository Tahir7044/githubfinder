import React, { Fragment } from "react";
import Alert from "../layout/Alert";
import Searchbar from "../users/search";
import Users from "../users/Users";
const Home = () => (
  <Fragment>
    <Alert />
    <Searchbar />
    <Users />
  </Fragment>
);

export default Home;
