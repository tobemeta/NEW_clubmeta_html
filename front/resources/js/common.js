const ui = {
    init: function () {
        const _this = this;

        // _this.header();
        _this.footer();
        _this.tab();
        _this.forms();
        _this.tooltip.init();
        _this.select.init();
    },
    header: () => {
        console.log('header');
    },
    footer: () => {
        const footNav = $('.nav li a');

        footNav.off().on('click', function () {
            $(this).parent('li').addClass('on').siblings('li').removeClass('on');
        });
    },
    tab: () => {
        const $tabBtn = $('.tab-button');

        $tabBtn.off('click').on('click', function (e) {
            e.preventDefault();
            var data = $(this).data('target'),
                id = $(this).attr('href'),
                $tab = $(this).parent();
            const _this = $(this);

            if ($tab.hasClass('on')) return false;

            _this.parent().addClass('on').siblings().removeClass('on');
            $(data).addClass('open').siblings().removeClass('open');
            // $(id).addClass('open').siblings().removeClass('open');

            const tabWrap = _this.closest('.tab-wrap');

            if (tabWrap.hasClass('line')) {
                console.log(_this);
            } else if (tabWrap.hasClass('box')) {
                console.log(33);
            } else {
                console.log(11);
            }
        });
    },
    tooltip: {
        className: {
            wrap: '.tooltip-wrap',
            btn: '.tooltip-btn',
            active: '.on',
            body: '.tooltip-body',
            inner: '.tooltip-inner',
            arrow: '.tooltip-arr',
            closeBtn: '.tooltip-close'
        },
        resize: function () {
            if (!$(ui.tooltip.className.btn + ui.tooltip.className.active).length) return;
            $(ui.tooltip.className.btn + ui.tooltip.className.active).each(function () {
                const $btn = $(this);
                const $wrap = $btn.closest(ui.tooltip.className.wrap);
                const $cont = $wrap.find(ui.tooltip.className.body);
                const $winW = $(window).width() - 40;
                const $btnW = $btn.outerWidth();
                const $btnX = Math.min($winW + $btnW / 2 - 2, $btn.offset().left) - 20;
                let $scrollEnd = $(window).height() + $(window).scrollTop();

                if ($(ui.className.bottomFixed + ':visible').length) $scrollEnd = $scrollEnd - $(ui.className.bottomFixed).children().outerHeight();

                const $left = Math.max(-4, $btnX);
                $cont.children(ui.tooltip.className.arrow).css({
                    left: $left + $btnW / 2
                });
                $cont.css({
                    width: $winW,
                    left: -$left
                });

                const $contY = $wrap.offset().top + $wrap.outerHeight() + parseInt($cont.css('margin-top')) + parseInt($cont.css('margin-bottom')) + $cont.outerHeight();
                if ($cont.hasClass('is-bottom')) {
                    $cont.addClass('bottom');
                } else {
                    if ($scrollEnd - 10 < $contY) {
                        $cont.addClass('bottom');
                    } else {
                        $cont.removeClass('bottom');
                    }
                }
            });
        },
        position: function (tar) {
            const $tar = $(tar);

            if (!$tar.find(ui.tooltip.className.inner).length) $tar.wrapInner('<div class="' + ui.tooltip.className.inner.slice(1) + '"></div>');
            if (!$tar.find(ui.tooltip.className.arrow).length) $tar.prepend('<i class="' + ui.tooltip.className.arrow.slice(1) + '" aria-hidden="true"></i>');
            if (!$tar.find(ui.tooltip.className.closeBtn).length) $tar.find(ui.tooltip.className.inner).append('<a href="#" class="' + ui.tooltip.className.closeBtn.slice(1) + '" role="button" aria-label="툴팁닫기"></a>');
            ui.tooltip.resize();
        },
        aria: function (element) {
            $(element).each(function (e) {
                const $btn = $(this).find(ui.tooltip.className.btn);
                const $cont = $(this).find(ui.tooltip.className.body);
                let $contId = $cont.attr('id');
                const $closeBtn = $(this).find(ui.tooltip.className.closeBtn);

                if (!$contId) $contId = 'ttCont-' + e;
                $btn.attr({
                    role: 'button'
                    // 'aria-describedby': $contId
                });
                $cont.attr({
                    // id: $contId,
                    role: 'tooltip'
                });
                $closeBtn.attr('role', 'button');
            });
        },
        reInit: function () {
            ui.tooltip.aria(ui.tooltip.className.wrap);
        },
        init: function () {
            ui.tooltip.aria(ui.tooltip.className.wrap);

            //열기
            $(document).on('click', ui.tooltip.className.wrap + ' ' + ui.tooltip.className.btn, function (e) {
                e.preventDefault();

                $cont = $(this).closest(ui.tooltip.className.wrap).find(ui.tooltip.className.body);
                if ($(this).hasClass('is-pop')) {
                    const $popContent = $cont.html();
                    const $popTitle = $cont.attr('title');
                    if ($popTitle !== undefined) {
                        Layer.tooltip($popContent, $popTitle);
                    } else {
                        Layer.tooltip($popContent);
                    }
                } else {
                    if ($(this).hasClass(ui.tooltip.className.active.slice(1))) {
                        $cont.stop(true, false).fadeOut();
                        $(this).removeClass(ui.tooltip.className.active.slice(1));
                    } else {
                        $(ui.tooltip.className.btn).removeClass(ui.tooltip.className.active.slice(1));
                        $(ui.tooltip.className.body).fadeOut();
                        $(this).addClass(ui.tooltip.className.active.slice(1));
                        $cont.stop(true, false).fadeIn();
                        setTimeout(function () {
                            ui.tooltip.position($cont);
                        }, 30);
                    }
                }
            });
            //닫기
            $(document).on('click', ui.tooltip.className.closeBtn, function (e) {
                e.preventDefault();
                const $cont = $(this).closest(ui.tooltip.className.body);
                const $btn = $cont.siblings(ui.tooltip.className.btn);
                $btn.removeClass(ui.tooltip.className.active.slice(1));
                $cont.stop(true, false).fadeOut(500, function () {
                    $btn.focus();
                });
            });
            $(document)
                .on('click touchend', function (e) {
                    $(ui.tooltip.className.body).stop(true, false).fadeOut();
                    $(ui.tooltip.className.wrap + ' ' + ui.tooltip.className.btn).removeClass(ui.tooltip.className.active.slice(1));
                })
                .on('click touchend', ui.tooltip.className.wrap, function (e) {
                    e.stopPropagation();
                });
        }
    },
    forms: () => {
        const inpBox = $('.input-box');
        const inp = $('.input-box input');

        inpBox.each(function () {
            inp.on('input', function () {
                if ($(this).val() != '') {
                    $(this).closest(inpBox).addClass('focus');
                } else {
                    $(this).closest(inpBox).removeClass('focus');
                }
            });
        });

        const inpError = inpBox.hasClass('error');

        if (inpError) {
            $(this).find('input').addClass('error');
        } else {
        }

        $(document).on('click', '.btn-inp-del', function () {
            const $inp = $(this).siblings('input');
            $inp.val('').change().focus();
            $('.input-box').removeClass('focus');
        });
    },
    select: {
        className: {
            wrap: '.select-box',
            btn: '.btn-select',
            btnActive: '.open',
            optionsWrap: '.select-options',
            option: '.select-option',
            selectPopClass: '.select-pop',
            selectPopWrap: '.pop-select'
        },
        init: function () {
            ui.select.ready();
            ui.select.UI();
        },
        ready: function () {
            $(ui.select.className.wrap).each(function () {
                const $this = $(this);
                const $sel = $this.find('select');
                if (!$this.find(ui.select.className.btn).length) {
                    const $title = $sel.attr('title') || '선택';
                    const $btn = `<button class="${ui.select.className.btn.slice(1)}" title="${$title}"></button>`;
                    $sel.hide();
                    $this.append($btn);
                    ui.select.setBtnText($sel);
                }
            });
        },
        setBtnText(elem) {
            const $el = $(elem);
            const $btn = $el.siblings(ui.select.className.btn);
            if (!$el.length || !$btn.length) return;
            const $selectedTxt = $el.find(':selected').text();
            $btn.text($selectedTxt);
        },
        makeOptions: function (select, btn) {
            const $select = $(select);
            const $btn = $(btn);
            if (!$select.children().length) return;
            const isPop = $select.hasClass(ui.select.className.selectPopClass.slice(1));

            let $options = $(ui.select.className.optionsWrap);
            if ($options.length) ui.select.reset();

            const $title = $btn.attr('title');
            let $optionHtml = '';
            if (isPop) $optionHtml += '<div class="' + ui.select.className.selectPopWrap.slice(1) + '">';
            $optionHtml += '<div class="' + ui.select.className.optionsWrap.slice(1) + '">';
            $optionHtml += '<h1>' + $title + '</h1>';
            $optionHtml += '<ul>';
            $select.children().each(function () {
                const $this = $(this);
                const $val = $this.attr('value');
                const $text = $this.text();
                const $seletedClass = $this.prop('selected') ? ' selected' : '';
                $optionHtml += '<li><button class="' + ui.select.className.option.slice(1) + $seletedClass + '" data-val="' + $val + '">' + $text + '</button></li>';
            });
            $optionHtml += '</ul>';
            $optionHtml += '</div>';
            if (isPop) $optionHtml += '</div>';

            $('body').append($optionHtml);
            $options = $(ui.select.className.optionsWrap);
            $options.data('select', select);

            if (isPop) {
                $options.animate({ bottom: 0 }, 500);
            }

            if (!isPop) {
                let $top = $btn.offset().top + $btn.outerHeight();
                let $left = $btn.offset().left;
                const $width = $btn.outerWidth();
                if ($top + $options.outerHeight() > $(window).scrollTop() + $(window).height() + 20) {
                    $top = $top - $btn.outerHeight() - $options.outerHeight() - 2;
                }
                if ($left + $options.outerWidth() > $(window).scrollLeft() + $(window).width()) {
                    $left = $left + $btn.outerWidth() - $options.outerWidth();
                }
                $options.css({
                    top: $top + 2,
                    left: $left,
                    minWidth: $width
                });
            }
        },
        reset: function () {
            const $options = $(ui.select.className.optionsWrap);
            if (!$options.length) return;
            $options.each(function () {
                const $this = $(this);
                const $select = $($this.data('select'));
                if (!$select) return;
                const $btn = $select.siblings(ui.select.className.btn);
                if ($btn.length) $btn.removeClass(ui.select.className.btnActive.slice(1));
                const $wrap = $this.closest(ui.select.className.selectPopWrap).length ? $this.closest(ui.select.className.selectPopWrap) : $this;

                if ($this.parent('.pop-select').length) {
                    $wrap.find('.select-options').animate({ bottom: -100 + '%' }, 500, function () {
                        $wrap.remove();
                    });
                } else {
                    $wrap.remove();
                }
            });

            const $btn = $(ui.select.className.btn + ui.select.className.btnActive);
            if ($btn.length) $btn.removeClass(ui.select.className.btnActive.slice(1));
        },
        UI: function () {
            //select change
            $(document).on('change', ui.select.className.wrap + ' select', function (e) {
                ui.select.setBtnText(this);
            });

            //btn
            $(document).on('click', ui.select.className.btn, function (e) {
                e.preventDefault();
                const $this = $(this);
                const $select = $this.siblings('select');

                $('body').addClass('lock-body');

                if ($this.hasClass(ui.select.className.btnActive.slice(1))) {
                    ui.select.reset();
                } else {
                    $this.addClass(ui.select.className.btnActive.slice(1));
                    ui.select.makeOptions($select, $this);
                }
            });

            //option
            $(document).on('click', ui.select.className.option, function (e) {
                e.preventDefault();
                const $this = $(this);
                const $val = $this.data('val');
                const $closest = $this.closest(ui.select.className.optionsWrap);
                const $select = $closest.data('select');
                const $btn = $select.siblings(ui.select.className.btn);
                $select.val($val).change();
                ui.select.reset();
                $btn.removeClass(ui.select.className.btnActive.slice(1)).focus();

                $('body').removeClass('lock-body');
            });

            //out click
            $(document)
                .on('click touchend', function (e) {
                    ui.select.reset();
                    $('body').removeClass('lock-body');
                })
                .on('click touchend', ui.select.className.wrap + ',' + ui.select.className.optionsWrap, function (e) {
                    e.stopPropagation();
                });
        }
    },
    popup: {
        zIndex: 1001,
        popCnt: 0,
        delayTime: 2000,
        toastClose: null,
        toast: function (msg) {
            var _this = this,
                $toastPop = $('#toastPop');
            //autoClose = null;
            clearTimeout(_this.toastClose);

            if ($toastPop.length == 0) {
                $toastPop = $('<article class="toastPop" id="toastPop" role="dialog">');
                $toastPop.append('<div class="toast-box"><p class="toastMsg"></p><button type="button" class="btn-close">닫기</button></div>');
                $('body').append($toastPop);
            }

            $('.toastMsg', $toastPop).html(msg);

            $toastPop.css('z-index', _this.zIndex++).fadeIn();

            _this.toastClose = setTimeout(function () {
                $toastPop.fadeOut(function () {
                    $(this).remove();
                });
            }, _this.delayTime);

            $('.btnClose', $toastPop)
                .off('click')
                .on('click', function () {
                    clearTimeout(_this.toastClose);
                    $toastPop.hide();
                });

            $toastPop
                .off('mouseover')
                .on('mouseover', function () {
                    clearTimeout(_this.toastClose);
                })
                .off('mouseout')
                .on('mouseout', function () {
                    _this.toastClose = setTimeout(function () {
                        $toastPop.fadeOut(function () {
                            $(this).remove();
                        });
                    }, _this.delayTime);
                });
        },
        msg: function (option, popOpen, param) {
            var _this = this,
                $msgBox = $('#msgBox'),
                $btnConfirm = $('.btn-pop-confirm', $msgBox),
                $btnClose = $('.btn-close', $msgBox);

            // 제목
            $('.title-box h1', $msgBox).html(option.tlt == '' ? '알림' : option.tlt);

            // 메세지
            $('.msg', $msgBox).html(option.msg == '' ? '' : option.msg);

            // 콜백
            if (option.callback == '' || option.callback == null) {
                $msgBox.data('callback', null);
            } else {
                $msgBox.data('callback', option.callback);
            }

            // type
            if (option.type == 'alert') {
                $btnClose.removeClass('lastFocus').hide();
                $btnConfirm.addClass('lastFocus');
            } else {
                $btnClose.addClass('lastFocus').show();
                $btnConfirm.removeClass('lastFocus');
            }

            if (option.cancleBtnHide) $('.title-box .btn-pop-close', $msgBox).hide();
            else $('.title-box .btn-pop-close', $msgBox).show();

            // 새창열림

            ui.popup.open($msgBox, popOpen, param);
        },
        open: function (target, popOpen, param) {
            console.log('팝업열기 : ' + target.selector);

            var _this = this,
                $layerW = $(target),
                $layer = $('.layer-popup', $layerW),
                effect = $layerW.data('effect'),
                view = $layerW.data('view'),
                callback = $layerW.data('callback'),
                tmpAppend = '<a href="javascript:void(0);" class="tmpAppend"></a>';

            _this.popCnt++;
            $('body').addClass('popup-open');

            $layerW.css('z-index', _this.zIndex++);
            $layer.attr('tabindex', '0');

            $('.btn-pop-close', $layer)
                .off('click')
                .on('click', function () {
                    _this.close(target, popOpen);
                    if (this.tagName == 'A') return false;
                });

            $('.btn-pop-confirm', $layer)
                .off('click')
                .on('click', function () {
                    if (callback) {
                        console.log('callback함수 실행');
                        window[callback](target, popOpen, param);
                    } else {
                        _this.close(target, popOpen);
                    }
                    if (this.tagName == 'A') return false;
                });

            $layerW.show();
            if (effect == 'fade') {
                $layer.hide().fadeIn();
            }

            return false;
        },
        close: function (target, popOpen) {
            console.log('팝업닫기 : ' + target.selector);
            var _this = this;
            _this.popCnt--;
            if (_this.popCnt == 0) $('body').removeClass('popupOpen');

            $('.layer-popup', target).removeAttr('tabindex');
            $(target).hide();
            //$('body').removeClass('popupOpen');
            $(popOpen).focus();
        }
    }
};

$(document).ready(() => {
    ui.init();
});
