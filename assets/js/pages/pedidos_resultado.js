$(document).ready(function() {
       
    // Datatables

    var table = $('#example').DataTable({
        "bPaginate": false,
        "ajax": 'assets/ajax.txt',
        "columns": [
            {   "orderable":      false,
                "defaultContent": ""
            },
            {
                "class":          "details-control",
                "orderable":      false,
                "data":           null,
                "defaultContent": ""
            },
            { "data": "Pedido" },
            { "data": "Fornecedor" },
            { "data": "Status" },
            { "data": "Dt_remessa" },
            { "data": "Dt_retirada" },
            { "data": "Itens" }                        
        ],
        columnDefs: [
            {
                targets:0,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<input type="checkbox" class="checkbox1">';
                    }

                    return data;
                }
            },
            {
                targets:7,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        if (data.length == null) {
                            data = '1';
                        }
                        else{
                            data = data.length;
                        }
                    }

                    return data;
                }
            }            
        ],
        "order": [[2, 'asc']]        
    });

    var detailRows = [];
    // Add event listener for opening and closing details
    $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('details');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('details');
        }
    } ).on('change','input:checkbox', function () {
        alert('ok');
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        var xx = row.data();
        if (true) {}
    } );


});

function format ( d ) {
    var table = '<table cellpadding="5" cellspacing="0" border="0" style="width: 100%;padding-left:100px;">'+
                 '<thead><tr><th>#</th><th>Item</th><th>Material-lote</th><th>Material MAV</th><th>Quantidade Pedido</th><th>Unidade</th><th>Quantidade Fornecedor</th><th>Status</th></tr></thead>';
    if (d.Itens.length == null) {
        table = table + '<tr><td><input type="checkbox"></td><td>'+d.Itens.Item+'</td><td>'+d.Itens.Material_Lote+'</td><td>'+d.Itens.Material_Mav+'</td><td>'+d.Itens.Quantidade+'</td><td>'+d.Itens.Unidade+'</td><td>'+d.Itens.Quantidade_Fornecedor+'</td><td>'+d.Itens.Status_Item+'</td></tr>';
    }
    else{
        for (var i = 0; i < d.Itens.length; i++) {
            table = table + '<tr><td><input type="checkbox"></td><td>'+d.Itens[i].Item+'</td><td>'+d.Itens[i].Material_Lote+'</td><td>'+d.Itens[i].Material_Mav+'</td><td>'+d.Itens[i].Quantidade+'</td><td>'+d.Itens[i].Unidade+'</td><td>'+d.Itens[i].Quantidade_Fornecedor+'</td><td>'+d.Itens[i].Status_Item+'</td></tr>';
        }

    }
    table = table + '</table>';
    return table;
}