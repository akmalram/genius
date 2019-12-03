const ready = (callback) => {
    window.addEventListener('DOMContentLoaded', (e) => {
        callback(e);
    })
}

ready(() => {
    const MenuClassToggler = () => {
        const btn = document.querySelector('.navbar .togglebtn');
        const menu = document.querySelector('.navbar .menu-modal');

        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            menu.classList.toggle('active');
            // document.querySelector('body').classList.toggle('overhidden');
        });
    }

    MenuClassToggler();
});

ready(() => {
    const element = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if(screen.width < 768 && window.pageYOffset > 0) {
            element.classList.add('scrolled');
        }else if (screen.width < 768 &&  window.pageYOffset < 200) {
            element.classList.remove('scrolled');
        }
    });

    if(screen.width < 768 && window.pageYOffset > 0) {
        element.classList.add('scrolled');
    }else if (screen.width < 768 &&  window.pageYOffset < 200) {
        element.classList.remove('scrolled');
    }
});

ready(() => {
    const fullpg = new fullpage('#fullpage', {
        navigation: true,
        scrollingSpeed: 800,
        navigationPosition: 'left',
        verticalCentered: false,
        onLeave: (origin, destination) => {
            for (let i = 1; i <= 4; i++) {
                $('body').removeClass(`active-section-${i}`);
            }
            $('body').addClass(`active-section-${destination.index + 1}`);
            $('body').removeClass(`animate-${origin.index + 1}`);
        },
        afterLoad: (a, direction) => {
            $('body').addClass(`animate-${direction.index + 1}`);
        },
        afterRender: (origin) => {
            $('body').addClass(`active-section-${origin.index + 1}`);
            $('body').addClass(`animate-${origin.index + 1}`);
        },
    });
    if(screen.width < 1024) {
        fullpg.destroy();
        $('body').addClass('static');
    }

});

const fontAwesomeFreeObserver = new FontFaceObserver('Font Awesome 5 Free');
const fontAwesomeBrandsObserver = new FontFaceObserver('Font Awesome 5 Brands');
const gilroyObserver = new FontFaceObserver('Gilroy');

Promise.all([
    fontAwesomeFreeObserver.load(),
    fontAwesomeBrandsObserver.load(),
    gilroyObserver.load()
]).then(() => {
    document.querySelector('html').classList.add('fonts-loaded');
});
