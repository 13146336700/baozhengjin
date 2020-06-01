// import Page1 from "../components/Page1";
// import Page2 from "../components/Page2";
import Page from "./components/Page";
import rule from "./components/rule/rule";
import Violation from "./components/Violation/Violation";
import Punishment from "./components/Margin/Punishment/Punishment";
import Already_paid from "./components/Margin/Already_paid/Already_paid";
import band_paid from "./components/Margin/band_paid/band_paid";
import permanent from "./components/Margin/band_paid/permanent";
import penaltiesDetails from "./components/Margin/penaltiesDetails/penaltiesDetails";
import Pay_band from "./components/Margin/Pay_band/Pay_band";
import advisory from "./components/advisory/advisory";
import good from "./components/Margin/good/good";
import React from "react";

import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createHashHistory } from "history";
const hashHistory = createHashHistory();

class RouterConfig extends React.Component {
  render() {
    return (
      // <Router history={history}>
      //     <Switch>
      //         <Route path='/' exact render={()=>(
      //             <Redirect to='/ceshi'/>
      //         )}/>
      //         <Route path='/Page1' component={Page1}/>
      //         <Route path='/Page2' component={Page2}/>
      //     </Switch>
      // </Router>
      <Router>
        <Router history={hashHistory}>
          <Route path="/ceshi" exact component={ceshi} />
          <Route path="/Page/:userId" exact component={Page} />
          <Route path="/rule" exact component={rule} />
          <Route path="/Violation/:userId" exact component={Violation} />
          <Route path="/Punishment/:userId" exact component={Punishment} />
          <Route path="/Already_paid/:userId" exact component={Already_paid} />
          <Route path="/band_paid/:userId" exact component={band_paid} />
          <Route path="/permanent/:userId" exact component={permanent} />
          <Route path="/penaltiesDetails" exact component={penaltiesDetails} />
          <Route path="/advisory" exact component={advisory} />
          <Route path="/good" exact component={good} />
          <Route path="/Pay_band/:userId" exact component={Pay_band} />
        </Router>
      </Router>
    );
  }
}
export default RouterConfig;
