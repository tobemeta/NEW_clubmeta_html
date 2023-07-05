var $brandTable;
var selectedSeq = [];
var selectedData = [];

function createModal() {
	var html = '';
	html += '<div id="brandModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">';
	html += '	<div class="modal-dialog modal-lg">';
	html += '		<div class="modal-content">';
	html += '			<div class="modal-header">';
	html += '				<h6 class="modal-title">브랜드 선택</h6>';
	html += '				<button type="button" class="close" data-dismiss="modal">&times;</button>';
	html += '			</div>';
	html += '			<div class="modal-body">';
	html += '				<form id="brandSearch" role="form">';
	html += '					<div class="row form-group mb-1">';
	html += '						<label class="col-3 col-form-label">';
	html += '							<strong>브랜드명</strong>';
	html += '						</label>';
	html += '						<div class="col-9">';
	html += '							<input type="text" class="form-control" placeholder="브랜드명" name="keyword">';
	html += '						</div>';
	html += '					</div>';
	html += '					<div class="text-right">';
	html += '						<button type="button" class="btn btn-primary btn-search" id="brandSearchBtn">';
	html += '							<i class="fas fa-search"></i> 검색';
	html += '						</button>';
	html += '					</div>';
	html += '				</form>';
	html += '				<table id="brandTable" data-height="400" data-virtual-scroll="true" >';
	html += '					<colgroup>';
	html += '						<col width="70" />';
	html += '						<col width="70" />';
	html += '						<col width="*" />';
	html += '					</colgroup>';
	html += '					<thead>';
	html += '						<tr>';
	html += '							<th data-checkbox="true" data-formatter="brandStateFormatter"></th>';
	html += '							<th data-field="companySeq" data-formatter="rowNumBrandFormatter" data-align="center">번호</th>';
	html += '							<th data-field="name">브랜드명</th>';
	html += '						</tr>';
	html += '					</thead>';
	html += '				</table>';
	html += '				<form id="brandRegist" role="form">';
	html += '					<div class="row" style="display:none">';
	html += '						<div class="col-10 form-inline mx-auto">';
	html += '							<input type="hidden" name="isView" value="0" />';
	html += '							<input type="text" class="form-control mr-1" placeholder="브랜드명" name="name" required>';
	html += '							<button type="submit" class="btn btn-primary">빠른등록</button>';
	html += '						</div>';
	html += '					</div>';
	html += '				</form>';
	html += '			</div>';
	html += '			<div class="modal-footer">';
	html += '				<button type="button" class="btn btn-primary" onclick="callbackSelectBrandBtn();">선택</button>';
	html += '				<button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>';
	html += '			</div>';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
	$('#brandModal').remove();
	$('body').append(html);

	$('#brandModal').on('shown.bs.modal', function(e) {
		$brandTable = viewBrandTable();

		$brandTable.on('load-success.bs.table', function(e) {
			var totalRows = $brandTable.bootstrapTable('getOptions').totalRows;
			if (totalRows > 0) {
				$('#brandRegist > div').hide();
			} else {
				$('#brandRegist > div').show();
			}
		});

		var seqs = $('[name=companySeq]');
		if (seqs.length > 0) {
			selectedData = [];
			$.each(seqs, function() {
				var index = selectedData.indexOf(parseInt($(this).val()));
				if (index == -1) {
					selectedData.push(parseInt($(this).val()));
				}
			})

			selectedSeq = $.map(selectedData, function(value) {
				return parseInt(value);
			});
		}

		$brandTable.bootstrapTable('refresh');
	});

	var title = $('#title').val() ? $('#title').val() : $('#name').val();
	$('.modal-title').text(title);

	$('[name=keyword]').keydown(function(key) {
		if (key.keyCode == 13) {
			key.preventDefault();
			if ($('[name=keyword]').val() == '') {
				bsAlert('검색어를 입력해주세요.');
			} else {
				$brandTable.bootstrapTable('refresh');
			}
		}
	});

	$('#brandSearchBtn').on('click', function() {
		if ($('[name=keyword]').val() == '') {
			bsAlert('검색어를 입력해주세요.');
		} else {
			$brandTable.bootstrapTable('refresh');
		}
	});

	$('#brandRegist').validate({
		submitHandler : function(form, e) {
			e.preventDefault();
			e.stopPropagation();

			cmmFormRegist($(form), '/api/contentsGroup/brand/create',function(data) {
				bsAlert('등록되었습니다.');
				$brandTable.bootstrapTable('refresh');
			});
		}
	});
}

function viewBrandTable() {
	var fileName = '브랜드 리스트';
	var opt = {
		selector: '#brandTable',
		url: '/commons/brand/list',
		search: '#brandSearch',
		idField : 'companySeq',
		pageSize: 10,
		pageList: [10],
	};
	return fnBootstrapTable(opt);
}

function rowNumBrandFormatter(value, data) {
	var rows = $brandTable.bootstrapTable('getData');
	var total = $brandTable.bootstrapTable('getOptions').totalRows;
	var pageNum = $brandTable.bootstrapTable('getOptions').pageNumber;
	var pageSize = $brandTable.bootstrapTable('getOptions').pageSize;
	var num = 0;
	rows.forEach(function(item, i) {
		if(data == item) {
			num = total - (i + (pageNum - 1) * pageSize);
		}
	});

	return num;
}

function brandStateFormatter(value, row, index) {
	if(selectedSeq.indexOf(row.companySeq) > -1) {
		return {disabled:true}
	}
	else if(row.partnerSeq != null) {
		return {disabled:true}
	}
	return value;
}

function callbackSelectBrandBtn() {
	$($brandTable.bootstrapTable('getSelections')).each(function() {
		if (selectedSeq.indexOf(this.companySeq) == -1) {
			selectedSeq.push(this.companySeq);
			selectedData.push(this.companySeq);
			addBrand(this.companySeq, this.name);
		}
	});
	var len = $brandTable.bootstrapTable('getSelections').length;
	$('[name=comapnySeqLength]').val(len > 0 ? len : '');
	$('.close').trigger('click');
}

function addBrand(companySeq, name) {
	var id = 'brand_' + companySeq;
	removeBrand(id);
	var html = $('.brand-box').html();
	html += '<span id="' + id + '">';
	html += '	<span class="btn btn-info btn-sm mt-1 ml-1">' + name;
	html += '		<a href="javascript:removeBrand(\'' + id + '\');" class="text-white">&times;</a>';
	html += '	</span>';
	html += '	<input type="hidden" name="companySeq" value="' + companySeq + '"/>';
	html += '</span>';
	$('.brand-box').html(html);
}

function removeBrand(id) {
	$('#' + id).remove();
	var len = $('[name=companySeq]').length;
	$('[name=comapnySeqLength]').val(len > 0 ? len : '');
}
