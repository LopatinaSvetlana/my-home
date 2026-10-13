const scrollBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function(){
    if (window.scrollY>300){
        scrollBtn.style.display='block';
    }else{
        scrollBtn.style.display='none';
    }
});

scrollBtn.addEventListener('click', function(){
    window.scrollTo({top:0, behavior: 'smooth'});
});