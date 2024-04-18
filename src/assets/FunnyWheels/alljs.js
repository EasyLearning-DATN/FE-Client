window.toBase64 = (file, onload) => {
    var reader = new FileReader();
    reader.onload = function () {
      var base64 = reader.result.replace('data:', '').replace(/^.+,/, '');
      onload(base64);
    };
    reader.readAsDataURL(file);
  };
  window.download = (filename, text) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  Array.prototype.shuffle = function () {
    let m = this.length,
      i;
    while (m) {
      i = (Math.random() * m--) >>> 0;
      [this[m], this[i]] = [this[i], this[m]];
    }
    return this;
  };
  window.animateCSS = (node, animation, func = () => {}, option = '', prefix = 'animate__') =>
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      const optionName = `${prefix}${option}`;
      node.addClass([`${prefix}animated`, animationName, optionName]);
      /* When the animation ends, we clean the classes and resolve the Promise */
      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.removeClass([`${prefix}animated`, animationName, optionName]);
        func();
        resolve('Animation ended');
      }
      node[0].addEventListener('animationend', handleAnimationEnd, { once: true });
    });
  
  window.obfuscate = (codeText) => {
    const options = {
      compact: false,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1
    };
    const obfuscationResult = JavaScriptObfuscator.obfuscate(codeText, options);
  
    return obfuscationResult.getObfuscatedCode();
  }
  
  window.toDataURL = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  
  window.toTextFromUrl = (url, callback) => {
    $.ajax({
      type: "GET",
      contentType: "application/text",
      url: url,
      dataType: 'text',
      cache: false,
      success: function (data) {
        callback(data)
      },
      error: function (e) {
      }
    });
  }
  
  function showAlert(alertText) {
    Swal.fire({
      icon: 'info',
      title: 'Thông báo',
      text: alertText
    });
    $("body").removeClass("swal2-height-auto");
  }
  
  function getTimeForFileName() {
    let newDate = new Date();
    let strTime = newDate.toLocaleDateString().replace('/','-') + newDate.toLocaleTimeString().replace(':','-');
    console.log('strTime', strTime);
    return strTime;
  }
  
  // Need to test this
  // $(window).on("load", function() {
  //   window.isLoading(true);
  // });
  
  // $(document).ready(function() {
  //   window.isLoading(false);
  // });
  
  function toggle_full_screen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
      }
      else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
          document.documentElement.mozRequestFullScreen();
      }
      else if (document.documentElement.webkitRequestFullScreen) {   /* Chrome, Safari & Opera */
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
      else if (document.msRequestFullscreen) { /* IE/Edge */
          document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.cancelFullScreen) {
          document.cancelFullScreen();
      }
      else if (document.mozCancelFullScreen) { /* Firefox */
          document.mozCancelFullScreen();
      }
      else if (document.webkitCancelFullScreen) {   /* Chrome, Safari and Opera */
          document.webkitCancelFullScreen();
      }
      else if (document.msExitFullscreen) { /* IE/Edge */
          document.msExitFullscreen();
      }
    }
  }

  // Fie type
const CONST_AUDIO = 'audio';
const CONST_ICON = 'icon';
const CONST_VIDEO = 'video';
const CONST_IMAGE = 'image';

// Select box not option
const CONST_NOTOPTION = 'notOption';

// Element Type
const CONST_CONTROL_SELECTBOX = 'selectBox';

// Configuration Bar
const CONST_FONT_SELECT = 'fontSelect';
const CONST_FONTSIZE_SELECT = 'fontSizeSelect';
const CONST_COUNTDOWN_TEXTBOX = 'countDownTextBox';

// Input file max size
const CONST_MAX_SIZE_ALLOW = 30 * 1024 * 1024;
const ERROR_MAX_SIZE_ALLOW = 'File quá nặng, xin hãy chọn file dưới 30Mb';

// notice
const ERROR_WRONG_GAME = 'File vừa nhập không hợp lệ';
const SUCCESS_IMPORT_GAME = 'Nhập file thành công';

// Font Family
window.fontList = [
    { name: 'Arial' },
    { name: 'Verdana' },
    { name: 'Helvetica' },
    { name: 'Tahoma' },
    { name: 'Trebuchet MS' },
    { name: 'Times New Roman' },
    { name: 'Georgia' },
    { name: 'Garamond' },
    { name: 'Courier New' },
    { name: 'Brush Script MT' },
  ];

// Init all the Asset
$(document).ready(function () {
    loadAsset(window.gameCustomAsset);
});

function loadAsset(asset) {
    asset.forEach(element => {
        loadAssetAndDestroy(element);
    });
}

