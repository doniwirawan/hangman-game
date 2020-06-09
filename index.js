function showMore(){
    var x = document.getElementsById('hidden');
    if(x.className === 'hidden'){
        x.className += ' show';
    }else{
        x.className  = 'hidden';
    }
}