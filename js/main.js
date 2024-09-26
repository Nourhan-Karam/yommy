/// <reference types="../@types/jquery" />
const itemRow = document.getElementById("itemRow");
const Categories =document.getElementById('Categories')
const Area =document.getElementById('Area')
const Ingredients =document.getElementById('Ingredients')
const search =document.getElementById('search')
const containerSearch=document.getElementById('containerSearch')
const Contact=document.getElementById('Contact')
let btnSubmit ;
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;
function openSite() {
  let boxWidth = $(".side-nav-menu .nav-tap").outerWidth();
  $(".side-nav-menu").animate({ left: -boxWidth }, 500);
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
  $(".links li").animate({ top: 300 }, 500);
}
function closeSite() {
  $(".side-nav-menu").animate({ left: 0 }, 500);
  $(".open-close-icon").addClass("fa-x");
  $(".open-close-icon").removeClass("fa-align-justify");

  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}
openSite();
$(".nav-header .close-icone").click(function () {
  if ($(".side-nav-menu").css("left") == "0px") {
    openSite();
  } else {
    closeSite();
  }
});
$('document').ready(()=>{
  searchByName("").then(()=>{
    $('.loding-scren').fadeOut(300)
    $('body').css('overflow','visible')
    $('.inner-lodying-screen').fadeOut(300)
  })

})

// function allMeals 
function displayMeals(arr) {
  openSite()
  cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += ` <div class="col-md-3">
          <div onclick='getMealId("${arr[i].idMeal}")' class="p-2 cursor-pointer item">
            <div class="position-relative overflow-hidden">
              <img
                src="${arr[i].strMealThumb}"
                class="w-100 rounded-3"
                alt="${arr[i].strMeal}"
              />
              <div
                class="text pt-3 d-flex justify-content-center align-items-center rounded-3"
              >
                <h2 class='pt-3'>${arr[i].strMeal}</h2>
              </div>
            </div>
          </div>
        </div>`;
  }
  itemRow.innerHTML = cartoona;
}
// function categorise//
async function categories(){
 $('.inner-lodying-screen').fadeIn(300)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let finalResponse =await response.json()
  displayCategories(finalResponse.categories)
  $('.inner-lodying-screen').fadeOut(300)
}
function displayCategories(arr){
  containerSearch.innerHTML=''
  cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += ` <div class="col-md-3">
          <div onclick='filterCategories("${arr[i].strCategory}")' class="p-3 cursor-pointer item">
            <div class="position-relative overflow-hidden">
              <img
                src="${arr[i].strCategoryThumb
                }"
                class="w-100 rounded-4"
                alt="${arr[i].
                  strCategory
                  }"
              />
              <div
                class="text p-4 text-center rounded-3"
              >
                <h2  >${arr[i].
                  strCategory
                  }</h2>
                   <p>${arr[i].strCategoryDescription.split(" ").splice(0, 15).join(' ')}</p>
              </div>
              

            </div>
          </div>
        </div>`;
  }
  itemRow.innerHTML = cartoona;
}
Categories.addEventListener('click',function(){
  categories()
  openSite()
  
})
 async function filterCategories(cate){
  $('.inner-lodying-screen').fadeIn(300)
  let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cate}`)
  let finalResponse = await response.json()
    displayMeals(finalResponse.meals.splice(0,20))
    $('.inner-lodying-screen').fadeOut(300)
}
// function area  //
async function area(){
  $('.inner-lodying-screen').fadeIn(300)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  let finalRe4sponse =await response.json()
  
    displayArea(finalRe4sponse.meals)
    $('.inner-lodying-screen').fadeOut(300)
}
function displayArea(arr){
  containerSearch.innerHTML=''
  cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += ` <div class="col-md-3">
          <div onclick=' filterArea("${arr[i].strArea}")' class="p-3 cursor-pointer item">
            <div>
      
              <div
                class="text-white text-center rounded-4"
              >
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h2>${arr[i].strArea}</h2>
              </div>
            </div>
          </div>
        </div>`;
  }
  itemRow.innerHTML = cartoona;
}
Area.addEventListener('click',function(){
  area()
  openSite()})
 async function filterArea(are){
  $('.inner-lodying-screen').fadeIn(300)
  let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${are}`)
  let finalResponse=await response.json()
    displayMeals(finalResponse.meals.splice(0,20))
    $('.inner-lodying-screen').fadeOut(300)
  
  }
