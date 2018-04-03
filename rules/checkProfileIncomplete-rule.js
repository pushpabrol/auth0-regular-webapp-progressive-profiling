function (user, context, callback) {

  
  function isEmpty(val){
    return (val === undefined || val === null || val.length <= 0) ? true : false;
}
  if(context.clientID === '{{YOUR_CLIENT_ID}}'){
    
    var requestedScopes = (context.request.query.scope && context.request.query.scope.split(' ')) || [];
    if(user.user_metadata)
    {
      if(isEmpty(user.user_metadata.Age) || isEmpty(user.user_metadata.Name)) { 
        context.idToken["https://claims.myapp.com/profile_incomplete"] = true;
        context.accessToken["https://claims.myapp.com/profile_incomplete"] = true;
        requestedScopes[requestedScopes.length] = 'deny:alloperations';
        context.accessToken.scope = requestedScopes;


      }
      else  {
        context.idToken["https://claims.myapp.com/profile_incomplete"] = false;
        context.accessToken["https://claims.myapp.com/profile_incomplete"] = false;
      }
    }
    else { 
      context.idToken["https://claims.myapp.com/profile_incomplete"] = true;
      context.accessToken["https://claims.myapp.com/profile_incomplete"] = true;
      requestedScopes[requestedScopes.length] = 'deny:alloperations';
      context.accessToken.scope = requestedScopes;
      
    }

  }
  
  
  callback(null, user, context);
}