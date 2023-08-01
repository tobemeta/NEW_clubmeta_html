$(function() {

	// 유효성 설정
	$.validator.addMethod('username', function(value, element, params) {
		var check = true;
		// if(!/^[a-zA-Z]+(?=.*\d{1,12})(?=.*[a-zA-Z]{1,12}){5,12}$/.test(value)){
		if(!/^[a-z]+[a-z0-9]{5,12}$/.test(value)) {
			check = false;
		}
		return check;
	}, '영문자로 시작하는 5~12자 사이의 영문 소문자+숫자 조합으로 사용해야 합니다.');
	$.validator.addMethod('password', function(value, element, params) {
		var check = true;
		if(!/(?=.*\d{1,12})(?=.*[a-zA-Z]{1,12}).{8,12}$/.test(value)) {
			check = false;
		}
		return check;
	}, '8~12자 사이의 영문자+숫자 조합으로 사용해야 합니다.');
	$.validator.addMethod('duplchar3', function(value, element, params) {
		var check = true;
		if(/(\w)\1\1/.test(value)) {
			check = false;
		}
		return check;
	}, '같은 문자를 연속으로 3번 이상 사용하실 수 없습니다.');
	$.validator.addMethod('booleanCheck', function(value, element, params) {
		return $(params).val() == 'true';
	}, '중복체크가 필요합니다.');
	$.validator.addMethod('listCountCheck', function(value, element, params) {
		return $(params).val() == 'true';
	}, '제품은 최소 2개부터 등록 가능합니다.');	
	$.validator.addMethod('booleanCheckValue', function(value, element, params){
		var isCheck = true;
		
		if($('#modelName').val() != null && $('#modelName').val() != undefined && $('#modelName').val() != ''){
			if($(params).val() != 'true'){
				isCheck = false;
			}
		}
		return isCheck;
	}, '중복체크가 필요합니다.');
	$.validator.addMethod('groupBrandCheck', function(value, element, params){
		var check = true;
		
		if($('#categoryTable>tbody>tr').length > 0 
				&& !$('#categoryTable>tbody>tr').hasClass('no-records-found')
				&& value <= 0){
			check = false;
		}
		return check;
	}, '카테고리를 지정한 경우 브랜드 값은 필수 입니다.');
	$.validator.addMethod('asCenterCheck', function(value, element, params){
		var check = true;
		
		//방문 가능이고 A/S센터 0개일 때
		if(value == 'TRUE' && $('#asTable>tbody>tr').hasClass('no-records-found')){
			check = false;
		}
		
		return check;
	}, '등록된 A/S 센터 정보가 없습니다.');
	$.validator.setDefaults({
		ignore: ':hidden:not(.summernote),.note-editable.card-block',
		/*errorElement: 'em',*/
		errorClass: 'invalid-feedback',
		errorPlacement: function(error, element) {
			
			if($('#' + error.attr('id')).length > 0) {
				$('#' + error.attr('id')).replaceWith(error);
			}
			else if(element.parent().hasClass('input-group')) {
				if(element.parent().next('.error').length == 0) {
					error.insertAfter(element.parent());
				}
			}
			else if(element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
				error.insertAfter(element.parent());
			}
			else if(element.hasClass('summernote') && !element.prop('disabled')) {
				error.insertAfter(element.siblings('.note-editor'));
				element.next().addClass('is-invalid');
			}
			else {
				error.insertAfter(element);
			}
		},
		highlight: function(element, errorClass, validClass) {
			$(element).addClass('is-invalid').removeClass('is-valid');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).addClass('is-valid').removeClass('is-invalid');
		}
	});
});