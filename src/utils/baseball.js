// src/utils/baseball.js

/**
 * 4자리 중복 없는 숫자(문자열) 생성
 * @returns {string} e.g. "3951"
 */
export function makeRandomNumber() {
  const digits = [0,1,2,3,4,5,6,7,8,9];
  let result = '';

  for (let i = 0; i < 4; i++) {
    // 남은 숫자 중 하나를 골라서
    const idx = Math.floor(Math.random() * digits.length);
    result += digits[idx];
    // 사용한 숫자는 제거
    digits.splice(idx, 1);
  }

  return result;
}

/**
 * 사용자의 4자리 입력과 정답을 비교하여
 * 스트라이크/볼 개수를 반환
 * @param {string} answer  - 정답 (숫자 4자리 문자열)
 * @param {string} guess   - 사용자 입력 (숫자 4자리 문자열)
 * @returns {{strike:number, ball:number}}
 */
export function checkGuess(answer, guess) {
  let strike = 0;
  let ball = 0;

  for (let i = 0; i < 4; i++) {
    if (guess[i] === answer[i]) {
      strike += 1;
    } else if (answer.includes(guess[i])) {
      ball += 1;
    }
  }

  return { strike, ball };
}
