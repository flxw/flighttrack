(function() {
  'use strict';
// ------------------------------------
angular
  .module("myApp")
  .factory("tripService", function () {
    var s = {};

    s.trips = [
      {
        destination: { name: 'Dubai', coordinates: { latitude: 25.253834, longitude: 55.364814 } },
        startDate: new Date(2015, 7, 14),
        endDate: new Date(2015, 7, 15),
        storyMarkdown:  "# Running it\n" +

        "I tried to make scplay as easy to use as possible. When firing it up for the first time, you are asked for your\n" +
        "permalink profile ID, which you can extract from the permalink to you profile. My profile ID would be:\n" +
        "*http:// soundcloud.com/<span style='color:#f00'>fe-lix-62</span>*\n" +
        "![](https://raw.githubusercontent.com/flxw/scplay/master/images/playing2.png)\n" +
        "From there on, simply double-click your songs inside the list to play them. The application\n" +
        "will hide itself once you click elsewhere on the screen. To bring it back up, click on the icon in the systray.\n" +
        "![Initial scplay screen](https://github.com/flxw/scplay/blob/master/images/initial.png)\n" +
        "### Running it\n" +
        "#### Running it\n" +
        "##### Running it\n" +
        "**Windows** *Users* will find builds attached to the releases above.\n" +
        "Those with another OS will need to build it themselves\n" +
        "``` bash\n" +
        "git clone http://github.com/flxw/scplay /tmp/scplay\n" +
        "cd /tmp/folienizer\n" +
        "qmake\n" +
        "make\n" +
        "```\n" +
        "## Version\n" +
        "To find out your version number, right-click the icon in your systray. Always be sure to make use of the latest one ;)\n" +
        "![finding out your version-number](https://github.com/flxw/scplay/blob/master/images/finding-version-number.png)\n" +
        "## Endorsement\n" +
        "At the moment of writing, I am not affiliated with or endorsed by SoundCloud.\n" +
        "I just put up their logo so that you do not forget that SoundCloud does the heavy lifting here."
      },
      {
        destination: { name: 'Dubai', coordinates: { latitude: 25.253834, longitude: 55.364814 } },
        startDate: new Date(2015, 7, 14),
        endDate: new Date(2015, 7, 15),
        storyMarkdown:  "![](https://raw.githubusercontent.com/flxw/scplay/master/images/playing2.png)\n" +
        "# Running it\n" +
        "Windows Users will find builds attached to the releases above.\n" +
        "Those with another OS will need to build it themselves\n" +
        "``` bash\n" +
        "git clone http://github.com/flxw/scplay /tmp/scplay\n" +
        "cd /tmp/folienizer\n" +
        "qmake\n" +
        "make\n" +
        "```\n" +
        "# Usage\n" +
        "I tried to make scplay as easy to use as possible. When firing it up for the first time, you are asked for your\n" +
        "permalink profile ID, which you can extract from the permalink to you profile. My profile ID would be:\n" +
        "*http:// soundcloud.com/<span style='color:#f00'>fe-lix-62</span>*\n" +
        "From there on, simply double-click your songs inside the list to play them. The application\n" +
        "will hide itself once you click elsewhere on the screen. To bring it back up, click on the icon in the systray.\n" +
        "![Initial scplay screen](https://github.com/flxw/scplay/blob/master/images/initial.png)\n" +
        "## Version\n" +
        "To find out your version number, right-click the icon in your systray. Always be sure to make use of the latest one ;)\n" +
        "![finding out your version-number](https://github.com/flxw/scplay/blob/master/images/finding-version-number.png)\n" +
        "## Endorsement\n" +
        "At the moment of writing, I am not affiliated with or endorsed by SoundCloud.\n" +
        "I just put up their logo so that you do not forget that SoundCloud does the heavy lifting here."
      },
      {
        destination: { name: 'Dubai', coordinates: { latitude: 25.253834, longitude: 55.364814 } },
        startDate: new Date(2015, 7, 14),
        endDate: new Date(2015, 7, 15),
        storyMarkdown:  "![](https://raw.githubusercontent.com/flxw/scplay/master/images/playing2.png)\n" +
        "# Running it\n" +
        "Windows Users will find builds attached to the releases above.\n" +
        "Those with another OS will need to build it themselves\n" +
        "``` bash\n" +
        "git clone http://github.com/flxw/scplay /tmp/scplay\n" +
        "cd /tmp/folienizer\n" +
        "qmake\n" +
        "make\n" +
        "```\n" +
        "# Usage\n" +
        "I tried to make scplay as easy to use as possible. When firing it up for the first time, you are asked for your\n" +
        "permalink profile ID, which you can extract from the permalink to you profile. My profile ID would be:\n" +
        "*http:// soundcloud.com/<span style='color:#f00'>fe-lix-62</span>*\n" +
        "From there on, simply double-click your songs inside the list to play them. The application\n" +
        "will hide itself once you click elsewhere on the screen. To bring it back up, click on the icon in the systray.\n" +
        "![Initial scplay screen](https://github.com/flxw/scplay/blob/master/images/initial.png)\n" +
        "## Version\n" +
        "To find out your version number, right-click the icon in your systray. Always be sure to make use of the latest one ;)\n" +
        "![finding out your version-number](https://github.com/flxw/scplay/blob/master/images/finding-version-number.png)\n" +
        "## Endorsement\n" +
        "At the moment of writing, I am not affiliated with or endorsed by SoundCloud.\n" +
        "I just put up their logo so that you do not forget that SoundCloud does the heavy lifting here."
      },
      {
        destination: { name: 'Dubai', coordinates: { latitude: 25.253834, longitude: 55.364814 } },
        startDate: new Date(2015, 7, 14),
        endDate: new Date(2015, 7, 15)
      },
      {
        destination: { name: 'Dubai', coordinates: { latitude: 25.253834, longitude: 55.364814 } },
        startDate: new Date(2015, 7, 14),
        endDate: new Date(2015, 7, 15)
      }
    ];

    s.changeTrip = function(i, t) { s.trips[i] = t };

    return s;
  })
})();