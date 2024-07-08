function WinnerModal({ handleClose }){

  return(
    <>
      <div className='modal'>        
        <button onClick={() => handleClose()}>X</button>
        <p className='winner-message'>If you’re feeling tense, I’ve got a <span style={{color:'#FD5D64'}}>message</span> for you, change out a vowel and there’s relief in the clue.</p>        
      </div>
    </>  

  )
}

export default WinnerModal