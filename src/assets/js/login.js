function switchCard() {
    const loginCard = document.querySelector('.container .card:nth-child(1)');
    const registerCard = document.querySelector('.container .card:nth-child(2)');
  
    if (loginCard.style.display === 'none') {
      loginCard.style.display = 'block';
      registerCard.style.display = 'none';
    } else {
      loginCard.style.display = 'none';
      registerCard.style.display = 'block';
    }
  }
  
  var googleUser = {};
  var startApp = function() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '46624841666-rhb1ravu863ip9b1i1k572ujfpvaqijb.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        scope: 'email, profile'
      });
      attachSignin(document.getElementById('customBtn'));
    });
  };

  function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
          document.getElementById('name').innerText = "Signed in: " +
              googleUser.getBasicProfile().getName();
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
  window.onload = function () {
    google.accounts.id.renderButton(
      document.getElementById("btnGGLOGIN"),
      { theme: "outline", size: "large"}  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }