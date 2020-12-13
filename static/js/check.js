
var ROW_NUMBER = 5;

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

$(document).ready( function() {
function request_room_detail() {
    $.ajax({
        url:  '/roomtype/detail/' + 'single',
        type:  'get',
        dataType:  'json',
        success: function  (data) {
            $('#txt_singlestatus').val(
                () => {if(data.roomtype.available>0){
                    return 'Available'

                } else {
                    return 'Full'
                }}
            );
            $('#txt_singleavailable').val(data.roomtype.available);
            $('#txt_singleprice').html(String(data.roomtype.price) + " baht");
        },
        error: function (xhr, status, error) {
            $('#txt_singlestatus').val('');
            $('#txt_singleavailable').val('');
            $('#txt_singleprice').html("#ERROR");
        }
    });
    $.ajax({
        url:  '/roomtype/detail/' + 'double',
        type:  'get',
        dataType:  'json',
        success: function  (data) {
            $('#txt_doublestatus').val(
                () => {if(data.roomtype.available>0){
                    return 'Available'

                } else {
                    return 'Full'
                }}
            );
            $('#txt_doubleavailable').val(data.roomtype.available);
            $('#txt_doubleprice').html(String(data.roomtype.price) + " baht");
        },
        error: function (xhr, status, error) {
            $('#txt_doublestatus').val('');
            $('#txt_doubleavailable').val('');
            $('#txt_doubleprice').html("#ERROR");
        }
    });
    $.ajax({
        url:  '/roomtype/detail/' + 'suite',
        type:  'get',
        dataType:  'json',
        success: function  (data) {
            $('#txt_suitestatus').val(
                () => {if(data.roomtype.available>0){
                    return 'Available'

                } else {
                    return 'Full'
                }}
            );
            $('#txt_suiteavailable').val(data.roomtype.available);
            $('#txt_suiteprice').html(String(data.roomtype.price) + " baht");
        },
        error: function (xhr, status, error) {
            $('#txt_suitestatus').val('');
            $('#txt_suiteavailable').val('');
            $('#txt_suiteprice').html("#ERROR");
        }
    });
    $.ajax({
        url:  '/roomtype/detail/' + 'deluxe',
        type:  'get',
        dataType:  'json',
        success: function  (data) {
            $('#txt_deluxestatus').val(
                () => {if(data.roomtype.available>0){
                    return 'Available'

                } else {
                    return 'Full'
                }}
            );
            $('#txt_deluxeavailable').val(data.roomtype.available);
            $('#txt_deluxeprice').html(String(data.roomtype.price) + " baht");
        },
        error: function (xhr, status, error) {
            $('#txt_deluxestatus').val('');
            $('#txt_deluxeavailable').val('');
            $('#txt_deluxeprice').html("#ERROR");
        }
    });
    $.ajax({
        url:  '/roomtype/detail/' + 'premier',
        type:  'get',
        dataType:  'json',
        success: function  (data) {
            $('#txt_premierstatus').val(
                () => {if(data.roomtype.available>0){
                    return 'Available'

                } else {
                    return 'Full'
                }}
            );
            $('#txt_premieravailable').val(data.roomtype.available);
            $('#txt_premierprice').html(String(data.roomtype.price) + " baht");
        },
        error: function (xhr, status, error) {
            $('#txt_premierstatus').val('');
            $('#txt_premieravailable').val('');
            $('#txt_premierprice').html("#ERROR");
        }
    });
};

request_room_detail()
})

// $(document).ready( function () {

//     /* create datepicker */
//     $("#txt_InvoiceDate").datepicker({ 
//         dateFormat: 'dd/mm/yy' 
//     });
    
//     $('#btn_InvoiceDate').click(function() {
//         $('#txt_InvoiceDate').datepicker('show');
//     });

//     /* table add delete row */
    

//     $('#txt_CustomerCode').change (function () {
//         var customer_code = $(this).val().trim();

//         $.ajax({
//             url:  '/roomtype/detail/' + customer_code,
//             type:  'get',
//             dataType:  'json',
//             success: function  (data) {
//                 $('#txt_CustomerCode').val(data.customers.customer_code);
//                 $('#txt_CustomerName').val(data.customers.name);
//             },
//             error: function (xhr, status, error) {
//                 $('#txt_CustomerName').val('');
//             }
//         });
//     });

//     /* search product code  */
//     $('.search_product_code').click(function () {
//         $p_code = $(this).parents('td').children('span').html();
//         $(this).parents('tr').find('.order_no').html('*');

