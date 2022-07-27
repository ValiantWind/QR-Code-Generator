function generate(){
    var input = document.getElementById("input").value;
    var url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input}`;

    var qrCode = document.getElementById("img");

    qrCode.src = url;
  }