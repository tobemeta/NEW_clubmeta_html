// Call the dataTables jQuery plugin
$(document).ready(function () {
    if ($('#dataTable').length)
        $('#dataTable').DataTable({
            columnDefs: [{ targets: 'no-sorting', orderable: false }]
        });
    if ($('#dataTable1').length)
        $('#dataTable1').DataTable({
            columnDefs: [{ targets: 'no-sorting', orderable: false }]
        });
});
