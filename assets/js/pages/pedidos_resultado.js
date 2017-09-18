var detailRows = [];
$(document).ready(function() {
    $(".formulario").hide();
    $(".tabela").show();
    // Datatables
    var data = [{ id: 0, text: '22/09/2017' }, { id: 1, text: '23/09/2017' }, { id: 2, text: '24/09/2017' }, { id: 3, text: '25/09/2017' }, { id: 4, text: '28/09/2017' }];
 
    $(".select-data-remessa").select2({
        data: data
    });    

    var table_meteriais = $('#materiais').DataTable({
        "bPaginate": false,
        "paging":   false,
        "ordering": false,
        "info":     false,
        "searching":   false,
        "columnDefs": [
            {
                "render": function ( data, type, row ) {
                    return "<input type='text' size='8'>";
                },
                "targets": 3
            }
        ]   
    });


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
                        data = '<input type="checkbox" id="' + row.Pedido + '" name="id[]" value="' + row.Pedido + '" '+row.Pedido_Checked+'>';
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
        var status = '';
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        var d = row.data();
        var id = this.id;
        if (this.checked) {
            status = 'checked';
        }
        else{
            status = '';   
        }
        if (d === undefined) {
            table.$('tr').each(function(){
                var row_1 = table.row( this );
                var d_1 = row_1.data();
                if (d_1.Itens.length == null) {
                    var item = d_1.Pedido+'_'+d_1.Itens.Item;
                    if (item == id) {
                        d_1.Itens.Item_Checked = status;
                    }                                    
                }
                else{
                    for (var i = 0; i < d_1.Itens.length; i++) {
                        var item = d_1.Pedido+'_'+d_1.Itens[i].Item;
                        if (item == id) {
                            d_1.Itens[i].Item_Checked = status;
                        }
                    }
                }
            });
        }
        else{
            d.Pedido_Checked = status;
            if (d.Itens.length == null) {
                d.Itens.Item_Checked = status;
            }
            else{
                for (var i = 0; i < d.Itens.length; i++) {
                   d.Itens[i].Item_Checked = status;
                }
            }
            if ( row.child.isShown() ) {
                row.child( format(row.data()) ).show();
            }        
        }
    });

    $(document).on('click', '.btn-submit', function(e)
    {
        var form = $(this).parents('form:first');
        var pedidos = '';
        var item = '';
        var materiais = [];
        var flg = true;
        table.$('tr').each(function(){
            var row = table.row( this );
            var d = row.data();
            if (d.Itens.length == null) {
                if (d.Itens.Item_Checked == 'checked') {
                    item = item + d.Pedido +'_'+d.Itens.Item;    
                    d.Pedido_Checked = 'checked';
                    if (flg) {
                        flg = false;
                        materiais.push({ 'Material': d.Itens.Material_Mav, 'Quantidade': d.Itens.Quantidade, 'Unidade': d.Itens.Unidade });    
                    }
                    else{
                        for (i = 0; i < materiais.length; i++) {
                            if (materiais[i].Material == d.Itens.Material_Mav) {
                                materiais[i].Quantidade = materiais[i].Quantidade + d.Itens.Quantidade;
                            }
                            else{
                                materiais.push({ 'Material': d.Itens.Material_Mav, 'Quantidade': d.Itens.Quantidade, 'Unidade': d.Itens.Unidade });                               
                            }    
                        }   
                    }                             
                }            
            }
            else{
                for (var i = 0; i < d.Itens.length; i++) {
                    if(d.Itens[i].Item_Checked == 'checked'){
                        item = item + d.Pedido +'_'+d.Itens[i].Item;   
                        d.Pedido_Checked = 'checked';
                        if (flg) {
                            flg = false;
                            materiais.push({ 'Material': d.Itens[i].Material_Mav, 'Quantidade': d.Itens[i].Quantidade, 'Unidade': d.Itens[i].Unidade });   
                        }
                        else{
                            for (j = 0; j < materiais.length; j++) {
                                if (materiais[j].Material == d.Itens[i].Material_Mav) {
                                    materiais[j].Quantidade = materiais[j].Quantidade + d.Itens[j].Quantidade;
                                }
                                else{
                                    materiais.push({ 'Material': d.Itens[i].Material_Mav, 'Quantidade': d.Itens[i].Quantidade, 'Unidade': d.Itens[i].Unidade });                               
                                }    
                            }                             
                        }
                    }
                }
            }
            if (d.Pedido_Checked == 'checked') {
                if (pedidos!='') {
                    pedidos = pedidos + ',';
                }
                pedidos = pedidos + d.Pedido;
            }            
        });
        alert(materiais.length);
        for (i = 0; i < materiais.length; i++) {
            table_meteriais.row.add( [
                    materiais[i].Material,
                    materiais[i].Quantidade,
                    materiais[i].Unidade,
                    ''
                ] ).draw( false ); 
        }
        //$(".formulario").attr('style', 'display: block !important');
        $(".formulario").show();
        $(".tabela").hide();
        $('#titulo_pedido').text("Confirmação - Pedidos: "+pedidos);        
        /*$(form).append(
           $('<input>').attr('type', 'hidden')
              .attr('name', 'pedido')
              .val(pedidos)
        );        
        //form.submit(); */
    });

});

function format ( d ) {
    var table = '<table cellpadding="5" cellspacing="0" border="0" style="width: 100%;padding-left:100px;">'+
                 '<thead><tr><th>#</th><th>Item</th><th>Material-lote</th><th>Material MAV</th><th>Quantidade Pedido</th><th>Unidade</th><th>Quantidade Fornecedor</th><th>Status</th></tr></thead>';
    if (d.Itens.length == null) {
        table = table + '<tr><td><input type="checkbox" id="'+d.Pedido+'_'+d.Itens.Item+'" '+d.Itens.Item_Checked+' value="'+d.Pedido+'_'+d.Itens.Item+'"></td><td>'+d.Itens.Item+'</td><td>'+d.Itens.Material_Lote+'</td><td>'+d.Itens.Material_Mav+'</td><td>'+d.Itens.Quantidade+'</td><td>'+d.Itens.Unidade+'</td><td>'+d.Itens.Quantidade_Fornecedor+'</td><td>'+d.Itens.Status_Item+'</td></tr>';
    }
    else{
        for (var i = 0; i < d.Itens.length; i++) {
            table = table + '<tr><td><input type="checkbox" id="'+d.Pedido+'_'+d.Itens[i].Item+'" '+d.Itens[i].Item_Checked+' value="'+d.Pedido+'_'+d.Itens[i].Item+'"></td><td>'+d.Itens[i].Item+'</td><td>'+d.Itens[i].Material_Lote+'</td><td>'+d.Itens[i].Material_Mav+'</td><td>'+d.Itens[i].Quantidade+'</td><td>'+d.Itens[i].Unidade+'</td><td>'+d.Itens[i].Quantidade_Fornecedor+'</td><td>'+d.Itens[i].Status_Item+'</td></tr>';
        }

    }
    table = table + '</table>';
    return table;
}