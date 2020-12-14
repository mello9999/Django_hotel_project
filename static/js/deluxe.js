
$(document).ready( function() {
    
    $.ajax({
        url:  '/roomtype/detail/' + 'deluxe',
        type:  'get',
        dataType:  'json',
        success: function  (data) {
            
        $('#txt_realexprice').val(String(parseInt(data.roomtype.exprice)))
        $('#txt_totalprice').val($('#txt_totalprice').val() )
        $('#txt_exprice').val($('#txt_exprice').val() )
        $('#txt_roomprice').val($('#txt_roomprice').val() )
            
        },
        error: function (xhr, status, error) {
            $('#txt_realexprice').val('#ERROR');
        }
    });

    $('#exprice').change(function () { 
        let date1 = new Date($('#data_6').val());
        
        let date2 = new Date($('#data_7').val());
       
        let diff = date2.getTime() - date1.getTime();  
        let daydiff = diff / (1000 * 60 * 60 * 24);   
        $.ajax({
            url:  '/roomtype/detail/' + 'deluxe',
            type:  'get',
            dataType:  'json',
            success: function  (data) {
            let no = $('#txt_no_room').val();
            
            if ($('#exprice').is(':checked')){
                
            $('#txt_totalprice').val(String(parseInt(data.roomtype.price) * parseInt(no) * daydiff + parseInt(data.roomtype.exprice) * parseInt(no) ) )
            $('#txt_exprice').val(String(parseInt(data.roomtype.exprice)) * parseInt(no))

            } else {
                
                $('#txt_exprice').val('0')
                
                $('#txt_totalprice').val(String(parseInt(data.roomtype.price) * parseInt(no) * daydiff) )
            }    
                
            },
            error: function (xhr, status, error) {
                $('#txt_exprice').val('');
            }
    }
    )})
    $('#txt_no_room').change(function () {
        let date1 = new Date($('#data_6').val());
        
        let date2 = new Date($('#data_7').val());
       
        let diff = date2.getTime() - date1.getTime();  
        let daydiff = diff / (1000 * 60 * 60 * 24);   
        
        $.ajax({
            url:  '/roomtype/detail/' + 'deluxe',
            type:  'get',
            dataType:  'json',
            success: function  (data) {
                let no = $('#txt_no_room').val();
                if ($('#exprice').is(':checked')) {
                    
                    $('#txt_totalprice').val(String(parseInt(data.roomtype.price) * parseInt(no) * daydiff + parseInt(data.roomtype.exprice) * parseInt(no))  )
                    $('#txt_exprice').val(String(parseInt(data.roomtype.exprice)) * parseInt(no))
                } else {
                    $('#txt_totalprice').val(String(parseInt(data.roomtype.price) * parseInt(no) * daydiff)  )
                }
                $('#txt_roomprice').val(String(parseInt(data.roomtype.price) * parseInt(no)) );
                
            },
            error: function (xhr, status, error) {
                $('#txt_roomprice').val('');
                $('#txt_exprice').val('');
                $('#txt_totalprice').val('');
            }
        });
})})
