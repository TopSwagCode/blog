---
layout: post
title:  "Serverless payment with AWS Lambda and Stripe"
date:   2018-08-04 10:00:00 +0200
---

The point of this blog post is to show how to add payment to your own projects using Stripe and AWS Lambda. This can be used to add payment to a CMS system like Wordpress or a Static site like mine. I have used it to build a donations feature on my blog. Showing how we could create payment on a static hosted website with very little code and hosted serverless at AWS. 

### Going serverless

The hype on serverless has been going on for some time now and it's been a long time since I last tried to use AWS serverless offering Lambda. Last time, was back in the early stages of AWS Lambda supporting Dotnet Core. It was really buggy and the tools wasn't really ready. But now with support for Dotnet Core 2.1 I wanted to give it a chance again for my projects.

![Cloud](/assets/cloud.png)

I would really recommend getting [AWS Toolkit for Visual Studio](https://aws.amazon.com/visualstudio/) before getting started. Really awesome package that adds a lot of cool features for working with AWS. You get lots of new templates, to get started with AWS. It also includes Lambda templates. It even adds publish to AWS Lambda as option for your project.

![Deploy Lambda](/assets/lambdaDeploy.png)

I started out using the empty function template, since I just wanted to play around and get to know AWS Lambda's again. Shortly after I deployed my test function, I found that I also needed a way to call my Lambda function. AWS calls this triggers and support a wide range from API gateway calls to messaging queues. I added a API gateway trigger to my Lambda function so it could be called from my blog. I then added Amazon.Lambda.APIGatewayEvents nuget package to my Lambda Code, so I would be easier able to work with the request coming in.

```
    public APIGatewayProxyResponse FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
    {
        ...
    }
```

The function that is called from API gateway in my code is FunctionHandler as can be seen above. The name of the function is not important and can be whatever you want. You just need to give AWS Lambda information about which function that is your handler.

>
A value of the form assembly::namespace.class-name::method-name. For example, "MyApp::Example.Hello::MyHandler" would call the MyHandler method defined in MyApp.dll.
>

So in my case it is:    
TopSwagCode.Lambda.Payment::TopSwagCode.Lambda.Payment.Function::FunctionHandler

With little to no code at all, you can have an API endpoint up and running in no time. Now it's just about filling in business logic in the function handler. This brings me to the next part.

### Show me the ~~code~~ money
![Show Me The money!](/assets/showmethecode.jpg)

Some time back I was tasked with making some research finding a payment platform that we could use at FirstAgenda. I started looking on some of the places I had used before but ended up recommending [Stripe.](https://stripe.com/) They had some of the best documentation I have read in a long time. Even a small thing as including my test keys in the code samples, when I was logged in. This made me able to create a prototype in no time.

With striped you get some options about how you want to create your payment form. They have a nice sample of how you can create your own form in ReactJS. They also have a easy to use, prebuild form you can include on your site. I am using the pre built form. All I needed to add on my site was the following you can see below.

```
    <form action="https://example.com/payment" method="POST">
        <script
        src="https://checkout.stripe.com/checkout.js" class="stripe-button"
        data-key="pk_live_###################"
        data-amount="499"
        data-name="TopSwagCode"
        data-description="TopSwagCode charity of choice"
        data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
        data-locale="auto"
        data-currency="usd"
        data-name="TopSwagCode"
        data-description="Support to TopSwagCode"
        data-panel-label="Donate"
        data-label="4.99$">
        </script>
        <input type="hidden" id="userId" name="Amount" value="josh@topswagcode.com">
    </form>
```

I have included some of the optional fields in my sample and added a custom hiddenField that gets included in the post to my lambda function. This could be used if you wanted to add UserId or some other fields in your request. You can see I have added 3 buttons on the bottom of this page. The magic happens when you press payment button a iframe with payment form pops up on your screen. So all sensitive card data never ends on your server. Instead what happens, is when people purchases something at your site, you receive a stripe token eg: card_####. This token then gets posted to your server (in this case aws lambda function) and hereafter you can complete the charge with the Stripe.net library. 

To use this stripe token and accept payments in your code, you have to setup add nuget package "Stripe.net" and then create a StripeCustomerService and a StripeChargeService. I have done this in the constructor of my function like so:

```
    public Function()
    {
        StripeConfiguration.SetApiKey("sk_live_###################");
        _customerService = new StripeCustomerService();
        _stripeChargeService = new StripeChargeService();
    }
```

For this code example I have just hardcoded the secret key in the code. You could use [Environment Variables](https://docs.aws.amazon.com/lambda/latest/dg/env_variables.html) or [AWS Systems Manager Parameter store](https://aws.amazon.com/blogs/compute/sharing-secrets-with-aws-lambda-using-aws-systems-manager-parameter-store/) depending the scope of your project.

Now there is only few steps left for completing the charge. Create a new stripe customer and creating a charge for that stripe customer. The code can be seen below.

```
    var createOptions = new StripeCustomerCreateOptions()
    {
        Email = stripePaymentRequest.stripeEmail,
        SourceToken = stripePaymentRequest.stripeToken
    };

    var customer = _customerService.Create(createOptions);

    var stripeChargeCreateOptions = new StripeChargeCreateOptions()
    {
        Amount = 499,
        Description = "Donation at TopSwagCode",
        Currency = "usd",
        CustomerId = customer.Id
    };

    var charge = _stripeChargeService.Create(stripeChargeCreateOptions);
```

So there you have it. Creating charges with stripe with nearly no code at all. As extra in my lambda function if everything has gone well I have chosen to return the email for the customer and the amount paid.

```
    var responseBody = new StripePaymentResponse()
    {
        Amount = 499,
        Email = stripePaymentRequest.stripeEmail,
    };

    return new APIGatewayProxyResponse()
    {
        Body = JsonConvert.SerializeObject(responseBody),
        Headers = new Dictionary<string, string> { { "Content-Type", "application/json" }},
        StatusCode = (int)HttpStatusCode.OK
    };
```

### The good

AWS Lambda (Serverless in general):

* Reduced time to market and quicker software release.
* Lower operational and development costs.
* A smaller cost to scale.
* Works with agile development and allows developers to focus on code and to deliver faster.
* Fits with microservices, which can be implemented as functions.

Stripe:

* Easy to use.
* Scales with your business.
* Great documentation.
* Great Dotnet core nuget package.


### The bad

AWS Lambda:

* Serverless is not efficient for long-running applications. (Hardcoded 5 minutes of maximum execution duration per request.)
* Vendor lock-in. (Would take time to move to other provider.)
* Overhead. (Same goes for microservices, when communicating with other services instead of locally.)
* Cold start. (If a lambda function has not been called for a while it will shut down. Meaning next time someone tries to use your api they have to wait for the function to be loaded again.)

Stripe:

* Not the cheapest. (Not because Stripe is expensive. But there is cheaper options if you want to use more time to develop integrations yourself.)

### Final words

There is plenty ways of improving this code to fit your business needs. You could add storage, change trigger to be an event queue or even file upload to S3. For Stripe you also have the option of changing charges to be a subscription based model, if your business has some kind of paid membership. There is plenty of stuff you can do with AWS lambda and Stripe on their own or even combined. Just get coding! :)

Further reading:
* You can find the code for the backend [here.](https://github.com/kiksen1987/TopSwagCode.Lambda.Payment)
* [AWS Lambda](https://aws.amazon.com/lambda/)
* [Stripe Github](https://github.com/stripe/stripe-dotnet)
* [Stripe documentation](https://stripe.com/docs/api/dotnet)
* [Stripe checkout](https://stripe.com/checkout)

I would like to thank [Geek and poke](http://geek-and-poke.com) for letting me use his awesome comics on my blog.

As always thank you for reading this post and hope you got some awesome ideas for using AWS Lambda and / or Stripe.