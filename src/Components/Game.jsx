/* eslint-disable no-mixed-operators */
import { useState } from 'react';
import styled from 'styled-components';
import { randomWord } from './Randomizer';

function Game() {
  const [currentWord, setCurrentWord] = useState(randomWord())
  const [input, setInput] = useState('')
  const [correct, setCorrect] = useState(0)

  const [showMistakes, setShowMistakes] = useState(false)
  const [mistakesCount, setMistakesCount] = useState(0)
  const [mistakes, setMistakes] = useState([])
  const [mistake, setMistake] = useState([])

  const [start, setStart] = useState(false)
  const [end, setEnd] = useState(false)

  const [rating, setRating] = useState(100)
  const [difficult, setDifficult] = useState(10)

  const difficultHandler = (event) => {
    setDifficult(Number(event.target.value))
  }
  const onStart = () => {
    if (!start) {
      setStart(true)
    }
  }
  const inputChangeHandler = (event) => {
    setInput(event.target.value)
  }
  const checkWord = (event) => {
    event.preventDefault()
    if (input.trim() === currentWord && correct < difficult) {
      setCorrect((prev) => prev + 1)
      setCurrentWord(randomWord())
    }
    if (input.trim() !== currentWord && input.trim() !== '') {
      setMistakesCount((prev) => prev + 1)
      mistakes.push(currentWord)
      mistake.push(input.trim())
      if (rating > 0) {
        setRating((prev) => prev - 5)
      }
    }
    if (input.trim() === currentWord && correct === difficult) {
      setEnd(true)
      setInput('')
      setCurrentWord('finish')
    }
    setInput('')
  }
  const retry = () => {
    setCorrect(0)
    setInput('')
    setMistakesCount(0)
    setMistakes([])
    setMistake([])
    setCurrentWord(randomWord())
    setShowMistakes(false)
    setEnd(false)
    setStart(false)
  }
  const showMistakesHandler = () => {
    if (mistakes.length >= 1) { setShowMistakes((prev) => !prev) }
  }
  return (
    <div>
      <Container>
        <Block onSubmit={checkWord}>
          <StyledWord>{currentWord}</StyledWord>
          <StyledInput onFocus={onStart} disabled={end} placeholder={currentWord} value={input} onChange={inputChangeHandler} type="text" />
          {end === false ? (
            <CorrectBlock>
              <StyledCorrect ended={end}>
                {correct}
              </StyledCorrect>
              /
              <StyledGoal onChange={difficultHandler} disabled={start}>
                <StyledOption value={difficult}>10</StyledOption>
                <StyledOption value={20}>20</StyledOption>
                <StyledOption value={30}>30</StyledOption>
                <StyledOption value={40}>40</StyledOption>
                <StyledOption value={50}>50</StyledOption>
              </StyledGoal>
            </CorrectBlock>
          ) : (
            <RetryBlock>
              <StyledResult>
                <p>Result:</p>
                <Result>
                  {correct}
                  /
                  {difficult}
                </Result>
              </StyledResult>
              <StyledResult>
                <p>Mistakes:</p>
                <Result variant="mistake" onClick={showMistakesHandler}>
                  {mistakesCount}
                </Result>
              </StyledResult>
              <StyledResult>
                <Result rating={rating}>{rating >= 70 && 'Good' || rating <= 50 && 'Bad'}</Result>
              </StyledResult>
              <StyledRetry onClick={retry} src="https://static.thenounproject.com/png/1921228-200.png" alt="none" />
            </RetryBlock>
          )}
        </Block>
        {showMistakes && (
        <StyledMistakes>
          <div>
            {mistakes.map((el) => (
              <Mistake>{el}</Mistake>
            ))}
          </div>
          <div>
            {mistake.map((el) => (
              <p style={{ color: 'red' }}>
                {el}
              </p>
            ))}
          </div>
        </StyledMistakes>
        )}
      </Container>
    </div>
  );
}

export default Game;

const Container = styled.div`
 height: 80vh;
 display: flex;
 justify-content: center;
 align-items: center;
`
const Block = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`
const StyledInput = styled.input`
 font-size: 35px;
 font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
 border: none;
 outline: none;
 border-bottom: 1px solid;
 &:focus{
  border-bottom: 2px solid;
 }
 &:disabled{
  background: none;
 }
`
const StyledWord = styled.h1`
 border-bottom: 1px solid;
 user-select: none;
 font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`
const CorrectBlock = styled.div`
 display: flex;
 align-items: center;
 gap: 10px;
font-size: 35px;
font-family: Verdana, Geneva, Tahoma, sans-serif;
user-select: none;
`
const StyledCorrect = styled.p`
color: ${(props) => (props.ended ? '#286f28' : 'gray')};
`
const StyledGoal = styled.select`
   color: #286f28;
   border: none;
   outline: none;
   cursor: pointer;
   &:disabled{
   opacity: 0.9;
   cursor: default;
   appearance: none;
  }
font-size: 34px;
font-family: Verdana, Geneva, Tahoma, sans-serif;
user-select: none;
`
const StyledOption = styled.option`
 font-size: 25px;
`
const StyledResult = styled.p`
font-size: 35px;
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
user-select: none;
display: flex;
align-items: center;
gap: 5px;
font-weight: 600;
`
const Result = styled.p`
 color: ${(props) => (props.variant === 'time' && 'orange') || (props.variant === 'mistake' && '#bd0404') || (props.rating >= 70 && 'green') || (props.rating <= 50 && 'red') || 'green'};
 ${(props) => props.variant === 'mistake' && 'cursor: pointer;'}
`
const RetryBlock = styled.div`
   display: flex;
   align-items: center;
   flex-direction: column;
   gap: 5px;
`
const StyledRetry = styled.img`
  width: 50px;
  cursor: pointer;
  margin-top: 50px;
`
const StyledMistakes = styled.div`
 background: white;
 box-shadow: 0px 0px 10px lightgray;
 border-radius: 5px;
 padding: 20px;
 font-size: 25px;
 font-family: Verdana, Geneva, Tahoma, sans-serif;
 position: fixed;
 margin-left: 800px;
 overflow: auto;
 height: max-content;
 max-height: 400px;
 display: flex;
 &::-webkit-scrollbar {
  width: 5px;
}
&::-webkit-scrollbar-thumb {
  background-color: #909090;
  border-radius: 20px;
}
 @media(max-width: 600px){
  max-height: 200px;
  margin-left: 0px;
  margin-top: 650px;
 }
`
const Mistake = styled.li`
list-style: decimal;
width: 200px;
`
