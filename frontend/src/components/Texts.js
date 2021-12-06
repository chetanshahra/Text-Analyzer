import React, {useState} from 'react'
import axios from 'axios';

const Text = props => (
    <tr>
        <td>{props.text.text}</td>
        <td>{props.text.wordCount}</td>
        <td>{props.text.charCount}</td>
        <td>{props.text.timeToRead}</td>
    </tr>
)
export default function Texts(props) {
    const [texts, setTexts] = useState([]); 
    axios.get('/texts')
      .then(response => {
        setTexts(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
    function textList() {
        return texts.map(currenttext => {
          return <Text text={currenttext}/>;
        })
    }
    return (
        <div>
          <h3>Saved texts</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Text</th>
                <th>Number Of Words</th>
                <th>Number Of Characters</th>
                <th>Time To Read</th>
              </tr>
            </thead>
            <tbody>
              { textList() }
            </tbody>
          </table>
        </div>
      )
}
