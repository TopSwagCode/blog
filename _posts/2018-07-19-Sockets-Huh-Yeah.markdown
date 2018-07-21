---
layout: post
title:  "WebSocket ideas built on SignalR / Dotnet Core"
date:   2018-07-19 07:00:00 +0200
---

I am doing this post because every now and then I see people asking, what they can use websockets for, besides a simple chat app. For the people out there, that dont know websockets. It's a way for communicating between client and server, while keeping an open connection. This means we don't have to poll the server for updates and make unwished load.

To start off with, I won't go to much into sexy little details, instead I will just show some usecases where you could use websockets in your app today. At the end of the post I will share code samples, showing how I wired things up.

### Admin site / Stock market
The Admin site / stock market is Server to Client communication. You might have an internal admin site with all kind of dashboards. Being it sales or throughput of processed documents. It really could be any kind of dashboard you have hanging in your office. Why not use websockets to make it realtime? See when a sale has been done. See how many messages that get processed each minute or even keep track over time.

It doesn't have to be some internal admin site. You could also use it for showing stock market prices and updating the pricess one by one. This would save you from reloading the entire screen or polling all the stocks all the time. I made a small graph that runs on websockets that can be found <a href="/graph/" target="_blank">here.</a>
 
The sample I built is just sending random numbers from the server between 0 and 100. I first built it using AWS SQS, but eneded up creating my own FakeSQSClient. I wanted people to be able to download my sample and get it up and running without having to have a AWS account.


### Personal processing updates
This is when a users ask for some task to be completed but the time is unknown and taking more than a couple of seconds. I have seen plenty of implementaions of this without using websockets. Eg. Sending a email to the user when the task is done. Or simply just polling the server if the content is ready.

But we can make it even more fancy by using websockets. We could save that users ConnectionId and send him updates every time we are one step closer to finnishing his task. This could be by showing the user list of tasks that needed to be done before his download is ready and checking them one by one when they are done. It could be by having one or more progress bars and updating them with progress on the tasks.

I have made a small sample that can be found <a href="/processing/" target="_blank">here.</a> It is just a fake process running in background and sending out updates untill reaching 100%. Then waiting a small duration and sending process done with the URL for the download.

### Chat
We might aswell include the app that has been built a million times. The chat app makes a ton of sense to built using websockets. It's an app that quickly can grow out of hand and make alot of load on your server if used with polling. But by using websockets it is alot easier. You dont need to keep track of which users received what messages when they poll for new messages. Instead every time a user sends a chat message to the server, the server then broadcast the chat message out to all users, giving that realtime feel.

I have implemented a simple chat that can be found <a href="/chat/" target="_blank">here.</a>

As you can see it is just a chat in it's simplest form. There are plenty of improvements that can be done to make it more fancy. Like adding user to user private chat. This could be implemented bt storing the ConnectionId's on the server side and giving the client a list of active users to pick from, when wanting a private chat. This would ensure other users not receiving the private chat between 2 people. I am sure you allready have plenty of ideas about other cool features that could be added.

### Show me the Code!

![Show Me The Code!](/assets/showmethecode.jpg)

Woah slow down there. There is plenty of other usecases of using websockets, eg. Gaming, Collaborative editing/coding, Analyze User Behavior(If you feel like stalking your users :P ). Just be creative and build your own samples :). All my samples was created using Dotnet Core and SignalR. For the graph i used chartJS. I would recommend allways getting the latest version of Dotnet Core and AspNetCore. In my project I used Microsoft.AspNetCore.App 2.1.1 and Microsoft.NETCore.App 2.1.0. I also added AWSSDK.SQS 3.3.3.11. Simply because I was playing around with external services sending messages to the websocket service and then the websocket service broadcasting these messages to the clients. As stated before I created a FakeSQSClient using AWS interface letting me easy switching between these. 

In my project I allways try to decouple my code as much as possible. Meaning I rarely use Razor pages or MVC with razor. My code samples were built similar to this:

![SignalR](/assets/signalR.png)

