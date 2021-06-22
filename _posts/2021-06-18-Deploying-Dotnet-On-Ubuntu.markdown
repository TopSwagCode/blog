---
layout: post
title:  "Deploying your Dotnet App on Linux cheap!"
date:   2021-06-17 14:00:00 +0100
---

So you build a awesome project and you want to share it with the world. There is tons of options out there for hosting your app today. AWS, Azure and Google clouds all offer 1 click deployment offers to their services. But it comes with a price. You might be lucky to have some spare credit's for some of the clouds or you might be like me. Looking for the most bang for my money. So I am sharing how I am currently hosting my Blog API's / Websockets cheap.

First 3 honorable mentions for cheap hosting:

* [Linode](https://www.linode.com/pricing/)
* [Digital Ocean](https://www.digitalocean.com/pricing/)
* [Aws Lightsail](https://aws.amazon.com/lightsail/pricing/)

All 3 offers dead cheap compute instances with some easy to understand pricing. I love trying out and testing new cloud offerings and that is what brought me to my current goto for my hobby projects and current recommendation. 

(drumroll image)

AWS with their ARM64 based machines named Graviton2 / T4G. You can read AWS own blog post about the [Graviton2 Benchmarks.](https://aws.amazon.com/blogs/compute/powering-net-5-with-aws-graviton2-benchmark-results/) In short "The Graviton2 instances are about 20% less expensive per hour than Intel x86 instances with up to 40% better performance. With .NET 5". Getting a cheap 500mb of ram and 2 vCPU's for just about 3$ / month and about 1.8$ / month if you pay up front for a year.

(cheap meme)

Now we got our self a cheap host. How do we publish and deploy our code to that new instance. These steps should work for whatever linux instance you choose to spin up / allready have running.

1) Publising your code

You have 2 options here. Publish your code normally or publish it as a self contained executeable. I allways pick self contained deployments for my projects, cause I don't want to install Dotnet on the machine I am deploying to. With Dotnet it has become dead simple to do exact that, even for ARM64. This would even work if you have a Raspberry Pi laying around. The command you would want to run in your project is:

```bash
$dotnet publish -c Release -o publish -p:PublishSingleFile=true --self-contained true -r linux-arm64
```

This would create a release package inside a publish folder, that you can zip and transfer to your linux machine. The best part is, you can publish your linux package directly from windows. If you are running another version of linux or even a windows machine. You can see a list of RID's you can choose as target platform here: https://docs.microsoft.com/en-us/dotnet/core/rid-catalog

2) Getting your app to the linux machine.

Again this time you have some options about how you want to transfer your app to the server. If you like UI tools best, you can download [WinSCP.](https://winscp.net/eng/download.php) I prefer to have a automated / scripted way of transfering files, so I can run it in a pipeline or reuse scripts. For that I Use SCP from commandline / Powershell / whatever your terminal of choice is.

```bash
scp -i secretkey.pem publish.zip ubuntu@168.264.50.215:
```

In this example I use a "PEM key" to connect to my instance "168.264.50.215", using user "ubuntu" and upload "publish.zip" to the path "". That path is just the default folder for the user, which would be "home/ubuntu/" in this case.





chmod +x

Service file

double check ports are open.

bonus content: ssl
