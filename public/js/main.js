function submitForm(formID, buttonID) {
    console.log(buttonID, '---')
    const button = document.getElementById(buttonID);
    const spanElement = document.createElement('span');
    button.addEventListener('click', (event) => {
      event.preventDefault();
      spanElement.classList.add('spinner-border', 'spinner-border-sm');
      const attributes = ['role', 'aria-hidden'];
      const values = ['status', 'true'];
      for(let i=0; i<attributes.length; i++){
          spanElement.setAttribute(attributes[i], values[i])
      }
      button.setAttribute('disabled', true);
      button.appendChild(spanElement);
      document.forms[formID].submit();         
    })
}