function loadAssetAndDestroy(element) {
    if (element.type == CONST_ICON) {
        $(`[name=${element.name}]`).attr('href', element.base64);
        console.log('GamePlayAssetLoader.AssetLoaded: CONST_ICON', element.name);
    }

    if (element.type == CONST_AUDIO) {
        $(`[name=${element.name}]`).attr('src', element.base64);
        console.log('GamePlayAssetLoader.AssetLoaded: CONST_AUDIO', element.name);
    }

    if (element.type == CONST_IMAGE) {
        $(`[name=${element.name}]`).attr('src', element.base64);
        console.log('GamePlayAssetLoader.AssetLoaded: CONST_IMAGE', element.name);
    }

    if (element.type == CONST_VIDEO) {
        $(`[name=${element.name}]`).attr('src', element.base64);
        console.log('GamePlayAssetLoader.AssetLoaded: CONST_VIDEO', element.name);
    }

    if (element.type == CONST_CONTROL_SELECTBOX) {
        loadSelectOption(`[name=${element.name}]`, element.data, false);
    }

    if (element.destroy != 'false') {
        element.base64 = '';
        console.log('element.name cleared');
    }

}

// Change fontsize
$(document).on('change', '#fontSize', () => {
    size = $('#fontSize').val();
    setting.font.fontSize = parseInt(size);
    $('.question-text').css('font-size', setting.font.fontSize);
  });
  
  // Open/close setupPanel
  $(document).on('click', '#setupBtn', function () {
    console.log('open/close SetupPanel');
    $('#setupPanel').toggleClass('active');
    $(this).toggleClass('active');
  });
  
  // Open/close QuestionList
  $(document).on('click', '.hideQuestionList', function () {
    console.log('open/close QuestionList');
    $('#leftPanel').toggleClass('active');
    $(this).toggleClass('active');
  });
  
  // Click on Hủy video/image background button
  $(document).on('click', '#setupPanel #destroyBackgroundMedia', function () {
    // delete current background image
    $('.slideList')[0].style.removeProperty('background-image');
    // reset default background video source
    window.gameCustomAsset.forEach(element => {
      if (element.name == 'backgroundSlideVideo') {
          $(`[name=${element.name}]`).attr('src', element.base64);
      }
    });
  });
  
  $(document).on('input', '#setupPanel .background', function () {
    let file = $(this)[0].files[0];
    if (file.size > CONST_MAX_SIZE_ALLOW) {
      alert(ERROR_MAX_SIZE_ALLOW);
      return;
    }
    toBase64(file, (base64) => {
      let player = document.getElementById('backgroundSlideVideo');
      if (file.type.includes('video')) {
        $('.slideList')[0].style.removeProperty('background-image');
        base64 = `data:video/mp4;base64,${base64}`;
        player.setAttribute('src', base64);
        setting.background = { type: 'video', name: file.name, base64 };
      } else if (file.type.includes('image')) {
        player.removeAttribute('src');
        base64 = `data:image/gif;base64,${base64}`;
        $('.slideList').css('background-image', 'url(' + base64 + ')');
        setting.background = { type: 'image', name: file.name, base64 };
      }
    });
    $(this).val(null);
  });
  
  // Change font color
  $(document).on('change', '#setupPanel .color', function () {
    $('.slideList').css('color', $(this).val());
    setting.cell.color = $(this).val();
  });
  
  // Change time countdown
  $(document).on('change', '#setupPanel .countdown', function () {
    window.setting.countdown = $(this).val();
  });
  
  $(document).on('click', '#setupPanel #fullscreenbtn', function () {
    toggle_full_screen();
  });
  
  window.setting = {
    countdown: 30,
    font: { fontFamily: 'Arial', fontSize: 38 },
    gameinfo: {name: 'FunnyWheels'},
  };

  // GameEditor.js: This script is for editting question

// Add image
$(document).on("click", "#groupAddImage .dropdown-item", function () {
    const that = this;
    $(document).on("change", "#addImageInput", function () {
        let file = $(this)[0].files[0];
        if (file) {
            if (file.size > CONST_MAX_SIZE_ALLOW) {
                showAlert(ERROR_MAX_SIZE_ALLOW);
                return;
            }
            toBase64(file, (base64) => {
                const dataBase64 = `data:image/gif;base64,${base64}`
                window.questionList.push({
                    background: dataBase64,
                    text: ""
                })
                
                const addImageType = $(that).data("addImageType")
                switch (addImageType) {
                    case "background":
                        console.log("background");
                        break;
                        
                    case "center":
                        console.log("center");
                        break;
                
                    case "entry":
                        console.log("entry");
                        const imgTag = `<div><img src="${dataBase64}" alt=""></div>`
                        const data = $("#entriesData").html()
                        const brTag = "<div><br></div>"
                        
                        if (data.endsWith(brTag)) {
                            const endIndexOfBrTag = data.lastIndexOf(brTag)
                            const dataAfterCutBrTag = data.substring(0, endIndexOfBrTag)
                            $("#entriesData").html(dataAfterCutBrTag)
                        }
                        $("#entriesData").append(imgTag)
                        
                        break;
                }
            })
        }
        $(this).val(null);
    })
    
    $("#addImageInput").trigger("click")
})

