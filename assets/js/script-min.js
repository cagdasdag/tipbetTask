$(document).ready(function(){var e=[];$.getJSON("https://api.foursquare.com/v2/venues/categories?oauth_token=ZHYUNCEMLMYUSOPIBQVLXP31E4DRMOPDFXQNECR2W4Z4BUOS&v=20170817",function(a){var i=a.response.categories;$(i).each(function(){e.push($(this))})}).promise().done(function(){var a="";$(e).each(function(e){var i=$(this)[0];if(i.categories.length>0){var t="";$(i.categories).each(function(e){t+='<li data-index="'+e+'"><a href="javascript:void(0)">'+$(this)[0].name+"</a></li>"}),a+='<li class="parent" data-index="'+e+'"><a href="javascript:void(0)">'+i.name+'</a><ul class="subMenu" style="display:none">'+t+"</ul></li>"}else a+='<li data-index="'+e+'"><a href="javascript:void(0)">'+i.name+"</a></li>"}),$(".category_list").append(a),$("ul.category_list li .subMenu li a").click(function(){$(".area_list").empty(),$("#preloader").css("display","block");var a=$(this).closest("li.parent").attr("data-index"),i=$(this).closest("li").attr("data-index"),t="https://api.foursquare.com/v2/venues/explore?near=valletta&query="+e[a][0].categories[i].id+"&oauth_token=ZHYUNCEMLMYUSOPIBQVLXP31E4DRMOPDFXQNECR2W4Z4BUOS&v=20170817",s=[],l="";$.getJSON(t,function(e){var a=e.response.groups[0].items;$(a).each(function(){s.push($(this))})}).promise().done(function(){$(s).each(function(e){var a=$(this)[0].venue.name,i=$(this)[0].venue.stats.checkinsCount,t=$(this)[0].venue.location.lat,s=$(this)[0].venue.location.lng,o="",n="";$(this)[0].venue.categories.length>0&&(o=$(this)[0].venue.categories[0].icon.prefix+"bg_32"+$(this)[0].venue.categories[0].icon.suffix,n=$(this)[0].venue.categories[0].name),l+='<li class="area_list_item"><div class="area_list_item_title">'+a+'</div> <div class="area_list_item_category"><img src="'+o+'" alt="" class="area_list_item_category_icon"><div class="area_list_item_category_title"> Kategori : '+n+'</div></div> <div class="area_list_item_checkInCount">CheckIn :  '+i+'</div> <div class="area_list_item_map"> <a href="javascript:void(0)" data-toggle="modal" data-target="#mapModal'+e+'">Harita İçin Tıklayınız.</a> </div> <div id="mapModal'+e+'" class="modal fade" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <iframe src="https://maps.google.com/maps?q='+t+","+s+'&hl=es;z=14&output=embed" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe> </div> </div> </div></li>'}),$("#preloader").css("display","none"),$(".area_list").append(l)})}),$("ul.category_list li.parent > a").click(function(){$(this).parent().siblings("li").children("ul").stop().slideUp(),$(this).siblings("ul").stop().slideToggle()}),$("ul.category_list li > a").click(function(){$(".category_list li ").each(function(){$(this).removeClass("active")}),$(this).parent().addClass("active")})})});