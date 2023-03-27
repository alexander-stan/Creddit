function saveChanges() {
    // Get the input values
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
  
    // Save the changes to localStorage or send them to the server
    localStorage.setItem("name", name);
    localStorage.setItem("password", password);
    localStorage.setItem("email", email);
    localStorage.setItem("address", address);
  
    alert("Changes saved successfully!");
  }
  