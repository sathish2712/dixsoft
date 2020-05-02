const searchText = document.getElementById('search-text')

const buttonEvent = document.getElementById('button')
const errorMsg = document.querySelector('#error')
const table = document.querySelector('#table-content')
const bodyContent = document.querySelector("#table-content > tbody")
table.style.display = 'none'
buttonEvent.addEventListener('click' , (e)=> {
    e.preventDefault()
    const tempData = searchText.value
    errorMsg.textContent = "Loading..."
    //If input value is null then throw error
    if(tempData.length == 0){
        errorMsg.textContent = "Provide product name"
    }
    else{
        // fetching json data from the API 
        fetch('https://vpsapg.dixsoft.online/product/get?prod_name=' + tempData).then((response) => {
            response.json().then((data) => {
                //If searched product isnt found then throw error (success == 2) from json data
                if (data.success == 2) {
                    errorMsg.textContent = data.message
                    table.style.display = 'none'
                }
                else {
                    errorMsg.textContent = ""
                    // console.log(data.data)
                    // Clearing out existing data
                    while(bodyContent.firstChild){
                        bodyContent.removeChild(bodyContent.firstChild)
                    }
                    //append table row value form json data
                    data.data.forEach((row) => {
                        const tr = document.createElement('tr')
                        for(let key in row){
                            let value = row[key]
                            const td = document.createElement('td')
                            td.textContent = value
                            tr.appendChild(td)
                        }
                        bodyContent.appendChild(tr)
                    })
                    table.style.display = ''
                }
                
            })
    })
    } 
})

// Disappear text value when submitted
$(document).ready(function(){
    $(':button').click(function(){
       $(':text').val('');
    });
 });
