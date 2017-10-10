var detailRows = [];
var table;
var table_meteriais;
$(document).ready(function() {
    //$(".formulario").hide();
    //$(".tabela").show();
    // Datatables
    var data = [{ id: 0, text: '22/09/2017' }, { id: 1, text: '23/09/2017' }, { id: 2, text: '24/09/2017' }, { id: 3, text: '25/09/2017' }, { id: 4, text: '28/09/2017' }];
 
    $(".select-data-remessa").select2({
        data: data
    });    

    table_meteriais = $('#materiais').DataTable({
        "bPaginate": false,
        "paging":   false,
        "ordering": false,
        "info":     false,
        "searching":   false,
        "columnDefs": [
         { width: 250, targets: 0 },
            {
                "render": function ( data, type, row ) {
                    return "<input type='text' size='8'>";
                },
                "targets": 4
            }
        ]   
    });

    table = $('#example').DataTable({
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
            { "data": "Itens" }                        
        ],
        columnDefs: [
            {
                targets:0,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<input class="checkbox_pedido" type="checkbox" id="' + row.Pedido + '" name="id[]" value="' + row.Pedido + '" '+row.Pedido_Checked+'>';
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

    $('#select_all').change(function(){
        var status = '';
        if (this.checked) {
            status = 'checked';
            $("input[type='checkbox']").prop('checked', true);
        }
        else{
            status = '';   
            $("input[type='checkbox']").prop('checked', false);
        }        
        table.$('tr').each(function(){
            var row = table.row( this );
            var d = row.data();
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
        });
    });


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

    $(document).on('click', '.btn-submit', function(e){
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
                        materiais.push({ 'Material': d.Itens.Material_Mav, 'Quantidade': parseInt(d.Itens.Quantidade), 'Unidade': d.Itens.Unidade, 'Fornecedor': d.Itens.Quantidade_Fornecedor });
                    }
                    else{
                        var flg_material = true;
                        for (i = 0; i < materiais.length; i++) {
                            if (materiais[i].Material == d.Itens.Material_Mav) {
                                materiais[i].Quantidade = materiais[i].Quantidade + parseInt(d.Itens.Quantidade);
                                flg_material = false;
                            } 
                        }   
                        if (flg_material) {
                            materiais.push({ 'Material': d.Itens.Material_Mav, 'Quantidade': parseInt(d.Itens.Quantidade), 'Unidade': d.Itens.Unidade, 'Fornecedor': d.Itens.Quantidade_Fornecedor });
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
                            materiais.push({ 'Material': d.Itens[i].Material_Mav, 'Quantidade': parseInt(d.Itens[i].Quantidade), 'Unidade': d.Itens[i].Unidade, 'Fornecedor': d.Itens[i].Quantidade_Fornecedor });
                        }
                        else{
                            var flg_material = true;
                            for (j = 0; j < materiais.length; j++) {
                                if (materiais[j].Material == d.Itens[i].Material_Mav) {
                                    materiais[j].Quantidade = materiais[j].Quantidade + parseInt(d.Itens[i].Quantidade);
                                    flg_material = false;
                                }                                                                      
                            }  
                            if (flg_material) {
                                materiais.push({ 'Material': d.Itens[i].Material_Mav, 'Quantidade': parseInt(d.Itens[i].Quantidade), 'Unidade': d.Itens[i].Unidade, 'Fornecedor': d.Itens[i].Quantidade_Fornecedor });
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
        if (pedidos=='') {
            $("#form1 div.error").show();
            return false;
        }
        for (i = 0; i < materiais.length; i++) {
            table_meteriais.row.add( [
                    materiais[i].Material,
                    materiais[i].Quantidade,
                    materiais[i].Fornecedor,
                    materiais[i].Unidade,
                    ''
                ] ).draw( false ); 
        }

        //$(".formulario").attr('style', 'display: block !important');
        $(".formulario").show();
        $(".agendamento").show();        
        $(".agendamento_edit").hide();        
        $(".tabela").hide();
        $('#titulo_pedido').text("Confirmação - Pedidos: "+pedidos);        

        buildCalendar();
        /*$(form).append(
           $('<input>').attr('type', 'hidden')
              .attr('name', 'pedido')
              .val(pedidos)
        );        
        //form.submit(); */           
    }); 
});

function format ( d ) {
    var table_return = '<table cellpadding="5" cellspacing="0" border="0" style="width: 100%;padding-left:100px;">'+
                 '<thead><tr><th style="width:15px">#</th><th style="width:20px">Item</th><th style="width:130px">Material-lote</th><th style="width:130px">Material MAV</th><th style="width:35px">Qtd. Pedido</th><th style="width:35px">Unidade</th><th style="width:35px">Status</th><th style="width:35px">Coleta</th><th style="width:40px">Nr. Agendamento</th><th style="width:40px">Solicitante</th></tr></thead>';
    if (d.Itens.length == null) {
        table_return = table_return + '<tr><td><input type="checkbox" id="'+d.Pedido+'_'+d.Itens.Item+'" '+d.Itens.Item_Checked+' value="'+d.Pedido+'_'+d.Itens.Item+'"></td><td>'+d.Itens.Item+'</td><td>'+d.Itens.Material_Lote+'</td><td>'+d.Itens.Material_Mav+'</td><td>'+d.Itens.Quantidade+'</td><td>'+d.Itens.Unidade+'</td><td>'+d.Itens.Status_Item+'</td><td>'+d.Dt_retirada+'</td><td>'+d.Itens.Status_Item+'</td><td><a href="javascript:editPedido('+d.Itens.Agendamento.split("/")[0]+');" title="Editar/Cancelar">'+d.Itens.Agendamento+'</a></td><td>'+d.Itens.Solicitante+'</td></tr>';
    }
    else{
        for (var i = 0; i < d.Itens.length; i++) {
            table_return = table_return + '<tr><td><input type="checkbox" id="'+d.Pedido+'_'+d.Itens[i].Item+'" '+d.Itens[i].Item_Checked+' value="'+d.Pedido+'_'+d.Itens[i].Item+'"></td><td>'+d.Itens[i].Item+'</td><td>'+d.Itens[i].Material_Lote+'</td><td>'+d.Itens[i].Material_Mav+'</td><td>'+d.Itens[i].Quantidade+'</td><td>'+d.Itens[i].Unidade+'</td><td>'+d.Itens[i].Status_Item+'</td><td>'+d.Dt_retirada+'</td><td><a href="javascript:editPedido('+d.Itens[i].Agendamento.split("/")[0]+');" title="Editar/Cancelar">'+d.Itens[i].Agendamento+'</a></td><td>'+d.Itens[i].Solicitante+'</td></tr>';
        }

    }
    table_return = table_return + '</table>';
    return table_return;
}

function editPedido(pedido){
   /* 1 - Ocultar coluna sobra;
   " 2 - Trazer a data;
   " 3 - ... */
    var item = '';
    var materiais = [];
    var flg = true;    
    table.$('tr').each(function(){
        var row = table.row( this );
        var d = row.data();
        if (d.Itens.length == null) {
            if (flg) {
                flg = false;
                materiais.push({ 'Material': d.Itens.Material_Mav, 'Quantidade': parseInt(d.Itens.Quantidade), 'Unidade': d.Itens.Unidade, 'Fornecedor': d.Itens.Quantidade_Fornecedor });    
            }
            else{
                var flg_material = true;
                for (i = 0; i < materiais.length; i++) {
                    if (materiais[i].Material == d.Itens.Material_Mav) {
                        materiais[i].Quantidade = materiais[i].Quantidade + parseInt(d.Itens.Quantidade);
                        flg_material = false;
                    } 
                }   
                if (flg_material) {
                    materiais.push({ 'Material': d.Itens.Material_Mav, 'Quantidade': parseInt(d.Itens.Quantidade), 'Unidade': d.Itens.Unidade, 'Fornecedor': d.Itens.Quantidade_Fornecedor });                                                              
                }
            }                                  
        }
        else{
            for (var i = 0; i < d.Itens.length; i++) {        
                item = item + d.Pedido +'_'+d.Itens[i].Item;   
                if (flg) {
                    flg = false;
                    materiais.push({ 'Material': d.Itens[i].Material_Mav, 'Quantidade': parseInt(d.Itens[i].Quantidade), 'Unidade': d.Itens[i].Unidade, 'Fornecedor': d.Itens[i].Quantidade_Fornecedor });   
                }
                else{
                    var flg_material = true;
                    for (j = 0; j < materiais.length; j++) {
                        if (materiais[j].Material == d.Itens[i].Material_Mav) {
                            materiais[j].Quantidade = materiais[j].Quantidade + parseInt(d.Itens[i].Quantidade);
                            flg_material = false;
                        }                                                                      
                    }  
                    if (flg_material) {
                        materiais.push({ 'Material': d.Itens[i].Material_Mav, 'Quantidade': parseInt(d.Itens[i].Quantidade), 'Unidade': d.Itens[i].Unidade, 'Fornecedor': d.Itens[i].Quantidade_Fornecedor });                               
                    }                           
                }
            }
        }
    });
    for (i = 0; i < materiais.length; i++) {
        table_meteriais.row.add( [
                materiais[i].Material,
                materiais[i].Quantidade,
                materiais[i].Fornecedor,
                materiais[i].Unidade,
                ''
            ] ).draw( false ); 
    }

    var column = table_meteriais.column(4);
    column.visible(false);


    $(".formulario").show();
    $(".agendamento_edit").show();
    $(".agendamento").hide();
    $(".tabela").hide();
    $('#titulo_agendamento').text("Agendamento: "+pedido);    
    $(".btn-excluir").show();
    buildCalendar();
}

function buildCalendar(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();    
    $('#calendar').fullCalendar({       
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            lang: 'pt',
            businessHours: true,
            dayClick: function(date1, jsEvent, view) {
                if(date1.day() == 0 || date1.day()==6){
                    alert('Esse dia não está disponivel');
                    return false;
                }
                var newEvent = new Object();
                newEvent.id= '999';
                newEvent.start= date1;
                newEvent.color= '#378006';
                newEvent.textColor= 'black';
                newEvent.allDay = true;
                newEvent.rendering = 'background';
                $('#calendar').fullCalendar('removeEvents','999');
                $('#calendar').fullCalendar('renderEvent', newEvent, true); 
                $('#agendamento_id').val(date1.date()+"/"+(date1.month()+1)+"/"+date1.year());
            },    
            events: [
                {
                    start: new Date(year, month, day+1),
                    color: 'yellow',
                    textColor: 'black',
                    allDay: true
                },
                {
                    start: new Date(year, month, day+3),
                    color: 'yellow',
                    textColor: 'black',
                    allDay: true
                },      
                {
                    start: new Date(year, month, day+7),
                    color: 'yellow',
                    textColor: 'black',
                    allDay: true
                },                      
                {
                    start: new Date(year, month, day+8),
                    color: 'blue',
                    textColor: 'black',
                    allDay: true
                }
            ],
            eventColor: '#378006'
        });
}