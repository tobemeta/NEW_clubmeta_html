$(function () {
    // ajax loading
    $(document).ajaxStart(function (a, b, c) {
        $('body').append('<div class="loading"><div class="lds-dual-ring"></div></div>');
    });
    $(document).ajaxStop(function () {
        $('.loading').remove();
    });

    // goto list
    $('.btn-list')
        .off('click')
        .on('click', function () {
            var query = getQueryStringObject();
            location.href = baseURI + 'list?' + $.param(query);
        });

    // input[file] custom
    bsCustomFileInput.init();

    // WYSIWYG editor
    var $summernote = $('.summernote');
    /* Summernote Validation */
    //	var summernoteForm = $('.form-validate-summernote');
    // var summernoteValidator = summernoteForm.validate({
    // errorElement: 'em',
    // errorClass: 'is-invalid',
    // validClass: 'is-valid',
    // ignore: ':hidden:not(.summernote),.note-editable.card-block',
    // errorPlacement: function (error, element) {
    // // Add the `help-block` class to the error element
    // error.addClass('invalid-feedback');
    // if(element.prop('type') === 'checkbox') {
    // error.insertAfter(element.siblings('label'));
    // }
    // else if(element.hasClass('summernote')) {
    // error.insertAfter(element.siblings('.note-editor'));
    // }
    // else{
    // error.insertAfter(element);
    // }
    // }
    // });
    $summernote.summernote({
        lang: 'ko-KR',
        height: 200,
        toolbar: [['fontstyle', ['bold', 'italic', 'underline', 'strikethrough', 'clear']], ['fontsize'], ['color'], ['para', ['ul', 'ol', 'paragraph']], ['height'], ['insert', ['picture', 'link', 'table', 'hr']], ['fullscreen'], ['codeview']],
        fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '36'],
        lineHeights: ['0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
        callbacks: {
            onChange: function (contents, $editable) {
                $summernote.val($summernote.summernote('isEmpty') ? '' : contents);
            },
            onImageUpload: function (files, editor, welEditable) {
                var $obj = $(this);
                for (var i = files.length - 1; i >= 0; i--) {
                    var formData = new FormData();
                    formData.append('file', files[i]);
                    $.ajax({
                        data: formData,
                        type: 'post',
                        url: '/common/editor/upload',
                        cache: false,
                        contentType: false,
                        enctype: 'multipart/form-data',
                        processData: false,
                        success: function (data) {
                            if (data.header.responseCode == '200') {
                                $obj.summernote('editor.insertImage', data.body);
                            } else {
                                bsAlert('이미지 업로드 실패');
                            }
                        },
                        error: function () {
                            bsAlert('이미지 업로드 실패');
                        }
                    });
                }
            }
        }
    });

    //에디터 기본 폰트 16 사이즈 선택
    $summernote.summernote('fontSize', 16);

    // 목록화면에서 등록/상세화면으로 넘어가기 전 히스토리 추가
    if (location.href.indexOf('/list') > -1) {
        $(window).on('unload', function () {
            try {
                searchParams.page = $table.bootstrapTable('getOptions').pageNumber;
                history.pushState(null, null, baseURI + 'list?' + $.param(searchParams, true));
            } catch (e) {}
        });
    }
});

function goUrl(url) {
    window.open(url, '_blank');
}

function noImages(_t) {
    _t.src = '/static/images/300px-No_image_3x4.svg.png';
}

function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == '') return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1) {
            b[p[0]] = '';
        } else {
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
        }
    }
    return b;
}

function getJSONtoString(object) {
    var results = [];
    for (var property in object) {
        var value = object[property];
        if (value) results.push(property.toString() + ': ' + value);
    }

    return '{' + results.join(', ') + '}';
}

function getToday() {
    return $.format.date(new Date(), 'yyyy-MM-dd');
}

function getDateFormat(date, format = 'yyyy-MM-dd') {
    return $.format.date(date, format);
}

