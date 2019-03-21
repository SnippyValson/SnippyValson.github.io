var editors = [];
$(document).ready(function () {

  $('.tabs').tabs();

  console.log($('#code-editor-row').height() + " " + $('#code-editor-row').width());

  $('.code-editor-selector').resizable({
    stop: function (e, ui) {
      editors.forEach((editor) => {
        editor.setSize(null, ui.size.height - 60);
      });
    },
    minHeight: $('#code-editor-row').height(),
    minWidth: $('#code-editor-row').width()
  });
  var index = 0;

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

});