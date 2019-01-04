$('#purchaseRemind').click(function(){
  toast.modal({
    content:"购买须知",
  });
});

$('#largeRopeway').click(function(){
  toast.modal({
    content:"大索道预定时间",
  });
});

$('#intermediateRopeway').click(function(){
  toast.modal({
    content:"中索道预订时间",
  });
});

$('#moreDate').click(function(){
//    / toast.modal('modal',"",true);
    datePicker.init({
        targetid:'moreDate',
        isPrice:true
    });//'modal','moreDate'
});

$('.selectTime').click(function(){
//    / toast.modal('modal',"",true);
    datePicker.init({
        targetid: 'selectTime',
        isPrice:true
    });//'modal','moreDate'
});

$('.minus').click(function(){
    var num =  $(this).next().val();
    num--;
    if(num<1) 
    {
        num = 1;
    }
    if (num == 1) {
				$(this).addClass("minus-active");
        $(this).attr('disabled', true);
    }            
    $(this).next().val(num);
});

$('.plus').click(function(){
    var num = $(this).prev().val();
    num++;
    if(num > 1){
				$(this).prev().prev().removeClass("minus-active")
        $(this).prev().prev().attr('disabled', false);
    }
    $(this).prev().val(num);
});

$('.close').click(function(){
    _$this = $(this);
    _$this.toggleClass('icon-remove-vertical');
    _$this.parent().parent().find('.arrow').toggle().next().toggle();
});

$('.del').click(function(){
    $(this).parent().parent().remove();
});

$('#checkin').click(function(){
    datePicker.init({
        targetid:'checkinDate',
        type:'1',
    });
});

$('#checkout').click(function(){
    datePicker.init({
        targetid:'checkoutDate',
        type:'1'
    });
});


$('#checkinDate').on('DOMNodeInserted',function(){
    duration("checkinDate","checkoutDate","durationTime");
})

$('#checkoutDate').on('DOMNodeInserted',function(){
    duration("checkinDate","checkoutDate","durationTime");
});

function duration(eleIn,eleOut,eleDuration){
    var checkIn  =  $('#'+eleIn).text();
    var checkOut = $('#'+eleOut).text();

    var _duration = function(){
        var _checkIn = getDate(checkIn);
        var _checkOut = getDate(checkOut);

        if((_checkOut.month - _checkIn.month)>=0)
        {   
            var dur = _checkOut.day-_checkIn.day;
            if(dur>0)
            {
                $('#'+eleDuration).text(dur);
            }
            else
             toast.error('离店日期不能小于入住日期');
        }
        else
        {
            toast.error('离店日期不能小于入住日期');
        }
    }()
}

function getDate(date){
    var m = +date.split('月')[0];
    var d = +date.split('月')[1].split('日')[0];

    return {
        month:m,
        day:d
    }

}






