---
layout: page
title: Podcast Cli
permalink: /PodcastCli/
---

I created this Cli / Terminal Podcast player, because I was looking for something nice and simply I could use while I was working on my hobby projects. Well it turned into an entire new hobby project. I made it as a Dotnet Core Global tool that can be installed on Windows machines by using the command be below in commandline / powershell.

```
dotnet tool install --global TopSwagCode.CLI.PodcastPlayer --version 1.0.3
```

Once installed, you can start it up in commandline/powershell by typing:

```
dotnet-rocks
```
Controls:

* Arrowkeys.
* Enter (Start / stop podcast).
* Space (Pause/Unpause podcast).
* F1, F2 (Volume control).
* Mouse (Pick and start podcast(Bug in current version)).

Below here you can see a small preview of the project:

<iframe width="560" height="315" src="https://www.youtube.com/embed/CZ9NfHgTpCg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Roadmap:

* Opensource the project after cleanup of code.
* CI/CD Github action pipeline.
* Filter / Search for podcats.
* Add other podcast feeds.
* Add localstorage for storing progress of podcasts.
* Add some kind of play queue.
* Add more UI (Colume control, Progress bar, Podcast description).
* User login / Cloud storage.