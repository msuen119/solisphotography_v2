
$(document).ready(function () {

    $.ajax({
        type:       "GET",
        url:        "json/albums.json",
        dataType:   "json",
        success:    function(data) {
            renderMenu(data);
        }
    });
});

window.onload = function() {

    if (location.hash.substr(0,2) == "#!") {
        $("a[href='#" + location.hash.substr(2) + "']").tab("show");
    }
    else {
        $(".nav-pills li").first().addClass("active");
        $("div.tab-pane").first().addClass("active");
    }

    $("a[data-toggle='pill']").on("shown.bs.tab", function (e) {
        var hash = $(e.target).attr("href");
        if (hash.substr(0,1) == "#") {
            location.replace("#!" + hash.substr(1));
        }
    });

};

function renderMenu(data) {

    var pills = {
        'li' : {
            'album<-gallery.albums' : {
                'a': 'album.year',
                'a@href' : '##{album.id}',
                'a@aria-controls': 'album.id'
            }
        }
    };
    // render pills
    $p('ul.nav-pills').render(data, pills);

    var panel = {
        'div.tab-pane' : {
            'album<-gallery.albums' :{
                '.@id' : 'album.id'
            }
        }
    };

    // render panels with no albums
    $p('div.tab-content').render(data, panel);

    $(".nav-stacked li a").each(function() {
       renderPane(data, $(this).attr("aria-controls"));
    });
}

function renderPane(data, id) {
    var json = JSON.stringify(data);
    var obj = $.parseJSON(json);

    for( var i=0; i<obj.gallery.albums.length; i++ ) {
        var year = obj.gallery.albums[i];
        if( year.id == id ) {
            for( var a=0; a<year.album.length; a++ ) {
                var album = year.album[a];
                if( album.thumbnail != null ) {
                    var imgUrl = window.location.origin + window.location.pathname + "/../" + album.thumbnail;
                    console.log(imgUrl);
                    generateHTML(album, imgUrl, id);
                }
                else {
                    var url = window.location.origin + window.location.pathname + "/../gallery/" + album.html;
                    renderGallery(url, album, id);
                }
            }
        }
    }
}

function renderGallery(url, album, id) {

    $.ajax({
        url: url,
        success: function(page) {
            var html = $.parseHTML( page );
            img = $(html).find("img"),
            len = img.length;
            if( len > 0 ) {
                if( album.albumpage == 'yes' ) {
                    var src = img.eq(1).attr("src");
                }
                else {
                    var src = img.eq(0).attr("src"); // get id of first image
                }
            }
            else {
                console.log("Image not found");
            }

            var root = this.url.substring(0, this.url.lastIndexOf("/"));
            var imgUrl = root + "/" + src;
            generateHTML(album, imgUrl, id);
        }
    });
}

function generateHTML(album, imgUrl, id) {
    var html =
        "<div class='col-md-3 col-sm-6 col-xs-12'> " +
        "  <div class='thumbnail'> " +
        "    <a href='"+album.html+"'><img src="+imgUrl+"></a> " +
        "    <div class='caption'> " +
        "      <h5>"+album.title+"</h5>" +
        "      <p><a href='"+album.html+"' class='btn btn-primary' role='button'>HTML</a> ";

    if( album.flash != null ) {
        html +=
        "      <a href='"+album.flash+"' class='btn btn-default' role='button'>FLASH</a></p>";
    }

    html +=
        "    </div>" +
        "  </div>" +
        "</div>";

    $("#"+id+" div.row").append(html);
}
