// ANIMATIONS:
// fadeIn
// slideLeft
// slideRight
// slideLeftFadeIn
// slideRightFadeIn

let sliderWidget = {

    settings: {
        slideIndex : 0,
        slides : document.getElementsByClassName("slide"),
        animDuration : 5000,
        init: false,
        carousel: false,
        mainCycle : () => {},
        mainCycleInterval: 10000,
        slideAnimStyle: 'fadeIn'

    },

    // MAIN sliderWidget controller
    init: function(){
        if(!this.settings.init){
            this.initializeButton();
        }
        
        if(this.settings.carousel){
            if(this.settings.init){
                this.stopAnimation();
                this.removeStyle();
                this.initializeSlides();
                this.startAnimation();
            } else{
                this.initializeSlides();
                this.startAnimation();
            }
        } else {
            this.initializeSlides();      
        }
    },

    initializeSlides: function(){
        this.settings.init = true;
        this.addSlideStyle();
        this.checkCircle();
    },

    startAnimation: function(){
        this.settings.init = true;
        
        this.settings.mainCycle = setInterval(() => {
            this.removeStyle();
            this.increaseIndex()                  
            this.addSlideStyle();
            this.checkCircle();
        }, this.settings.mainCycleInterval)
    },

    stopAnimation: function() {
        this.settings.init = false;
        clearInterval(this.settings.mainCycle);
    },

    initializeButton : function() {
        dots = document.querySelectorAll('.slider-dot');
        leftArrow = document.querySelector('.left-arrow');
        rightArrow = document.querySelector('.right-arrow');

        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                if(this.settings.carousel){
                    this.stopAnimation();
                    this.removeStyle();
                    this.settings.slideIndex = index;
                    this.initializeSlides();
                    this.startAnimation();
                } else{
                    this.removeStyle();
                    this.settings.slideIndex = index;
                    this.initializeSlides();
                }
 
            })
        })

        leftArrow.addEventListener('click', (e) => {
            e.preventDefault();
            if(this.settings.carousel){
                this.stopAnimation();
                this.removeStyle();
                this.decreaseIndex();
                this.initializeSlides();
                this.startAnimation();
            } else {
                this.removeStyle();
                this.decreaseIndex();
                this.initializeSlides();
            }

        })

        rightArrow.addEventListener('click', (e) => {
            e.preventDefault();
            if(this.settings.carousel) {
                this.stopAnimation();
                this.removeStyle();
                this.increaseIndex();
                this.initializeSlides();
                this.startAnimation();
            } else{
                this.removeStyle();
                this.increaseIndex();
                this.initializeSlides();
            }

        })
    },

    // CHECK if slideIndex == dotIndex
    //       TRUE changes icon from uncheked to CHECKED
    //       ELSE changes icon from checked to UNCHECKED
    checkCircle: function(){
        const dots = document.querySelectorAll('.slider-dot  i');
    
        dots.forEach((dot, dotIndex) => {
            if(dotIndex === this.settings.slideIndex){
                dot.classList.remove("icon-radio-unchecked");
                dot.classList.add("icon-radio-checked2");
            } else {
                dot.classList.remove("icon-radio-checked2");
                dot.classList.add("icon-radio-unchecked");
            };
        });
    },

    // FIND slide that matches index
    // SHOW slide
    // ADD animation and animation duration
    addSlideStyle : function(){
        const slide = this.settings.slides[this.settings.slideIndex];
        // Forces reflow between the animations then reruning same animation
        slide.offsetWidth;

        slide.style.display = "block";
        slide.style.animationName = this.settings.slideAnimStyle;
        slide.style.animationDuration =`${this.settings.animDuration/1000}s`;
    },

    // FIND slide that matches index
    // REMOVE slide
    removeStyle : function() {
        const slide = this.settings.slides[this.settings.slideIndex];
        slide.style.display = "none";
    },

    // RETURN index increased by 1
    //          then index is less then slides array length
    // ELSE return 0 ---> then index = last slide index
    increaseIndex : function(){
        console.log("increase")
        if (this.settings.slideIndex < this.settings.slides.length-1){
            ++this.settings.slideIndex;
        } else {
            this.settings.slideIndex  = 0;
        };
    },

    // RETURN index decreased by 1 
    //        then index is greater then 0  
    //        and less then slides array length
    // ELSE return last element index ---> then index = 0
    decreaseIndex : function(){
        if(this.settings.slideIndex > 0 && this.settings.slideIndex <= this.settings.slides.length-1){
            --this.settings.slideIndex;
        } else {
            this.settings.slideIndex = this.settings.slides.length-1;
        };
    }

}  



sliderWidget.init();