function readEntryText() {
  window.questionList = [];
  $.each($('#entrydataList').val().split(/\n/), function(i, line){
      if(line){
          let dat = {};
          dat.text = line;
          dat.background = null;
          dat.isRemove = false;
          window.questionList.push(dat);
      }
  });
}

// Entries editor
$(document).on('input', "#entrydataList", function () {
  readEntryText();
  restartGame();
})

// Entries editor
$(document).on('input', "#entriesData", function () {
    const data = $("#entriesData").html()

    let dataArr = data.split("</div>");
    dataArr = dataArr.map(e => e.trim().replaceAll("<div>", "")).filter(e => e != "<br>" && e != "");
    dataArr = dataArr.map(e => {
        if (e.includes("img")) {
            const endIndexSrc = e.indexOf("alt") - 2
            const endIndexTag = e.indexOf(">") + 1

            return {
                background: e.substring(10, endIndexSrc),
                text: e.substring(endIndexTag),
                isRemove: false
            }
        }
        return {
            background: null,
            text: e,
            isRemove: false
        }
    })
    console.log({dataArr});
    window.questionList = dataArr
    restartGame()
})

// clear result list
$(document).on("click", "#btnClearResultList", function() {
    $("#resultsData").empty()
    window.questionList = window.questionList.map(e => e.isRemove ? null : e).filter(e => e)
    restartGame()
})

// Test loadQuestion
$(document).ready(function () {
    if (window.isEditorMode) {
        console.log('Editor mode');
        $('#destroyBackgroundMedia').removeClass('d-none');
    }

    // For testing purpose
    window.questionList = [
        {
            background: null,
            text: "Việt Nam",
            isRemove: false
        },
        {
            background: null,
            text: "Singapore",
            isRemove: false
        },
        {
            background: null,
            text: "Australia",
            isRemove: false
        },
        {
            background: null,
            text: "Japan",
            isRemove: false
        },
        {
            background: null,
            text: "Korea",
            isRemove: false
        }
    ];
    restartGame()
});

var currentShowingQuestion = 0;
var pickedQuestion = 100000;
var score = 0;
var rightAnswerNumber = 0;
var audio_background;
var audio_startGame;
var audio_right;
var audio_wrong;
var audio_end;
var audio_runTime;
var audio_spin_chart;
var isPlaying = false;
const DELAY_SPIN_CHART_SEC = 100;
const DURATION_SPIN_SEC = 10000;
const DELAY_QUESTION_DISPLAY_SEC = 1000;
const DELAY_SCORE_BAR_SEC = 1000;
const DELAY_JUDGEMENT_BAR_SEC = 1000;
var container;
var spin;
var spinCircle;
var spinText;

$(document).ready(function () {
  audio_startGame = document.getElementById('audio_startGame');
  audio_right = document.getElementById('audio_right');
  audio_wrong = document.getElementById('audio_wrong');
  audio_end = document.getElementById('audio_End');
  audio_runTime = document.getElementById('audio_runTime');
  audio_spin_chart = document.getElementById('audio_spin_chart');
  audio_background = document.getElementById('audio_background');

  restartGame()
});

function restartGame() {
  renderResultList()
  updateAmount()
  prepareSpinQuestion()
}

function allowSpin() {
  // set event click spin
  container.on("click", spin);
  container.style({ "cursor": "pointer" });
  spinCircle.style({ "cursor": "pointer" });
  spinText.style({ "cursor": "pointer" });
}

function showDialogConfirm(indexPicked, isRemoveAfterSpin) {
  const spinText = window.questionList.filter(e => !e.isRemove)[indexPicked].text
  $('#resultNoticeElement').text(spinText);
  $('#resultNotice').removeClass('d-none');
  if (isRemoveAfterSpin) {
    removeEntry(indexPicked);
  }
}

function removeEntry(indexPicked) {
  window.questionList.filter(e => !e.isRemove)[indexPicked].isRemove = true
  renderEntryList()
  renderResultList()
  updateAmount()
  prepareSpinQuestion()
}

function renderEntryList() {
  const entriesData = window.questionList.filter(e => !e.isRemove).map(e => {
    let imgTag = ""
    if (e.background) {
      imgTag = `<img src="${e.background}" alt="">`
    }
    return `<div>${imgTag}${e.text}</div>`
  })
  if (entriesData.length != 0) {
    $("#entriesData").html(entriesData)
  } else {
    $("#entriesData").html("<div></div>")
  }
}

