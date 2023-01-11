// Hamburger
const hamburger = document.getElementById('hamburger');
const navItems = document.getElementById('navitems')

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger-active')
    navItems.classList.toggle('hidden');
});

//  Navbar Menu DropDown
const menu = document.querySelector('.dropdown-trigger');
const dropdown = document.querySelector('.dropdown');

menu.addEventListener('mouseover', function () {
    dropdown.style.display = "block";
});

menu.addEventListener('mouseout', function () {
    dropdown.style.display = "none";
});

//  Navbar Menu DropDown
const user = document.querySelector('.dropdown-user');
const list = document.querySelector('.dropdown-list');

user.addEventListener('mouseover', function () {
    list.style.display = "block";
});

user.addEventListener('mouseout', function () {
    list.style.display = "none";
});

//   Menu Start
