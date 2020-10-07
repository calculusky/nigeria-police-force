//delete site
document.getSiteData = null;
const autoCloseBtn = document.getElementById('autoclosemodal')

const siteData = (btn) => {
    document.getSiteData = btn;
}

const delSiteData = () => {
    const siteInfoData = document.getSiteData;
    const siteId = siteInfoData.parentNode.querySelector('[name = siteId]').value;
    const siteDiv = siteInfoData.closest('#card-div');
    autoCloseBtn.click();
    fetch(`/admin/deletesite/${siteId}`, {
        method: 'POST'
    })
    .then(res => res.json())
    .then(resData => {
       // siteDiv.classList.add('animate__animated animate__lightSpeedOutRight')
        siteDiv.parentNode.removeChild(siteDiv);
    })
    .catch(err => {
        console.log(err)
    })
}

//logout
const logoutLink = document.getElementById('logoutLink')
       logoutLink.addEventListener('click', (event) => {
        event.preventDefault();
        document.forms['logoutForm'].submit();
      })