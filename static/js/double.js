
$(document).ready( function() {
    
    $.ajax({
        url:  '/roomtype/detail/' + 'double',
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
        let date1 = $('#data_6').val();
        date1 = new Date(String(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(date1.slice(4,7)) + 1) +'/'+date1.slice(8,10) +'/'+ date1.slice(11,15))
        let date2 = $('#data_7').val();
        date2 = new Date(String(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(date2.slice(4,7)) + 1) +'/'+date2.slice(8,10) +'/'+ date2.slice(11,15))
        let diff = date2.getTime() - date1.getTime();  
        let daydiff = diff / (1000 * 60 * 60 * 24);   
        $.ajax({
            url:  '/roomtype/detail/' + 'double',
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
        let date1 = $('#data_6').val();
        date1 = new Date(String(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(date1.slice(4,7)) + 1) +'/'+date1.slice(8,10) +'/'+ date1.slice(11,15))
        let date2 = $('#data_7').val();
        date2 = new Date(String(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(date2.slice(4,7)) + 1) +'/'+date2.slice(8,10) +'/'+ date2.slice(11,15))
        let diff = date2.getTime() - date1.getTime();  
        let daydiff = diff / (1000 * 60 * 60 * 24);   
        console.log(daydiff)
        $.ajax({
            url:  '/roomtype/detail/' + 'double',
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
