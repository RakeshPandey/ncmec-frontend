$(function(){
    $('.expandable').readmore({
        speed: 500,
        collapsedHeight: 100,
        lessLink: '<p class="text-right"><a href="#" title="readmore">...close <i class="fa fa-arrow-circle-up" aria-hidden="true"></i></a></p>',
        moreLink: '<p class="text-right"><a href="#" title="close">...readmore <i class="fa fa-arrow-circle-down" aria-hidden="true"></i></a></p>'
    });
});

String.prototype.truncString = function(max, add){
   add = add || '...';
   return (this.length > max ? this.substring(0,max)+add : this);
};

str = $('.expandable p:first-child').text();
console.log(  str.truncString(32,'...')  );

$(function() {
    $('.expandable p:first-child').text(str.truncString(400,'...'));
});