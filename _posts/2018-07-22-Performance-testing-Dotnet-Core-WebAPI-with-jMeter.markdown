---
layout: post
title:  "Performance testing Dotnet Core WebAPI with jMeter"
date:   2018-07-14 08:00:00 +0200
---

![jMeter](/assets/jMeterlogo.png)

### Getting started
Apache JMeter is an Apache project that can be used as a load testing tool for analyzing and measuring the performance of a variety of services, with a focus on web applications. [Description from wikipedia.](https://en.wikipedia.org/wiki/Apache_JMeter) It's any overall awesome opensource software.

In this blog posts I will focus on how to create tests for a webapi showing samples against simple Dotnet Core WebAPI. To get started you will need Java Development kit (JDK). Or you don't require it, but it states on their homepage that: "Although you can use a JRE, it is better to install a JDK as for recording of HTTPS, JMeter needs keytool utility from JDK".

So go get Java installated if you do not already have it. You can find download page [--> here <--](http://www.oracle.com/technetwork/java/javase/downloads/index.html) Remember to get the JDK version. When your done installing it remember to add JAVA_HOME to your enviroment variable set. Mine was located at C:\Program Files\Java\jdk-10.0.2\bin.

So now you have all the dependencies installed for getting started with jMeter. Head over to jMeter download site [--> here <--](http://jmeter.apache.org/download_jmeter.cgi) and download it.

### Using jMeter
Now we got jMeter and all dependecies, we can start using it. There is 3 ways of making your jMeter tests.

* Recording your workflow using jMeter. Eg. record browsing around a webpage and then being able to run performance test on that workflow.
* Use jMeter interface to create tests.
* Write. your tests in java.

There is 4 if you count the hybrid between recording a workflow and then afterwards go back and edit it to your needs. Eg. making the requests dynamic with CVS datasource. I will be focusing on using jMeter interface for creating performance tests, which I find to be the best way. 

To get jMeter fired up head to the location you downloaded it and unziped it. Within you will find a bin folder with 2 files jmeter and jmeter.bat. For unix and windows. Run whichever one that fits your needs and see jMeter popup.

![Empty plan](/assets/jmeteremptyplan.png)

The first thing you see when you open jMeter is an empty test plan. This is where all your performance test dreams come true. By right clicking on the test plan you and going to add you can see a long list of different items you can add.

![jMeter plan](/assets/jmetertestplan.png)

The screenshot shows a long list of listener's you can add to your project. These are just different ways of showing the results of your test run. There plenty of awesome features in jMeter. Like the test fragments that lets you make different fragments of test that can be reused in several tests. Then there is pre and post processors that can do all kind of fancy stuff. Like after done a Http request for creating a product, look in the response and see the ID of the newly created product and save it in a variable. Then afterwards you could use this id to check, if you can fetch the same product you just created from the api.

It can be a bit overwhelming getting started with jMeter and it's many options. Not even thinking about, we haven't even started talking about the many plugins that can make it even more awesome! But to help you getting started making your own test there is included some samples and templates to creating your own performance test.

![Open](/assets/opentest.png)

Click the open button to find them. I would recommend looking at the template with name build-webservice-test-plan.jmx. This test is a bit outdatet and pointing at a soap service. But mainly has what is needed to get starting testing a single endpoint. If you go ahead and right click and enable the "View Results Tree". This will enable us to see in depth information about our requests. Then try running the test as is even though I just told you they would fail.

Now we can see the request are failing and why they are failing. Like here it is an internal server error. When running your own tests you will find all kind of different problems like misspelling parameters or forgetting authentication. Hopefully this little guy will help you find those problems.

// Todo add screenshot of testplan failing

One thing to remember is not getting false results from your test. If your pc that is running the tests is under load or your creating way to many fake users for it to handle, you will get bad results not related to your API. So when you run your tests where you want to save your results remember to disable all listeners that creates graphs realtime and instead only focus on collection the data. There are plenty of ways of generationg fancy graphs after the tests are done. No need to do it runtime and ruin your results. 

![testplan xml](/assets/jmeterplanxml.png)

Screenshot above shows a small part of the build-webservice-test-plan.jmx. This is just plain XML that can easily be stored in Github or wherever you store your source code.

// Todo scaling beyond 1 PC for testing

// Todo mandatory plugins

// Create dotnet core api with fake storage?

// Publish api and run tests against it

// Share resulsts and code and tests

// Share further reading list