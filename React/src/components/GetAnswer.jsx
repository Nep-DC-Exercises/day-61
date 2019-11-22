import React, { useContext, useState } from "react";
import StateContext from "../context";
import Axios from "axios";

const List = () => {
    const [value, dispatch] = useContext(StateContext);
    const [newQuestion, setQuestion] = useState();

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
            <form onSubmit={e => handleSubmit(e)}>
                <label>
                    Ask me anything!
                    <input
                        type="text"
                        name="question"
                        placeholder="Ask me anything"
                        onChange={e => handleChangeQuestion(e)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
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
        </>
    );
};

export default List;
