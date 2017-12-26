$(function(){
    $('#brain').css({'top':'20%','left':'50%','margin-left':-$('#brain').width()/2})
    //alert($('#brain').width());
    $('.particles').css({'width':'100%','height':window.innerHeight});
    if(window.innerWidth<992){
        $('#brain canvas').remove();
        $('<img src="three-learn1/img/people-phone.png">').appendTo('#brain');
        $("#brain").css({'margin-left':'0','left':'0'});
    }
    var num=Math.ceil($('.particles').height()/200);
    for(var i=0;i<num;i++){
        var id='particles'+i;
        $('<div class="aa" id='+id+'></div>').appendTo('.particles');
        getParticles(id);
    }
})