//         $.ajax({
//             url:  '/product/list',
//             type:  'get',
//             dataType:  'json',
//             success: function  (data) {
//                 let rows =  '';
//                 var i = 1;
//                 data.products.forEach(product => {
//                     rows += `
//                     <tr class="d-flex">
//                         <td class='col-1'>${i++}</td>
//                         <td class='col-3'><a class='a_click' href='#'>${product.code}</a></td>
//                         <td class='col-5'>${product.name}</td>
//                         <td class='col-3'></td>
//                         <td class='hide'>${product.units}</td>
//                     </tr>`;
//                 });
//                 $('#table_modal > tbody').html(rows);

//                 $('#model_header_1').text('Product Code');
//                 $('#model_header_2').text('Product Name');
//                 $('#model_header_3').text('Note');
//             },
//         });
//         // open popup
//         $('#txt_modal_param').val('product_code');
//         $('#modal_form').modal();
//     });

//     $('.search_customer_code').click(function () {
//         $.ajax({
//             url:  '/customer/list',
//             type:  'get',
//             dataType:  'json',
//             success: function  (data) {
//                 let rows =  '';
//                 var i = 1;
//                 data.customers.forEach(customer => {
//                     rows += `
//                     <tr class="d-flex">
//                         <td class='col-1'>${i++}</td>
//                         <td class='col-3'><a class='a_click' href='#'>${customer.customer_code}</a></td>
//                         <td class='col-5'>${customer.name}</td>
//                         <td class='col-3'></td>
//                         <td class='hide'></td>
//                     </tr>`;
//                 });
//                 $('#table_modal > tbody').html(rows);

//                 $('#model_header_1').text('Customer Code');
//                 $('#model_header_2').text('Customer Name');
//                 $('#model_header_3').text('Note');

//             },
//         });        
//         // open popup
//         $('#txt_modal_param').val('customer_code');
//         $('#modal_form').modal();
//     });

//     $('table').on('focusin', 'td[contenteditable]', function() {
//         $(this).data('val', $(this).html());
//     }).on('input', 'td[contenteditable]', function() {
//         //re_calculate_total_price();
//     }).on('keypress', 'td[contenteditable]', function (e) {
//         if (e.keyCode == 13) {
//             return false;
//         }
//     }).on('focusout', 'td[contenteditable]', function() {
//         var prev = $(this).data('val');
//         var data = $(this).html();
//         if (!numberRegex.test(data)) {
//             $(this).text(prev);
//         } else {
//             $(this).data('val', $(this).html());
//         }
//         re_calculate_total_price();
//     });

//     // return from modal (popup)
//     $('body').on('click', 'a.a_click', function() {
//         //console.log($(this).parents('tr').html());
//         //console.log($(this).parents('tr').find('td:nth-child(1)').html());
//         var code = $(this).parents('tr').find('td:nth-child(2)').children().html();
//         var name = $(this).parents('tr').find('td:nth-child(3)').html();
//         var note = $(this).parents('tr').find('td:nth-child(4)').html();
//         var option = $(this).parents('tr').find('td:nth-child(5)').html();

//         if ($('#txt_modal_param').val() == 'product_code') {
//             $("#table_main tbody tr").each(function() {
//                 if ($(this).find('.order_no').html() == '*') {
//                     $(this).find('.project_code_1 > span').html(code);
//                     $(this).find('.product_name').html(name);
//                     $(this).find('.unit_price').html(option);
//                     $(this).find('.quantity').html("1");
//                 }
//             });
            
//             re_calculate_total_price();
//         } else if ($('#txt_modal_param').val() == 'customer_code') {
//             $('#txt_CustomerCode').val(code);
//             $('#txt_CustomerName').val(name);
//         } else if ($('#txt_modal_param').val() == 'invoice_no') {
//             $('#txt_InvoiceNo').val(code);
//             $('#txt_InvoiceDate').val(name);
//             $('#txt_CustomerCode').val(note);
//             $('#txt_CustomerCode').change();

//             get_invoice_detail(code);
//         }

//         $('#modal_form').modal('toggle');
//     });

//     // detect modal close form
//     $('#modal_form').on('hidden.bs.modal', function () {
//         re_order_no();
//     });

//     //disable_ui();
//     reset_form();

//     re_order_no();
//     re_calculate_total_price();

//     $('#btnNew').click(function () {
//         reset_form();

