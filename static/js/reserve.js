$(document).ready( function() {
    $.ajax({
        url:  '/roomtype/detail/' + $('#inputState option:selected').text().split(" ")[0].toLowerCase(),
        type:  'get',
        dataType:  'json',
        success: function  (data) {
            
        $('#txt_realexprice').val(String(parseInt(data.roomtype.exprice)))
        $('#txt_totalprice').val($('#txt_totalprice').val() )
            
        },
        error: function (xhr, status, error) {
            $('#txt_realexprice').val('#ERROR');
        }
    });

    $('#data_10').change( function(){
        let date1 = new Date($('#data_6').val());
        
        let date2 = new Date($('#data_7').val());
       
        let diff = date2.getTime() - date1.getTime();  
        let daydiff = diff / (1000 * 60 * 60 * 24);   
        
        $.ajax({
            url:  '/roomtype/detail/' + $('#inputState option:selected').text().split(" ")[0].toLowerCase(),
            type:  'get',
            dataType:  'json',
            success: function  (data) {
                let no = $('#data_10').val();
                if ($('#extra_bed').is(':checked')) {
                    
                    $('#txt_totalprice').val(String(parseInt(data.roomtype.price) * parseInt(no) * daydiff + parseInt(data.roomtype.exprice) * parseInt(no))  )
                } else {
                    $('#txt_totalprice').val(String(parseInt(data.roomtype.price) * parseInt(no) * daydiff)  )
                }
                
                
            },
            error: function (xhr, status, error) {
                $('#txt_totalprice').val('');
            }
        });
    
    
});
$('#inputState').change( function () {
    let date1 = new Date($('#data_6').val());

        let date2 = new Date($('#data_7').val());
        
        let diff = date2.getTime() - date1.getTime();  
        let daydiff = diff / (1000 * 60 * 60 * 24);   
        
        $.ajax({
            url:  '/roomtype/detail/' + $('#inputState option:selected').text().split(" ")[0].toLowerCase(),
            type:  'get',
            dataType:  'json',
            success: function  (data) {
                let no = $('#data_10').val();
                if ($('#extra_bed').is(':checked')) {
                    
                    $('#txt_totalprice').val(String(parseInt(data.roomtype.price) * parseInt(no) * daydiff + parseInt(data.roomtype.exprice) * parseInt(no))  )
                } else {
                    $('#txt_totalprice').val(String(parseInt(data.roomtype.price) * parseInt(no) * daydiff)  )
                }
                
                
            },
            error: function (xhr, status, error) {
                $('#txt_totalprice').val('');
            }
        });
}
    );
    $('#extra_bed').change(function () {
        let date1 = new Date($('#data_6').val());
       
        let date2 =  new Date($('#data_7').val());
        
        let diff = date2.getTime() - date1.getTime();  
        let daydiff = diff / (1000 * 60 * 60 * 24);   
        
        $.ajax({
            url:  '/roomtype/detail/' + $('#inputState option:selected').text().split(" ")[0].toLowerCase(),
            type:  'get',
            dataType:  'json',
            success: function  (data) {
                let no = $('#data_10').val();
                if ($('#extra_bed').is(':checked')) {
                    
                    $('#txt_totalprice').val(String(parseInt(data.roomtype.price) * parseInt(no) * daydiff + parseInt(data.roomtype.exprice) * parseInt(no))  )
                } else {
                    $('#txt_totalprice').val(String(parseInt(data.roomtype.price) * parseInt(no) * daydiff)  )
                }
                
                
            },
            error: function (xhr, status, error) {
                $('#txt_totalprice').val('');
            }
        });
    })

})