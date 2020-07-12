---
layout: page
title: Secret
permalink: /secret/
---

Small description?



App:

<div style="width:100%;align: center;text-align:  center; margin: 20px;">
<div>
    <h1>Secret result</h1>
    <Textarea style="width:85%; height:500px;align: center;text-align:  left; margin: 20px;"></Textarea>   
</div>

<div>
    <h1>Create secret</h1>
    <Textarea></Textarea>    
</div>

<input id="inputSrc" placeholder="Secret Id here" type="text"/>
<button>Load secret</button>
<br/>


<script> 
function init(){

    const urlParams = new URLSearchParams(window.location.search);
    const secretId = urlParams.get('id');

    console.log(secretId);

    if(secretId){
        loadSecret(secretId);
    }
    loadSecret(secretId);

    
    //document.getElementById('test').src = link+document.getElementById('inputSrc').value;
} 

function createSecret(){
    const data = { secret: 'Shhhhhhh', name: 'CIA Secret' };

    fetch('https://5ldl3mn2e0.execute-api.eu-west-1.amazonaws.com/Prod', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function loadSecret(id){
    var link = "https://5ldl3mn2e0.execute-api.eu-west-1.amazonaws.com/Prod/"+id;

    fetch(link)
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
            response.status);
            return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
            console.log(data); // Change logic here.
        });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

(function() {
   //init();
   createSecret();
})();
</script>

</div>
