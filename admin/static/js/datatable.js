var searchParams;

function rowStyle(row, index) {
	if (row.gender == 'Z') {
		return {
			classes: 'total-row'
		}
	}
	return {};
}

function selectBtnStyle() {
	return {
		classes: 'p-0'
	}
}

function birthdayFormatter(value, row) {
	if(value) {
		var year = new Date().getFullYear();
		var age = year - Number(value);
		return Math.floor(age / 10) + '0대';
	}
	else {
		return '-';
	}
}

function ageRangeFormatter(value, row) {
	if(value) {
		return value + '대';
	}
	else {
		return '-';
	}
}

function ifNullFormatter(value, row) {
	return value == null ? '-' : value;
}

function dateFormatter(value, data) {
	if(value == null || value == '' || value == undefined) {
		return '-';
	}
	return $.format.date(new Date(value), 'yyyy-MM-dd');
}

function dateFormatter2(value, data){
	if(value == null || value == '' || value == undefined) {
		return '-';
	}
	return $.format.date(new Date(value), 'yy-MM-dd');
}

function isViewFormatter(value, data) {
	if(!(typeof value == 'boolean')) {
		value = Boolean(Number(value));
	}
	return value ? '노출' : '미노출';
}

function isUseFormatter(value, data) {
	if(!(typeof value == 'boolean')) {
		value = Boolean(Number(value));
	}
	return value ? '사용' : '미사용';
}

function creatorFormatter(value, data) {
	if(data.createName == null || data.createName == '' || data.createName == undefined
			|| data.createId == null || data.createId == '' || data.createId == undefined) {
		return '-';
	}
	return data.createName + '(' + data.createId + ')';
}

function creatorFormatter2(value, data) {
	if(data.createName == null || data.createName == '' || data.createName == undefined
			|| data.createId == null || data.createId == '' || data.createId == undefined) {
		return '-';
	}
	return data.createName;
}

function rowNumFormatter(value, data) {

	return _rowNumFormatter($table, value, data);
}

function _rowNumFormatter($t, value, data) {
	var rows = $t.bootstrapTable('getData');
	var total = $t.bootstrapTable('getOptions').totalRows;
	var pageNum = $t.bootstrapTable('getOptions').pageNumber;
	var pageSize = $t.bootstrapTable('getOptions').pageSize;
	var num = 0;
	rows.forEach(function(item, i) {
		if(data == item) {
			num = total - (i + (pageNum - 1) * pageSize);
		}
	});

	return num;
}

function emptyFormatter() {
	return '-';
}

function addCommaFormatter(value){
	if(value == null || value == '' || value == undefined) {
		return '-';
	}

	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}

function fnBootstrapTable(opt) {
	var _table = $(opt.selector);
	// var toolbar = opt.toolbar ? opt.toolbar : '#toolbar';
	var search = opt.search ? opt.search : '#search';
	var option = {
		smartDisplay: false,
		escape: true,
		cardView: isMobile.any,
		idField: opt.idField,
		selectItemName: 'seqs',

		// 툴바 옵션
		// toolbar: toolbar,
		// toolbarAlign: 'right',
		// showRefresh: nvl(opt.refresh, true),
		// showFullscreen: nvl(opt.fullscreen, true),
		// showColumns: nvl(opt.columns, true),

		// 정렬 옵션
		silentSort: false,
		sortable: opt.sortable ? opt.sortable : false,
		sortName: opt.sortName ? opt.sortName : null,
		sortOrder: opt.sortOrder ? opt.sortOrder : null,

		// 페이지네이션 옵션
		pagination: opt.pagination != undefined ? opt.pagination : true,
		paginationLoop: false,
		sidePagination: opt.sidePagination == 'cilent' ? '' : 'server',
		paginationVAlign: 'both',
		paginationHAlign: 'left',
		paginationDetailHAlign: 'none',
		paginationPreText: '<i class="fas fa-angle-left"></i>',
		paginationDoublePreText: '<i class="fas fa-angle-double-left"></i>',
		paginationNextText: '<i class="fas fa-angle-right"></i>',
		paginationDoubleNextText: '<i class="fas fa-angle-double-right"></i>',
		paginationSuccessivelySize: 10,
		pageNumber: opt.pageNumber ? opt.pageNumber : 1,
		pageSize: opt.pageSize ? opt.pageSize : 20,
		pageList: opt.pageList ? opt.pageList : [10, 20, 50, 100],

		// 기타 서식 옵션
		formatShowingRows: opt.formatShowingRows ? opt.formatShowingRows : undefined,

		queryParams: function(params) {
			$(search).find('[name]').not(':disabled, [type=checkbox]').each(function() {
				var key = $(this).attr('name');
				var value = $(this).val();
				if(key in params) {
					// 중복 파라미터 배열 처리
					if(typeof (params[key]) == 'string') {
						var tmpValue = params[key];
						params[key] = [];
						params[key].push(tmpValue);
					}
					params[key].push(value);
				}
				else {
					params[key] = value;
				}
			});
			$(search).find('[name]:checked').each(function() {
				params[$(this).attr('name')] = $(this).val()
			});

			searchParams = params;
			return params;
		},
		ajax: function(params) {
			$.ajaxSettings.traditional = true; // 파라미터에 배열 포함 시 에러발생하여 추가
			$.ajax({
				url: opt.url ? opt.url : '/common/json',
				method: opt.method ? opt.method : "GET",
				data: params.data,
				dataType: 'json',
				success: function(data) {
					params.success({
						total: 0,
						rows: []
					});
					
					if(data.header.responseCode == '200') {
						params.success({
							total: data.body.pagination.total,
							rows: data.body.rows
						});
					}
					else {
						console.error(data.header.responseCode, data.header.responseMsg);
					}
				},
				error: function(jqXHR) {
					if(typeof jqXHR.responseJSON == 'object') {
						bsAlert('조회 실패<br/>(' + jqXHR.responseJSON.header.responseMsg + ')');
					}
					else if(jqXHR.status == 401) {
						bsLogout();
					}
					else {
						bsAlert('조회 실패');
					}
				},

			});
		},

	};

	$(toolbar).show();
	return _table.bootstrapTable(option);
}


//통계 테이블 전용
function fnBootstrapTableStatistics(opt) {
	var _table = $(opt.selector);
	var option = {
		smartDisplay: false,
		escape: true,
		cardView: isMobile.any,
		data: opt.data,
		showExport : (opt.showExport == undefined || opt.showExport === null || opt.showExport === true) ? true : false,
		exportDataType : 'all',
		exportTypes : [ 'excel', 'csv', 'json', 'xml', 'txt' ],
		exportOptions : {
			escape : true,
			htmlContent : true,
			fileName : (opt.exporName ? opt.exporName : 'tableExport').replace(/ /gi, '_') + '_' + $.format.date(new Date(), 'yyyyMMdd')
		}
	};
	$(toolbar).show();
	return _table.bootstrapTable(option);
}

//통계 테이블 전용
function fnBootstrapTableEmpty(selector) {
	return fnBootstrapTable({
		selector: selector,
		url: '/common/json',
		sidePagination: 'cilent',
		idField: 'productSeq',
		pagination: true,
		pageSize: 10,
		pageList: [10, 50, 100, 200, 500]
	});
}

// pagination false
function fnBootstrapTableEmpty2(selector) {
	return fnBootstrapTable({
		selector: selector,
		url: '/common/json',
		sidePagination: 'cilent',
		idField: 'prodSeq',
		pagination: false,
		pageSize: 10,
		pageList: [10, 50, 100, 200, 500]
	});

}
