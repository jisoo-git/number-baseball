import React, { useState, useEffect } from 'react';
import { makeRandomNumber, checkGuess } from '../utils/baseball';

export default function Game() {
  const [answer, setAnswer] = useState('');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [hint, setHint] = useState(null);
  const [hintUsed, setHintUsed] = useState(false);

  useEffect(() => {
    const newAnswer = makeRandomNumber();
    setAnswer(newAnswer);
    console.log('정답:', newAnswer);
  }, []);

  const handleHint = () => {
    if (!hintUsed) {
      const randomIndex = Math.floor(Math.random() * 4);
      setHint(`힌트: ${randomIndex + 1}번째 숫자는 ${answer[randomIndex]}입니다.`);
      setHintUsed(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length !== 4 || new Set(input.split('')).size !== 4) return;
    const { strike, ball } = checkGuess(answer, input);
    setHistory((prev) => [
      { guess: input, strike, ball },
      ...prev,
    ]);
    setInput('');
  };

  return (
    <div className="max-w-xl mx-auto p-10 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl shadow-2xl border border-green-300">
      
      <h2 className="text-4xl font-extrabold mb-8 text-center text-green-800">⚾ 숫자야구 게임 🏟️</h2>
      <form onSubmit={handleSubmit} className="flex justify-center mb-6 space-x-4">
        <input
          type="text"
          maxLength={4}
          value={input}
          onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ''))}
          className="w-40 border-2 border-green-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg bg-white"
          placeholder="4자리 숫자"
        />
        <button
          type="submit"
          disabled={input.length !== 4 || new Set(input.split('')).size !== 4}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
        >
          던지기 ⚾
        </button>
      </form>
      <div className="text-center mb-4">
        <button
          onClick={handleHint}
          disabled={hintUsed}
          title={hintUsed ? '힌트 이미 사용됨' : '힌트를 얻으시겠습니까?'}
          className={`px-4 py-2 rounded-lg font-medium ${hintUsed ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 text-white'} transition duration-200`}
        >
          {hintUsed ? '힌트 사용됨' : '힌트 얻기 💡'}
        </button>
        {hint && <p className="mt-2 text-sm text-green-700 font-semibold">{hint}</p>}
      </div>
      <ul className="space-y-3">
        {history.map((item, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center bg-white p-3 rounded-lg border border-green-200 shadow-sm"
          >
            <span className="font-mono text-lg text-green-800">{item.guess}</span>
            <span className="text-sm font-semibold text-green-600">
              {item.strike}S {item.ball}B
            </span>
          </li>
        ))}
        {history.length === 0 && (
          <li className="text-center text-green-500 py-4 font-medium">기록이 없습니다. ⚾</li>
        )}
      </ul>
    </div>
  );
}