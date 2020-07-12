---
layout: page
title: Secret
permalink: /secret/
---

Small description?



App:

<div style="width:100%;align: center;text-align:  center; margin: 20px;">

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

function loadSecret(id){
    var link = "https://wn3n08hudd.execute-api.eu-west-1.amazonaws.com/Prod/"+id;

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
   init();
})();
</script>

</div>