//         re_order_no();
//         re_calculate_total_price();
//     });
//     $('#btnEdit').click(function () {
//         $.ajax({
//             url:  '/invoice/list',
//             type:  'get',
//             dataType:  'json',
//             success: function  (data) {
//                 let rows =  '';
//                 var i = 1;
//                 data.invoices.forEach(invoice => {
//                     console.log (invoice);
//                     var invoice_date = invoice.invoice_date;

//                     invoice_date = invoice_date.slice(0,10).split('-').reverse().join('/');
//                     rows += `
//                     <tr class="d-flex">
//                         <td class='col-1'>${i++}</td>
//                         <td class='col-3'><a class='a_click' href='#'>${invoice.invoice_no}</a></td>
//                         <td class='col-5'>${invoice_date}</td>
//                         <td class='col-3'>${invoice.customer_code_id}</td>
//                         <td class='hide'></td>
//                     </tr>`;
//                 });
//                 $('#table_modal > tbody').html(rows);

//                 $('#model_header_1').text('Invoice No');
//                 $('#model_header_2').text('Invoice Date');
//                 $('#model_header_3').text('Customer Code');
//             },
//         });        
//         // open popup
//         $('#txt_modal_param').val('invoice_no');
//         $('#modal_form').modal();        
//     });
//     $('#btnSave').click(function () {

//         var customer_code = $('#txt_CustomerName').val().trim();
//         if (customer_code == '') {
//             alert('กรุณาระบุ Customer');
//             $('#txt_CustomerCode').focus();
//             return false;
//         }
//         var invoice_date = $('#txt_InvoiceDate').val().trim();
//         if (!dateRegex.test(invoice_date)) {
//             alert('กรุณาระบุวันที่ ให้ถูกต้อง');
//             $('#txt_InvoiceDate').focus();
//             return false;
//         }
//         if ($('#txt_InvoiceNo').val() == '<new>') {
//             var token = $('[name=csrfmiddlewaretoken]').val();
                  
//             $.ajax({
//                 url:  '/invoice/create',
//                 type:  'post',
//                 data: $('#form_invoice').serialize() + "&lineitem=" +lineitem_to_json(),
//                 headers: { "X-CSRFToken": token },
//                 dataType:  'json',
//                 success: function  (data) {
//                     if (data.error) {
//                         alert(data.error);
//                     } else {
//                         $('#txt_InvoiceNo').val(data.invoice.invoice_no)
//                         alert('บันทึกสำเร็จ');
//                     }                    
//                 },
//             });  
//         } else {
//             var token = $('[name=csrfmiddlewaretoken]').val();
//             console.log($('#form_invoice').serialize());
//             console.log(lineitem_to_json());
//             $.ajax({
//                 url:  '/invoice/update/' + $('#txt_InvoiceNo').val(),
//                 type:  'post',
//                 data: $('#form_invoice').serialize() + "&lineitem=" +lineitem_to_json(),
//                 headers: { "X-CSRFToken": token },
//                 dataType:  'json',
//                 success: function  (data) {
//                     if (data.error) {
//                         alert(data.error);
//                     } else {
//                         alert('บันทึกสำเร็จ');
//                     }
//                 },
//             }); 
//         }
        
//     });

//     $('#btnDelete').click(function () {
//         if ($('#txt_InvoiceNo').val() == '<new>') {
//             alert ('ไม่สามารถลบ Invoice ใหม่ได้');
//             return false;
//         }
//         if (confirm ("คุณต้องการลบ Invoice No : '" + $('#txt_InvoiceNo').val() + "' ")) {
//             console.log('Delete ' + $('#txt_InvoiceNo').val());
//             var token = $('[name=csrfmiddlewaretoken]').val();
//             $.ajax({
//                 url:  '/invoice/delete/' + $('#txt_InvoiceNo').val(),
//                 type:  'post',
//                 headers: { "X-CSRFToken": token },
//                 dataType:  'json',
//                 success: function  (data) {
//                     reset_form();
//                 },
//             });            
//         }
//     });
//     $('#btnPdf').click(function () {
//         if ($('#txt_InvoiceNo').val() == '<new>') {
//             alert ('กรุณาระบุ Invoice No');
//             return false;
//         }
//         window.open('/invoice/pdf/' + $('#txt_InvoiceNo').val());
//     });
//     $('#btnPrint').click(function () {
//         window.open('/invoice/report');
//     });

// });

