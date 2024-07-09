function WinnerModal({ handleClose }){

  return(
    <>
      <div className='modal'>
        <p className='winner-message'>Congratulations!</p> 
        <p className='winner-message'>You matched all of the cards. You have an incredible memory.</p>
        <button onClick={() => handleClose()}>Play Again</button>
      </div>
    </>  

  )
}

export default WinnerModal