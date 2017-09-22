$(document).ready(function() {
    $('edit').hide();
    // Datatables
    var table = $('#table_data').DataTable({
        "paging": false,
        "ajax": 'assets/fornecedor.txt',
        columnDefs: [
                {
                    targets:0,
                    visible:false,
                    searchable:false
                },      
                {
                    targets:1,
                    render: function ( data, type, row, meta ) {
                        if(type === 'display'){
                            data = '<a href="javascript:onClickFornecedor(\''+ row[0] +'\',\''+ row[1] +'\',\''+ row[2] +'\',\''+ row[3] +'\',\''+ row[5] +'\')">' + data + '</a>';                         
                        }
                        return data;
                    }
                }
        ],
        buttons: {
            buttons: [
                'new',
                {
                    text: 'Novo',
                    className: 'btn btn-primary',
                    action: function ( dt ) {
                        console.log( 'My custom button!' );
                    }
                }
            ]
        }
    });
});
function onClickFornecedor(id, nome, email, fornecedor, perfil) {
    $('list').hide();
    $('edit').show();
    alert(perfil);
}