// function lineitem_to_json () {
//     var rows = [];
//     var i = 0;
//     $("#table_main tbody tr").each(function(index) {
//         if ($(this).find('.project_code_1 > span').html() != '') {
//             rows[i] = {};
//             rows[i]["lineitem"] = (i+1);
//             rows[i]["product_code"] = $(this).find('.project_code_1 > span').html();
//             rows[i]["product_name"] = $(this).find('.product_name').html();
//             rows[i]["unit_price"] = $(this).find('.unit_price').html();
//             rows[i]["quantity"] = $(this).find('.quantity').html();
//             rows[i]["extended_price"] = $(this).find('.extended_price').html();
//             i++;
//         }
//     });
//     var obj = {};
//     obj.lineitem = rows;
//     //console.log(JSON.stringify(obj));

//     return JSON.stringify(obj);
// }

// function get_invoice_detail (invoice_no) {
//     $.ajax({
//         url:  '/invoice/detail/' + encodeURIComponent(invoice_no),
//         type:  'get',
//         dataType:  'json',
//         success: function  (data) {
//             //console.log(data.invoicelineitem.length);

//             reset_table();
//             for(var i=ROW_NUMBER;i<data.invoicelineitem.length;i++) {
//                 $('.table-add').click();
//             }
//             var i = 0;
//             $("#table_main tbody tr").each(function() {
//                 if (i < data.invoicelineitem.length) {
//                     $(this).find('.project_code_1 > span').html(data.invoicelineitem[i].product_code);
//                     $(this).find('.product_name').html(data.invoicelineitem[i].product_code__name);
//                     $(this).find('.unit_price').html(data.invoicelineitem[i].unit_price);
//                     $(this).find('.quantity').html(data.invoicelineitem[i].quantity);
//                 }
//                 i++;
//             });
//             re_calculate_total_price();
//         },
//     });
// }

// function re_calculate_total_price () {
//     var total_price = 0;
//     $("#table_main tbody tr").each(function() {

//         var product_code = $(this).find('.project_code_1 > span').html();
//         //console.log (product_code);
//         var unit_price = $(this).find('.unit_price').html();
//         $(this).find('.unit_price').html(((unit_price)));
//         var quantity = $(this).find('.quantity').html();
//         $(this).find('.quantity').html(parseInt(quantity));
//         if (product_code != '') {
//                 var extended_price = unit_price * quantity
//             $(this).find('.extended_price').html(formatNumber(extended_price));
//             total_price += extended_price;
//         }
//     });

//     $('#lbl_TotalPrice').text(formatNumber(total_price));
//     $('#txt_TotalPrice').val($('#lbl_TotalPrice').text());
//     $('#lbl_VAT').text(formatNumber(total_price * 0.07));
//     $('#txt_VAT').val($('#lbl_VAT').text());
//     $('#lbl_AmountDue').text(formatNumber(total_price * 1.07));
//     $('#txt_AmountDue').val($('#lbl_AmountDue').text());
// }

// function reset_form() {
//     $('#txt_InvoiceNo').attr("disabled", "disabled");
//     $('#txt_InvoiceNo').val('<new>');

//     reset_table();
    
//     $('#txt_InvoiceDate').val(new Date().toJSON().slice(0,10).split('-').reverse().join('/'));

//     $('#txt_CustomerCode').val('');
//     $('#txt_CustomerName').val('');

//     $('#lbl_TotalPrice').text('0.00');
//     $('#lbl_VAT').text('0.00');
//     $('#lbl_AmountDue').text('0.00');
// }

// function reset_table() {
//     $('#table_main > tbody').html('');
//     for(var i=1; i<= ROW_NUMBER; i++) {
//         $('.table-add').click();
//     }    
// }

// function re_order_no () {
//     var i = 1;
//     $("#table_main tbody tr").each(function() {
//         $(this).find('.order_no').html(i);
//         i++;
//     });
// }

// function disable_ui () {
//     $('#txt_InvoiceDate').attr("disabled", "disabled");
//     $('#btn_InvoiceDate').attr("disabled", "disabled");
// }

// function enable_ui () {
//     $('#txt_InvoiceDate').removeAttr("disabled");
//     $('#btn_InvoiceDate').removeAttr("disabled");
// }

// function formatNumber (num) {
//     if (num === '') return '';
//     num = parseFloat(num); 
//     return num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
// }

// function isInt(n){
//     return Number(n) === n && n % 1 === 0;
// }

// function isFloat(n){
//     return Number(n) === n && n % 1 !== 0;
// }

// var dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
// //var numberRegex = /^-?\d+\.?\d*$/;
// var numberRegex = /^-?\d*\.?\d*$/


