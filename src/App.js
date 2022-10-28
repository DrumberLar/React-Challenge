import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [color, setColor] = useState('');
  const [answers, setAnswers] = useState([]);
  const [correctPick, setCorrectPick] = useState(null);

  const generateRandomColor = () => {
    let maxVal = 0xffffff; // 16777215.
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    const randomColor = `#${randColor.toUpperCase()}`;
    return randomColor;
  };

  const displayRandomBoxes = () => {
    return answers.map((answer) => {
      return (
        <button
          className="color-box"
          key={answer}
          onClick={() => {
            if (answer === color) {
              setCorrectPick(true);
              generateAnswersAndColor();
            } else {
              setCorrectPick(false);
            }
          }}
        >
          {answer}
        </button>
      );
    });
  };
  const generateAnswersAndColor = () => {
    const correctColor = generateRandomColor();
    setColor(correctColor);
    setAnswers(
      [correctColor, generateRandomColor(), generateRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  };

  useEffect(() => {
    generateAnswersAndColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="App" style={{ background: color }}></div>
      <div className="color-boxes">{displayRandomBoxes()}</div>
      {correctPick === true && <div className="text-correct">Correct!</div>}
      {correctPick === false && (
        <div className="text-wrong">Wrong! Try Again!</div>
      )}
      {correctPick === null && (
        <div className="text-general">Guess the correct answer!</div>
      )}
    </div>
  );
};

export default App;
