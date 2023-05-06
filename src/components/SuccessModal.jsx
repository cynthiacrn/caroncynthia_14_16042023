
function SuccessModal({open, setOpen}) {

  return (
    <>
      {open && (
        <div className="modal" onClick={() => setOpen(false)}>
          <div className="modal__content">
            <p>Employee Created!</p>
            <span onClick={() => setOpen(false)} className="modal__close">&times;</span>
          </div>
        </div>
      )}
    </>
  )
}

export default SuccessModal