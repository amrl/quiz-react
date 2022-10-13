import React from "react";
import {Switch, Route} from "react-router-dom";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import './App.css';

function App() {    
    return (
        <div className="App">
            <Switch>
                <Route exact path="/quiz-react">
                    <Start />
                </Route>
                <Route path="/quiz-react/play">
                    <Quiz />
                </Route>
            </Switch>
        </div>
    );
}
    
export default App;
