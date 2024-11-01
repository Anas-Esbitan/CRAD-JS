let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads =document.getElementById('ads');
let diccount =document.getElementById('diccount');
let total =document.getElementById('total');
let count=document.getElementById('count');
let category =document.getElementById('category')
let submit=document.getElementById('submit');
let mode ='create';
let tdr;
// console.log(title,price,taxes,ads,diccount,total,count,category,submit);

function gettotal(){

if(price.value != ''){
    let result =(+price.value + +taxes.value + +ads.value ) - +diccount.value;
    total.innerHTML=result;
    total.style.background='#040'
}else{
    total.innerHTML= ' ';
    total.style.background ='#a00d02'
   
}
}
//creart prodact
let dataprod;
if (localStorage.prodact != null){
    dataprod =JSON.parse(localStorage.prodact)
}else{
    dataprod =[];
}


submit.onclick=function(){
    let newprd={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        diccount:diccount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,

    };

    if (mode === 'create'){

        if(newprd.count > 1 ){
            for(let i =0; i<newprd.count; i++){
                dataprod.push(newprd);
        
            }
        }else{
            dataprod.push(newprd);
        }
    }else{
        dataprod[tdr]=newprd;
        mode='create';
        submit.innerHTML ='create';
        count.style.display = 'block';

    }
    // Save LOcalstorage
    dataprod.push(newprd);
    localStorage.setItem('prodact', JSON.stringify(dataprod))
    cleardata()
    showData()
    
}

function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    diccount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';

}
//read Data

function showData()
 {
    gettotal();
    let tablel = ' ' ;
    for(let i =1 ;i<dataprod.length;i++){
        tablel+=`
            <tr>
        <td>${i}</td>
        <td>${dataprod[i].title}</td>
        <td>${dataprod[i].price}</td>
        <td>${dataprod[i].taxes}</td>
        <td>${dataprod[i].ads}</td>
        <td>${dataprod[i].diccount}</td>
        <td>${dataprod[i].total}</td>
        <td>${dataprod[i].category}</td>

        <td><button onclick="ubdateData(${i})" id="update">update</button></td>
        <td><button onclick="DeletData( ${i})" id="delet">delet</button></td>
        
    </tr>`


    }

    document.getElementById('tbody').innerHTML=tablel;
    let btnDelet =document.getElementById("deletAll");
if(dataprod.length > 0){
    btnDelet.innerHTML=`
    <button onclick ="deletAll()">deletAll ${dataprod.length}</button>
    `
}else{
    btnDelet.innerHTML= '';
}
}
showData()

//DeletData
function DeletData(i){
     dataprod.splice(i,1)
     localStorage.prodact= JSON.stringify(dataprod);

      showData()
}
function deletAll(){
    localStorage.clear();
    dataprod.splice(0);
    showData()
}
//count creat
function ubdateData(i){
    title.value = dataprod[i].title;
    price.value = dataprod[i].price;
    taxes.value = dataprod[i].taxes;
    ads.value   = dataprod[i].ads;
    diccount.value =dataprod[i].diccount;
    gettotal()
    count.style.display= 'none' ;
    category.value =dataprod[i].category;
    submit.innerHTML='update';
    mode ='update';
    tdr = i ;
    scroll({
    top:0,
behavior:"smooth",
})
}
