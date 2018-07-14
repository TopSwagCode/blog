---
layout: post
title:  "Circuit Breaker Pattern"
date:   2016-02-07 20:00:00 +0200
---
What is a circuit breaker? A circuit breaker is an automatically operated electrical switch designed to protect an electrical circuit from damage caused by Overcurrent/overload or short circuit. Its basic function is to interrupt current flow after Protective relays detect faults condition. A circuit breaker can be reset (either manually or automatically).

This is in my opinion one of the most underrated design patterns most developers should know about. It's normal for websites / system to use different kind of remote calls to post / get some data. These calls may fail or timeout. This might not be a problem if you only work with a few users. But lets say you during some peak time, get an insane amount of users who all try to use that page with the external call which times out. This may cause you to run out of a critical resource, resulting in cascading failure across multiple systems.

[![Release It!](/assets/Release_It-1.jpg)](http://www.amazon.co.uk/Release-Production-Ready-Software-Pragmatic-Programmers/dp/0978739213/ref=sr_1_1?ie=UTF8&qid=1455093459&sr=8-1&keywords=release+it)

Michael Nygard popularized the Circuit Breaker pattern to prevent this kind of disasters. He wrote the awesome book "Release It!". A good book and definitely worth the read. There is some really good examples on how bad it can go. But enough about the book.  

The idea behind this design pattern is to wrap your function call into a circuit breaker, which then looks for failures in these calls. When these failures then reach a certain point, the circuit breaker opens and we just return errors instant for the following users. This leads to users not having to wait for failing responses. You might also want some monitor to alert when we end in this state.

As a small side note, i wasn't really that aware of circuits before i read up on this design pattern and implemented it, for the first time. I misunderstood the concept and thought that Open circuit meant we were good to go and closed meant we should stop more calls to be sent. You may be more clever than me ;) However here is a small diagram showing the obvious. (Closed lets the electricity pass through and turn on the light. Open switches off the light)

![Circuets](/assets/open_closed.jpg)

And now back to the circuit breaker again. So how it works for example:

You have 1 external call goes good.
1 / 3 external call which goes bad. The circuit breaker logs this. 
2 / 3 external call which goes bad. The circuit breaker logs this.
3 / 3 external call which goes bad. The circuit breaker logs this.
Circuit breaker now goes into Open state for 5 minutes.
Several users call gets rejected by circuit breaker and instantly returns an error.
After these 5 minutes the circuit breaker goes to "half open" state and accepts a new call. If this call goes good, we go back to closed state and everything is back to normal. But if the call fails we will go back to open state. We could even extend the open state to 10 minutes this time. We could even go as far as going to open state until admin has taken a look at the problem.

Its entirely up to you how harsh you want your circuit breaker to act. Perhaps you want "half open" state to have a longer "trial period", so it has to complete 5 calls before we go back to closed state. Below we can see a small diagram of the circuit breaker.

![Diagram](/assets/State.png)

The circuit breaker can be customized in a range of ways. Timeout might have a threshold of 10 before triggering the circuit breaker. Meanwhile 3 concurrent connection failures will trigger the same circuit breaker. It is also important to note it is not only errors and timeouts which circuit breaker is great for. Take asynchronous communication. What if the external service we use isn't slow but just works at a certain speed. Lets say it takes the service ½ second to produce a response. Our website might be under heavy load and receiving 5 calls a second, which is needing this service. Wont take long before this runs out of hand. A way to counter this is to implement a queue in the circuit breaker and when the queue is full, we open the circuit to ensure we don't break our system.

Hope you liked this post.
And until next time stay Swag! 

