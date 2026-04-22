function getimg() {

    var url =
    "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&per_page=9&format=json&nojsoncallback=1";

    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){

        var gallery = document.getElementById("gallery");
        gallery.innerHTML = "";

        var photos = data.photos.photo;

        for(var i=0;i<photos.length;i++){

            var p = photos[i];

            var imgsrc =
            "https://live.staticflickr.com/" +
            p.server + "/" +
            p.id + "_" +
            p.secret + "_z.jpg";

            var img = document.createElement("img");
            img.src = imgsrc;

            gallery.appendChild(img);
        }

    })
    .catch(function(error){
        console.log(error);
    });

}