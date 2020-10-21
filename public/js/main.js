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

//use javascript and click on links
const caseLink = document.getElementById('caselink');
const biometricLink = document.getElementById('biometriclink');
const nodeLink = document.getElementById('nodelink')
const caseManagementLink = () => {
  caseLink.click();
}
const biometricEnrollLink = () => {
  biometricLink.click();
}
const nodeMonitoringLink = () => {
  nodeLink.click();
}

//hover flex child span div
const addHoverClass = (flexChildSpanDiv) => {
  flexChildSpanDiv.classList.add('flex-child-span-div-hover')
}
const removeHoverClass = (flexChildSpanDiv) => {
  flexChildSpanDiv.classList.remove('flex-child-span-div-hover')
}