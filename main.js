
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let category=document.getElementById('Category');
let Submit=document.getElementById('submit');
let count=document.getElementById('count');
//console.log(count,title,price,taxes,ads,discount,total,category,Submit);      
let mood='create';
let temp;




//get total

function getTotal(){
    if(price.value!= ' '){
        let result =( +price.value + +taxes.value + +ads.value)  +-discount.value ;
        total.innerHTML=result;
        total.style.background='#040';


    }
    else{
        total.innerHTML= '';
        total.style.background=' #a00d02';

    }
}
//create product
let dataProduct;
if(localStorage.dataProduct!=null){
    dataProduct=JSON.parse(localStorage.dataProduct);
}
else{
    dataProduct=[];
}

submit.onclick=function(){
    let newproduct={
        title:title.value .toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML, //not input
        category:category.value .toLowerCase(),
        count:count.value,
    };
    //console.log(newproduct);
    if(title.value=='' && price.value=='' && taxes.value=='' && ads.value=='' && discount.value=='' && total.innerHTML=='' && category.value=='' && count.value==''){
    if(newproduct.count >1){
        if(mood==='create'){


            for(let i=0;i<newproduct.count;i++){
                dataProduct.push(newproduct);
            }
    
        }
        else{
        dataProduct.push(newproduct);
        }

    }else{
        clearData();
    }
}

   // console.log(dataProduct);
   //save localstorage
   localStorage.setItem('dataProduct',JSON.stringify(dataProduct));
   clearData();
   ShowData();

}


//clear input
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    category.value='';
    count.value='';


}
//read
function ShowData(){
    getTotal();
   
    let table = '';
    for(let i=0;i<dataProduct.length;i++){
        table+=`<tr>
        <td>${i+1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td>${dataProduct[i].count}</td>
        <td><button onclick="deleteProduct(${i})">Delete</button></td>
        <td><button onclick="updateProduct(${i})">Update</button></td>
        </tr>`;
       
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDeleteAll=document.getElementById('deleteAll');
    if(dataProduct.length>0){
        btnDeleteAll.innerHTML=`<button onclick="deleteAll();">Delete All</button>`;

    }
    else{
        btnDeleteAll.innerHTML='';
    }

}

ShowData();
 
//delete product
function deleteProduct(index){
    dataProduct.splice(index,1);
    localStorage.setItem('dataProduct',JSON.stringify(dataProduct));
    ShowData();
}
//delete all
function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0);
    ShowData();
}


//update product
 function updateProduct(i){
  title.value=dataProduct[i].title;
  price.value=dataProduct[i].price;
  taxes.value=dataProduct[i].taxes;
  ads.value=dataProduct[i].ads;
  discount.value=dataProduct[i].discount;
  category.value=dataProduct[i].category;
   getTotal();
   count.style.display='none';
   Submit.innerHTML='Update';
   mood='update';
   temp=i;
   scroll({
    top:0,
    behavior:'smooth'       
   })
 }
//search
let searchMode = 'title';
function getSearchMood(id){
    //console.log(id);
    let search=document.getElementById('Search');
    if(id == 'SearchTitle'){
        searchMode='title';
                   

    }else{
        searchMode='category';
       ;    

    }
    //console.log(searchMode);
    search.placeholder='Search By' + searchMode;  
    search.focus();
    search.value='';
    ShowData();


}

function searchData(value){

    //console.log(value); 
    if(searchMode == 'title'){
        for(let i=0;i<dataProduct.length;i++){
            if(dataProduct[i].title.includes(value)){
                table+=`<tr>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td>${dataProduct[i].count}</td>
                <td><button onclick="deleteProduct(${i})">Delete</button></td>
                <td><button onclick="updateProduct(${i})">Update</button></td>
                </tr>`;
            }

        }

    }else{

        for(let i=0;i<dataProduct.length;i++){
            if(dataProduct[i].category.includes(value)){
                table+=`<tr>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td>${dataProduct[i].count}</td>
                <td><button onclick="deleteProduct(${i})">Delete</button></td>
                <td><button onclick="updateProduct(${i})">Update</button></td>
                </tr>`;
            }

        }

    }
    document.getElementById('tbody').innerHTML=table;

}













//clean data