function renderResultList() {
  const resultsData = window.questionList.filter(e => e.isRemove).map(e => {
    let imgTag = ""
    if (e.background) {
      imgTag = `<img src="${e.background}" alt="">`
    }
    return `<div>${imgTag}${e.text}</div>`
  })
  $("#resultsData").html(resultsData)
}

function updateAmount() {
  $("#amountEntries").text(window.questionList.filter(e => !e.isRemove).length)
  $("#amountResults").text(window.questionList.filter(e => e.isRemove).length)
}

function prepareSpinQuestion() {
  var window_w = window.innerWidth;
  var window_h = window.innerHeight;
  var padding = { top: 20, right: 40, bottom: 0, left: 0 },
    w = window_w * 0.85 - padding.left - padding.right,
    h = window_h * 0.85 - padding.top - padding.bottom,
    r = Math.min(w, h) / 2,
    rotation = 0,
    oldrotation = 0,
    oldpick = [],
    color = d3.scale.category20();
  // { "label": "Dell LAPTOP", "value": 1, "question": "What ..." },
  var data = window.questionList.filter(e => !e.isRemove).map((ques, idx) => {
    return {
      label: ques.text
    }
  })
  // clear spin previous
  $("#questionChartSpin *").remove();
  var svg = d3.select('#questionChartSpin')
    .append("svg")
    .data([data])
    .attr("id", "spinSvg")
    .attr("width", w + padding.left + padding.right)
    .attr("height", h + padding.top + padding.bottom);

  container = svg.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")");
  var vis = container
    .append("g");

  var pie = d3.layout.pie().sort(null).value(function (d) { return 1; });
  // declare an arc generator function
  var arc = d3.svg.arc().outerRadius(r);
  // select paths, use arc generator to draw
  var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");

  arcs.append("path")
    .attr("fill", function (d, i) { return color(i); })
    .attr("d", function (d) { return arc(d); });
  // add the text
  arcs.append("text").attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
  })
    .attr("text-anchor", "end")
    .text(function (d, i) {
      return data[i].label;
    });
  spin = (d) => {
    audio_spin_chart.play();
    spinText.attr("class", "");
    container.on("click", null);
    container.style({ "cursor": "not-allowed" });
    spinCircle.style({ "cursor": "not-allowed" });
    spinText.style({ "cursor": "not-allowed" });
    
    //all slices have been seen, all done
    console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
    if (oldpick.length == data.length) {
      console.log("done");
      return;
    }
    var ps = 360 / data.length,
      pieslice = Math.round(1440 / data.length),
      rng = Math.floor((Math.random() * 1440) + 360);

    rotation = (Math.round(rng / ps) * ps);

    pickedQuestion = Math.round(data.length - (rotation % 360) / ps);
    pickedQuestion = pickedQuestion >= data.length ? (pickedQuestion % data.length) : pickedQuestion;
    if (oldpick.indexOf(pickedQuestion) !== -1) {
      d3.select(this).call(spin);
      return;
    } else {
      oldpick.push(pickedQuestion);
    }
    rotation += 90 - Math.round(ps / 2);
    vis.transition()
      .duration(DURATION_SPIN_SEC)
      .attrTween("transform", rotTween)
      .each("end", function () {
        //mark question as seen
        // d3.select(".slice:nth-child(" + (pickedQuestion + 1) + ") path")
        //   .attr("fill", "#111");
        oldrotation = rotation;

        // show popup 
        let isRemoveAfterSpin = $("#removeEntry").prop("checked")
        showDialogConfirm(pickedQuestion, isRemoveAfterSpin)
        // picked pickedQuestion

        /* Get the result value from object "data" console.log(data[pickedQuestion].value) */
        
        // allow spin
        allowSpin()
      }); 
  }
  container.on("click", spin);

  //make arrow
  svg.append("g")
    .attr("transform", "translate(1220," + ((h / 2) + padding.top) + ")")
    .append("path")
    .attr("d", "M-" + (r * .15) + ",0L0," + (r * .05) + "L0,-" + (r * .05) + "Z")
    .style({ "fill": "white" });
  //draw spin circle
  spinCircle = container.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 60)
    .style({ "fill": "url(#image)", "cursor": "pointer" });
  //spin text
  spinText = container.append("text")
    .attr("x", 0)
    .attr("y", 35)
    .attr("text-anchor", "middle")
    .text("😊")
    .style({ "font-weight": "bold", "font-size": "100px", "cursor": "pointer" });

  function rotTween(to) {
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function (t) {
      return "rotate(" + i(t) + ")";
    };
  }
}

function closeResultDialog() {
  $('#resultNotice').addClass('d-none');
}

$(document).on('click', '#StartAgainButton', function () {
  readEntryText();
  restartGame();
  console.log('Restart');
});