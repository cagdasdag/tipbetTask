$(document).ready(function () {
    var apiURL = 'https://api.foursquare.com/v2/venues/categories?oauth_token=ZHYUNCEMLMYUSOPIBQVLXP31E4DRMOPDFXQNECR2W4Z4BUOS&v=20170817';

    // Get Main Categories
    var categoryData = [];
    $.getJSON(apiURL, function (response) {
        var responseCategories = response['response']['categories'];

        $(responseCategories).each(function () {
            categoryData.push($(this));
        });
    }).promise().done(function () {

        /**
         *  Set And Append Category List
         */
        var categoryListHtml = '';

        $(categoryData).each(function (mainIndex) {
            var category = $(this)[0];

            if (category['categories'].length > 0) {
                var categoryListSubHtml = '';

                $(category['categories']).each(function (subIndex) {
                    categoryListSubHtml += '<li data-index="' + subIndex + '"><a href="javascript:void(0)">' + $(this)[0]['name'] + '</a></li>'
                });

                categoryListHtml += '<li class="parent" data-index="' + mainIndex + '"><a href="javascript:void(0)">' + category['name'] + '</a><ul class="subMenu" style="display:none">' + categoryListSubHtml + '</ul></li>'
            } else {
                categoryListHtml += '<li data-index="' + mainIndex + '"><a href="javascript:void(0)">' + category['name'] + '</a></li>'
            }

        });
        $('.category_list').append(categoryListHtml);


        /**
         * Set And Append Area List
         */
        $('ul.category_list li .subMenu li a').click(function () {
            $('.area_list').empty();
            $('#preloader').css('display','block');
            var mainCatId = $(this).closest('li.parent').attr('data-index');
            var subCatId = $(this).closest('li').attr('data-index');

            var venueID = categoryData[mainCatId][0]['categories'][subCatId]['id'];

            var secondApi = 'https://api.foursquare.com/v2/venues/explore?near=valletta&query=' + venueID + '&oauth_token=ZHYUNCEMLMYUSOPIBQVLXP31E4DRMOPDFXQNECR2W4Z4BUOS&v=20170817';

            // Get Area Data
            var areaData = [];
            var areaItemsHtml = '';

            $.getJSON(secondApi, function (response) {
                var responseData = response['response']['groups'][0]['items'];

                $(responseData).each(function () {
                    areaData.push($(this));
                });
            }).promise().done(function () {
                $(areaData).each(function (areaIndex) {

                    // Define Variables
                    var areaTitle = $(this)[0]['venue']['name'];
                    var areaCheckInCount = $(this)[0]['venue']['stats']['checkinsCount'];
                    var areaLocationLat = $(this)[0]['venue']['location']['lat'];
                    var areaLocationLng = $(this)[0]['venue']['location']['lng'];
                    var areaCategoryIcon = '';
                    var areaCategoryTitle = '';

                    // Check Venue Has Categorie
                    if ($(this)[0]['venue']['categories'].length > 0) {
                        areaCategoryIcon = $(this)[0]['venue']['categories'][0]['icon']['prefix'] + 'bg_32' + $(this)[0]['venue']['categories'][0]['icon']['suffix'];
                        areaCategoryTitle = $(this)[0]['venue']['categories'][0]['name'];
                    }

                    areaItemsHtml += '<li class="area_list_item"><div class="area_list_item_title">' + areaTitle + '</div> <div class="area_list_item_category"><img src="' + areaCategoryIcon + '" alt="" class="area_list_item_category_icon"><div class="area_list_item_category_title"> Kategori : ' + areaCategoryTitle + '</div></div> <div class="area_list_item_checkInCount">CheckIn :  ' + areaCheckInCount + '</div> <div class="area_list_item_map"> <a href="javascript:void(0)" data-toggle="modal" data-target="#mapModal' + areaIndex + '">Harita İçin Tıklayınız.</a> </div> <div id="mapModal' + areaIndex + '" class="modal fade" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <iframe src="https://maps.google.com/maps?q=' + areaLocationLat + ',' + areaLocationLng + '&hl=es;z=14&output=embed" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe> </div> </div> </div></li>'
                });
                $('#preloader').css('display','none');
                $('.area_list').append(areaItemsHtml);
            });
        });

        // Sidebar Toggle
        $("ul.category_list li.parent > a").click(function () {
            $(this).parent().siblings("li").children("ul").stop().slideUp();
            $(this).siblings("ul").stop().slideToggle();
        });

        $("ul.category_list li > a").click(function () {
            $('.category_list li ').each(function () {
                $(this).removeClass('active');
            });
            $(this).parent().addClass("active");
        });
    });
});