
<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="/assets/js/amazon-cognito-auth.min.js"></script>
<script src="/assets/js/aws-cognito-sdk.min.js"></script>
<script src="/assets/js/amazon-cognito-identity.min.js"></script>

<input type="text" id="username" name="username" placeholder="username"/>
<input type="password" id="password" name="password" placeholder="password"/>
<button onclick="createUser()" id="createUser">Create user</button>

<script>
    var poolData = {
        UserPoolId : 'eu-west-1_tOLYWwXT9', // your user pool id here
        ClientId : '2gmaeofdi1hvpj56rvlq3hveu4' // your app client id here
    };
    var userPool =  new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username : '...', // your username here
        Pool : userPool
    };
</script>

<script>
    function createUser(){
        console.log("trying to create user");
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        console.log("trying to create user with username "+username+" and password "+ password)

        var attributeList = [];
 
        var dataEmail = {
            Name : 'email',
            Value : '...' // your email here
        };

        console.log("got this far");

        //var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

        console.log("got this far 2");
        //attributeList.push(attributeEmail);

        var cognitoUser;
        userPool.signUp(username, password, attributeList, null, function(err, result){
            if (err) {
                alert(err);
                return;
            }
            cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
        });
    }

</script>