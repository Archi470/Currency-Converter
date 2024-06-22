const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const BaseURL ="https://api.fxratesapi.com/latest"

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name=="from" && currCode=="USD"){
            newOption.selected="selected";
        }
        else if(select.name=="to" && currCode=="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);       
    }

    select.addEventListener("change",(eve)=>{
        updateFlag(eve.target);
    });
}


const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

const updateExchangeRate= async ()=>{
    let amount=document.querySelector("input");
    let amtVal=amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    let response=await fetch(BaseURL);
    let data =await response.json();
    let rate=data.rates;
    let toVal=rate[toCurr.value];
    let fromVal=rate[fromCurr.value];
    let conversion=toVal/fromVal;
    let finalAmount=conversion*amtVal;

    msg.innerText=`1 ${fromCurr.value} = ${conversion.toFixed(5)} ${toCurr.value}\n
           ${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(5)} ${toCurr.value}`;
};

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});