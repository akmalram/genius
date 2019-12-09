const ready = (callback) => {
    window.addEventListener('DOMContentLoaded', (e) => {
        callback(e);
    })
}

const menuClose = () => {
    document.querySelector('.navbar .togglebtn').classList.remove('active');
    document.querySelector('.navbar .menu-modal').classList.remove('active');
    document.querySelector('.navbar').classList.remove('modalOpened');
}

ready(() => {
    const modalbtn = document.querySelector('.navbar .togglebtn');
    const modalmenu = document.querySelector('.navbar .menu-modal');
    const navbar = document.querySelector('.navbar');
    const MenuClassToggler = () => {
        modalbtn.addEventListener('click', () => {
            modalbtn.classList.toggle('active');
            modalmenu.classList.toggle('active');
            navbar.classList.toggle('modalOpened');
        });
    }

    MenuClassToggler();

    const menuClose = () => {
        document.querySelector('.navbar .togglebtn').classList.remove('active');
        document.querySelector('.navbar .menu-modal').classList.remove('active');
        document.querySelector('.navbar').classList.remove('modalOpened');
    }
});

ready(() => {
    const element = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (screen.width < 768 && window.pageYOffset > 0) {
            element.classList.add('scrolled');
        } else if (screen.width < 768 && window.pageYOffset < 200) {
            element.classList.remove('scrolled');
        }
    });

    if (screen.width < 768 && window.pageYOffset > 0) {
        element.classList.add('scrolled');
    } else if (screen.width < 768 && window.pageYOffset < 200) {
        element.classList.remove('scrolled');
    }
});

ready(() => {
    const form = document.querySelector('.form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        $.ajax({
                method: "POST",
                url: "../send.php",
                data: $('.form').serialize(),
            })
            .done(function() {
                form.reset();
                alert('Ваша заявка принята!')
            });
    });
});

ready(() => {
    const fullpg = new fullpage('#fullpage', {
        navigation: true,
        scrollingSpeed: 800,
        navigationPosition: 'left',
        onLeave: (origin, destination) => {
            const sections = document.querySelectorAll('#fullpage > .section').length;
            for (let i = 1; i <= sections; i++) {
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
    if (screen.width < 1024) {
        fullpg.destroy();
        $('body').addClass('static');
        $('.menu-modal .link').on('click', () => {
            menuClose();
        });
        fullpg.reBuild();
    } else {
        const fpMoveTo = (link, index) => {
            $(link).on('click', (e) => {
                e.preventDefault();
                fullpg.moveTo(index, 0);
                document.querySelector('.navbar .togglebtn').classList.remove('active');
                document.querySelector('.navbar .menu-modal').classList.remove('active');
            });
        }

        fpMoveTo('.menu-modal .link-aboutus', 2);
        fpMoveTo('.menu-modal .link-courses', 3);
        fpMoveTo('.menu-modal .link-advantages', 4);
        fpMoveTo('.menu-modal .link-contacts', 5);
        fpMoveTo('.toContacts', 5);
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