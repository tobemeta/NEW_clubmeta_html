/*
 * 커뮤니티 관리 공통 js
 */

function delYnFormatter(value, data) {
	var htmlData = '';
	if(value == 'A'){
		htmlData = '<br><span class="text-primary small">(관리자)</span>';
	}
	
	return value == 'N' ? '노출' : '미노출'+htmlData;
}

function reportFormatter(value, data){
	var reportData = '-';
	
	if(value > 0){
		reportData = '<span class="text-danger">신고</span>';
		reportData += '<br><span class="small">('+value+'회)</span>';
	}
	
	return reportData;
}

function replyFormatter(value, data){
	return value > 0 ? value:'-';
}

function remFormatter(value, data){
	return value > 0 ? value:'-';
}

function titleFormatter(value, data){
	var label = '';
	if(data.isImportant){
		label = '<span class="label label-danger">고정</span>';
	}
	if(data.isViewBadge){
		label += '<span class="label label-primary">뱃지</span>';
	}
	
	if(data.hashTag != null && data.hashTag != ''){
		value = '<span style="color:#FD8307">#'+data.hashTag+'</span> '+value;
	}
	
	return label+'<a href="/community/freeboard/edit/' + data.freeboardSeq + '?page=' + page + '&' + $.param(searchParams) + '">' + value + '</a>';
}

function replyTitleFormatter(value, data){
	return '<a href="/community/freeboard/edit/' + data.parentsSeq + '?page=' + page + '&' + $.param(searchParams) + '">' + value + '</a>';
}

function contentFormatter(value, data){
	return '<a href="javascript:;" class="open_reply_pop" data-toggle="modal" data-target="#replyDetailPop" data-seq="'+data.freeboardSeq+'">'+value+'</a>';
}

function nicknameFormatter(value, data){
	var nicknameData = value;
	
	if(data.userStatus == 'L'){ //이용제한 사용자
		nicknameData += '<br><span class="text-danger small">(이용제한)</span>';
	}
	
	nicknameData += '<input type="hidden" name="userSeqs" value="'+data.userSeq+'"/>';
	
	return nicknameData;
}

function dateTimeFormatter(value, data) {
	if(value == null || value == '' || value == undefined) {
		return '-';
	}
	return $.format.date(new Date(value), 'yyyy-MM-dd HH:mm');
}

function hiddenFreeboard(type){
	var cnt = $('#table tbody').find('input:checked').length;
	_ajaxListSave('table', cnt+'개의 '+type+'을 미노출 설정', '/api' + baseURI + 'hidden');
}

function activeFreeboard(type, seq){
	bsConfirm('해당 '+type+'을 미노출 해제하시겠습니까?', function() {
		var url = '/api' + baseURI + 'active';
		var data = [{'name' : 'seqs', 'value' : seq}];
		var callback = function(data) {
			var code = data.header.responseCode;
			if(code == '200') {
				bsFormAlert('해당 '+type+'이 미노출 해제 되었습니다.', function() {
					$('.btn-list').click();
				});
			} else {
				bsAlert('미노출 해제 실패');
			}
		}
		_ajaxRest('미노출 해제', url, data, callback);
	});
}

function userLimit(){
	var $check = $('#table tbody').find('input:checked').parents('tr').find('input[name=userSeqs]');
	
	if($check.length <= 0) {
		bsAlert('선택된 데이터가 없습니다.');
	} else{
		$check = $check.serializeArray();
		$check = _.uniq($check, 'userSeqs'); //중복 제거
		
		bsConfirm('선택한 회원의 커뮤니티 이용을 제한하시겠습니까?', function() {
			$.ajax({
				url: '/api'+baseURI+'userlimit',
				method: 'post',
				dataType: 'json',
				data: $check,
				success: function(data, status) {
					if(data.header.responseCode == '200') {
						bsAlert('선택한 회원의 커뮤니티 이용이 제한되었습니다.');
						$('#table').bootstrapTable('refresh');
					}
					else {
						bsAlert(data.header.responseMsg);
					}
				},
				error: function(jqXHR) {
					if(typeof jqXHR.responseJSON == 'object') {
						bsAlert(text + ' 실패<br/>(' + jqXHR.responseJSON.header.message + ')');
					}
					else if(jqXHR.status == 401) {
						bsLogout();
					}
					else {
						bsAlert(text + ' 실패');
					}
				}
			});
		});
	}
}

function detailHidden(type, seq){
	bsConfirm('해당 '+type+'을 미노출 설정하시겠습니까?', function() {
		var url = '/api/community/freeboard/hidden';
		var data = [{'name' : 'seqs', 'value' : seq}];
		var callback = function(data) {
			var code = data.header.responseCode;
			if(code == '200') {
				bsFormAlert('해당 '+type+'이 미노출 처리 되었습니다.', function() {
					$('.btn-list').click();
				});
			} else {
				bsAlert('미노출 처리 실패');
			}
		}
		_ajaxRest('미노출 처리', url, data, callback);
	});
}

function detailUserLimit(nickname, seq){
	bsConfirm(nickname+' 회원의 커뮤니티 이용을 제한하시겠습니까?', function() {
		var url = '/api' + baseURI + 'userlimit';
		var data = [{'name' : 'userSeqs', 'value' : seq}];
		var callback = function(data) {
			var code = data.header.responseCode;
			if(code == '200') {
				bsFormAlert(nickname+' 회원의 커뮤니티 이용이 제한되었습니다.', function() {
					$('.btn-list').click();
				});
			} else {
				bsAlert('커뮤니티 이용 제한 실패');
			}
		}
		_ajaxRest('커뮤니티 이용 제한', url, data, callback);
	});
}
