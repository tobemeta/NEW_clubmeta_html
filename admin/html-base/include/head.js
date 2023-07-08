(function () {
    let str = `<link href="../static/favicon.ico" rel="icon" type="image/icon" />
    <!-- CSS ---------------------------------------------------------------------------------------------------- -->
    <!-- datepicker -->
    <link href="../static/lib/bootstrap-datepicker/css/bootstrap-datepicker.min.css" rel="stylesheet" />
    <link href="../static/lib/bootstrap-datepicker/css/bootstrap-datepicker.standalone.min.css" rel="stylesheet" />
    <!-- datatable -->
    <link href="../static/lib/bootstrap-table/bootstrap-table.min.css" rel="stylesheet" />
    <!-- WYSIWYG editor -->
    <link href="../static/lib/summernote/summernote-bs4.css" rel="stylesheet" />
    <!-- fontawesome -->
    <link href="../static/lib/fontawesome/css/all.min.css" rel="stylesheet" />
    <!-- sb-admin -->
    <link href="../static/theme/sb-admin-2/css/sb-admin-2.min.css" rel="stylesheet" />
    <!-- local -->
    <link href="../static/css/style.css" rel="stylesheet" />
    <!-- jquery ui css-->
    <link href="../static/lib/jquery/ui/jquery-ui.min.css" rel="stylesheet" />

    <!-- JS  ---------------------------------------------------------------------------------------------------- -->
    <!-- 퍼블 include 용 -->
    <script src="../static/js/include.js"></script>
    <!-- device lib -->
    <script src="../static/lib/isMobile.min.js"></script>
    <!-- jquery -->
    <script src="../static/lib/jquery/jquery.min.js"></script>
    <script src="../static/lib/jquery/jquery-1.10.4-ui.js"></script>
    <!-- 드롭엔 다운 기능을 위한 추가-->
    <!-- (bootstrap 과 충돌로 인하여  상위로 올림 )  -->
    <script src="../static/lib/jquery/jquery.highlight-5.js"></script>
    <script src="../static/lib/jquery/jquery-migrate-3.0.0.min.js"></script>

    <!-- bootstrap -->
    <script src="../static/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- jquery&bootstrap lib -->
    <script src="../static/lib/bs-custom-file-input/bs-custom-file-input.min.js"></script>
    <!-- jquery lib -->
    <!-- <script src="../static/lib/jquery/jquery-1.10.4-ui.js"></script> -->
    <!-- 드롭엔 다운 기능을 위한 추가 -->
    <script src="../static/lib/jquery-easing/jquery.easing.min.js"></script>
    <script src="../static/lib/jquery-dateformat.min.js"></script>
    <script src="../static/lib/jquery-validation/jquery.validate.min.js"></script>
    <script src="../static/lib/jquery-validation/additional-methods.min.js"></script>
    <script src="../static/lib/jquery-validation/localization/messages_ko.min.js"></script>
    <script src="../static/lib/jquery.mask.min.js"></script>
    <!-- datepicker -->
    <script src="../static/lib/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
    <script src="../static/lib/bootstrap-datepicker/locales/bootstrap-datepicker.ko.min.js"></script>
    <!-- datatable -->
    <script src="../static/lib/bootstrap-table/bootstrap-table.js?201910011606"></script>
    <script src="../static/lib/bootstrap-table/locale/bootstrap-table-ko-KR.js"></script>
    <script src="../static/lib/bootstrap-table/extensions/export/bootstrap-table-export.js"></script>
    <!-- 
  <script src="../static/lib/bootstrap-table/extensions/export/bootstrap-table-export.min.js"></script>
  -->
    <!-- datatable -->
    <script src="../static/lib/tableexport.jquery.plugin/tableExport.min.js"></script>
    <script src="../static/lib/tableexport.jquery.plugin/libs/jsPDF/jspdf.min.js"></script>
    <script src="../static/lib/tableexport.jquery.plugin/libs/jsPDF-AutoTable/jspdf.plugin.autotable.js"></script>
    <!-- WYSIWYG editor -->
    <script src="../static/lib/summernote/summernote-bs4.min.js"></script>
    <script src="../static/lib/summernote/lang/summernote-ko-KR.js"></script>
    <!-- underscord.js -->
    <script src="../static/lib/underscore-min.js"></script>
    <!-- local -->
    <script src="../static/js/utils.js"></script>
    <script src="../static/js/commons.js"></script>
    <script src="../static/js/datatable.js"></script>
    <script src="../static/js/validate.js"></script>

    <script src="../static/lib/chart.js/Chart.min.js"></script>
    <script src="../static/lib/chart.js/plugins/chartjs-plugin-datalabels.min.js"></script>`;
    document.write(str);
    const $include = document.querySelector('.__include');
    if ($include) $include.remove();
})();
