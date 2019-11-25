import React, { useReducer } from "react";
import { StateProvider } from "../context";
import GetAnswer from "./GetAnswer";
import {Container, Box} from "bloomer"
import nextId from "react-id-generator";
import 'bulma/css/bulma.css'
import magicBall from "../images/magicBallStart.png"

const QuestionList = () => {
    const initialState = {
        data: {
            1001: {
                question: "",
                answer: "",
                type: ""
            }
        }
    };

    const reducer = (state, action) => {
        let randomId = nextId();
        switch (action.type) {
            case "addResponse":
                return {
                    ...state,
                    data: {
                        ...state.data,
                        [randomId]: {
                            question: action.newQuestion,
                            answer: action.newAnswer,
                            type: action.newType
                        }
                    }
                };
            default:
                return state;
        }
    };

    return (
        <div>
            <Container style={{textAlign: "center" }}>
                <Box style={{backgroundColor: "blanchedalmond"}}>
                    <h1 style={{fontSize: "1.6rem", fontWeight: "700"}}>Magic Eight Ball</h1>
                    <img src={magicBall} style={{width: "25%"}}></img>
                </Box>
            </Container>
            <StateProvider value={useReducer(reducer, initialState)}>
                <GetAnswer />
            </StateProvider>
        </div>
    );
};

export default QuestionList;
