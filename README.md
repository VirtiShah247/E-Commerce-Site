# E-Commerce-Site
## Introduction
It is an E-Commerce Site built using React for frontend and Firebase for backend which in the future will be developed with the help of full MERN Stack and then with Next.Js.

## Features
### Navbar
- It has logo, category links, search option, profile, wishlist and cart buttons.
- Profile has login signup button
- For mobile view, links and login signup are shown vertically when hamburger menu is clicked.
- Search input field is replaced with search icon button which when clicked, shows full input field upon navbar.

### Register/Login
- New users can register via email or mobile number and set a new password.
- After verifying through OTP, users are registered.
- Old users can login through either email or mobile number and password.
- Also during registration, the user's location access permission is also asked to suggest clothes according to their country. For example, if a user is Indian then Indian clothes will be suggested which will not be suggested to a user sitting in the USA.

### Landing page slider
- It has two static full width image slider.
- On image loading, loading div is shown

### products
- It has products coming from firebase database.
- Each card of products have image, product name, price, color options, and button to add it in whislist.
- On loading of image, loading state is shown.
- Each image in card is loaded when user scrolls to that card.

### Product description
- It has product images shown in left and its description in right.
- It shows product name, price, memberprice if their, color name, slider to show color options of this product, sizes, add to cart button, and accrodion of description and fit, materials, and care guide.
- Images are shown in grid view and in mobile they are shown using slider.

### Footer
- It has a email input field to send email, Social media links and other links like about us, contact us, etc.

## Tech Stack
- React
- firebase
- tailwind css
- vite
- API

## Usage
```bash
git clone https://github.com/VirtiShah247/EFashionia
cd Efashionia/frontend
npm install
npm run dev
