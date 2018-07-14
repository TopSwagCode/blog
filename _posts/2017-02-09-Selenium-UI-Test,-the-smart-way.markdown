---
layout: post
title:  "Selenium UI Test, the smart way"
date:   2017-02-09 20:00:00 +0200
---
![Test Script](/assets/dilbert_tdd.png)

Whats up peepz. J dawg back in tha house. Today I will be telling about Selenium and automated web testing. I have just recently changed job and joined First Agenda as Backend Software Developer. At First Agenda, there is currently a UI test suite made in Ruby with Cucumber. Problem is, First Agenda is a .NET and iOS company, which meant none of the developers at the main office ever touch the UI Test code. Furthermore, there were some problems. The tests were taking too long time to complete.

With the knowledge of Web2.0 being around the corner and my prior experience as Quality Assurance Engineer, I decided to make a small draft for a new UI Testframework. This would enable all the developers with ease to add new tests. Some of my goals for this side project were:

* Easy to use and maintain / add new tests. (This blog post)
* Scalable and quick to run.
* Transparency of test run and failures.
* Use new fun technologies (Best way to intrigue developers).

The code I will be showing in this blog post is going to be C# / .NET, but should be easy to implement in your coding language of choice. To get started I will just show “Hello world” example of a Selenium UI Test. Remember to get the Selenium NuGet packages for your own project. See screenshots at the end of the blog post.

![Hello world](/assets/helloworld.png)

Not to much to say about this “Hello world” example. We open a browser (Chrome in our case). Navigate to google.com. Find an element by the name of “q”, which is the search input field on google. On this element, we send some keys / type “First Agenda”. We submit the form to make the search. Finally, we close down the browser. If we run this example, it will run quick, so we don’t even see the result on google. Feel free to insert breakpoints to see the result. Below here, we can see the google page source and where I found the name of the search input field.

![Google Page Source](/assets/google.png)

This is a simple sample. It would be easy to make 100 of tests with this simple setup. The problem with this test, it’s not scalable. Let’s say we have made 100 tests in this way. Some requirements come and Google now has 2 Search bars both with the name “q”. We would have 100 tests that would requiring us to go back and fixing, because of this breaking change.

A great way to solve this problem is to write tests using the Page Object Model pattern. In short, we make classes to map important parts of our homepage to Page Objects. For example instead of writing driver.FindElement(), we could make a class LandingPage containing the Search input. Then the test would look something similar to: 
```
New LandingPage().GetSearchInput().Type(“First Agenda”);
```
Now back to the previous example, where Google added a second search bar and broke the 100 tests. With this new Page Object Model in place, we could fix all the tests at once by simply fixing the code in LandingPage.GetSearchInput(). Saving us from several hours of tedious work.

Having shown this small example, I will now show I solved this for my work-related project.

![First Agenda Login](/assets/2017-02-03_07h08_39.png)

To get started we need to find the two input fields for username / password. I always use the developer tools to see how the page is rendered in the browser. You could just look in the source code of your project, but this could be a harder task, since the page could be rendered by several templates given the different states your app could be in.  

![Source](/assets/login_source-1.png)

Above we see the browsers source for these 2 elements. The way I always locate the elements on a page is by using Xpath's. I allways make containers for the different sections of a page. In this login example, there ain't much else than the login form. I still use a container, because I never know what might happen in the future and by having it split nicely up, makes it easier for me to fix issues.

```
private const string _container = "//*[@class=\'login-body\']";
private const string _usernameXpath = _container+"//*[@id=\'UserName\']";
private const string _passwordXpath = _container+"//*[@id=\'Password\']";
```

Here we see how my container points at a element with the class "login-body" and how I prepend the container to the following xpaths. I then use these Xpath's and create a new Class LoginPage. The structure of my project can be seen in the screenshot.

![structure](/assets/structure-1.png)

Now we need the rest of the elements on the page. Like login button, forgot password button, error message when wrong password / username was typed.

```
private ChromeDriver _driver;

private const string _container = "//*[@class=\'login-body\']";
private const string _usernameXpath = _container + "//*[@id=\'UserName\']";
private const string _passwordXpath = _container + "//*[@id=\'Password\']";
private const string _loginButtonXpath = _container + "//*[@class=\'login-button\']";
private const string _forgotPasswordXpath = _container + "//a[@href=\'/Password/RequestRecoverPassword\']";
private const string _errorMessageXpath = _container + "//*[@class=\'form-message error-message\']";

public LoginPage(ChromeDriver driver)
{
    this._driver = driver;
}
```

Now we can start interacting with the page by making page methods. Pressing button. Writing text in input fields. Checking if stuff is visible. Lets look at the methods I have made TypeUsername and TypePassword. 

```
public LoginPage TypeUsername(string username)
{
    var usernameField = _driver.FindElement(By.XPath(_usernameXpath));
    usernameField.SendKeys(username);
    return this;
}

public LoginPage TypePassword(string password)
{
    var passwordField = _driver.FindElement(By.XPath(_passwordXpath));
    passwordField.SendKeys(password);
    return this;
}
```

Looks like standard Selenium procedure. But by using the Page Object Model, I can reuse these methods in all my tests. I also use return type of LoginPage, so I can "dot" my way through the code. I can then write my tests in the following ways:

```
LoginPage login = new LoginPage(this);

login.TypeUsername(username)
     .TypePassword(password)
     .ClickLogin();

login.TypeUsername(username);
login.TypePassword(password);
login.ClickLogin();
```

After logging in we are greeted by the Menu page.  

![Menu page](/assets/menu_page.png)

Menu page I have split up into 3 different sections. This is shown in the structure picture previously mentioned in this post. RecentChangedAgendas, ReleaseNotes, ServiceStatus. The Menu page object itself only contains the child sections entities as seen below.

```
public RecentChangedAgendas RecentChangedAgendas => new RecentChangedAgendas(_driver);
public ReleaseNotes ReleaseNotes => new ReleaseNotes(_driver);
public ServiceStatus ServiceStatus => new ServiceStatus(_driver);

public MenuPage(PortalDriver driver)
{
    _driver = driver;
}
```

Each of the sections is then implemented similar to the login page with their own container Xpath and elements Xpath's. This is where the container really makes sense. In pages with several sections. On this Menu Page we have 3 sections all containing a title. None of which are unique. Just plain old HTML Headline tags, no Id's or classes.

```
private const string _titleXpath = _containerXpath + "//h1";
```

Nice and easy using the container. It's easy to imagine several sections having similar elements. Below we can see two sample tests.

```
[SetUp]
public void Initialize()
{
    _driver = new ChromeDriver();
    _driver.LoginToFirstAgenda();
    recentChangedAgendas = new RecentChangedAgendas(_driver);
}

[Test]
public void TestTitle()
{
    var title = recentChangedAgendas.GetTitle();

    Assert.AreEqual("LAST CHANGED AGENDAS", title);
}

[Test]
public void TestRowTwoCommitteeText()
{
    var text = recentChangedAgendas.GetRow(6).GetColumnText(RecentChangedAgendasTableHeader.Committee);

    Assert.AreEqual("Test af formateringer", text);
}
```

Well I could continue rambling about Page Object Model and Selenium testing. I hope this blog post gave you an idea of how to get started with testing web pages or simply automating some tasks using Selenium. I will soon come with a follow up blog post about scaling Selenium tests. Using Docker with Selenium and finally building your own webdriver extending the existing webdriver with more AWESOME features!

So see you next time and stay Swag

(as promised, the NuGet packages)

![NuGet package](/assets/nuget_selenium.png)

