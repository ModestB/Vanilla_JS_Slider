
// ADDS @fadeIn style to single slide determined by slideIndex
// MAKES that slide visible display: block
// WAITS waitTime(ms)
// REPLACES @fadeIn style with @fadeOut
// RESOLVES after 5000ms = animationDurationTime
// MAKES all slides invisible display:none
// const addSlideStyle = function(slideIndex, slides, waitTime){
//     const slidesArray = Array.from(slides);
//     let slide = slides[slideIndex];

//     slide.style.animationName = "fadeIn";
//     slide.style.animationDuration = "5s";
//     slide.style.display = "block";
   
//     console.log("----FadeIn")
    
//    return new Promise( async resolve => {
//         await setTimeout( async () => { 
//             console.log("FadeOut")
//             slide.style.animationName = "fadeOut";
//             slide.style.animationDuration = "5s"; 
//             await setTimeout(() => {
//                 console.log('------None')
//                 slidesArray.forEach((slide) => slide.style.display = "none")
//                 resolve();
//             }, 0);            
//         }, waitTime);   
//    });
// };

// AT RUN calls addSlideStyle function for initialization
// CHECKS current slideIndex
// RESOLVES with reruning checkSlideIndex
// Infinity loop
// const  addSlide = async function (index = 0) {
//     console.log('----ADDSLIDE')
//     let slideIndex = index;
//     const slides = document.getElementsByClassName("slide");
//     return new Promise( async resolve => {
//     await addSlideStyle(slideIndex, slides, 10000);
//         if (slideIndex < slides.length-1){
//             slideIndex++;
//         } else {
//             slideIndex = 0;
//         };
//         resolve(addSlide(slideIndex, slides));
//     });
// };

// addSlide();

// function addSlideStyle(){
//     console.log('slideStyle')
// };


// =============================================================================
// FUNCTIONS FOR CIRCLES
// =============================================================================
function  checkCircle(slideIndex){
    let dots = document.querySelectorAll('.slider-dot  i');

    dots.forEach((dot, index) => {
        if(dot.classList.contains("icon-radio-unchecked") && index === slideIndex){
            dot.classList.remove("icon-radio-unchecked");
            dot.classList.add("icon-radio-checked2");
        } else {
            dot.classList.remove("icon-radio-checked2");
            dot.classList.add("icon-radio-unchecked");
        }
    })
}

// =============================================================================
// FUNCTION FOR CAROUSEL
// =============================================================================
const addSlideStyle = function(slideIndex, slides, delay){
      
    const slidesArray = Array.from(slides);
    let slide = slidesArray[slideIndex];

    slide.style.display = "block";
    slide.style.animationName = "fadeIn";
    slide.style.animationDuration = `${delay/1000}s`;
    //console.log('Slide index ' + slideIndex)
}

function removeStyle(slideIndex, slides, delay) {
    const slidesArray = Array.from(slides);
    let slide = slidesArray[slideIndex];

    slide.style.animationName = "fadeOut";
    slide.style.animationDuration = `${delay/1000}s`;

   
    setTimeout(() => {
        console.log('1')
        slide.style.display = "none";
        return new Promise ((resolve, reject) => {
            resolve();
        })

    }, delay) 
};

function increaseIndex(index, arrayLength){
    if (index < arrayLength-1){
        return  ++index;
    } else {
        return 0;
    };
}


function mainSlide() {
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slide");
    let delay = 10000;
    let mainCycle;

    function initializeSlides(){
        addSlideStyle(slideIndex, slides, delay/2);
    }

    async function startCycle(){
            await removeStyle(slideIndex, slides, delay/2);
            slideIndex = increaseIndex(slideIndex, slides.length);
            console.log('2')
            addSlideStyle(slideIndex, slides, delay/2);
           return startCycle()
    }

    initializeSlides()
    startCycle()
}

mainSlide();



// =============================================================================
// MAIN FUNCTION
// =============================================================================
// function slideCarousel(index = 0) {
//     let slideIndex = index;
//     const slides = document.getElementsByClassName("slide");
//     let delay = 10000;
//     let mainCycle;
//     let innerCycle = () => {
//         setTimeout(() => {
//             slideIndex = increaseIndex(slideIndex, slides.length)
//             checkCircle(slideIndex);
//             addSlideStyle(slideIndex, slides, delay);
//             console.log("1 works")

//         }, delay/2)
//     }
    

//     addSlideStyle(slideIndex, slides, delay);
//     checkCircle(slideIndex);
//     mainCycle = setInterval( function indexCheck() {
//         console.log("2 works")

//         removeStyle(slideIndex, slides, delay/2);
//         innerCycle();
//     }, delay);
//     addCircleEvent(mainCycle, innerCycle);
// }

// slideCarousel();
// const slideObject = {
//     slideIndex : 0,
//     slides : document.getElementsByClassName("slide"),
//     delay : 10000,
//     indexTimeout: () => {},

//     initialize: function() {
//         addSlideStyle(this.slideIndex,this.slides, this.delay);
//         checkCircle(this.slideIndex);
//     },

//     start: function(){
//         let slideIndex = this.slideIndex;
//         let slides = this.slides;
//         let delay = this.delay;
//         this.indexTimeout = setInterval( function indexCheck() {

//             removeStyle(slideIndex, slides, delay/2);
    
//             setTimeout(() => {
//                 slideIndex = increaseIndex(slideIndex, slides.length)
//                 checkCircle(slideIndex);
//                 addSlideStyle(slideIndex, slides, delay);
//                 //indexTimeout = setTimeout(indexCheck, delay/2);
    
//             }, delay/2)
//         }, this.delay);
//     },

//     stop: function() {
//         clearInterval(this.indexTimeout);
//         removeStyle(this.slideIndex, this.slides, 0);
//         console.log('Interval Terminated')

//     }

// }

// slideObject.initialize();
// console.log(slideObject)
// slideObject.start();


// function addCircleEvent() {
//     dots = document.querySelectorAll('.slider-dot');
//     dots.forEach((dot, index) => {
//         dot.addEventListener('click', (e) => {
//             e.preventDefault()
//             slideObject.stop();
//             slideObject.slideIndex = index;
//             slideObject.initialize();  

//         })

//     })
// }

// addCircleEvent()

