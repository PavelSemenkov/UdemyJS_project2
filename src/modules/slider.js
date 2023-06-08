function slider({container, slide, nextArrow, prevArrow, totalCounter, currencyCounter, wrapper, field}) {
    const sliderPrev = document.querySelector(prevArrow),
        sliderNext = document.querySelector(nextArrow),
        sliderCurrent = document.querySelector(currencyCounter),
        sliderTotal = document.querySelector(totalCounter),
        slidesOffer = document.querySelectorAll(slide),
        slidersAmount = slidesOffer.length,
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        sliderOffer = document.querySelector(container);
    let slideIndex = 1,
        offset = 0;

    slidesField.style.width = 100 * slidersAmount + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';
    slidesOffer.forEach(slide => {
        slide.style.width = width;
    });

    if (slidersAmount > 9) {
        sliderTotal.textContent = slidersAmount.toString()
        sliderCurrent.textContent = slideIndex.toString();
    } else {
        sliderCurrent.textContent = `0${slideIndex}`;
        sliderTotal.textContent = `0${slidersAmount}`;
    }

    sliderOffer.style.position = 'relative';
    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    sliderOffer.append(indicators);

    for (let i = 0; i < slidersAmount; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i === 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function dotsChange() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    sliderNext.addEventListener('click', () => {
        if (offset === deleteNotDigits(width) * (slidersAmount - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        slideIndex === slidersAmount ? slideIndex = 1 : slideIndex++;
        slidersAmount < 10 ? sliderCurrent.textContent = `0${slideIndex}` : sliderCurrent.textContent = slideIndex;
        dotsChange();
    });

    sliderPrev.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(width) * (slidersAmount - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        slideIndex === 1 ? slideIndex = slidersAmount : slideIndex--;
        slidersAmount < 10 ? sliderCurrent.textContent = `0${slideIndex}` : sliderCurrent.textContent = slideIndex;
        dotsChange();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = +slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            slidersAmount < 10 ? sliderCurrent.textContent = `0${slideIndex}` : sliderCurrent.textContent = slideIndex;
            dotsChange();
        });
    });
}

export default slider;