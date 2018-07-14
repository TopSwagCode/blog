---
layout: post
title:  "Moved to Jekyll!"
date:   2018-07-13 20:33:51 +0200
---

Hi and welcome back again.   
Decided to take up blogging again and share some of all the awesome stuff I am working on both in my own time and at work! 
My old blog was hosted at Azure using NodeJS Ghost blog. Lightweight and easy to use, writting blogs in Markdown. 
That was all nice, but still left me with the issue I hadn't updated the platform in years and plenty of security holes that needed to be patched.

So before I started created this new blog I had to decide what platform to pick:

* Ghost again. Easy to use and not many fancy features.
* Wordpress. Widely used and plenty of themes and plenty if plugins.
* CloudScribe dotnet core, so I could extend with my own functionality.
* Hugo or Jekyll static site generators.

Well if you have read the title of this post, you can see I choose Jekyll.
Reason fo this was that It looked really simple to get started with.
It used Markdown as Ghost, so I could port my old blog post without any problems.   
It supported plain old Html / Javascript, so I could move my Xpath Diner Game to same location.     
It would also enable me to make other small App's / Games in Html and Javascript and use Dotnet Core as backend API's

Only really downside to Jekyll, was that I needed a Ruby development enviroment up and running before I could start using it. By following the [Jekyll install](https://jekyllrb.com/docs/installation/) I was up and running in no time.
I had allready at this point before installing Jekyll looked at some of the many awesome plugins and themes.
But when I was done installing I found the default theme and plugins to be awesome and just what I needed.

Before I got started I wanted my URL to be pretty. Default setup made links like /hello-world.html, 
but after some quick googleing I found setting for _config.yml:

```
permalink: pretty
```

which was just what i needed. Instead of generating folder structure /blog/Hello-World.html, 
it would generate /blog/Hello-World/index.html, which would work as /blog/hello-world/ as url.
The project structure looked like the following:

Posts:    
![structure posts](/assets/jekyll1.png)

Result of build:    
![structure site](/assets/jekyll2.png)

After moving most of my old blog posts over into my new blog, I only had very few things I wanted.
Eg. including my logo. I found [this link.](https://jekyllrb.com/docs/themes/#overriding-theme-defaults)
About overriding theme defaults. All theme logic is located other place on disk and if you want to change it, you had to find it on your disk and change it there. To find themes and edit in them I had to write the following command:

```
$ bundle show minima

C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/minima-2.5.0
```
Browsing the source code I quickly the places I wanted to make changes.
While browsing I also found that the default theme had support for a rnage of social media links,
by simply adding some lines to _config.yml

So after using my masterly CSS skills 'cough sarkasme cough'. You have the wonderfull footer you see below today.

The source code and posts of blog can be found [Here.](https://github.com/kiksen1987/blog)

Learn more about [Jekyll.](https://jekyllrb.com/)

Want free hosting with custom domain? Checkout [Github Pages.](https://pages.github.com/)