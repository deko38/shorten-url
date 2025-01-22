import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");
    const [newUrl, setNewUrl] = useState(null);


    const inputChangeHandler = (e) => {
        setInput(e.target.value);
    };


    const addUrlHandler = () => {
        if (input) {
            setList([...list, { original: input, shortened: null }]);
            setNewUrl(input);
        } else {
            alert("Please enter url in inout");
        }
    };


    useEffect(() => {
        if (newUrl) {
            axios.post("https://cleanuri.com/api/v1/shorten", {  newUrl })

                .then((response) => {
                    setList((prevList) =>
                        prevList.map((item) =>
                            item.original === newUrl  ? { ...item, shortened: response.data.result_url }
                                : item
                        )
                    );

                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [newUrl]);

    return (
        <div>
            <h1>URL Shortener by deko</h1>
            <input type="text"  placeholder="Enter url to shoreten it" value={input}
                onChange={inputChangeHandler}
            />

            <button onClick={addUrlHandler}>
                shorten url
            </button>

            <ul>
                {list.map((item, index) => (
                    <li key={index}>
                        <p>Original URL: {item.original}</p>
                        <p>
                            Shortened URL:{" "}
                            {item.shortened ? (
                                <a href={item.shortened} >
                                    {item.shortened}
                                </a>
                            ) : (
                                "shortening failed"
                            )}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
