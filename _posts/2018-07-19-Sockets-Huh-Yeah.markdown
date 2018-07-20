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

```
/*
 * Todo: Code samples
 * Startup.cs - adding SignalR to your project.
 */
```
Server side code can be found <a href="https://github.com/kiksen1987/TopSwagCode.SignalR" target="_blank">here.</a>    
And the client side code can be found <a href="https://github.com/kiksen1987/blog/tree/master/assets/js" target="_blank">here.</a>

Hoped you liked the blog post and got some nice ideas to improve your projects with WebSockets.