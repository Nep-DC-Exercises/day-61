import React, { useReducer, useState } from "react";
import { StateProvider } from "../context";
import GetAnswer from "./GetAnswer";
import nextId from "react-id-generator";

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
            <h1>Magic Eight Ball</h1>
            <StateProvider value={useReducer(reducer, initialState)}>
                <GetAnswer />
            </StateProvider>
        </div>
    );
};

export default QuestionList;
