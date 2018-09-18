const addSlideStyle = function(slideIndex, slides, delay){
    const slidesArray = Array.from(slides);
    let slide = slidesArray[slideIndex];

    slide.style.display = "block";
    slide.style.animationName = "slideRightFadeIn";
    //slide.style.animationDuration = `${delay/1000}s`;
    slide.style.animationDuration =`${delay/1000}s`;
}

function removeStyle(slideIndex, slides) {
    const slidesArray = Array.from(slides);
    let slide = slidesArray[slideIndex];

    slide.style.display = "none";
};

function increaseIndex(index, arrayLength){
    if (index < arrayLength-1){
        return  ++index;
    } else {
        return 0;
    };
}

function decreaseIndex(index, length){
    if(index > 0 && index < length){
        return --index;
    } else {
        return length-1;
    }
}

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

let mainSettings;
let sliderWidget = {

    settings: {
        slideIndex : 0,
        slides : document.getElementsByClassName("slide"),
        animDuration : 1000,
        animOn: false,
        mainCycle : () => {},
        mainCycleInterval: 10000,

    },

    init: function(){
        mainSettings = this.settings;
        this.initializeSlides();
        this.startAnimation();
        this.initializeButton();
    },

    initializeSlides: function(){
        addSlideStyle(mainSettings.slideIndex, mainSettings.slides, mainSettings.animDuration);
        checkCircle(mainSettings.slideIndex);
    },

    startAnimation: function(){
        mainSettings.animOn = true;
        let slides = mainSettings.slides;
        let animDuration = mainSettings.animDuration;
        let cycleInterval = mainSettings.mainCycleInterval;
        
        console.log('START----')
        mainSettings.mainCycle = setInterval(() => {
            let index  = mainSettings.slideIndex;
            removeStyle(index, slides)
            index = increaseIndex(index, slides.length)  
            mainSettings.slideIndex = index;                
            addSlideStyle(index, slides, animDuration);
            checkCircle(mainSettings.slideIndex);
        }, cycleInterval)
    },

    stopAnimation: function() {
        mainSettings.animOn = false;
        console.log("----STOP")
        clearInterval(mainSettings.mainCycle);
    },

    initializeButton : function() {
        dots = document.querySelectorAll('.slider-dot');
        leftArrow = document.querySelector('.left-arrow');
        rightArrow = document.querySelector('.right-arrow');

        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault()
                this.stopAnimation()
                removeStyle(mainSettings.slideIndex, mainSettings.slides)
                mainSettings.slideIndex = index;
                this.initializeSlides();
                this.startAnimation();
            })
        })

        leftArrow.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`left index: ${decreaseIndex(mainSettings.slideIndex, mainSettings.slides.length)}` )
            this.stopAnimation();
            removeStyle(mainSettings.slideIndex, mainSettings.slides);
            mainSettings.slideIndex = decreaseIndex(mainSettings.slideIndex, mainSettings.slides.length);
            this.initializeSlides();
            this.startAnimation();

        })

        rightArrow.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`right index: ${increaseIndex(mainSettings.slideIndex, mainSettings.slides.length)}` )
            this.stopAnimation();
            removeStyle(mainSettings.slideIndex, mainSettings.slides);
            mainSettings.slideIndex = increaseIndex(mainSettings.slideIndex, mainSettings.slides.length);
            this.initializeSlides();
            this.startAnimation();

        })
    
    }
}  



sliderWidget.init();
console.log(mainSettings)