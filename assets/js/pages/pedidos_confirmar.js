$(document).ready(function() {
    var pedidos = getParameterByName('pedido');
    $('#titulo_pedido').text("Confirmação - Pedidos: "+pedidos);
    $('#transportadora_label').hide();
    $('#transportadora_input').hide();
    
    $("#cbx_transportadora").change(function() {
        if(this.checked) {
            $('#cbx_retirar').attr('checked', false);
            $('#transportadora_label').show();
            $('#transportadora_input').show();
        }
        else{
            $('#transportadora_label').hide();
            $('#transportadora_input').hide();
            
        }
    });
    
    $("#cbx_retirar").change(function() {
        if(this.checked) {
            $('#cbx_transportadora').attr('checked', false);
            $('#transportadora_label').hide();
            $('#transportadora_input').hide();
        }
    });


    var available_Dates = ["18/09/2017","22/09/2017"];
    $('.date-picker').datepicker({
        language: "pt-BR",
        autoclose: true,
        disabledDates: [
            new Date(2017, 09, 21),
            new Date(2017, 09, 22)
        ]        
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
