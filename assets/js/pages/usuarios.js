var table;
$(document).ready(function() {
    table = $('#table_data').DataTable({
        "bPaginate": false,
        "ajax": 'assets/fornecedor.txt',
        "columns": [
            {
                "orderable":      false,
                "data":           null,
                "defaultContent": ""
            },        
            { "data": "nome" },
            { "data": "email" },
            { "data": "dt_ultimo" },
            { "data": "perfil" }                        
        ],
        columnDefs: [
			{
                targets:0,
                render: function ( data, type, row, meta ) {
                    if(row.perfil === 'Fornecedor'){
                        data = '<img src="assets/images/details_open.png" align="center" class="open_details">';
                    }

                    return data;
                }
            },               
            {
                targets:1,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a href="javascript:onClickFornecedor('+ row.nome + ');">'+ row.nome + '</a>';
                    }

                    return data;
                }
            }   
        ],
        "order": [[2, 'asc']]        
    });

    $('#table_data tbody').on('click', 'img.open_details', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        if ( row.child.isShown() ) {
            row.child.hide();
            tr.removeClass('details');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('details');
        }                
    });

	$('.edit').hide();
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();
        var controlForm  = $('.controls:first'),
            currentEntry = $('.entry:first'),
            newForm = $(controlForm.clone()).appendTo(currentEntry);
        currentEntry.find('.btn-remove')
            .removeClass('btn-remove').addClass('btn-add')
            .html('<span class="glyphicon glyphicon-plus"></span>');          
        newForm.find('input').val('');
        currentEntry.find('.controls:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .html('<span class="glyphicon glyphicon-minus"></span>');
    }).on('click', '.btn-remove', function(e)
    {
		$(this).parents('.controls:first').remove();

		e.preventDefault();
		return false;
	}).on('click', '.btn-primary', function(e){
		$('.list').hide();
		$('.edit').show();
    });

	$( ".perfil" ).change(function() {
		if ('FORNECEDOR' != this.value) {
			$('.fornecedores').hide();
		}
		else{
			$('.fornecedores').show();	
		}
	});
});

function format ( d ) {
    var table_return = '<table cellpadding="0" cellspacing="0" border="0" style="width: 100%;padding-left:0px;">'+
                 '<thead><tr><th style="width:12px">#</th><th style="width:18px">Item</th><th style="width:130px">Material-lote</th><th style="width:130px">Material MAV</th><th style="width:30px">Qtd. Pedido</th><th style="width:30px">Unidade</th><th style="width:30px">Status</th><th style="width:30px">Coleta</th><th style="width:35px">Nr. Agendamento</th><th style="width:35px">Solicitante</th></tr></thead>';
    if (d.Itens.length == null) {
        table_return = table_return + '<tr><td><input type="checkbox" id="'+d.Pedido+'_'+d.Itens.Item+'" '+d.Itens.Item_Checked+' value="'+d.Pedido+'_'+d.Itens.Item+'"></td><td>'+d.Itens.Item+'</td><td>'+d.Itens.Material_Lote+'</td><td>'+d.Itens.Material_Mav+'</td><td>'+d.Itens.Quantidade+'</td><td>'+d.Itens.Unidade+'</td><td>'+d.Itens.Status_Item+'</td><td>'+d.Dt_retirada+'</td><td><a href="javascript:editPedido('+d.Itens.Agendamento.split("/")[0]+');" title="Editar/Cancelar">'+d.Itens.Agendamento+'</a></td><td>'+d.Itens.Solicitante+'</td></tr>';
    }
    else{
        for (var i = 0; i < d.Itens.length; i++) {
            table_return = table_return + '<tr><td><input type="checkbox" id="'+d.Pedido+'_'+d.Itens[i].Item+'" '+d.Itens[i].Item_Checked+' value="'+d.Pedido+'_'+d.Itens[i].Item+'"></td><td>'+d.Itens[i].Item+'</td><td>'+d.Itens[i].Material_Lote+'</td><td>'+d.Itens[i].Material_Mav+'</td><td>'+d.Itens[i].Quantidade+'</td><td>'+d.Itens[i].Unidade+'</td><td>'+d.Itens[i].Status_Item+'</td><td>'+d.Dt_retirada+'</td><td><a href="javascript:editPedido('+d.Itens[i].Agendamento.split("/")[0]+');" title="Editar/Cancelar">'+d.Itens[i].Agendamento+'</a></td><td>'+d.Itens[i].Solicitante+'</td></tr>';
        }

    }
    table_return = table_return + '</table>';
    return table_return;
}
