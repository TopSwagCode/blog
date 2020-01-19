---
layout: post
title: Quick Guide - Identicons in Dotnet core
date: 2018-09-05 07:00:00 +0200
---

An Identicon is a visual representation of a hash value, usually of an IP address, that serves to identify a user of a computer system as a form of avatar while protecting the users' privacy. The original Identicon was a 9-block graphic, and the representation has been extended to other graphic forms by third parties.

I created this small services as a proof of concept for work, where we use users calenders and attendees to improve meetings with our awesome machine learning. With identicons we could create a unique profile picture for all users (even the ones that doesn't use our app) and let users change it when they log in for the first time.

You can try to create one for your self below here:

<div style="width:100%;align: center;text-align:  center; margin: 20px;">

<input id="inputSrc" placeholder="Type some text here" type="text" oninput="myFunction()"/>
<br/>

<img id="identiconImg" src="https://localhost:5001/api/Identicon/fasdas">


<script> 
function myFunction(){
    var link = "https://localhost:5001/api/Identicon/";
    var after = "&size=200";
    document.getElementById('identiconImg').src = link+document.getElementById('inputSrc').value;
} 
</script>

</div>
You can even call the service directly here:

[http://topswagcodewebapiidenicon20180904095437.azurewebsites.net/api/identicon?name=YourName&size=200](http://topswagcodewebapiidenicon20180904095437.azurewebsites.net/api/idenicon?name=YourName&size=200)

Warning. This URL will change in the future to be something more nice eg. api.topswagcode.com/identicon which will be a long lasting API endpoint. This endpoint is just a quick prototype.

To create your own Identicon service. Add "Jdenticon.AspNetCore" nuget package to your project and create a api controller like the one in this project. The code can also be seen below here:

```
    [Route("api/[controller]")]
    [ApiController]
    public class IdenticonController : Controller
    {
        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get(string name, int size)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                var icon = Jdenticon.Identicon.FromValue(name, size);

                await icon.SaveAsPngAsync(ms);

                ms.Position = 0;
                return File(ms.ToArray(), "image/png");
            }
        }
    }
```

The code to the service can be found on github [here](https://github.com/kiksen1987/TopSwagCode.WebApi.Identicon);

If you want to know more about the creator of the nuget package look here: [https://jdenticon.com/](https://jdenticon.com/).
They also have some samples for creating identicons usings JavaScript or PHP.

Hope you can use identicons for something awesome in your project and until next time. Stay SWAG! ;)