let GRAPH_PAPER_ID = '1cljKvLbQNpqbohLW89-imzEvbzbXxpGN';
function getUrl(CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, API_KEY, FILE_ID, problem_dataurl) {
  let refresh = new XMLHttpRequest();
  const params = "client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&refresh_token=" + REFRESH_TOKEN + "&grant_type=refresh_token";
  refresh.open("POST", 'https://oauth2.googleapis.com/token', true);
  refresh.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  refresh.responseType = 'json';
  refresh.send(params);
  refresh.onload = function(response) {
    //console.log(refresh.response);
    let accessToken = refresh.response.access_token;

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.open("GET", "https://www.googleapis.com/drive/v3/files/"+ FILE_ID +'?&alt=media' +'&key=' + API_KEY, true);
    xhr.setRequestHeader('Authorization','Bearer '+ accessToken);
    xhr.onload = function(){
      //console.log(xhr);
      /*window.open(URL.createObjectURL(xhr.response));
      let dataurl = URL.createObjectURL(xhr.response);
      console.log(URL.createObjectURL(xhr.response));*/
      console.log(xhr.response);
      problem_dataurl.dataurl = xhr.response;
    }
    xhr.send();
  }
}
