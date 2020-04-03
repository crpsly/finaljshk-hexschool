const mainintro = document.querySelector('.mainintro');
const areaId = document.querySelector('#areaId');
const hotbtn = document.querySelector('.hotarea');
const maintitle = document.querySelector('#maintitle');

var xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
xhr.send(null);
xhr.onload = function(){
    var data = JSON.parse(xhr.responseText)
    var datause = data.result.records;
    //init
    showdata(datause)
    //下拉式選單製造選項
    optionshow(datause)
}
areaId.addEventListener('change',changeevt,false);
hotbtn.addEventListener('click',changeevt,false);

//下拉式選單製造選項
function optionshow(items){
    optionary = [];
    for(var i = 0;i<items.length;i++){
        var zone = items[i].Zone;
        optionary.push(zone);
    }
    //刪除重複的選項
    var ary =Array.from(new Set(optionary));

    for(let j = 0;j<ary.length;j++){
        const el = document.createElement('option');
        el.setAttribute('value',ary[j]);
        el.textContent = ary[j];
        areaId.appendChild(el);
    }
    
}
//init
function showdata(items){
    str = '';
    for(let i = 0 ;i<items.length;i++){
        const img = items[i].Picture1;
        const name = items[i].Name;
        const zone = items[i].Zone;
        const opentime = items[i].Opentime;
        const addr = items[i].Add;
        const tel = items[i].Tel;
        const ticketinfo = items[i].Ticketinfo;
        str += `<div class="introbox">
        <div class="imgbox" style="background-image: url(${img})">
        <h5>${name}</h5><h6>${zone}</h6>
        </div>
        <p><img src="./asset/img/icons_clock.png">${opentime}</p>
        <p><img src="./asset/img/icons_pin.png">${addr}</p>
        <p><img class="phoneimg" src="./asset/img/icons_phone.png">${tel}</p>
        <p class="tag"><img src="./asset/img/icons_tag.png">${ticketinfo}</p>
        </div>`
    }
    mainintro.innerHTML = str;
}

function changeevt(e){
    const optionbtn = e.target.value;
    
    var data = JSON.parse(xhr.responseText)
    var datause = data.result.records;
    const clickname = e.target.textContent;
    str = '';
    for(let i = 0 ;i<datause.length;i++){
        if(optionbtn == datause[i].Zone || clickname == datause[i].Zone){
            const img = datause[i].Picture1;
            const name = datause[i].Name;
            const zone = datause[i].Zone;
            const opentime = datause[i].Opentime;
            const addr = datause[i].Add;
            const tel = datause[i].Tel;
            const ticketinfo = datause[i].Ticketinfo;
            str += `<div class="introbox">
            <div class="imgbox" style="background-image: url(${img})">
            <h5>${name}</h5><h6>${zone}</h6>
            </div>
            <p><img src="./asset/img/icons_clock.png">${opentime}</p>
            <p><img src="./asset/img/icons_pin.png">${addr}</p>
            <p><img class="phoneimg" src="./asset/img/icons_phone.png">${tel}</p>
            <p class="tag"><img src="./asset/img/icons_tag.png">${ticketinfo}</p>
            </div>`
            maintitle.innerHTML = datause[i].Zone;
        }
    }
    mainintro.innerHTML = str;

}