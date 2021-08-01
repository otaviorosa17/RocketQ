export default function Modal() {
  const modalWrapper = document.querySelector('.modal-wrapper')
  const cancelButton = document.querySelector('.button.cancel')

  cancelButton.addEventListener('click', close)

  function open() {
    modalWrapper.classList.add('show')
  }
  function close() {
    modalWrapper.classList.remove('show')
  }

  return {
    open,
    close
  }
}
