import React, { useContext, useState } from "react";
import { Container, Field, Control, Label, Input, Box, Button } from "bloomer";
import StateContext from "../context";
import Axios from "axios";
import "bulma/css/bulma.css";

const List = () => {
    const [value, dispatch] = useContext(StateContext);
    let [newQuestion, setQuestion] = useState();

    const handleChangeQuestion = e => {
        setQuestion(e.target.value);
    };

    const handleSubmit = async e => {
        e.persist();
        e.preventDefault();
        const response = await getResponse(newQuestion);
        const q = response.data.magic.question;
        const a = response.data.magic.answer;
        const t = response.data.magic.type;

        updateState(q, a, t);
        postQuestion(q, a, t);
    };

    const updateState = (q, a, t) => {
        dispatch({
            type: "addResponse",
            newQuestion: q,
            newAnswer: a,
            newType: t
        });
    };

    const postQuestion = async (q, a, t) => {
        const url = `/api/add`;
        const body = JSON.stringify({
            question: q,
            answer: a,
            type: t
        });

        Axios.post(url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    };

    const getResponse = async userQuestion => {
        let encodedQuestion = encodeURI(userQuestion);
        let url = "https://8ball.delegator.com/magic/JSON/" + encodedQuestion;
        const response = await Axios.get(url);
        return response;
    };

    return (
        <>
            <Container style={{ textAlign: "center", width: "50%" }}>
                <form onSubmit={e => handleSubmit(e)}>
                    <Field>
                        <Label>Ask me anything!</Label>
                        <Control>
                            <Input
                                type="text"
                                name="question"
                                placeholder="Ask me anything"
                                onChange={e => handleChangeQuestion(e)}
                            />
                        </Control>
                    </Field>

                    <Field>
                        <Control>
                            <Button
                                type="submit"
                                value="Submit"
                                isColor="primary"
                            >
                                Submit
                            </Button>
                        </Control>
                    </Field>
                </form>

                <Box style={{ width: "50%" }}>
                    <ul>
                        {Object.keys(value.data).map(response => {
                            return (
                                <li key={response}>
                                    <p>{value.data[response].question}</p>
                                    <p>{value.data[response].answer}</p>
                                    <p>{value.data[response].type}</p>
                                </li>
                            );
                        })}
                    </ul>
                </Box>
            </Container>
        </>
    );
};

export default List;
