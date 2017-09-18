$(document).ready(function() {
    var pedidos = getParameterByName('pedido');
    $('#titulo_pedido').text("Confirmação - Pedidos: "+pedidos);


    var available_Dates = ["18/09/2017","22/09/2017"];
    $('.date-picker').datepicker({
        language: "pt-BR",
        autoclose: true,
        disabledDates: [
            new Date(2017, 09, 21),
            new Date(2017, 09, 22)
        ]        
    });    

    var data = [{ id: 0, text: '22/09/2017' }, { id: 1, text: '23/09/2017' }, { id: 2, text: '24/09/2017' }, { id: 3, text: '25/09/2017' }, { id: 4, text: '28/09/2017' }];
 
    $(".select-data-remessa").select2({
        data: data
    });    

});

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
