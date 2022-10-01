import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import './App.css';

function App() {
    const [hasStarted, setHasStarted] = React.useState(true);
    
    function handleStartClick() {
        setHasStarted(true);
    }
    
    return (
        <div className="App">
            {hasStarted ?
                <Quiz />
            :
                <Start
                    handleStartClick={handleStartClick}
                />
            }
        </div>
        );
    }
    
export default App;
