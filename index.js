let p="";
let uni="";
let names_list="";
let university="";
function getProvinces(){
  $.ajax({
    method: 'GET',
    url: 'https://univerlist.com/api/v2/province/?country=212&page_size=90',
    dataType: 'json',
    success: (myData)=>{
    $("#sehirler").select2({
    data: myData.results.map(d=>{
    return {
    id:d.pk,text:d.name
    }
    }),
    placeholder: "Şehirler"
    });
  },
  })
}

function getUniversities(){
  $.ajax({
    method: 'GET',
    url: 'https://univerlist.com/tr/api/v2/university/tercihrobotu/?page_size=300',
    dataType: 'json',
    success: (myData)=>{
    $("#uniler").select2({
    data: myData.results.map(d=>{
    return {
    id:d.pk,text:d.name
    }
    }),
    placeholder: "Üniversiteler"
    });
  },
  })
}

function getDepartments(){
  $.ajax({
    method: 'GET',
    url: 'https://univerlist.com/tr/api/v2/department/tercihrobotu/?page_size=800' + university,
    dataType: 'json',
    success: (myData)=>{
    $("#bolumler").select2({
    data: myData.results.map(d=>{
    return {
      id:d.name,text:d.name
    }
    }),
    placeholder: "Bölümler"
    });
  },
  })
}

function getResults(){
    $.ajax({
      method: 'GET',
      url: 'https://univerlist.com/api/v1/department/?page_size=16&lang=tr',
      dataType: 'json',
      success: onSuccessRes,
      error: onErrorRes
    })
}


function onSuccessRes(jsonReturn){
  jsonReturn.results.map(function(element, index){
    let departmentName = element.name;
    let facultyName = element.faculty_name;
    let universityName = element.university.name;
    let province = element.province;
    let depType = element.dep_type_2018;
    let lang = element.language.name;
    let slug = element.university.slug;

    let order2021 = element.order;
    let order2020 = element.order2020;

    let mark2021 = element.mark;
    let mark2020 = element.mark2020;

    let quota = element.quota; 
    let settlers = element.settlers; 

  
    $(".table-body").append(
      `
      <tr>
                    <!-- Üniversite Adı ve Şehir -->
                    <td><span ><label style="min-width: 200px;" class="linkx uni-name"><a href="https://univerlist.com/tr/${slug}/" target="_blank" rel="noreferer"> ${universityName}</a><label class="w-100"
                    style="font-size: 11px !important;color: #9c9c9c;">(${province})</label></label></span></td>
                    <!-- Bölüm Adı ve Fakülte Adı -->
                    <td><label style=" min-width: 180px;">${departmentName} <label class="w-100"
                    style="font-size: 11px !important;color: #9c9c9c;">${facultyName}</label></label></td>
                    <!-- Taban Puan 2021 -->
                    <td style="list-style: none;text-align: center; font-size: 11px !important;"><label>${mark2021?.toFixed(2)}</label></td>
                    <!-- Taban Puan 2020 -->
                    <td style="list-style: none;text-align: center;"><label>${mark2020}</label></td>
                    <!-- Başarı Sırası 2021 -->
                    <td style="list-style: none;text-align: center;"><label>${order2021}</label></td>
                    <!-- Başarı Sırası 2020 -->
                    <td style="list-style: none;text-align: center;"><label>${order2020}</label></td>
                    <!-- Puan Türü -->
                    <td style="text-align: center;"><label class="type-chip" name="${depType}">${depType}</label></td>
                    <!-- Dil -->
                    <td style="text-align: center;"><label>${lang}</label></td>
                    <!-- Kontenjan Genel -->
                    <td style="list-style: none; text-align: center;"><label>${quota}</label></td>
                    <!-- Kontenjan Yerleşen -->
                    <td style="list-style: none; text-align: center;"><label>${settlers}</label></td>
      </tr>
      `
    );
  });

  $(".table-body label").each(function(){
    if($(this).text()=== 'null' || $(this).text()=== 'undefined'){
      $(this).text("Dolmamış Bölüm").css("font-size","11px");
    }
  });
}

function onErrorRes(){
  $(".table-body").html('JSON read failed.');
} 

