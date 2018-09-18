// FIND slide that matches index
// SHOW slide
// ADD animation and animation duration
function addSlideStyle (index, slides, duration){
    const slide = slides[index];

    slide.style.display = "block";
    slide.style.animationName = "slideRightFadeIn";
    slide.style.animationDuration =`${duration/1000}s`;
};

// FIND slide that matches index
// REMOVE slide
function removeStyle(index, slides) {
    const slide = slides[index];

    slide.style.display = "none";
};


// RETURN index increased by 1
//          then index is less then slides array length
// ELSE return 0 ---> then index = last slide index
function increaseIndex(index, length){
    if (index < length-1){
        return  ++index;
    } else {
        return 0;
    };
};

// RETURN index decreased by 1 
//        then index is greater then 0  
//        and less then slides array length
// ELSE return last element index ---> then index = 0
function decreaseIndex(index, length){
    if(index > 0 && index < length){
        return --index;
    } else {
        return length-1;
    };
};

// CHECK if slideIndex == dotIndex
//       TRUE changes icon from uncheked to CHECKED
//       ELSE changes icon from checked to UNCHECKED
function  checkCircle(slideIndex){
    const dots = document.querySelectorAll('.slider-dot  i');

    dots.forEach((dot, dotIndex) => {
        if(dotIndex === slideIndex){
            dot.classList.remove("icon-radio-unchecked");
            dot.classList.add("icon-radio-checked2");
        } else {
            dot.classList.remove("icon-radio-checked2");
            dot.classList.add("icon-radio-unchecked");
        };
    });
};

let sliderWidget = {

    settings: {
        slideIndex : 0,
        slides : document.getElementsByClassName("slide"),
        animDuration : 1000,
        animOn: false,
        mainCycle : () => {},
        mainCycleInterval: 10000,

    },

    // MAIN sliderWidget controller
    init: function(){
        mainSettings = this.settings;
        this.initializeSlides();
        this.startAnimation();
        this.initializeButton();
    },

    initializeSlides: function(){
        addSlideStyle(this.settings.slideIndex, this.settings.slides, this.settings.animDuration);
        checkCircle(this.settings.slideIndex);
    },

    startAnimation: function(){
        this.settings.animOn = true;
        
        console.log('START----')
        this.mainCycle = setInterval(() => {
            removeStyle(this.settings.slideIndex, this.settings.slides)
            this.settings.slideIndex = increaseIndex(this.settings.slideIndex, this.settings.slides.length)                  
            addSlideStyle(this.settings.slideIndex, this.settings.slides, this.settings.animDuration);
            checkCircle(this.settings.slideIndex);
        }, this.settings.mainCycleInterval)
    },

    stopAnimation: function() {
        this.settings.animOn = false;
        console.log("----STOP")
        clearInterval(this.settings.mainCycle);
    },

    initializeButton : function() {
        dots = document.querySelectorAll('.slider-dot');
        leftArrow = document.querySelector('.left-arrow');
        rightArrow = document.querySelector('.right-arrow');

        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault()
                this.stopAnimation()
                removeStyle(this.settings.slideIndex, this.settings.slides)
                this.settings.slideIndex = index;
                this.initializeSlides();
                this.startAnimation();
            })
        })

        leftArrow.addEventListener('click', (e) => {
            e.preventDefault();
            this.stopAnimation();
            removeStyle(this.settings.slideIndex, this.settings.slides);
            this.settings.slideIndex = decreaseIndex(this.settings.slideIndex, this.settings.slides.length);
            this.initializeSlides();
            this.startAnimation();

        })

        rightArrow.addEventListener('click', (e) => {
            e.preventDefault();
            this.stopAnimation();
            removeStyle(this.settings.slideIndex, this.settings.slides);
            this.settings.slideIndex = increaseIndex(this.settings.slideIndex, this.settings.slides.length);
            this.initializeSlides();
            this.startAnimation();
        })    
    }
}  



sliderWidget.init();