// function Ingredients
 async function ingredients(){
  $('.inner-lodying-screen').fadeIn(300)
  let response =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  let finalResponse = await response.json()

  displayIngredients(finalResponse.meals.splice(0,20))
  $('.inner-lodying-screen').fadeOut(300)
  
 }
 function displayIngredients(arr){
  containerSearch.innerHTML=''
  cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += ` <div class="col-md-3">
          <div onclick=' filterIngredients("${arr[i].strIngredient}")' class="p-3 cursor-pointer item">
            <div>
      
              <div
                class="text-white text-center rounded-4"
              >
                <i class="fa-solid fa-drumstick-bite fa-4x""></i>
                <h2 class='h3 py-2'>${arr[i].strIngredient}</h2>
                <p>${arr[i].strDescription.split(' ').splice(0 ,15).join(' ')
                }</p>
              </div>
            </div>
          </div>
        </div>`;
  }
  itemRow.innerHTML = cartoona;
}
 Ingredients.addEventListener('click' ,function(){
  ingredients()
  openSite()
 })
async function filterIngredients(ingre){
  $('.inner-lodying-screen').fadeIn(300)
  let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingre}`)
  let finalResponse =await response.json()
  
  displayMeals(finalResponse.meals.splice(0,20))
  $('.inner-lodying-screen').fadeOut(300)
  
 }
async function getMealId(id){
  $('.inner-lodying-screen').fadeIn(300)
  let response =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
     response = await response.json()
     displayDetalise(response.meals[0])
     $('.inner-lodying-screen').fadeOut(300)
  
}
function displayDetalise(meal){
  openSite()
  containerSearch.innerHTML=''
  let ingrediant =''
  for(let i =1 ; i<=20 ; i++){
    if(meal[`strIngredient${i}`]){
      ingrediant+=` <li class="alert alert-info m-2  p-1"> ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
    }
  }
  let tages = meal.strTags?.split(",")
  if(!tages)tages =[]
  let tagsStr=''
  for(let i=0 ; i< tages.length ; i++){
    tagsStr +=` <li class="alert alert-danger m-2  p-1">${tages[i]}</li>`
  }

 let cartoona = `  <div class="col-md-4 text-white">
          <div>
            <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}" >
            <h2>${meal.strMeal}</h2>
          </div>
        </div>
        <div class="col-md-8 text-white">
          <div>
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
              <h3 class="fw-bold"> Area : <span> ${meal.strArea}</span></h3>
              <h3 class="fw-bold"> Category : <span> ${meal.strCategory}</span></h3>
              <h4>Recipes:</h4>
              <ul class="list-unstyled d-flex flex-wrap">
               
                ${ingrediant}
              </ul>
              <h4>Tags :</h4>
              <ul class="list-unstyled  d-flex flex-wrap">
               ${tagsStr}
              </ul>
              <a target="_blank" href="${meal.strSource}" class="btn btn-success">Sourse</a>
              <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
        </div>`
        itemRow.innerHTML= cartoona;
}
function showSearch(){
  document.getElementById('containerSearch').classList.remove('d-none')

  containerSearch.innerHTML =` <div class="row pt-5">
        <div class="col-md-6">
          <div>
            <input onkeyup="searchByName(this.value)"
              type="text"
              class="form-control mb-1 bg-dark"
              placeholder="Search By Name..."
            />
          </div>
        </div>
        <div class="col-md-6">
          <div>
            <input
             onkeyup="searchByLetter(this.value)"
             maxlength="1"
              type="text"
              class="form-control mb-1 bg-dark"
              placeholder="Search By Name..."
            />
          </div>
        </div>
      </div>`
      itemRow.innerHTML=''
}
async function searchByLetter(trem){
  $('.inner-lodying-screen').fadeIn(300)
  trem==''? trem= 'a':'';
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${trem}`)
  let finalResponse = await response.json()
  finalResponse.meals? displayMeals(finalResponse.meals): displayMeals([])
  $('.inner-lodying-screen').fadeOut(300)
  
}
async function searchByName(trem){
  $('.inner-lodying-screen').fadeIn(300)
  itemRow.innerHTML=''
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${trem}`)
  let finalResponse = await response.json()
  finalResponse.meals? displayMeals(finalResponse.meals): displayMeals([])
  $('.inner-lodying-screen').fadeOut(300)
}
search.addEventListener('click',function(){
  showSearch();
  openSite()

})
function showContact(){
  itemRow.innerHTML=` <section  class=" cotact  min-vh-100 d-flex justify-content-center align-items-center">
      <div class="container w-50 text-center">
        <div class="row  g-4 ">
       
          <div class="col-md-6">
            <div class="justify-content-between align-items-center">
            <input id='nameInput' oninput="validitionInputs()" type="text" class="form-control bg-transparent" placeholder="Enter Your Name">
              <div  id="alertMessageName" class="alert w-100 mt-1 alert-danger d-none p-3">Special characters and numbers not allowed</div>

            </div>
          </div>

          <div class="col-md-6">
            <div>
              <input id='emailInput'  oninput="validitionInputs()" type="email" class="form-control bg-transparent" placeholder="Enter Your Email">
                <div  id="alertMessageEmail" class="alert w-100 mt-1 alert-danger d-none p-3">Email not valid *exemple@yyy.zzz</div>
              </div>
          </div>
        
          <div class="col-md-6">
            <div>
              <input id='phoneInput' oninput="validitionInputs()" type="number" class="form-control bg-transparent" placeholder="Enter Your Phone">
                <div  id="alertMessagePhone" class="alert w-100 mt-1 alert-danger d-none p-3">Enter valid Phone Number</div>

              </div>
          </div>
          <div class="col-md-6">
            <div>
              <input id='ageInput' oninput="validitionInputs()" type="number" class="form-control bg-transparent" placeholder="Enter Your Age">
            <div  id="alertMessageAge" class="alert w-100 mt-1 alert-danger d-none p-3"> Enter valid age </div>
              </div>
          </div>
          <div class="col-md-6">
            <div>
              <input id='passwordInput'  oninput="validitionInputs()" type="password" class="form-control bg-transparent" placeholder="Enter Your Password">
            <div  id="alertMessagePassword" class="alert w-100 mt-1 alert-danger d-none p-3"> Enter valid password *Minimum eight characters, at least one letter and one number:* </div>
              </div>
          </div>
          <div class="col-md-6">
            <div>
              <input id='repasswordInput' oninput="validitionInputs()" type="password" class="form-control bg-transparent" placeholder="Enter Your RePassword">
             <div  id="alertMessagerePassword" class="alert w-100 mt-1 alert-danger d-none p-3"> Enter valid repassword </div>

              </div>
          </div>
          
      </div>
      <button id='btnSubmit' disabled class="btn  btn-outline-danger mt-5">submit</button>
      </div>
    
    </section> `
   btnSubmit =document.getElementById('btnSubmit')
   document.getElementById('containerSearch').classList.add('d-none')
   

}
Contact.addEventListener('click',function(){
  showContact()
  openSite()

})
function validitionInputs(){
  if(nameInputTouched){
    if(nameValidition()){
      document.getElementById('nameInput').classList.add('is-valid')
      document.getElementById('nameInput').classList.remove('is-invalid')
  
      document.getElementById('alertMessageName').classList.add('d-none')
    }else{
      document.getElementById('nameInput').classList.add('is-invalid')
      document.getElementById('nameInput').classList.remove('is-valid')
  
      document.getElementById('alertMessageName').classList.remove('d-none')
    }
  }
  if(emailInputTouched){
    if(emailValidition()){
      document.getElementById('emailInput').classList.add('is-valid')
      document.getElementById('emailInput').classList.remove('is-invalid')
  
      document.getElementById('alertMessageEmail').classList.add('d-none')
    }else{
      document.getElementById('emailInput').classList.add('is-invalid')
      document.getElementById('emailInput').classList.remove('is-valid')
  
      document.getElementById('alertMessageEmail').classList.remove('d-none')
    }
  }
  if(phoneInputTouched){
    if(phoneValidition()){
      document.getElementById('phoneInput').classList.add('is-valid')
      document.getElementById('phoneInput').classList.remove('is-invalid')
  
      document.getElementById('alertMessagePhone').classList.add('d-none')
    }else{
      document.getElementById('phoneInput').classList.add('is-invalid')
      document.getElementById('phoneInput').classList.remove('is-valid')
  
      document.getElementById('alertMessagePhone').classList.remove('d-none')
    }
  
  }
  if(ageInputTouched){
    if(ageValidition()){
      document.getElementById('ageInput').classList.add('is-valid')
      document.getElementById('ageInput').classList.remove('is-invalid')
  
      document.getElementById('alertMessageAge').classList.add('d-none')
    }else{
      document.getElementById('ageInput').classList.add('is-invalid')
      document.getElementById('ageInput').classList.remove('is-valid')
  
      document.getElementById('alertMessageAge').classList.remove('d-none')
    }
  }
  if(passwordInputTouched){
    if(passwordValidition()){
      document.getElementById('passwordInput').classList.add('is-valid')
      document.getElementById('passwordInput').classList.remove('is-invalid')
  
      document.getElementById('alertMessagePassword').classList.add('d-none')
    }else{
      document.getElementById('passwordInput').classList.add('is-invalid')
      document.getElementById('passwordInput').classList.remove('is-valid')
  
      document.getElementById('alertMessagePassword').classList.remove('d-none')
    }
  }
  if(repasswordInputTouched){
    if(repasswordValidition()){
      document.getElementById('repasswordInput').classList.add('is-valid')
      document.getElementById('repasswordInput').classList.remove('is-invalid')
  
      document.getElementById('alertMessagerePassword').classList.add('d-none')
    }else{
      document.getElementById('repasswordInput').classList.add('is-invalid')
      document.getElementById('repasswordInput').classList.remove('is-valid')
  
      document.getElementById('alertMessagerePassword').classList.remove('d-none')
    } 
  }
  document.getElementById('nameInput').addEventListener('focus' ,()=>{
    nameInputTouched = true;
  })
  document.getElementById('emailInput').addEventListener('focus' ,()=>{
    emailInputTouched = true;
  })
  document.getElementById('phoneInput').addEventListener('focus' ,()=>{
    phoneInputTouched = true;
  })
  document.getElementById('ageInput').addEventListener('focus' ,()=>{
    ageInputTouched = true;
  })
  document.getElementById('passwordInput').addEventListener('focus' ,()=>{
    passwordInputTouched = true;
  })
  document.getElementById('repasswordInput').addEventListener('focus' ,()=>{
    repasswordInputTouched = true;
  })
  if(nameValidition()&& emailValidition()&& phoneValidition()&& ageValidition()&& passwordValidition()&& repasswordValidition() == true){
    btnSubmit.removeAttribute('disabled')
    
}else{
  btnSubmit.setAttribute('disabled' , true)
}}
function nameValidition(){
  return (/^[a-zA-Z ]+$/.test(document.getElementById('nameInput').value))
}
function emailValidition(){
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById('emailInput').value))
}
function phoneValidition(){
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById('phoneInput').value))
}
function ageValidition(){
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById('ageInput').value))
}
function passwordValidition(){
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById('passwordInput').value))
}
function repasswordValidition(){
  return document.getElementById('passwordInput').value == document.getElementById('repasswordInput').value
}