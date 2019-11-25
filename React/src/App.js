import React from "react";
import { Container, Box } from "bloomer";
import Qa from "./components/QuestionList";
import "bulma/css/bulma.css";
import "./App.css";

const App = () => {
    return (
        <Container>
            <Qa />
        </Container>
    );
};

export default App;
