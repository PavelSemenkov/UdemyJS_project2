'use strict';
require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';
import $ from 'jquery';
import tabs from './modules/tabs';
import modal, {modalOpen} from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';

document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => modalOpen('.modal', modalTimerId), 50000);
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2023-04-11');
    cards();
    forms('form', modalTimerId, '.modal');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        currencyCounter: '#current'
    });
    calc();
    
});
