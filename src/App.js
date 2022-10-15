import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import './App.css';

function App() {    
    return (
        <div className="App">
            <Switch>
                <Route exact path="/quiz-react">
                    <Home />
                </Route>
                <Route path="/quiz-react/play">
                    <Quiz />
                </Route>
            </Switch>
        </div>
    );
}
    
export default App;
