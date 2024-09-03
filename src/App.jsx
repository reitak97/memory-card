import { useState, useEffect} from 'react'
import './App.css'
import Card from './components/Card'
import Message from './components/Message'
import Score from './components/Score'


function App() {
  const [cards, setCards] = useState([])
  const [score, setScore] = useState(0)
  const [clickedCards, setClickedCards] = useState([])
  const [message, setMessage] = useState('')
  const [highScore, setHighScore] = useState(0)


  useEffect(() =>{
    fetchImages()
  }, [])
  
  const fetchImages = async () => {
    try{
      const response = await fetch('https://api.unsplash.com/photos?client_id=FZvQkiJcRfnMhKC1gHNjkMSrVxhGq5tfX310wFJ_8rg')
    if (!response.ok) {
      throw new Error('Something went wrong')
    }
    const data = await response.json()
    const imageUrls = data.map(image => image.urls.small)
    setCards(imageUrls)
  } catch (error) {
    console.log(error)
  }
  
}

const handleClick = (url) => {
  if (clickedCards.includes(url)) {
    setMessage('Game over! You clicked on the same image twice!')
    setScore(0)
    setClickedCards([])
  } else {
    setClickedCards([...clickedCards, url])
    setScore(score + 1)
    if (score >= highScore) {
      setHighScore(score + 1)
    }
    setMessage('Good job! Keep going!')
    shuffledCards()
  }
}


  const shuffledCards = () =>{
   setCards(cards.sort(() => Math.random() - 0.5))
  } 

  const resetGame = () => {
    setScore(0)
    setClickedCards([])
    setMessage('Game reset! Try again!')
    shuffledCards()
  }


  return (
    <div>
     <Message message={message} />
      <Score score={score} highScore={highScore} />
      <button className ="reset" onClick={resetGame}>Reset Game</button>
      <div className="cards">
        {cards.map((url, index) => (
          <Card
            key={index}
            src={url}
            onClick={() => handleClick(url)}
          />
        ))}
      </div>
    </div>
  )
}
  
  

export default App
