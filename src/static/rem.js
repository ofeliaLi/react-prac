(function(){
    var doc = document.documentElement
    
    function changeFontsize() {
        doc.style.fontSize = doc.clientWidth/10 +'px'
    }
    
    changeFontsize()
    doc.addEventListener('resize', changeFontsize)
})()