var editors = [];
var editor_index = 5;
var index = 0;

$(document).ready(function () {

  if (window.innerHeight < window.innerWidth) {
    $(".tabs").css("max-width", $('#code-editor-row').width());
  }

  setTimeout(() => {}, 1);

  $('.tabs').tabs();

  $('.code-editor-selector').resizable({
    stop: function (e, ui) {
      editors.forEach((editor) => {
        editor.setSize(null, ui.size.height - 60);
        if (window.innerHeight < window.innerWidth) {
          $(".tabs").css("max-width", ui.size.width);
          console.log(ui.size.width);
        }
      });
    },
    minHeight: $('#code-editor-row').height(),
    minWidth: $('#code-editor-row').width()
  });

  $('.uniform-editor-selector').each((i, element) => {
    editors[index] = CodeMirror.fromTextArea(element, {
      lineNumbers: true,
      mode: "javascript",
      value: "Enter uniforms here ...",
      autoRefresh: true,
      scrollbarStyle: "overlay"
    });
    editors[index].setSize(null, $('#code-editor-row').height() - 60);
    index++;
  });

  $('.vertex-editor-selector').each((i, element) => {
    editors[index] = CodeMirror.fromTextArea(element, {
      lineNumbers: true,
      mode: "javascript",
      value: "Enter uniforms here ...",
      autoRefresh: true,
      scrollbarStyle: "overlay"
    });
    editors[index].setSize(null, $('#code-editor-row').height() - 60);
    index++;
  });

  $('.fragment-editor-selector').each((i, element) => {
    editors[index] = CodeMirror.fromTextArea(element, {
      lineNumbers: true,
      mode: "javascript",
      value: "Enter uniforms here ...",
      autoRefresh: true,
      scrollbarStyle: "overlay"
    });
    editors[index].setSize(null, $('#code-editor-row').height() - 60);
    index++;
  });

  $('.js-editor-selector').each((i, element) => {
    editors[index] = CodeMirror.fromTextArea(element, {
      lineNumbers: true,
      mode: "javascript",
      value: "Enter uniforms here ...",
      autoRefresh: true,
      scrollbarStyle: "overlay"
    });
    editors[index].setSize(null, $('#code-editor-row').height() - 60);
    index++;
  });

  $('#add-pass').click(function (event) {
    addEditor(editor_index);
    editor_index++;
  });

  $('#delete-buffer').click((e) => {
    console.log("Active Tab Div:" + $(".active").attr('href'));
    var activeTabId = $(".active").attr('href').split('-')[3];
    console.log(activeTabId);
    $(`#tab-${activeTabId}`).remove();
    $(`#inner-tab-view-${activeTabId}`).remove();
  });

});

$(window).on('resize', function () {

  if (window.innerHeight < window.innerWidth) {
    $(".tabs").css("max-width", $('#code-editor-row').width());
  } else {
    $(".tabs").css("max-width", "90vh");
  }

  setTimeout(() => {}, 1);

  $('.tabs').tabs();

});

$(window).on("orientationchange", function (event) {

  if (window.innerHeight < window.innerWidth) {
    $(".tabs").css("max-width", $('#code-editor-row').width());
  } else {
    $(".tabs").css("max-width", "90vh");
  }

  setTimeout(() => {}, 1);

  $('.tabs').tabs();

  $('.code-editor-selector').resizable({
    stop: function (e, ui) {
      editors.forEach((editor) => {
        editor.setSize(null, ui.size.height - 60);
        if (window.innerHeight < window.innerWidth) {
          $(".tabs").css("max-width", ui.size.width);
          console.log(ui.size.width);
        }
      });
    },
    minHeight: $('#code-editor-row').height(),
    minWidth: $('#code-editor-row').width()
  });
});


function addEditor(id) {
  $('#pass-tabs').append([getTabMarkup(id)].join(''));
  setTimeout(() => {
    $('#code-editor-row').append([getEditorMarkup(id)].join(''));
  }, 1);
  setTimeout(() => {
    $('.tabs').tabs();
  }, 1);
  setTimeout(() => {
    addCodeEditor(`uniform-editor-${id}`, 'javascript');
    addCodeEditor(`vertex-editor-${id}`, 'javascript');
    addCodeEditor(`fragment-editor-${id}`, 'javascript');
    addCodeEditor(`js-editor-${id}`, 'javascript');
  }, 1);
}

function addCodeEditor(id, mode) {
  editors[index] = CodeMirror.fromTextArea(document.getElementById(id), {
    lineNumbers: true,
    mode: mode,
    value: "Enter uniforms here ...",
    autoRefresh: true,
    scrollbarStyle: "overlay"
  });
  editors[index].setSize(null, $('#code-editor-row').height() - 60);
  index++;
}