var page=1;
function loadMore(page){

let cities = $('#sehirler').val();
let currentValFinal;
p = cities.reduce(function (previousValue, currentValue) {
  currentValFinal="&p="+currentValue;
  return previousValue + currentValFinal;
},"")

let universities = $('#uniler').val();
let currentValFinal1;
uni = universities.reduce(function (previousValue, currentValue) {
  currentValFinal1="&uni="+currentValue;
  return previousValue + currentValFinal1;
},"")

let departments = $('#bolumler').val();
let currentValFinal2;
names_list = departments.reduce(function (previousValue, currentValue) {
  currentValFinal2="&names_list="+currentValue;
  return previousValue + currentValFinal2;
},"")

  //Tercih Tipi
  var tn = "";
  $('.tn').each(function(){
    if(this.checked){
      tn+= "&tn=";
      tn+= $(this).val();

    }
  });

  var scholarships = "";
  $('.s').each(function(){
    if(this.checked){
      scholarships+="&s=";
      scholarships+= $(this).val();
       
    }
  });

  var language= "";
  $('.lang').each(function(){
    if(this.checked){
      language+="&language=";
      language+= $(this).val();
       
    }
  });

  //Eğitim Türü
  var ut= "";
  $('.ut').each(function(){
    if(this.checked){
      ut+="&ut=";
      ut+= $(this).val();
       
    }
  });
  
  var io = "";
  var io_val = "False"; //false
  var kktc = "";
  var kktc_val= 0;
  var mtok = "";
  var mtok_val= 0;

  $('.dep-type').each(function(){
    if(this.checked){
      io+= '&is_sec=';
      kktc+= '&kktc=';
      mtok+= '&mtok=';
      if($('#io').checked){
        io_val = "True"; //true
         
      }
      if($('#kktc').checked){
        kktc_val = 1;
         
      }
      if($('#mtok').checked){
        mtok_val = 1;
         
      }
      io+= io_val;
      kktc+= kktc_val;
      mtok+= mtok_val;
    }
  });

  //Eğitim Süresi
  var y="";
  $('.y').each(function(){
    if(this.checked){
      y+="&y=";
      y+= $(this).val();
       
    }
  });

  //Sıralama Aralığı
  var lm ="";
  if($('#lm').val()!=null){
    lm+="&lm=";
    lm+= $('#lm').val(); //was $(this)
     
  }

  var hm="";
  if($('#hm').val()!=null){
    hm+="&hm=";
    hm+= $('#hm').val();
     
  }

  //Puan Aralığı
  var lo="";
  if($('#lo').val()!=null){
    lo+="&lo=";
    lo+= $('#lo').val();
     
  }
  var ho ="";
  if($('#ho').val()!=null){
    ho+="&ho=";
    ho+= $('#ho').val();
     
  }

  $.ajax({
    method: 'GET',
    url: 'https://univerlist.com/api/v1/department/?page_size=16&lang=tr&page='+ page + 
    scholarships + language + ut + tn + io + kktc + mtok + y + lm + hm + lo + ho + p + uni + names_list + university,
    dataType: 'json',
    success: onSuccessRes,
    error: onErrorRes
  })
  
}

function resetBtn(){

  $(".table-body").empty();

  //Scrolls reset
  $(".js-example-placeholder-multiple").val(null).trigger("change"); 
  p="";
  uni="";
  names_list="";

  //Filters checkboxes reset
  //Tercih Tipi
  var tn = "";
  $('.tn').each(function(){
    $(this).prop("checked", false);
  });

  var scholarships = "";
  $('.s').each(function(){
    $(this).prop("checked", false);
  });

  var language= "";
  $('.lang').each(function(){
    $(this).prop("checked", false);
  });

  //Eğitim Türü
  var ut= "";
  $('.ut').each(function(){
    $(this).prop("checked", false);
  });
  
  var io = "";
  var io_val = "False"; //false
  var kktc = "";
  var kktc_val= 0;
  var mtok = "";
  var mtok_val= 0;

  //Eğitim Süresi
  var y="";
  $('.y').each(function(){
    $(this).prop("checked", false);
  });

  //Sıralama Aralığı
  var lm ="";

  var hm="";

  //Puan Aralığı
  var lo="";
  var ho ="";

  $(".aralık-form").val("");

  $.ajax({
    method: 'GET',
    url: 'https://univerlist.com/api/v1/department/?page_size=16&lang=tr&page='+ page + 
    scholarships + language + ut + tn + io + kktc + mtok + y + lm + hm + lo + ho + p + uni + names_list + university,
    dataType: 'json',
    success: onSuccessRes,
    error: onErrorRes
  })
}
function araBtn(){
  $(".table-body").empty();
  loadMore(page);
};

// $(".page-link").click(function(){
//   $(".table-body").empty();
//   page++;
//   loadMore();
// });


//Ara button a yönelme
$('#sehirler').on('select2:select', function (e) {
  // page=1;
  $('#pagination-demo').twbsPagination('show', 1);
  araBtn();
});
$('#uniler').on('select2:select', function (e) {
  // page=1;
  university+="&university=";
  university+=e.params.data.id;
  getDepartments();
  $('#pagination-demo').twbsPagination('show', 1);
  araBtn();
});
$('#bolumler').on('select2:select', function (e) {
  $('#pagination-demo').twbsPagination('show', 1);
  araBtn();
});

$('.tn').click(function(){
  araBtn();
});
$('.s').click(function(){
  araBtn();
});
$('.lang').click(function(){
  araBtn();
});
$('.ut').click(function(){
  araBtn();
});
$('.dep-type').click(function(){
  araBtn();
});
$('.y').click(function(){
  araBtn();
});

 //on input works too
$('.aralık-form').change(function(){
  araBtn();
});

$('#sehirler').on('select2:unselect', function (e) {
  araBtn();
});

$('#uniler').on('select2:unselect', function (e) {
  university="";
  araBtn();
});

$('#bolumler').on('select2:unselect', function (e) {
  araBtn();
});

$('#pagination-demo').twbsPagination({
  totalPages: 371,
  visiblePages: 10,
  pageSize: 16,
  next: 'İleri',
  prev: 'Geri',
  first: 'İlk',
  last:'Son',
  onPageClick: function (event, page) {
      $(".table-body").empty();
      // page++;
      loadMore(page);
  }
});

// $(function() {
//   $('#pagination-demo').pagination({
//       pages: 371,
//       itemsOnPage: 16,
//       cssStyle: 'light-theme',
//       onPageClick: function (event, page) {
//         $(".table-body").empty();
//         // page++;
//         loadMore(page);
//     }
//   });
// });

$(document).ready(function(){
  getResults();
  console.log("doc ready");
  getProvinces();
  getUniversities();
  getDepartments();
  // loadMore(page);
});


