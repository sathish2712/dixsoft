const modelInput = document.getElementById('modelInput')
const costInput = document.getElementById('costInput')
const mgs = document.querySelector('#mgs')
const form = document.querySelector('form.pure-form')
mgs.textContent = ''
form.addEventListener('submit' , (e) => {
    e.preventDefault()
    const model = modelInput.value
    const cost = costInput.value
    fetch(' https://vpsapg.dixsoft.online/product/save?prod_name=' + model + '&unit_cost=' + cost, {
        method: 'POST',
        headers: { 
            "Content-type": "application/json"
        },
       
    }).then((response) => {
        response.json().then ((data) => {
            if(data.success == -1){
                alert('Please provide the required details')
            }else if(data.success == 1){
                mgs.textContent = "Record successfully inserted!"
                modelInput.value = ''
                costInput.value = ''
            }
        })
    })
    
})
