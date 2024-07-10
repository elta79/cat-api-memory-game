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
        url: item.url,
      console.log('duplicatedImage', duplicatedImageList)

      console.log('data', data)
      return data
    }
    catch (error) {
      console.error('Problem with fetch operation', error)
      return []
    }

}

  //duplicates data and adds unique id
  const duplicateData = (data) =>{
    
    const dataList = [...data, ...data].map(item =>({
      id: Math.random(),
      name: item.id,
      url: item.url,
      matched: false
    }))
    return dataList
  }

  //shuffles dataList
  const shuffleData = (dataList) => {
    const shuffledData = [...dataList] //creates copy of dataList
    
    for (let i = shuffledData.length - 1; i >= 0; i--){
      const j = Math.floor(Math.random() * (i+1))
      if (i <shuffledData.length && j < shuffledData.length){
        [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]]
      }else{
        console.warn(`Invalid indices i=${i}, j=${j}`)
      }            
    }     
    return shuffledData
  }

  const initializeGame = async() =>{
    try{
      const data = await fetchCats()
      const dataList = duplicateData(data)
      const shuffledData = shuffleData(dataList)
      
  
      setCard1(null)
      setCard2(null)
      setTurns(0)   
      setCards(shuffledData)
      setMatchedCount(0)
      setOpen(false)
    } catch (error){
      console.log('Error initializing game: ', error)
    }
    
  }

  const handleFlip = (card) => {
    if(!disabled){
      card1 ? setCard2(card) : setCard1(card)
    }      
  }

  const handleClose = () => {
    setOpen(false)
    initializeGame()
  }

  //auto start
  useEffect(() => {
    initializeGame()      
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
          
        resetTurn()
      }else{        
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [card1, card2])

  //when all cards match, display winner page
  useEffect(() =>{

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