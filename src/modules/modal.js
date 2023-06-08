function modalOpen(modalSelector, modalTimerId) {
    const modalCallUs = document.querySelector(modalSelector)
    modalCallUs.style.display = 'block';
    document.body.style.overflow = 'hidden';
    console.log(modalTimerId);
    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }
}

function closeM(selector) {
    selector.style.display = 'none';
    document.body.style.overflow = '';
}

function modalClose(modalSelector) {
    const modalCallUs = document.querySelector(modalSelector)
    modalCallUs.addEventListener('click', (e) => {
        if (e.target === modalCallUs || e.target.getAttribute('data-close') === '') {
            closeM(modalCallUs);
        }
    });
    document.addEventListener('keydown', (e) => {
        e.code === 'Escape' ? closeM(modalCallUs) : null;
    });
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const buttonsCallUs = document.querySelectorAll(triggerSelector);

    function modalTriggerButton() {
        buttonsCallUs.forEach((btn) => {
            btn.addEventListener('click', () => modalOpen(modalSelector, modalTimerId));
        })
    }

    modalTriggerButton();
    modalClose('.modal');

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpen(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {modalOpen, closeM};