* A processing service that does all the processing. In this case just creating alot of random numbers between 0 and 100. Then putting these messages on a message queue. (Message queue I used was AWS SQS, but could just as well have been RabbitMQ or MSMQ)
* Websocket service listening on a message queue and broadcasting via websockets. (Using SignalR in dotnet core, but could just as easy have been NodeJS broadcasting messages)
* Client receiving broadcasts on websockets and displaying data. (Plain old javascript or React / VueJS or whatever floats your boat.)


### Come on Show me the Code!!
Well to get started we need to configure Websockets in dotnet core. We do this in the Startup.cs. As extra I will also be adding Cross-origin resource sharing (CORS) policy and my two services I will be using. My setup of Cors will allow any origin, but depending your project and needs you might want something different. I won't go into detailts about CORS, that would be a subject for another blog post. To start out I will configure the services I will be using in the ConfigureServices method as shown below.

```
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("CorsPolicy",
                builder =>
                {
                    builder.AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowAnyOrigin()
                        .AllowCredentials();
                }));

            services.AddSingleton<IAmazonSQS>(o => new FakeSqsService());
            services.AddHostedService<TimedHostedService>();

            services.AddSignalR();
        }
```
Afterwards I will configure the app by createing the Configure method. I will tell the App to use my CORS policy and add all the routes for my websocket project.

```
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("CorsPolicy");

            app.UseSignalR(route =>
            {
                route.MapHub<ChatHub>("/chathub");
                route.MapHub<ProcessHub>("/processhub");
                route.MapHub<GraphHub>("/graphhub");
            });
        }
```

My 3 hubs are really simple and have wery little logic in them. I have created one for each sample. To start with lets look at ChatHub. Ths class only have on method. SendMessage(string user, string message). This method is called from the client with the following javascript:

```
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://topswagcodesignalr.azurewebsites.net/chatHub")
        .build();

    document.getElementById("sendButton").addEventListener("click", event => {
        const user = document.getElementById("userInput").value;
        const message = document.getElementById("messageInput").value;    
        connection.invoke("SendMessage", user, message).catch(err => console.error(err)); // Here's the call to the server.
        event.preventDefault();
        document.getElementById("messageInput").value = "";
    });
```
This code first creates a connection using SignalR and then fetches the input fields and sends it to the websocket server with the connection.invoke(). The parameters of this method if invoke("Method on server", parameters on server). The server side code which receives this call looks like the following:

```
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
```

The server takes the user and the message and broadcasts it out to all connected clients. Telling them to look for ReceiveMessage logic on the client. It looks like the following:

```
    connection.on("ReceiveMessage", (user, message) => { 
        const encodedMsg = user + " says: " + message;
        const li = document.createElement("li");
        li.textContent = encodedMsg;
        document.getElementById("messagesList").appendChild(li);
    });
```
Telling the client when connection receives "ReceiveMessage" with 2 parameters. Do the following. In this case just throw all chat in a LI tag and append it to the list.

I won't tell about processing example, since it looks alot like Chat, just to a single user. Instead tell abit about admin / graph example. To start out I will show the code for the hub.

```
    public class GraphHub : Hub
    {
    }
```
So empty. It's because choose not to have any logic in here to show how you could call your client's outside the hub. So my GraphHub is only used to register the route and get users connected. But all messages sent to clients come from my TimedHostedService using dependcy injection. The constructor looks like the following:

```
    public TimedHostedService(ILogger<TimedHostedService> logger, IHubContext<GraphHub> graphHubContext, IAmazonSQS amazonSqs)
```

So IHubContext<GraphHub> gets injected, so I can send messages to my clients. The TimedHostedService runs in the background every 500ms and fetches messages of a AWS Queue. Then it runs through all these messages and sends them to the clients listening on GraphHub. We could do all kind of cool stuff like summing up or getting averages of all messages before sending it to the clients. You can see all the code or download it on github.

Server side code can be found <a href="https://github.com/kiksen1987/TopSwagCode.SignalR" target="_blank">here.</a>    
And the client side code can be found <a href="https://github.com/kiksen1987/blog/tree/master/assets/js" target="_blank">here.</a>

Hoped you liked the blog post and got some nice ideas to improve your projects with WebSockets.