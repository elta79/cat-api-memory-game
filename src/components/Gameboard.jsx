import { useEffect, useState } from "react"
import CardItem from "./CardItem"
import WinnerModal from "./WinnerModal"

function Gameboard( ){
  const [ cards, setCards ] = useState([])
  const [ turns, setTurns ] = useState(0)
  const [ card1, setCard1 ] = useState(null)
  const [ card2, setCard2 ] = useState(null)
  const [ disabled, setDisabled ]= useState(false)
  const [ matchedCount, setMatchedCount ] = useState(0)
  const [ open, setOpen ] = useState(false)

  const apiUrl = import.meta.env.VITE_CAT_API_KEY

  const fetchCats = async() =>{
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=8',{
        method: 'GET',
        headers: {
          'x-api-key': apiUrl
        }
      })

      if(!response.ok){
        throw new Error('Network response not okay')
      }

      const data = await response.json()
      const imageList = data.map(item => ({ 
        name: item.id,
        url: item.url,
        matched: false        
      }))

      const duplicatedImageList = imageList.flatMap(item => [
        {...item, key:`${item.name}-1`},
        {...item, key: `${item.name}-2`}
      ])
      
      console.log('duplicatedImage', duplicatedImageList)

      return duplicatedImageList
    }
    catch (error) {
      console.error('Problem with fetch operation', error)
      return []
    }
  }
 
  const shuffleCards = async() => {

    const imageList = await fetchCats()
    
    const shuffledCards = imageList.sort(()=> Math.random() - 0.5)
    setCard1(null)
    setCard2(null)
    setTurns(0)   
    setCards(shuffledCards)
    setMatchedCount(0)
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
    shuffleCards()
  }

  const handleFlip = (card) => {
    if(!disabled){
      card1 ? setCard2(card) : setCard1(card)
    }      
  }

  //auto start
  useEffect(() => {
    shuffleCards()      
  }, [])   

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
    // console.log("matched count", matchedCount)
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
            key={card.key}
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