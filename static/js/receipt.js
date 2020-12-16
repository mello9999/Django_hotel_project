function reset_form() {
    $('#receipt_no').val('')
    $('#receipt_date').val('')
    $('#guest_account_id').val('')
    $('#guest_name').val('')
    $('#payment_method').val('')
    $('#payment_reference').val('')
    $('#total_received').val('')
    $('#remarks').val('')
}
$(document).ready(
    $('#save').click(
        function () {
            console.log('/receipt/update/' + $('#receipt_no').val())
            let formdata = {
            'account_id':$('#guest_account_id').val(),
            'payment_method':$('#payment_method').val(),
            'total_received':$('#total_received').val(),
            'date' : $('#receipt_date').val(),
            'payment_reference': $('#payment_reference').val(),
            
            'remarks':   $('#remarks').val()
            }
            $.ajax({
                url: '/receipt/update/' + $('#receipt_no').val()+'/',
                type: 'get',
                dataType: 'json',
                data:formdata,
                success: function (data) {

                
                alert("Save Success")


                },
                error: function (xhr, status, error) {
                    alert("Save Success")
                }




            }

            )
        }
    ))
    $('#new').click(function () {
        reset_form()
    }),
    $('#delete').click(function () {
        reset_form()
    }),
    $('#inputState').change(function () {
        let i = $(this).val()
        $('#receipt_no').val($(this).val())
        $.ajax({
            url: '/receipt/list',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                console.log(data)
                $('#guest_account_id').val(data.receipts[i].account_id_id)
                $('#receipt_date').val(data.receipts[i].date)
                $('#payment_method').val(data.receipts[i].payment_method)
                $('#total_received').val(data.receipts[i].total_received)
                
                $('#payment_reference').val(data.receipts[i].payment_reference)
                $('#remarks').val(data.receipts[i].remarks)

                const a = data.receipts[i].account_id_id
                $.ajax({
                    url: '/user/list',
                    type: 'get',
                    dataType: 'json',
                    success: function (data) {
                        console.log(data.user)
                        $('#guest_name').val(data.user[a].username)





                    },
                    error: function (xhr, status, error) {
                        console.log(error)
                    }

                })
            },
            error: function (xhr, status, error) {
                console.log(error)
                    ;

            }
        }
        )
    })