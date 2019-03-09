---
layout: post
title: 6 Overlooked Scalability Rules
date: 2019-03-06 21:00:00 +0200
---

This is the first blog post in a new series on tech books that I love. Two important points about these blog posts:

* It's my view on the books and it's subjects.
* It's not a review on the books.

<div style="width:100%;align: center;text-align:  center; margin: 20px;">
<a href="https://www.amazon.com/gp/product/013443160X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=013443160X&linkCode=as2&tag=topswagcode-20&linkId=d74fedc9f1845d7d10074701de42bf79"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=013443160X&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=topswagcode-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=topswagcode-20&l=am2&o=1&a=013443160X" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
</div>

The first book is "Scalability Rules - Principles for scaling web sites". I will be focusing only on the 6 of the most overlooked principles.

The book is written by Martin L. Abbott, formerly COO of Quigo, spent nearly six years at eBay, most recently as SVP of Technology/CTO. He has held engineering, management, and executive positions at Gateway and Motorola. Michael T. Fisher, a veteran software and technology executive, spent two years as CTO of Quigo. Previously, as VP of Engineering & Architecture for PayPal, he led 200+ developers. Abbott and Fisher co-authored The Art of Scalability (Addison-Wesley).

With no further introduction, let's dig into some chapters of the book.

# Reduce the equation

* Don't overengineer the Solution,
* Design Scale into the Solution

2 principles that might seem to be opposing each other. You don't want to spend 20 days designing the perfect unicorn system that can scale to facebook like performance. On the other hand, you don't want to build something that only supports current user base and will break if new users sign up. In the book it has a good rule of thumb on how to design, implement and deploy your app.

* Design for 20x capacity
* Implement for 3X capacity
* Deploy for ~1.5 capacity

Design for 20x capacity could be thinking message bus into your solution. You might start out implementing direct API calls, but build your design in a way it would be easy to change to a message bus in the future. Similarly goes for Implement for 3x and Deploy for 1.5x. Eg. you could implement load balancer and only have one instance behind it or 2 smaller. This would allow you to be ready for spikes in usage. For bigger spikes you could add more machines without to much hassle. If you hadn't implemented the loadbalancer on beforehand, you might run into problems if your website suddenly went viral and received surge of users. If you were not ready for it, you would suddenly be in a rush implementing a way to scale your app. Users might leave and new users not sign up because of bad response times / down time if you are not ready for scaling.

# Use the Right Tools

<div style="width:100%;align: center;text-align:  center; margin: 20px;">
<a href="https://xkcd.com/1890/">
<img id="test" src="/assets/WhatToBring.png">
</a>
</div>

* Use Databases Appropriately

A principle I see get broken over and over again is "Use Databases Appropriately". SQL servers is often being seen as the default database of choice. I won't go to much in depth on subject of picking the right database. This could be an entire blog post for it self. Know when to use a rationel database and when to use a document database (and so on).

# Use Caching Aggressively

* Leverage Content Delivery Networks

This chapter has plenty of good examples on how to use caching right. The one I liked the most is "Leverage Content Delivery Networks". There are plenty of services out there that serves content for nearly no cost at all. But having a CDN that serves content near your users will greatly increase page load speeds. Using a CDN that supports cross region makes lots of sense, even if you only have 1 App server located in your region. You can still serve all static content near the user and increase load speeds for the App. Then it's only API call's which will be slightly slower for users outside your region. Some CDN even provide caching of API calls so large Get requests don't hammer your Server/Databases. This could even save money, by enabling you to have a smaller App server by using caching right.

Some great CDN offerings include:

* [Aws](https://aws.amazon.com/caching/cdn/)
* [Azure](https://azure.microsoft.com/en-us/services/cdn/)
* [Cloudflare](https://www.cloudflare.com/cdn/)
* [Google](https://cloud.google.com/cdn/)

# Database Rules

* Don't Select Everything

Here's a principles that has been broken far to often. "Don't Select Everything". Don't do a "Select * From TableName" query. Perhaps when the table is small and you need all the data for your view, you might think it is okay. But when the table changes and there is added several new fields, your view might get slow or even break for not supporting the new fields. 

Using a ORM eg. Entity Framework is no excuse either. Don't Select the entire Customer object. Select only the stuff you need!

Eg. Getting list of customers to create view that links to Customer Details as shown below.

```html
<ul>
    <li>
        <a href="/customers/101">Microsoft</a>
    </li>
    <li>
        <a href="/customers/1337">FirstAgenda</a>
    </li>
    <li>
        <a href="/customers/404">Blockbuster</a>
    </li>
</ul>
```

## Dont

```sql
SELECT * FROM Customers
```

or

```cs
_efContext.Customer.Where( customer => customer.Id == id)
```

## Do

```sql
SELECT Id, Name From Customers
```

or

```cs
_efContext.Customer
.Where( customer => customer.IsActive == true)
.Select( customer => new { CustomerName = customer.Name, CustomerId = customer.id})
```

# Learn from Your Mistakes

* Discuss and Learn from Failures

The perhaps most underused principle of them all "Discuss and Learn from Failures". In the moment everything might be hectic and stressful when the server crashes. But when the issue has been taken care off, remember to take a step back and discuss what went wrong? What could the team had done to prevent the error? And how to prevent it from ever happening again? Don't start a blame war or something worse. Every so often there are stories about developers who has deleted / ruined a production database by running a script only meant to be run on local environment. There should be procedures in place so this never could happen. Some useful procedures could be:
* Production connection strings should not be easy accessible (if even accessible at all). 
* There should be code reviews before merging new code into Master branch and pushing code directly should be disabled.
* Running scripts or deploying from a button should be behind a Confirm Dialog or similar. This would ensure a misclick does not start an unwanted process.

Learning from failures can also be applied to code. Eg. when a bug is found. Could you write a unit test for it and perhaps even add more to ensure something new doesn't break? Often when the same parts of code changes often, this leads to bugs. Having unit tests reduces the risks of breaking already existing features and increase the confidence of releasing software.

# That's all 

I had a hard time cutting down on the number of principles I wanted to share in this post (There are so many good ones). This is a small subset of the book. There are more in depth examples in the book and plenty more principles for scaling that I haven't mentioned.