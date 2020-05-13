import Page1 from '../components/Page1';
import Page2 from '../components/Page2';
import ceshi from '../components/ceshi';
import React from 'react';
import {Router,Route,Switch,Redirect} from 'react-router-dom';
import { createHashHistory } from "history";
const history = createHashHistory();

class RouterConfig extends React.Component{
    render(){
        return(
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
			      <div>
			        <ul>
			          <li>
			            <Link to="/">Home</Link>
			          </li>
			          <li>
			            <Link to="/ceshi">About</Link>
			          </li>
			          <li>
			            <Link to="/Page1">Dashboard</Link>
			          </li>
			        </ul>
			
			        <hr />
			
			        {/*
			          A <Switch> looks through all its children <Route>
			          elements and renders the first one whose path
			          matches the current URL. Use a <Switch> any time
			          you have multiple routes, but you want only one
			          of them to render at a time
			        */}
			        <Switch>
			          <Route exact path="/">
			            <ceshi />
			          </Route>
			          <Route path="/ceshi">
			            <ceshi />
			          </Route>
			          <Route path="/Page1">
			            <Page1 />
			          </Route>
			        </Switch>
			      </div>
			    </Router>
        )
    }
}
export default RouterConfig;
