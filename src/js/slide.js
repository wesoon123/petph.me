document.addEventListener( 'DOMContentLoaded', function () {
    new Splide
    ( '#image-carousel', 
    {
        heightRatio: 0.3,
        cover : true,
        pagination: true,
        breakpoints: {
            640: {
                heightRatio: 0.5,
            },
        },
    } 
    ).mount();
  } );
