window.onload = () => {
  /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
  let menuIcon = document.getElementById('menu-icon');

  /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
  menuIcon.addEventListener('click' , () => {
    const x = document.getElementById("myTopnav");
    if (x.className === "navbar") {
      x.className += " responsive"; }
    else {
      x.className = "navbar"; }
  });

}
