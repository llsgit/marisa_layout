$(document).ready(function() {

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

});