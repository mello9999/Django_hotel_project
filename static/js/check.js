
var ROW_NUMBER = 5;

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

$(document).ready( function() {
$('#btn_searchnow').click(function (){
    let date1 = new Date($('#check_in').val())
    let date2 = new Date($('#check_out').val())
    $.ajax({
        url:  '/reserve/list',
        type:  'get',
        dataType:  'json',
        success: function  (data) {
            

            
            let singleArr = [];            
            let doubleArr = [];
            let suiteArr = [];
            let deluxeArr = [];
            let premierArr = [];
            
            for (let i = 0; i < data.reservation.length; i++){
                if (data.reservation[i].room_type_id === 'single'){
                    singleArr.push(data.reservation[i])
                } else if (data.reservation[i].room_type_id === 'double') {
                    doubleArr.push(data.reservation[i])
                } else if (data.reservation[i].room_type_id === 'suite') {
                    suiteArr.push(data.reservation[i])
                } else if (data.reservation[i].room_type_id === 'deluxe') {
                    deluxeArr.push(data.reservation[i])
                } else if (data.reservation[i].room_type_id === 'premier') {
                    premierArr.push(data.reservation[i])
                }
            }
            let singleCount = 0;
            for (let i = 0; i < singleArr.length; i++){
                let cd1 = new Date(singleArr[i].check_in);
                let cd2 = new Date(singleArr[i].check_out);
                if (cd1> date2 || cd2 <date1) {
                    singleCount += 1;
                }
            }
            singleCount = singleArr.length - singleCount ;
            $.ajax({
                url:  '/roomtype/detail/' + 'single',
                type:  'get',
                dataType:  'json',
                success: function  (data) {
                    $('#txt_singleavailable').val(data.roomtype.number - singleCount);
                    if (data.roomtype.number - singleCount === 0) {
                        $('#txt_singlestatus').val('Full')
                    } else {
                        $('#txt_singlestatus').val('Available')
                    }
                },
                error: function (xhr, status, error) {
                   console.log(error)
                }
            });
            

            let doubleCount = 0;
            for (let i = 0; i < doubleArr.length; i++){
                let cd1 = new Date(doubleArr[i].check_in);
                let cd2 = new Date(doubleArr[i].check_out);
                if (cd1> date2 || cd2 <date1) {
                    doubleCount += 1;
                }
            }
            doubleCount = doubleArr.length - doubleCount ;
            $.ajax({
                url:  '/roomtype/detail/' + 'double',
                type:  'get',
                dataType:  'json',
                success: function  (data) {
                    $('#txt_doubleavailable').val(data.roomtype.number - doubleCount);
                    if (data.roomtype.number - doubleCount === 0) {
                        $('#txt_doublestatus').val('Full')
                    } else {
                        $('#txt_doublestatus').val('Available')
                    }
                },
                error: function (xhr, status, error) {
                   console.log(error)
                }
            });


            let suiteCount = 0;
            for (let i = 0; i < suiteArr.length; i++){
                let cd1 = new Date(suiteArr[i].check_in);
                let cd2 = new Date(suiteArr[i].check_out);
                if (cd1> date2 || cd2 <date1) {
                    suiteCount += 1;
                }
            }
            suiteCount = suiteArr.length - suiteCount ;
            $.ajax({
                url:  '/roomtype/detail/' + 'suite',
                type:  'get',
                dataType:  'json',
                success: function  (data) {
                    $('#txt_suiteavailable').val(data.roomtype.number - suiteCount);
                    if (data.roomtype.number - suiteCount === 0) {
                        $('#txt_suitestatus').val('Full')
                    } else {
                        $('#txt_suitestatus').val('Available')
                    }
                },
                error: function (xhr, status, error) {
                   console.log(error)
                }
            });


            let deluxeCount = 0;
            for (let i = 0; i < deluxeArr.length; i++){
                let cd1 = new Date(deluxeArr[i].check_in);
                let cd2 = new Date(deluxeArr[i].check_out);
                if (cd1> date2 || cd2 <date1) {
                    deluxeCount += 1;
                }
            }
            deluxeCount = deluxeArr.length - deluxeCount ;
            $.ajax({
                url:  '/roomtype/detail/' + 'deluxe',
                type:  'get',
                dataType:  'json',
                success: function  (data) {
                    $('#txt_deluxeavailable').val(data.roomtype.number - deluxeCount);
                    if (data.roomtype.number - deluxeCount === 0) {
                        $('#txt_deluxestatus').val('Full')
                    } else {
                        $('#txt_deluxestatus').val('Available')
                    }
                },
                error: function (xhr, status, error) {
                   console.log(error)
                }
            });


            let premierCount = 0;
            for (let i = 0; i < premierArr.length; i++){
                let cd1 = new Date(premierArr[i].check_in);
                let cd2 = new Date(premierArr[i].check_out);
                if (cd1> date2 || cd2 <date1) {
                    premierCount += 1;
                }
            }
            premierCount = premierArr.length - premierCount ;
            $.ajax({
                url:  '/roomtype/detail/' + 'premier',
                type:  'get',
                dataType:  'json',
                success: function  (data) {
                    $('#txt_premieravailable').val(data.roomtype.number - premierCount);
                    if (data.roomtype.number - premierCount === 0) {
                        $('#txt_premierstatus').val('Full')
                    } else {
                        $('#txt_premierstatus').val('Available')
                    }
                },
                error: function (xhr, status, error) {
                   console.log(error)
                }
            });

           

        },
        error: function (xhr, status, error) {
            console.log(error)
        }
    });
})
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
