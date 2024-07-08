import { useEffect, useState } from "react"
import CardItem from "./CardItem"
import { ImageList } from "../helpers/ImageList"
import WinnerModal from "./WinnerModal"


function Gameboard( ){
  const [ cards, setCards ] = useState([])
  const [ turns, setTurns ] = useState(0)
  const [ card1, setCard1 ] = useState(null)
  const [ card2, setCard2 ] = useState(null)
  const [ disabled, setDisabled ]= useState(false)
  const [ matchedCount, setMatchedCount ] = useState(0)
  const [ open, setOpen ] = useState(false)

  const handleClose = () => {
    setOpen(false)
    shuffleCards()
  }

  const shuffleCards = () => {
    const shuffledCards = [...ImageList, ...ImageList]
      .sort(()=> Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random()}))

    setCard1(null)
    setCard2(null)
    setTurns(0)   
    setCards(shuffledCards)
    setMatchedCount(0)
    setOpen(false)
    console.log(cards)
  }

    //auto start
    useEffect(() => {
      shuffleCards()
    }, []) 

  const handleFlip = (card) => {
    if(!disabled){
      card1 ? setCard2(card) : setCard1(card)
    }      
  }

//compare cards
  useEffect(() =>{
    
    if(card1 && card2){
      setDisabled(true)
      if(card1.name === card2.name){
        
        //update card prop to matched
        setCards(prevCards => {
          return prevCards.map(card =>{
            if (card.name === card1.name){                                 
              return {...card, matched: true}              
            }else{
              return card
            }
          })
        })  
        setMatchedCount(prevMatchedCount => prevMatchedCount + 1)
        // console.log('matched count: ', matchedCount)           
        resetTurn()
      }else{        
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [card1, card2])

  //when all cards match, display winner page
  useEffect(() =>{
    console.log("matched count", matchedCount)
    if (matchedCount === 8){      
      setTimeout(() => setOpen(true), 1250)
    }
  }, [matchedCount])
  
  //reset choices & increment turn
  const resetTurn = () => {
    setCard1(null)
    setCard2(null)
    setTurns(prev => prev + 1)
    setDisabled(false)
    
  }




  return(
    <> 
      <div className='game-board'>
        {cards.map((card) => (                  
          <CardItem 
            key={card.id}
            card={card} 
            flipCard={()=>handleFlip(card)}
            flipped={card === card1 || card === card2 || card.matched}
            disabled={disabled}
          />                
        ))}        
      </div>
      {open ? <WinnerModal 
      handleClose={handleClose}/>:""}      
      <div className='turns'>Turns:  {turns}</div>      
    </>
  )
}

export default Gameboard