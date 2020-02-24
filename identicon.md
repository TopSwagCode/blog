---
layout: page
title: Identicon
permalink: /identicon/
---

An Identicon is a visual representation of a hash value, usually of an IP address, that serves to identify a user of a computer system as a form of avatar while protecting the users' privacy. The original Identicon was a 9-block graphic, and the representation has been extended to other graphic forms by third parties.

I created this small services as a proof of concept for work, where we use users calenders and attendees to improve meetings with our awesome machine learning. With identicons we could create a unique profile picture for all users (even the ones that doesn't use our app) and let users change it when they log in the first time.

Try to create your own below here:

<div style="width:100%;align: center;text-align:  center; margin: 20px;">

<input id="inputSrc" placeholder="Type some text here" type="text" oninput="myFunction()"/>
<br/>

<img id="test" src="https://fqz04mg9a6.execute-api.eu-west-1.amazonaws.com/Prod/api/identicon/storm">


<script> 
function myFunction(){
    var link = "https://fqz04mg9a6.execute-api.eu-west-1.amazonaws.com/Prod/api/identicon/";
    document.getElementById('test').src = link+document.getElementById('inputSrc').value;
} 
</script>

</div>
If you want to try out the service the URL can be found here:

<a href="https://topswagcode.dev/api/Identicon/Storm">https://fqz04mg9a6.execute-api.eu-west-1.amazonaws.com/Prod/api/identicon/{YourName}</a>

The code to the service can be found here:

https://github.com/TopSwagCode/TopSwagCode.WebApi.Identicon
