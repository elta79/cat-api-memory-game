import CardBack from '/images/card-back.jpeg'

function CardItem({ card, flipCard, flipped, disabled }){

  const handleClick = () =>{
    if(!disabled){
      flipCard(card)
    }    
  }
  

  return(
    <>
      <div className='card'>
        <div className={flipped ? "flipped": ""}>
          <img 
            className='front' 
            src={card.image} 
            alt='card front'
          />
          <img 
            className='back' 
            src={CardBack} 
            onClick={handleClick} 
            alt='card back'
          /> 
        </div>
      </div>
    </>
  )
}

export default CardItem