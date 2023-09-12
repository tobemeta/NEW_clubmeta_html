const ui = {
    init: function () {
        const _this = this;

        _this.menuActive();

        // Add event listener to play button
        $('.play').on('click', function () {
            $(this).addClass('d-none');
            $(this).siblings('.pause').removeClass('d-none');
        });

        $('.pause').on('click', function () {
            $(this).addClass('d-none');
            $(this).siblings('.play').removeClass('d-none');
        });

        //datePicker - month
        $('.btn-datepicker').on('click', function (e) {
            const associatedInput = $(this).closest('.datepicker-box').find('.datepicker');

            associatedInput.datepicker('show');
        });

        $('#dateMonth')
            .datepicker({
                format: 'yyyy-mm',
                viewMode: 'months',
                minViewMode: 'months',
                language: 'ko',
                immediateUpdates: true,
                orientation: 'bottom left'
            })
            .datepicker('update', new Date());

        var inpBox = $('.input-box');
        var inp = $('.input-box .form-control');

        inpBox.each(function () {
            inp.on('input', function () {
                var inpType = $(this).attr('type');

                if ($(this).val() != '') {
                    if (inpType === 'password') {
                        $(this).parent(inpBox).addClass('pw');
                    }
                    $(this).parent(inpBox).addClass('focus');
                } else {
                    $(this).parent(inpBox).removeClass('focus');
                    $(this).parent(inpBox).removeClass('pw');
                }
            });
        });
        $(document).on('click', '.btn-inp-del', function () {
            var $inp = $(this).siblings('input', 'textarea');
            $inp.val('').change().focus();
            $(this).parents('.input-box').removeClass('focus');
        });

        $(document).on('click', '.btn-inp-pw', function (e) {
            e.preventDefault();

            $(this).toggleClass('is-show');
            $(this).attr('aria-label', '비밀번호 숨김');

            const $inp = $(this).siblings('input');

            if ($(this).hasClass('is-show')) {
                $inp.prop('type', 'text');
            } else {
                $inp.prop('type', 'password');
                $(this).attr('aria-label', '비밀번호 표시');
            }
        });
    },
    menuActive: function () {
        if ($('.sidebar').length) {
            var $path = location.pathname;
            var $href = $path.split('/').pop();

            $('.sidebar .nav-item a').each(function () {
                if ($(this).attr('href').indexOf($href) !== -1) {
                    $(this).addClass('active');

                    $(this).closest('.collapse').addClass('show');
                    $(this).closest('.nav-item').addClass('active');
                }
            });
        } else {
            console.log('error');
        }
    }
};

$(window).on('load', function () {
    ui.init();
});

// confirmPop
function conAlert(msg, callback) {
    var $m = _createModal_Load(msg);
    $m.find('.btn-confirm').off('click').on('click', callback).show();
    $m.find('.modal-body').html(msg);
    $m.modal('show');
    $m.on('hide.bs.modal', function () {
        $(this).remove();
    });
    return $m;
}

function _createModal_Load(msg) {
    var html = '';
    html += '<div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="false">';
    html += '	<div class="modal-dialog" role="document">';
    html += '		<div class="modal-content">';
    html += '			<div class="modal-body">' + msg + '</div>';
    html += '			<div class="modal-footer">';
    html += '				<button class="btn btn-secondary btn-confirm" type="button" onclick="location.reload()">확인</button>';
    html += '			</div>';
    html += '		</div>';
    html += '	</div>';
    html += '</div>';
    var $m = $(html);
    $('body').append($m);
    return $m;
}
