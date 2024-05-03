
var infosAPI = 'http://localhost:3000/infomation/';

// hanleEven
clickHandleEventListInfos = function () {
    var btnOpenList = document.querySelector('.open-listInfo')
    var btnCloseList = document.querySelector('.close-listInfo')
    btnOpenList.onclick = function () {
        document.querySelector('.list-info').style.display = '';
        btnOpenList.style.display = 'none';
        btnCloseList.style.display = 'block';
    }
    btnCloseList.onclick = function () {
        document.querySelector('.list-info').style.display = 'none';
        btnOpenList.style.display = 'block';
        btnCloseList.style.display = 'none';
    }
}

function handleCreateForm() {
    var createBtn = document.querySelector('.createInfo');
    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var carNum = document.querySelector('input[name="carNumber"]').value;
        var phoneNum = document.querySelector('input[name="phoneNumber"]').value;
        var type = document.querySelector('select[name="type"]').value;
        var years = document.querySelector('input[name="years"]').value;
        var size = document.querySelector('input[name="size"]').value;

        var formData = {
            name: name,
            carNum: carNum,
            phoneNum: phoneNum,
            type: type,
            years: years,
            size: size,
        }

        // createInfo(formData);
        if (name === "" || carNum === "" || phoneNum === "" || type === "" || years === "" || size === "") {
            alert('Vui lòng điền đầy đủ thông tin')
        } else {
            createInfo(formData);
        }
    }
}







function clickToShowBoxInfo() {
    var showBoxInfos = document.querySelectorAll('.linkInfo');
    console.log(showBoxInfos)
    // showBoxInfos.forEach(function (showBoxInfo) {
    //     showBoxInfo.addEventListener('click', function (event) {
    //         // Ngăn chặn hành động mặc định của liên kết
    //         event.preventDefault();

    //         // Lấy id của phần tử <a> được click
    //         var id = this.id;

    //         // In ra id của phần tử <a> được click
    //         console.log('ID của liên kết được click là: ' + id);

    //         // Hoặc bạn có thể thực hiện các thao tác khác dựa trên id ở đây
    //     });
    // })
}
function getInfoById(callback, id) {
    fetch(infosAPI + "/" + id)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function renderBoxInfo(info) {
    var boxInfoBlock = document.querySelector('.box-info');
    var boxInfo = `
    <table class="customer-info">
    <caption>Thông tin khách hàng</caption>
    <tr>
        <th>Tên khách hàng</th>
        <td>${info.name}</td>
    </tr>
    <tr>
        <th>Biển số xe</th>
        <td>${info.carNum}</td>
    </tr>
    <tr>
        <th>SDT</th>
        <td>${info.phoneNum}</td>
    </tr>
</table>
<table class="tire-info">
    <caption>Thông tin lốp xe</caption>
    <tr>
        <th>Hãng (lốp xe)</th>
        <td>${info.type}</td>
    </tr>
    <tr>
        <th>Size</th>
        <td>${info.size}</td>
    </tr>
    <tr>
        <th>Đời lốp xe</th>
        <td>${info.years}</td>
    </tr>
</table>
    `;
    boxInfoBlock.innerHTML = boxInfo;
}

function getInfo(callback) {
    fetch(infosAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function renderListInfos(infos) {
    var listInfoBlock = document.querySelector('.list-info');
    var tableMenu = `
    <tr>
        <th>Mã</th>
        <th>Tên khách hàng</th>
        <th>Biển số</th>
        <th>Hãng (lốp xe)</th>
    </tr>
    `;
    var tableRender = infos.map(function (info) {
        return `
        <tr class="linkInfo" id="${info.id}">
            <td>${info.id}</td>
            <td>${info.name}</td>
            <td>${info.carNum}</td>
            <td>${info.type}</td>
        </tr>
        `;
    })
    var htmls = tableMenu + tableRender.join('');
    listInfoBlock.innerHTML = htmls;
}

function createInfo(data) {
    var option = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(infosAPI, option)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

//start
function start() {
    clickToShowBoxInfo();

    getInfo(renderListInfos);
    clickHandleEventListInfos();
    handleCreateForm();
}

start();
