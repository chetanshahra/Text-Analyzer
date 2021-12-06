import React, {useState} from 'react'
import axios from 'axios';


export default function TextForm(props) {
    const [text, setText] = useState({text: '', wordCount: 0, charCount: 0, timeToRead: 0}); 

    function handleUpClick(){
        let newText = text;
        setText({ text: newText.text.toUpperCase(), wordCount: text.wordCount, charCount: text.charCount, timeToRead: text.timeToRead  })
    }

    const handleLoClick = ()=>{ 
        let newText = text;
        setText({ text: newText.text.toLowerCase(), wordCount: text.wordCount, charCount: text.charCount, timeToRead: text.timeToRead  })
    }
    const handleClearClick = () => {
        let newText = { text: '', wordCount: 0, charCount: 0, timeToRead: 0 };
        setText(newText)
    }

    const handleOnChange = (event) => {
        let newText = event.target.value;
        let wordCount = (newText.length === 0 || newText[newText.length - 1] === ' ') ? newText.split(" ").length - 1 : newText.split(" ").length
        setText({ text: newText, wordCount: wordCount,  charCount: newText.length, timeToRead: wordCount*0.008 })
    }
    const handleSave = () => {
        axios.post('/save', text)
    .then(res => console.log(res.data));
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(text.text); 
    }

    const handleExtraSpaces = () => {
        let newText = text.text.split(/[ ]+/);
        setText({text: newText.join(" ")});
    }

    // console.log(text);
    return (
        <>
        <div className="container"> 
            <h1 className='mb-4'>{props.heading}</h1>
            <div className="mb-3"> 
            <textarea maxlength="250" className="form-control" value={text.text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
            </div>
            <button disabled={text.charCount===0} className="btn btn-dark mx-1 my-1" onClick={handleUpClick}>UPPERCASE</button>
            <button disabled={text.charCount===0} className="btn btn-dark mx-1 my-1" onClick={handleLoClick}>lowercase</button>
            <button disabled={text.charCount===0} className="btn btn-dark mx-1 my-1" onClick={handleClearClick}>Clear</button>
            <button disabled={text.charCount===0} className="btn btn-dark mx-1 my-1" onClick={handleCopy}>Copy Text</button>
            <button disabled={text.charCount===0} className="btn btn-dark mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            <button disabled={text.charCount===0} className="btn btn-dark mx-1 my-1" onClick={handleSave}>Save</button>
        </div>
        <div className="container my-3">
            <h6>{ text.text}</h6>
            <h3>Summary</h3>
            <p>Number of Characters = {text.charCount}</p>
            <p>Number of Words = {text.wordCount}</p>
            <p>Time Required to Read = {text.timeToRead} Minutes</p>
        </div>
        </>
    )
}
