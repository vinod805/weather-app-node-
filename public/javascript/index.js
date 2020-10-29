console.log('javascrit is loaded on browser')
const weatherform=document.querySelector('form')
const text=document.querySelector('input')
const msg1=document.querySelector('#message-1')
const msg2=document.querySelector('#message-2')
const msg3=document.querySelector('#message-3')
const msg4=document.querySelector('#message-4')



weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const value=text.value
    fetch('http://api.weatherstack.com/current?access_key=17e1cb6a5697ae80dccff7460c39e525&query='+value+'&units = f').then((response)=>{
    response.json().then((response)=>{
        if(response.error){
            msg1.textContent='unable to find this location.. Try another search!'
            msg2.textContent=""
            msg3.textContent=''
            msg4.textContent=''
            
        }else{
            msg1.textContent=''
            msg2.textContent='City :'+response.location.name
            msg3.textContent='Current Tempareature :'+response.current.temperature+"°C"
            msg4.textContent='Time :'+response.location.localtime
                            
            console.log(response.location.name)
          
        }
})
})
  
})
  


