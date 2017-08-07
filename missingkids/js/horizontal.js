
(function () {


    /**
     * NCMEC/MissingKids.com horizontal javascript banner v1.0
     * Please see http://banner.missingkids.com/js for more information
     */
    var ncmecRootUrl = "http://banner.missingkids.org/"
    var ncmecImagesRootUrl = ncmecRootUrl + "images/jsimages/";
    var ncmecRSSFeed = "http://www.missingkids.org/missingkids/servlet/XmlServlet?act=rss&LanguageCountry=en_US&orgPrefix=NCMC";
    var ncmecIntervalTimer;
    var currentNCMECChildShown = 0;
    var ncmecFeedItems = new Array();
    var ncmecPlayerPaused = true;

    doNCMECSetup();

    /**
     * Object to hold each item's data
     */
    function ncmecFeedItem() {
        name = "";
        image = "";
        missingFrom = "";
        missingDate = "";
        ageNow = "";
        link = "";
        info = "";
    }

    /**
     * sets everything up and gets it going
     */
    function doNCMECSetup() {
        populateNCMECContainerInitially();

        // Note: Google shutdown the Feed API service on 12/15/2016, so we use ajax to load rss feeds.
        // load the google feeds API
        // google.load("feeds", "1");    
        // google.setOnLoadCallback(onNCMECLoad);

        // use ajax to load rss feeds.
        ajaxLoadRssFeeds();
    }

    /**
     * does initial population of the container
     */
    function populateNCMECContainerInitially() {
        var ncmecContainer = document.getElementById('ncmec_container');
        var containerContents = "<table id='ncmec_table'><tr>";
        containerContents += "<td id='ncmec_td_one'>";
        containerContents += "  <div id='ncmec_help_me_div'><a id='ncmec_help_me_link' target='_blank'>Help Me To Get<br> Back Home</a></div>";
        containerContents += "  <div><a href='http://missingkids.com'><img id='ncmec_logo' alt='National Center For Missing and Exploited Children' title='National Center For Missing and Exploited Children'src='" + ncmecImagesRootUrl + "MK_logo-342x128.png'></a></div>";
        containerContents += "  <div id='ncmec_call_text'>Call 1-800-THE-LOST</div>";
        containerContents += "</td>";
        containerContents += "<td id='ncmec_td_two'>";
        containerContents += "  <a id='ncmec_link' target='_blank' href=''>";
        containerContents += "  <img id='ncmec_child_photo' width='64' height='80'></a>";
        containerContents += "  <div id='ncmec_child_name'><a id='ncmec_child_name_link' target='_blank'></a></div>";
        containerContents += "  <a id='ncmec_child_info_link' target='_blank'><div id='ncmec_child_info'></div></a>";
        containerContents += "  <div id='ncmec_controls'>";
        containerContents += "  <img id='ncmec_prev' alt='Previous' title='Previous' width='22' height='22' onclick='prevNCMECSlideshow();' src='" + ncmecImagesRootUrl + "button-prev.png' onmouseover='ncmecPlayerNextPrevHover(\"ncmec_prev\", \"over\")' onmouseout='ncmecPlayerNextPrevHover(\"ncmec_prev\", \"out\")'>";
        containerContents += "  <img id='ncmec_play_pause' alt='Play/Pause' title='Play/Pause' width='22' height='22' onclick='pauseOrStartNCMECSlideshow();' src='" + ncmecImagesRootUrl + "button-pause.png' onmouseover='ncmecPlayerPausePlayMouseOver()' onmouseout='ncmecPlayerPausePlayMouseOut()'>";
        containerContents += "  <img id='ncmec_next' alt='Next' title='Next' width='22' height='22' onclick='nextNCMECSlideshow();' src='" + ncmecImagesRootUrl + "button-next.png' onmouseover='ncmecPlayerNextPrevHover(\"ncmec_next\", \"over\")' onmouseout='ncmecPlayerNextPrevHover(\"ncmec_next\", \"out\")'>";
        containerContents += "  </div> ";
        containerContents += "  <div id='ncmec_click_photo'>Click on the photo for more information</div>";
        containerContents += "</td>";
        containerContents += "</tr>";
        containerContents += "</table>";

        ncmecContainer.innerHTML = containerContents;
    }

    /**
     * This will be called periodically to update the display with a new child
     */
    function updateNCMECDisplayWithObject(which) {
        if (which > ncmecFeedItems.length - 1) {
            which = 0;
        } else if (which < 0) {
            which = ncmecFeedItems.length - 1;
        }

        var ncmecObject = ncmecFeedItems[which];
        document.getElementById('ncmec_child_photo').src = ncmecObject.image;
        fixNCMECChildNameSize(ncmecObject.name);
        document.getElementById('ncmec_child_name_link').innerHTML = ncmecObject.name;
        document.getElementById('ncmec_child_info').innerHTML = ncmecObject.info;
        //links    
        document.getElementById('ncmec_link').href = ncmecObject.link;
        document.getElementById('ncmec_help_me_link').href = ncmecObject.link;
        document.getElementById('ncmec_child_info_link').href = ncmecObject.link;
        document.getElementById('ncmec_child_name_link').href = ncmecObject.link;
        //alt and title
        document.getElementById('ncmec_child_photo').alt = ncmecObject.name;
        document.getElementById('ncmec_child_photo').title = ncmecObject.name;
        document.getElementById('ncmec_help_me_link').alt = 'Help ' + (ncmecObject.name || '') + ' get back home';
        document.getElementById('ncmec_help_me_link').title = 'Help ' + ncmecObject.name + ' get back home';

        currentNCMECChildShown = which;
    }

    /**
     * changes play/pause image when hovered on
     */
    function ncmecPlayerPausePlayMouseOver() {
        var ncmecPlayPauseImg = document.getElementById('ncmec_play_pause');
        if (ncmecPlayerPaused) {
            ncmecPlayPauseImg.src = ncmecImagesRootUrl + 'button-play-over.png';
        } else {
            ncmecPlayPauseImg.src = ncmecImagesRootUrl + 'button-pause-over.png';
        }
    }

    /**
     * changes play/pause image when mouse leaves
     */
    function ncmecPlayerPausePlayMouseOut() {
        var ncmecPlayPauseImg = document.getElementById('ncmec_play_pause');
        if (ncmecPlayerPaused) {
            ncmecPlayPauseImg.src = ncmecImagesRootUrl + 'button-play.png';
        } else {
            ncmecPlayPauseImg.src = ncmecImagesRootUrl + 'button-pause.png';
        }
    }

    /**
     * changes next and prev images when hovered on/out
     */
    function ncmecPlayerNextPrevHover(elementId, overOrOut) {
        var playerImg = document.getElementById(elementId);

        if (overOrOut == "over") {
            if (elementId == "ncmec_prev") {
                playerImg.src = ncmecImagesRootUrl + 'button-prev-over.png';
            } else {
                playerImg.src = ncmecImagesRootUrl + 'button-next-over.png';
            }
        } else { //out
            if (elementId == "ncmec_prev") {
                playerImg.src = ncmecImagesRootUrl + 'button-prev.png';
            } else {
                playerImg.src = ncmecImagesRootUrl + 'button-next.png';
            }
        }
    }

    function pauseOrStartNCMECSlideshow() {
        if (ncmecPlayerPaused) {
            //show next immediately then restart it
            updateNCMECDisplayWithObject(currentNCMECChildShown + 1);
            startNCMECSlideshow();
        } else {
            pauseNCMECSlideshow();
        }
    }

    function pauseNCMECSlideshow() {
        clearInterval(ncmecIntervalTimer);
        ncmecIntervalTimer = null;
        document.getElementById('ncmec_play_pause').src = ncmecRootUrl + 'images/jsimages/button-play.png';
        ncmecPlayerPaused = true;
    }

    /**
     * begin the slideshow
     */
    function startNCMECSlideshow() {
        //5000 = 5 seconds
        ncmecIntervalTimer = setInterval("updateNCMECDisplayWithObject(currentNCMECChildShown+1)", 5000);  // run  
        document.getElementById('ncmec_play_pause').src = ncmecRootUrl + 'images/jsimages/button-pause.png';
        ncmecPlayerPaused = false;
    }

    /**
     * pause the slideshow, then show next
     */
    function nextNCMECSlideshow() {
        pauseNCMECSlideshow();
        updateNCMECDisplayWithObject(currentNCMECChildShown + 1);
    }

    /**
     * pause the slideshow, then show prev
     */
    function prevNCMECSlideshow() {
        pauseNCMECSlideshow();
        updateNCMECDisplayWithObject(currentNCMECChildShown - 1);
    }

    /**
     * Our callback function, for once the feed is loaded.
     * This will setup the variables to use later
     * and kick off the thread to display the items
     */
    function ncmecFeedLoaded(result) {
        // Get all items returned.
        var items = result.getElementsByTagName('item');

        // Loop through our items
        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            // Get the data from the element.  firstChild is the text node containing
            // the title, and nodeValue returns the value of it.
            var title = item.getElementsByTagName('title')[0].firstChild.nodeValue;
            var link = item.getElementsByTagName('link')[0].firstChild.nodeValue;
            var image = item.getElementsByTagName('enclosure')[0].getAttribute("url");

            //description has a bunch of info... let's parse it out      
            var description = item.getElementsByTagName('description')[0].firstChild.nodeValue;
            var commaSplit = description.split(', ');
            var name = toTitleCaseNCMEC(commaSplit[0].toLowerCase());
            var ageNow = commaSplit[1].split(': ')[1];
            //need to do a lot of cleanup on the age
            if (ageNow.length < 3) {
                //add "years"  
                ageNow = ageNow + " years";
            } else {
                //its of the form "X Month(s)"
                //get rid of the parens
                ageNow = ageNow.replace("(", "");
                ageNow = ageNow.replace(")", "");
                if (ageNow.indexOf("1") == 0) {
                    ageNow = ageNow.replace("s", "");
                }
                ageNow = ageNow.replace("M", "m");
            }

            ageNow = "Age now: <strong>" + ageNow + "</strong>";
            var missingDate = commaSplit[2].split('. ')[0]
            missingDate = missingDate.split(':')[1];
            missingDate = "Since: <strong>" + missingDate + "</strong>";
            var missingFrom = (commaSplit[2] + ", " + commaSplit[3]).split('.')[1];
            missingFrom = missingFrom.split('rom')[1];
            var city = missingFrom.split(',')[0];
            city = toTitleCaseNCMEC(city.toLowerCase());
            var state = missingFrom.split(',')[1];
            //missingFrom = toTitleCaseNCMEC(missingFrom.toLowerCase());   
            missingFrom = city + "," + state;

            var info = "Missing from:<br/>";
            info += "<strong>" + missingFrom + "</strong><br/>";
            info += missingDate + "<br/>";
            info += ageNow;

            var ncmecObject = new ncmecFeedItem();
            ncmecObject.name = name;
            ncmecObject.image = image;
            ncmecObject.missingFrom = missingFrom;
            ncmecObject.ageNow = ageNow;
            ncmecObject.missingDate = missingDate;
            ncmecObject.link = link;
            ncmecObject.info = info;
            ncmecFeedItems[i] = ncmecObject;
        }
        //alert("htmlToShow: "+itemsToShow.length);
        updateNCMECDisplayWithObject(0);
        startNCMECSlideshow();
    }

    /**
     * adjust the font size of the child name when the name is long.
     * An attempt to not have the widget resize itself when the name is long
     */
    function fixNCMECChildNameSize(ncmecName) {
        var ncmecNameField = document.getElementById('ncmec_child_name')
        if (ncmecName.length > 20) {
            //lower font size a bunch
            ncmecNameField.style.fontSize = "10pt";
        } else if (ncmecName.length > 16) {
            //lower font size somewhat
            ncmecNameField.style.fontSize = "11pt";
        } else {
            //make sure it's the default size
            ncmecNameField.style.fontSize = "12pt";
        }
    }

    /**
     * converts a string to Title Case
     */
    function toTitleCaseNCMEC(str) {
        return str.replace(/(?:^|\s)\w/g, function (match) {
            return match.toUpperCase();
        });
    }

    /**
     * Called once the Google feeds API is loaded.
     * Does the actual loading of the feed.
     */
    function onNCMECLoad() {
        // Create a feed instance that will grab NCMEC's feed.
        // add in a time variable so google doesn't use old, cached version
        // with old data, missing photos, and invalid links
        var feed = new google.feeds.Feed(ncmecRSSFeed + "&t=" + new Date().getTime());
        // var feed = new google.feeds.Feed(ncmecRSSFeed);

        // Request the results in XML (so that we can parse out all the info)
        feed.setResultFormat(google.feeds.Feed.XML_FORMAT);

        //must set this - if you don't, it defaults to 4
        feed.setNumEntries(50);

        // Calling load sends the request off.  It requires a callback function.
        feed.load(ncmecFeedLoaded);
    }

    function swapNCMECPlayerImage(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function ajaxLoadRssFeeds() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", ncmecRSSFeed + "&ts=" + new Date().getTime(), true);
        xmlHttp.send(null);
        xmlHttp.onreadystatechange = function () {
            // only interested in "completed" state
            if (xmlHttp.readyState == 4) {
                // only interested in HTTP status "OK".
                if (xmlHttp.status == 200) {
                    ncmecFeedLoaded(xmlHttp.responseXML);
                }
            }
        };
    }
})();