function getDateCalculator(val, t) {
    if (t == null || t == undefined || t == '') {
        t = 'd';
    }
    if (val == null || val == undefined || val == '') {
        return '';
    } else {
        val = Number(val);
        var min = 1000 * 60; // 1분
        var hour = min * 60; // 1시간
        var day = hour * 24; // 1일
        var date = new Date();
        if (t == 'd') {
            date.setMilliseconds(date.getMilliseconds() + val * day);
        } else if (t == 'm') {
            date.setMonth(date.getMonth() + val);
        } else if (t == 'y') {
            date.setYear(date.getFullYear() + val);
        }
        return $.format.date(date, 'yyyy-MM-dd');
    }
}

function cmmFormRegist(_form, url, success) {
    _ajaxFormSave('등록', _form, url, success);
}

function cmmFormModify(_form, url, success) {
    _ajaxFormSave('수정', _form, url, success);
}

function cmmListEdit(url, tableId = 'table') {
    _ajaxListSave(tableId, '수정', url);
}

function cmmListDelete(url, tableId = 'table') {
    _ajaxListSave(tableId, '삭제', url);
}

function cmmListCopy(url, tableId = 'table') {
    _ajaxListSave(tableId, '복사 ', url);
}

function cmmListEdit1(url, tableId = 'table') {
    _ajaxListSave(tableId, '메인노출설정 ', url);
}
function XSSFilter(value) {
    return value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function checkFormFileSize(_form) {
    var check = true;
    var size = 1048576;
    var $f = $(_form);
    $f.find('input[type="file"]').each(function () {
        var file = $(this)[0].files[0];
        if (file != undefined) {
            if (file.size > size) {
                check = false;
            }
        }
    });

    return check;
}

function checkFileSize(file) {
    var check = true;
    var size = 104857600; // 100mb
    if (file != undefined) {
        if (file.size > size) {
            check = false;
        }
    }

    return check;
}

// 쿠키 생성
function setCookie(cName, cValue, cDay) {
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해
    // escape(cValue)를
    // 합니다.
    if (typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

// 쿠키 가져오기
function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if (start != -1) {
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if (end == -1) end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}

function bsFormAlert(msg, callback) {
    var $m = _createModal2(msg);
    $m.find('.btn-confirm').off('click').on('click', callback).show();
    $m.find('.modal-body').html(msg);
    $m.modal('show');
    $m.on('hide.bs.modal', function () {
        $(this).remove();
    });
    return $m;
}

function bsFormAlert2(msg, callback) {
    var $m = _createModal3(msg);
    $m.find('.btn-confirm').off('click').on('click', callback).show();
    $m.find('.modal-body').html(msg);
    $m.modal('show');
    $m.on('hide.bs.modal', function () {
        $(this).remove();
    });
    return $m;
}

function bsAlert(msg) {
    var $m = _createModal(msg);
    $m.find('.btn-confirm').off('click').hide();
    $m.find('.modal-body').html(msg);
    $m.modal('show');
    $m.on('hide.bs.modal', function () {
        $(this).remove();
    });
    return $m;
}

function bsLogout() {
    var msg = '로그아웃 되었습니다.';
    var $m = _createModal(msg);
    $m.find('.btn-confirm').off('click').hide();
    $m.find('.modal-body').html(msg);
    $m.modal('show');
    $m.on('hide.bs.modal', function () {
        location.href = '/signin';
    });
    return $m;
}

function bsConfirm(msg, callback) {
    var $m = _createModal(msg);
    $m.find('.btn-confirm').off('click').on('click', callback).show();
    $m.find('.modal-body').html(msg);
    $m.modal('show');
    $m.on('hide.bs.modal', function () {
        $(this).remove();
    });
    return $m;
}

/**
 * 확인 및 취소 버튼을 갖는 모달 팝업을 노출한다. 이 함수는 js의 기본 함수 중 confirm 함수에 대응한다
 * (이하 confirm 팝업)
 *
 * @param msg
 * confirm 팝업에 표시될 메시지
 * @param opt
 * 메시지를 제외한 나머지 옵션들이며, js Object 형태로 작성한다. 각 항목들은 생략이 가능하다.
 * {
 *    title: confirm 화면 상단의 텍스트를 변경한다. 생략하면 "알림" 표시된다
 *    closeText: 닫기 버튼의 텍스트를 변경한다. 생략하면 "닫기" 표시된다
 *    closeFunc: 닫기 버튼 클릭시의 동작을 콜백함수로 지정한다. 생략하면 버튼 클릭시 팝업이 사라지지만, 지정해도 콜백 실행 후 최종적으로는 팝업이 사라진다.
 *    okText: 확인 버튼의 텍스트를 변경한다. 생략하면 "확인" 표시된다
 *    okFunc: 확인 버튼 클릭시의 동작을 콜백함수로 지정한다. 생략하면 버튼 클릭시 팝업이 사라지지만, 지정해도 콜백 실행 후 최종적으로는 팝업이 사라진다.
 * }
 *
 * @returns {*|jQuery|HTMLElement}
 */
function bsConfirm2(msg, opt) {
    var $m = _createModal(msg);
    var $btnClose = $m.find('.btn-close');
    var $btnOk = $m.find('.btn-confirm');
    $m.on('hide.bs.modal', function () {
        $(this).remove();
    });

    $m.find('.modal-body').html(msg);
    if (opt && opt.hasOwnProperty('title')) {
        $m.find('.modal-title').html(opt.title);
    }
    if (opt && opt.hasOwnProperty('closeText')) {
        $btnClose.text(opt['closeText']);
    }
    if (opt && opt.hasOwnProperty('closeFunc') && $.isFunction(opt['closeFunc'])) {
        $btnClose.off('click').on('click', opt['closeFunc']);
    } else {
    }
    if (opt && opt.hasOwnProperty('okText')) {
        $btnOk.text(opt['okText']);
    }
    if (opt && opt.hasOwnProperty('okFunc') && $.isFunction(opt['okFunc'])) {
        $btnOk.off('click').on('click', opt['okFunc']);
    }

    $m.modal('show');
    return $m;
}

function _createModal(msg) {
    var html = '';
    html += '<div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="false">';
    html += '	<div class="modal-dialog" role="document">';
    html += '		<div class="modal-content">';
    html += '			<div class="modal-header">';
    html += '				<h6 class="modal-title">알림</h6>';
    html += '				<button class="close" type="button" data-dismiss="modal" aria-label="Close">';
    html += '					<span aria-hidden="true">×</span>';
    html += '				</button>';
    html += '			</div>';
    html += '			<div class="modal-body">' + msg + '</div>';
    html += '			<div class="modal-footer">';
    html += '				<button class="btn btn-secondary btn-close" type="button" data-dismiss="modal">닫기</button>';
    html += '				<button class="btn btn-primary btn-confirm" type="button" data-dismiss="modal">확인</button>';
    html += '			</div>';
    html += '		</div>';
    html += '	</div>';
    html += '</div>';
    var $m = $(html);
    $('body').append($m);
    return $m;
}

function _createModal2(msg) {
    var html = '';
    html += '<div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="false">';
    html += '	<div class="modal-dialog" role="document">';
    html += '		<div class="modal-content">';
    html += '			<div class="modal-header">';
    html += '				<h6 class="modal-title">알림</h6>';
    html += '				<button class="close btn-reload" type="button" data-dismiss="modal" aria-label="Close">';
    html += '					<span aria-hidden="true">×</span>';
    html += '				</button>';
    html += '			</div>';
    html += '			<div class="modal-body">' + msg + '</div>';
    html += '			<div class="modal-footer">';
    html += '				<button class="btn btn-secondary btn-confirm" type="button" data-dismiss="modal">목록</button>';
    html += '				<button class="btn btn-primary btn-reload" type="button" onclick="location.reload()">닫기</button>';
    html += '			</div>';
    html += '		</div>';
    html += '	</div>';
    html += '</div>';
    var $m = $(html);
    $('body').append($m);
    return $m;
}

function _createModal3(msg) {
    var html = '';
    html += '<div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="false">';
    html += '	<div class="modal-dialog" role="document">';
    html += '		<div class="modal-content">';
    html += '			<div class="modal-header">';
    html += '				<h6 class="modal-title">알림</h6>';
    html += '				<button class="close btn-reload" type="button" data-dismiss="modal" aria-label="Close">';
    html += '					<span aria-hidden="true">×</span>';
    html += '				</button>';
    html += '			</div>';
    html += '			<div class="modal-body">' + msg + '</div>';
    html += '			<div class="modal-footer">';
    html += '				<button class="btn btn-secondary btn-confirm" type="button" data-dismiss="modal">확인</button>';
    html += '			</div>';
    html += '		</div>';
    html += '	</div>';
    html += '</div>';
    var $m = $(html);
    $('body').append($m);
    return $m;
}

function _ajaxFormSave(text, _form, url, success = false) {
    var formdata = new FormData();
    var $form = $(_form);
    var msgs = [];
    $form.find('.custom-file input[type=file]').each(function () {
        var file = $(this)[0].files[0];
        if (checkFileSize(file)) {
            formdata.append($(this)[0].name, $(this)[0].files[0]);
        } else {
            msgs.push('[' + file.name + '(' + file.size + ' byte)]');
        }
    });
    if (msgs.length > 0) {
        bsAlert('파일 용량 확인<br/>' + msgs.join('<br/>'));
    } else {
        bsConfirm(text + '하시겠습니까?', function () {
            var data = $form.serializeArray();
            data.forEach(function (item) {
                formdata.append(item.name, item.value);
            });
            $.ajax({
                url: url,
                method: 'post',
                dataType: 'json',
                data: formdata,
                processData: false,
                contentType: false,
                success: function (data, status) {
                    if (success) {
                        success(data);
                    } else {
                        if (data.header.responseCode == '200') {
                            bsFormAlert(text + ' 성공', function () {
                                $('.btn-list').click();
                            });
                        } else {
                            bsAlert(data.header.responseMsg);
                        }
                    }
                },
                error: function (jqXHR) {
                    if (typeof jqXHR.responseJSON == 'object') {
                        bsAlert(text + ' 실패<br/>(' + jqXHR.responseJSON.header.responseMsg + ')');
                    } else if (jqXHR.status == 401) {
                        bsLogout();
                    } else {
                        bsAlert(text + ' 실패');
                    }
                }
            });
        });
    }
}

function _ajaxListSave(tableId, text, url, success = false) {
    var $id = $('#' + tableId);
    var $check = $id.find('input:checked');
    var cnt = $check.length;
    if (cnt <= 0) {
        bsAlert('선택된 데이터가 없습니다.');
    } else {
        bsConfirm(text + '하시겠습니까?', function () {
            console.log($check.serializeArray());
            $.ajax({
                url: url,
                method: 'post',
                dataType: 'json',
                data: $check.serializeArray(),
                success: function (data, status) {
                    if (success) {
                        success(data);
                    } else {
                        if (data.header.responseCode == '200') {
                            if (url == '/api/community/freeboard/hidden') {
                                bsAlert(text + '되었습니다.');
                            }
                            $id.bootstrapTable('refresh');
                        } else {
                            bsAlert(data.header.responseMsg);
                        }
                    }
                },
                error: function (jqXHR) {
                    if (typeof jqXHR.responseJSON == 'object') {
                        bsAlert(text + ' 실패<br/>(' + jqXHR.responseJSON.header.message + ')');
                    } else if (jqXHR.status == 401) {
                        bsLogout();
                    } else {
                        bsAlert(text + ' 실패');
                    }
                }
            });
        });
    }
}

function _ajaxRest(text, url, data, success = false) {
    $.ajax({
        url: url,
        method: 'post',
        dataType: 'json',
        data: data,
        success: function (data, status) {
            if (success) {
                success(data);
            } else {
                if (data.header.responseCode == '200') {
                } else {
                    bsAlert(data.header.responseMsg);
                }
            }
        },
        error: function (jqXHR) {
            if (typeof jqXHR.responseJSON == 'object') {
                bsAlert(text + ' 실패<br/>(' + jqXHR.responseJSON.header.responseMsg + ')');
            } else if (jqXHR.status == 401) {
                bsLogout();
            } else {
                bsAlert(text + ' 실패');
            }
        }
    });
}

function _ajaxGet(text, url, data, success = false) {
    $.ajax({
        url: url,
        method: 'get',
        dataType: 'json',
        data: data,
        success: function (data, status) {
            if (success) {
                success(data);
            } else {
                if (data.header.responseCode == '200') {
                } else {
                    bsAlert(data.header.responseMsg);
                }
            }
        },
        error: function (jqXHR) {
            if (typeof jqXHR.responseJSON == 'object') {
                bsAlert(text + ' 실패<br/>(' + jqXHR.responseJSON.header.responseMsg + ')');
            } else if (jqXHR.status == 401) {
                bsLogout();
            } else {
                bsAlert(text + ' 실패');
            }
        }
    });
}

function _ajaxRestJson(text, url, data, success = false) {
    $.ajax({
        url: url,
        method: 'post',
        dataType: 'json',
        data: data,
        contentType: 'application/json',
        success: function (data, status) {
            if (success) {
                success(data);
            } else {
                if (data.header.responseCode == '200') {
                } else {
                    bsAlert(data.header.responseMsg);
                }
            }
        },
        error: function (jqXHR) {
            if (typeof jqXHR.responseJSON == 'object') {
                bsAlert(text + ' 실패<br/>(' + jqXHR.responseJSON.header.responseMsg + ')');
            } else if (jqXHR.status == 401) {
                bsLogout();
            } else {
                bsAlert(text + ' 실패');
            }
        }
    });
}

function _ajaxJsonWithFile(text, url, formData, success = false) {
    $.ajax({
        url: url,
        method: 'post',
        dataType: 'json',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        success: function (data, status) {
            if (success) {
                if (data.header.responseCode == '200') {
                    bsFormAlert2(text + ' 성공', function () {
                        $('.btn-list').click();
                    });
                } else {
                    bsAlert(data.header.responseMsg);
                }
            } else {
                if (data.header.responseCode == '200') {
                    bsFormAlert(text + ' 성공', function () {
                        $('.btn-list').click();
                    });
                } else {
                    bsAlert(data.header.responseMsg);
                }
            }
        },
        error: function (jqXHR) {
            if (typeof jqXHR.responseJSON == 'object') {
                bsAlert(text + ' 실패<br/>(' + jqXHR.responseJSON.header.responseMsg + ')');
            } else if (jqXHR.status == 401) {
                bsLogout();
            } else {
                bsAlert(text + ' 실패');
            }
        }
    });
}

/**
 * null을 ""로 변경
 *
 * @param str
 * @returns
 */
function isNvl(str) {
    if (str == undefined || str == null || str == '' || str == 'null') {
        return '';
    } else {
        return str;
    }
}

/**
 * DatePicker 기본 설정으로 생성
 *
 * @usage $(selector).defaultDatepicker()
 */
$.fn.defaultDatepicker = function (option = {}) {
    var $base = $(this);

    var datepicker = $base.datepicker(
        Object.assign(
            {
                format: 'yyyy-mm-dd',
                autoclose: true
            },
            option
        )
    );

    $base.removeAttr('readonly');
    $base.attr('autocomplete', 'off');

    $base.mask('0000-00-00');

    // 기간 입력 인 경우 선택 범위 제한
    $base
        .closest('.input-group')
        .find('input')
        .each(function () {
            var name = this.name;
            if (name.indexOf('start') == 0 || name.indexOf('end') == 0) {
                if (name.indexOf('start') == 0) {
                    $(this).change(function () {
                        $('[name=' + name.replace('start', 'end') + ']').datepicker('setStartDate', this.value);
                    });
                } else {
                    $(this).change(function () {
                        $('[name=' + name.replace('end', 'start') + ']').datepicker('setEndDate', this.value);
                    });
                }
            }
        });
    return datepicker;
};

/**
 * data-toggle=popover-hover 속성을 가진 모든 요소를 찾아서, data-img 속성에 할당된 URL 이미지를
 * 보여주는 팝오버 기능을 작성한다.
 * @param position
 */
function setPopOverImg(position) {
    if (position == null || position == undefined || position == '') {
        position = 'right';
    }
    $('[data-toggle="popover-hover"]').popover({
        html: true,
        trigger: 'hover',
        placement: position,
        sanitize: false,
        content: function () {
            return '<img src="' + $(this).data('img') + '" style="max-width: 100%;" />';
        }
    });
}

function resetForm(formId) {
    $('#' + formId)[0].reset();
    $('#' + formId + ' input[type=text]').val('');
    $("#search input[type=radio][value='']").prop('checked', true);
}

function mainMapAjax(url, text, data, contentType) {
    $.ajax({
        url: url,
        method: 'post',
        dataType: 'json',
        data: data,
        contentType: contentType, // 서버에서 보내줄 데이터의 타입
        success: function (data, status) {
            if (data.header.responseCode == '200') {
                bsAlert('메인 ' + text + ' 설정되었습니다.');
                location.reload();
            } else {
                bsAlert(data.header.responseMsg);
            }
        },
        error: function (jqXHR) {
            if (typeof jqXHR.responseJSON == 'object') {
                bsAlert('실패<br/>(' + jqXHR.responseJSON.header.message + ')');
            } else {
                bsAlert('실패');
            }
        }
    });
}

/**
 * RGB 컬러 형태의 문자열인 fromColor와 toColor, 그리고 생성되어야 할 전체 컬러 개수인 step을 넣으면
 * fromColor와 toColor를 포함한 step 수만큼의 RGB 컬러 문자열을 생성해서 반환한다
 * ex)
 *   genSeqColor("#488f31", "#de425b", 3) = ['#488f31', '#936846', '#de425b']
 *   genSeqColor("#488f31", "#de425b", 4) = ['#488f31', '#7a5b3f', '#ac744d', '#de425b']
 * @param fromColor
 * @param toColor
 * @param step
 * @returns {*[]}
 */
function genSeqColor(fromColor, toColor, step) {
    if (fromColor == null) fromColor = '#488f31';
    if (toColor == null) toColor = '#de425b';

    var from = fromColor.replace('#', '').replace(' ', '');
    var to = toColor.replace('#', '').replace(' ', '');

    var frgb = {
        r: parseInt(from.substring(0, 2), 16),
        g: parseInt(from.substring(2, 4), 16),
        b: parseInt(from.substring(4, 6), 16)
    };
    var trgb = {
        r: parseInt(to.substring(0, 2), 16),
        g: parseInt(to.substring(2, 4), 16),
        b: parseInt(to.substring(4, 6), 16)
    };

    var ret = [];
    ret.push(fromColor);

    var rStep = Math.floor((Math.max(frgb.r, trgb.r) - Math.min(frgb.r, trgb.r)) / (step - 1));
    var gStep = Math.floor((Math.max(frgb.g, trgb.g) - Math.min(frgb.g, trgb.g)) / (step - 1));
    var bStep = Math.floor((Math.max(frgb.b, trgb.b) - Math.min(frgb.b, trgb.b)) / (step - 1));

    for (var i = 0; i < step - 2; i++) {
        r = Math.min(frgb.r, trgb.r) + rStep * (i + 1);
        g = Math.min(frgb.g, trgb.g) + gStep * (i + 1);
        b = Math.min(frgb.b, trgb.g) + bStep * (i + 1);
        rgb = '#' + r.toString(16) + g.toString(16) + b.toString(16);
        ret.push(rgb);
    }

    ret.push(toColor);

    return ret;
}
