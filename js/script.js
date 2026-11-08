const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', function(){
    if (window.scrollY>300){
        scrollBtn.style.display='block';
    }else{
        scrollBtn.style.display='none';
    }
});

scrollBtn.addEventListener('click', function(){
    window.scrollTo({top:0, behavior: 'smooth'});
});

//меню
const burgerBtn = document.getElementById('burgerBtn');
const mainNav = document.getElementById('mainNav');
if (burgerBtn && mainNav){
    burgerBtn.addEventListener('click', function(){
        mainNav.classList.toggle('active');
        burgerBtn.classList.toggle('active');
    });
}

//версия для печати
const printBtn = document.getElementById('printBtn');
if(printBtn){
    printBtn.addEventListener('click', function(){
        document.body.classList.toggle('print-mode');
    });
}

//умный фильтр
const objects=[
    {
        id:1,
        title: "Студия",
        type: "Квартира",
        rooms: "Студия",
        price: 5000000,
        area: 65,
        floor: 5,
        img: "images/kv1.jpg"
    },
    {
        id:2,
        title: "1-комн. квартира",
        type: "Квартира",
        rooms: "1",
        price: 2500000,
        area: 42,
        floor: 3,
        img: "images/kv2.jpg"
    },
    {
        id:3,
        title: "2-комн. квартира",
        type: "Квартира",
        rooms: "2",
        price: 4900000,
        area: 80,
        floor: 16,
        img: "images/kv3.jpg"
    },
    {
        id:4,
        title: "3-комн. квартира",
        type: "Квартира",
        rooms: "3",
        price: 5000000,
        area: 100,
        floor: 8,
        img: "images/kv4.jpg"
    },
    {
        id:5,
        title: "Загородный дом",
        type: "Дом",
        rooms: "5",
        price: 15000000,
        area: 190,
        floor: 2,
        img: "images/kv5.jpg"
    },
    {
        id:6,
        title: "Коттедж",
        type: "Дом",
        rooms: "4",
        price: 150000000,
        area: 220,
        floor: 1,
        img: "images/kv6.jpg"
    },
    {
        id:7,
        title: "Дача",
        type: "Дом",
        rooms: "3",
        price: 75000000,
        area: 85,
        floor: 1,
        img: "images/kv7.jpg"
    },
    {
        id:8,
        title: "Дом с участком",
        type: "Дом",
        rooms: "10",
        price: 500000000,
        area: 400,
        floor: 2,
        img: "images/kv8.jpg"
    },
    {
        id:9,
        title: "Студия",
        type: "Квартира",
        rooms: "Студия",
        price: 3000000,
        area: 60,
        floor: 9,
        img: "images/kv9.jpg"
    },
    {   id: 10, 
        title: "Коттедж премиум", 
        type: "Дом", 
        rooms: "6", 
        price: 50000000, 
        area: 400, 
        floor: 3, 
        img: "images/kv2.jpg" 
    },
    {   id: 11, 
        title: "3-комн. квартира", 
        type: "Квартира", 
        rooms: "3", 
        price: 32000000, 
        area: 110, 
        floor: 15, 
        img: "images/kv6.jpg" 
    },
    {   id: 12, 
        title: "Загородный дом", 
        type: "Дом", 
        rooms: "2", 
        price: 15000000, 
        area: 120, 
        floor: 2, 
        img: "images/kv3.jpg"
    }
]

function printObjects(data, selector){
    const itemTemplate=`
                        <div class="object-card">
                            <img src="{{img}}" alt="{{title}}">
                            <div class="object-info">
                                <p class="object-price">{{price}} руб.</p>
                                <p class="object-title">{{title}}</p>
                                <p class="object-address">Москва</p>
                                <div class="object-features">
                                    <span>{{area}} кв.м</span>
                                    <span>{{floor}} этаж</span>
                                </div>
                            </div>
                        </div>`;
    let output='';
    for(let item of data){
        let tmpLine=itemTemplate;

        tmpLine=tmpLine.replace('{{img}}', item.img);
        tmpLine=tmpLine.replaceAll('{{title}}', item.title);
        tmpLine=tmpLine.replace('{{price}}', item.price.toLocaleString());
        tmpLine=tmpLine.replace('{{area}}', item.area);
        tmpLine=tmpLine.replace('{{floor}}', item.floor);

        output+=tmpLine;
    }
    $(selector).html(output);
}

const properties={
    'type': 'Тип объекта',
    'rooms': 'Комнатность',
    'price': 'Цена'
};

function printFilters(data, properties, selector){
    const startTemplate='<div class="filter-group"><h3>{{name}}</h3>';
    const liteTemplate='<label><input type="checkbox" name="{{prop}}" value="{{val}}">{{val}}</label><br>';
    const endTemplate='</div>';

    let output='';
    for(let prop in properties){
        let tmpLine=startTemplate.replace('{{name}}', properties[prop]);
        let vals=[];
        for(let object of data){
            let currentVal=object[prop];
            if(prop==='price'){
                if (currentVal<5000000) currentVal='До 5 млн';
                else if(currentVal<15000000) currentVal='5-15 млн';
                else currentVal='От 15 млн';
            }
            if(!vals.includes(currentVal)) {vals.push(currentVal);}
        }
        vals.sort();

        vals.forEach(function(item, index, array){
            tmpLine+=liteTemplate.replaceAll('{{prop}}', prop).replaceAll('{{val}}', item);
        });
        tmpLine+=endTemplate;
        output+=tmpLine;
    }
    $(selector).html(output);
}

function readCurFilters(selector, properties){
    let result={};
    for (let prop in properties){
        let searchIDs=$(selector + ' input[name="' + prop + '"]:checked').map(function(){
            return $(this).val();
        }).get();
        result[prop]=searchIDs;
    }
    return result;
}

function applyFilters(data, filter, properties){
    let result=[];
    for (let object of data){
        let ok = true;
        for(let prop in properties){
            if (!filter[prop].length)
                continue;
            let val=object[prop];
            if(prop==='price'){
                if (val<5000000) val='До 5 млн';
                else if(val<15000000) val='5-15 млн';
                else val='От 15 млн';
            }
            if (filter[prop].indexOf(val)==-1){ok=false;}
        }
        if (ok){result.push(object);}
    }
    return result;
}

function updateSmartFilter(data, properties){
    $('#filters input').prop('disabled', false);

    for (let prop in properties){
        let curFilter=readCurFilters('#filters', properties);
        let tempFilter=JSON.parse(JSON.stringify(curFilter));
        tempFilter[prop]=[];

        let availableData = applyFilters(data, tempFilter, properties);
        let availableVals=[];
        for(let object of availableData){
            let val=object[prop];
            if(prop==='price'){
                if (val < 5000000) val = 'До 5 млн';
                else if (val < 15000000) val = '5-15 млн';
                else val = 'От 15 млн';
            }
            if (!availableVals.includes(val)){
                availableVals.push(val);
            }
        }
        $('#filters input[name="' + prop + '"]').each(function(){
                let checkboxVal=$(this).val();
                if(!availableVals.includes(checkboxVal)){
                    $(this).prop('disabled', true);
                }
            });
    }
}

document.addEventListener('DOMContentLoaded', function(){
    if(document.getElementById('objectsGrid')){
        printObjects(objects, '#objectsGrid');
        printFilters(objects,properties,'#filters');
        $('#filters input').change(function(){
            let curFilter=readCurFilters('#filters', properties);
            let filteredObjects=applyFilters(objects,curFilter,properties);
            printObjects(filteredObjects, '#objectsGrid');
            updateSmartFilter(objects,properties);
        });
    }
});