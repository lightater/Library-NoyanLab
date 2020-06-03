function getFile(CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, API_KEY, FILE_ID) {
  let refresh = new XMLHttpRequest();
  const params = "client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&refresh_token=" + REFRESH_TOKEN + "&grant_type=refresh_token";
  refresh.open("POST", 'https://oauth2.googleapis.com/token', true);
  refresh.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  refresh.responseType = 'json';
  refresh.send(params);
  refresh.onload = function(response) {
    console.log(refresh.response);
    let accessToken = refresh.response.access_token;

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.open("GET", "https://www.googleapis.com/drive/v3/files/"+ FILE_ID +'?&alt=media' +'&key=' + API_KEY, true);
    xhr.setRequestHeader('Authorization','Bearer '+ accessToken);
    xhr.onload = function(){
      console.log(xhr);
      const downloadFile = function(blob, fileName) {
        const link = document.createElement('a');
        // create a blobURI pointing to our Blob
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        // some browser needs the anchor to be in the doc
        document.body.append(link);
        link.click();
        link.remove();
        // in case the Blob uses a lot of memory
        window.addEventListener('focus', e=>URL.revokeObjectURL(link.href), {once:true});
      };
      downloadFile(xhr.response, 'something.pdf');
    }
    xhr.send();
  }
}