function getTabMarkup(id) {
  return `<li class="tab col s3" id="tab-${id}">
              <a class="black-text" href="#inner-tab-view-${id}">Buf ${String.fromCharCode(64 + id)}</a>
          </li>`;
}

function getEditorMarkup(id) {
  return `<div id="inner-tab-view-${id}" class="col s12">
    <div class="container-fluid">
        <div class="row">
            <div class="col m12 s12 l2">
                <ul class="tabs">
                    <li class="tab">
                        <a class="black-text" href="#inner-tab-${id}-1">
                            <span class="code-icon">{;}</span>
                        </a>
                    </li>
                    <li class="tab">
                        <a class="black-text" href="#inner-tab-${id}-2">
                            <svg class="svg-icon" viewBox="0 0 20 20">
                                <path fill="none" d="M16.382,15.015h0.455h0.457V4.985h-0.457h-0.455V15.015z M16.837,
                                    4.985c1.008,0,1.824-0.816,1.824-1.822c0-1.008-0.816-1.824-1.824-1.824c-1.006,
                                    0-1.822,0.816-1.822,1.824C15.015,4.169,15.831,4.985,16.837,4.985z M16.837,
                                    2.25c0.504,0,0.913,0.409,0.913,0.913c0,0.502-0.409,0.911-0.913,0.911c-0.502,
                                    0-0.911-0.409-0.911-0.911C15.926,2.659,16.335,2.25,16.837,2.25z M15.015,
                                    3.618V3.163V2.706H4.986v0.457v0.455H15.015z M3.162,15.01c-1.007,0-1.823,
                                    0.816-1.823,1.822c0,1.008,0.816,1.824,1.823,1.824s1.824-0.816,1.824-1.824C4.986,
                                    15.831,4.169,15.015,3.162,15.015z M3.162,17.75c-0.503,0-0.911-0.409-0.911-0.913c0-0.502,
                                    0.408-0.911,0.911-0.911c0.504,0,0.912,0.409,0.912,0.911C4.074,17.341,3.666,17.75,3.162,
                                    17.75z M4.986,16.382v0.455v0.457h10.029v-0.457v-0.455H4.986zM16.837,15.015c-1.006,
                                    0-1.822,0.816-1.822,1.822c0,1.008,0.816,1.824,1.822,1.824c1.008,0,1.824-0.816,
                                    1.824-1.824C18.661,15.831,17.845,15.015,16.837,15.015z M16.837,17.75c-0.502,
                                    0-0.911-0.409-0.911-0.913c0-0.502,0.409-0.911,0.911-0.911c0.504,0,0.913,0.409,
                                    0.913,0.911C17.75,17.341,17.341,17.75,16.837,17.75z M3.618,
                                    4.985H3.162H2.707v10.029h0.456h0.456V4.985zM4.986,3.163c0-1.008-0.817-1.824-1.824-1.824S1.339,
                                    2.155,1.339,3.163c0,1.006,0.816,1.822,1.823,1.822S4.986,4.169,4.986,3.163zM3.162,4.074c-0.503,
                                    0-0.911-0.409-0.911-0.911c0-0.504,0.408-0.913,0.911-0.913c0.504,0,0.912,0.409,0.912,0.913C4.074,
                                    3.665,3.666,4.074,3.162,4.074z"></path>
                            </svg>
                        </a>
                    </li>
                    <li class="tab">
                        <a class="black-text" href="#inner-tab-${id}-3">
                            <svg class="svg-icon" viewBox="0 0 20 20">
                                <path fill="none" d="M15.131,8.29c-0.944,0-1.711,0.766-1.711,1.71s0.767,1.711,1.711,1.711s1.71-0.767,
                                    1.71-1.711S16.075,8.29,15.131,8.29 M15.131,10.855c-0.472,0-0.855-0.383-0.855-0.855s0.384-0.855,
                                    0.855-0.855S15.986,9.528,15.986,10S15.603,10.855,15.131,10.855 M12.993,15.131c-0.236,
                                    0-0.428,0.191-0.428,0.427c0,0.237,0.191,0.429,0.428,0.429c0.235,0,0.427-0.191,0.427-0.429C13.42,
                                    15.322,13.229,15.131,12.993,15.131 M4.87,10.855c-0.473,0-0.855,0.383-0.855,0.856c0,
                                    0.471,0.383,0.854,0.855,0.854c0.472,0,0.854-0.384,0.854-0.854C5.724,11.238,5.341,10.855,4.87,
                                    10.855 M8.717,12.565c-0.708,0-1.283,0.574-1.283,1.283c0,0.708,0.574,1.282,1.283,1.282S10,
                                    14.557,10,13.849C10,13.14,9.426,12.565,8.717,12.565M8.717,14.275c-0.236,0-0.427-0.191-0.427-0.427c0-0.236,
                                    0.191-0.429,0.427-0.429s0.427,0.192,0.427,0.429C9.145,14.084,8.953,14.275,8.717,14.275 M11.283,10c-0.236,
                                    0-0.428,0.191-0.428,0.428c0,0.236,0.191,0.427,0.428,0.427c0.235,0,0.427-0.191,0.427-0.427C11.71,10.191,
                                    11.519,10,11.283,10 M10,0.594c-5.195,0-9.406,4.211-9.406,9.406c0,5.195,4.211,9.406,9.406,9.406c5.195,0,
                                    9.406-4.211,9.406-9.406C19.406,4.805,15.195,0.594,10,0.594 M10,18.552c-4.723,0-8.551-3.829-8.551-8.552c0-4.722,
                                    3.828-8.551,8.551-8.551S18.552,5.278,18.552,10C18.552,14.723,14.723,18.552,10,18.552M7.435,4.014c-1.417,0-2.565,
                                    .149-2.565,2.565c0,1.417,1.148,2.565,2.565,2.565C8.851,9.145,10,7.997,10,6.58C10,5.164,8.851,4.014,7.435,
                                    4.014 M7.435,8.29c-0.944,0-1.71-0.766-1.71-1.71c0-0.945,0.766-1.71,1.71-1.71c0.945,0,1.71,0.765,1.71,1.71C9.145,
                                    7.524,8.379,8.29,7.435,8.29"></path>
                            </svg>
                        </a>
                    </li>
                    <li class="tab">
                        <a class="black-text" href="#inner-tab-${id}-4">
                            <span class="code-icon">Js</span>
                        </a>
                    </li>
                    <li class="tab">
                        <a class="black-text" href="#inner-tab-${id}-5">
                            <svg class="svg-icon" viewBox="0 0 20 20">
                                <path
                                  d="M17.498,11.697c-0.453-0.453-0.704-1.055-0.704-1.697c0-0.642,0.251-1.244,0.704-1.697c0.069-0.071,0.15-0.141,0.257-0.22c0.127-0.097,0.181-0.262,0.137-0.417c-0.164-0.558-0.388-1.093-0.662-1.597c-0.075-0.141-0.231-0.22-0.391-0.199c-0.13,0.02-0.238,0.027-0.336,0.027c-1.325,0-2.401-1.076-2.401-2.4c0-0.099,0.008-0.207,0.027-0.336c0.021-0.158-0.059-0.316-0.199-0.391c-0.503-0.274-1.039-0.498-1.597-0.662c-0.154-0.044-0.32,0.01-0.416,0.137c-0.079,0.106-0.148,0.188-0.22,0.257C11.244,2.956,10.643,3.207,10,3.207c-0.642,0-1.244-0.25-1.697-0.704c-0.071-0.069-0.141-0.15-0.22-0.257C7.987,2.119,7.821,2.065,7.667,2.109C7.109,2.275,6.571,2.497,6.07,2.771C5.929,2.846,5.85,3.004,5.871,3.162c0.02,0.129,0.027,0.237,0.027,0.336c0,1.325-1.076,2.4-2.401,2.4c-0.098,0-0.206-0.007-0.335-0.027C3.001,5.851,2.845,5.929,2.77,6.07C2.496,6.572,2.274,7.109,2.108,7.667c-0.044,0.154,0.01,0.32,0.137,0.417c0.106,0.079,0.187,0.148,0.256,0.22c0.938,0.936,0.938,2.458,0,3.394c-0.069,0.072-0.15,0.141-0.256,0.221c-0.127,0.096-0.181,0.262-0.137,0.416c0.166,0.557,0.388,1.096,0.662,1.596c0.075,0.143,0.231,0.221,0.392,0.199c0.129-0.02,0.237-0.027,0.335-0.027c1.325,0,2.401,1.076,2.401,2.402c0,0.098-0.007,0.205-0.027,0.334C5.85,16.996,5.929,17.154,6.07,17.23c0.501,0.273,1.04,0.496,1.597,0.66c0.154,0.047,0.32-0.008,0.417-0.137c0.079-0.105,0.148-0.186,0.22-0.256c0.454-0.453,1.055-0.703,1.697-0.703c0.643,0,1.244,0.25,1.697,0.703c0.071,0.07,0.141,0.15,0.22,0.256c0.073,0.098,0.188,0.152,0.307,0.152c0.036,0,0.073-0.004,0.109-0.016c0.558-0.164,1.096-0.387,1.597-0.66c0.141-0.076,0.22-0.234,0.199-0.393c-0.02-0.129-0.027-0.236-0.027-0.334c0-1.326,1.076-2.402,2.401-2.402c0.098,0,0.206,0.008,0.336,0.027c0.159,0.021,0.315-0.057,0.391-0.199c0.274-0.5,0.496-1.039,0.662-1.596c0.044-0.154-0.01-0.32-0.137-0.416C17.648,11.838,17.567,11.77,17.498,11.697 M16.671,13.334c-0.059-0.002-0.114-0.002-0.168-0.002c-1.749,0-3.173,1.422-3.173,3.172c0,0.053,0.002,0.109,0.004,0.166c-0.312,0.158-0.64,0.295-0.976,0.406c-0.039-0.045-0.077-0.086-0.115-0.123c-0.601-0.6-1.396-0.93-2.243-0.93s-1.643,0.33-2.243,0.93c-0.039,0.037-0.077,0.078-0.116,0.123c-0.336-0.111-0.664-0.248-0.976-0.406c0.002-0.057,0.004-0.113,0.004-0.166c0-1.75-1.423-3.172-3.172-3.172c-0.054,0-0.11,0-0.168,0.002c-0.158-0.312-0.293-0.639-0.405-0.975c0.044-0.039,0.085-0.078,0.124-0.115c1.236-1.236,1.236-3.25,0-4.486C3.009,7.719,2.969,7.68,2.924,7.642c0.112-0.336,0.247-0.664,0.405-0.976C3.387,6.668,3.443,6.67,3.497,6.67c1.75,0,3.172-1.423,3.172-3.172c0-0.054-0.002-0.11-0.004-0.168c0.312-0.158,0.64-0.293,0.976-0.405C7.68,2.969,7.719,3.01,7.757,3.048c0.6,0.6,1.396,0.93,2.243,0.93s1.643-0.33,2.243-0.93c0.038-0.039,0.076-0.079,0.115-0.123c0.336,0.112,0.663,0.247,0.976,0.405c-0.002,0.058-0.004,0.114-0.004,0.168c0,1.749,1.424,3.172,3.173,3.172c0.054,0,0.109-0.002,0.168-0.004c0.158,0.312,0.293,0.64,0.405,0.976c-0.045,0.038-0.086,0.077-0.124,0.116c-0.6,0.6-0.93,1.396-0.93,2.242c0,0.847,0.33,1.645,0.93,2.244c0.038,0.037,0.079,0.076,0.124,0.115C16.964,12.695,16.829,13.021,16.671,13.334 M10,5.417c-2.528,0-4.584,2.056-4.584,4.583c0,2.529,2.056,4.584,4.584,4.584s4.584-2.055,4.584-4.584C14.584,7.472,12.528,5.417,10,5.417 M10,13.812c-2.102,0-3.812-1.709-3.812-3.812c0-2.102,1.71-3.812,3.812-3.812c2.102,0,3.812,1.71,3.812,3.812C13.812,12.104,12.102,13.812,10,13.812">
                                </path>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col m12 s12 l10" id="editor-holder-${id}">
                <div id="inner-tab-${id}-1" class="col tab-content">
                    <textarea class="uniform-editor-selector" id="uniform-editor-${id}"></textarea>
                </div>
                <div id="inner-tab-${id}-2" class="col tab-content">
                    <textarea class="vertex-editor-selector" id="vertex-editor-${id}"></textarea>
                </div>
                <div id="inner-tab-${id}-3" class="col tab-content">
                    <textarea class="fragment-editor-selector" id="fragment-editor-${id}"></textarea>
                </div>
                <div id="inner-tab-${id}-4" class="col tab-content">
                    <textarea class="js-editor-selector" id="js-editor-${id}"></textarea>
                </div>
                <div id="inner-tab-${id}-5" class="col tab-content">
                    <form class="col s12">
                      <div class="row">
                        <div class="input-field col s6">
                            <input placeholder="Order" id="order-${id}" type="text" class="validate">
                            <label for="order-${id}">Order of execution</label>
                        </div>
                        </div>
                        <div class="row">
                            <p style="margin-left:15px;">
                              <label>
                                  <input type="checkbox" class="filled-in" id="skip-${id}" />
                                  <span>Skip</span>
                              </label>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>`;
}