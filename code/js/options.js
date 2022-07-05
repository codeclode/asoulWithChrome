window.onload = () => {
    var quickSearchDOM = document.getElementById("quickSearch");
    var quickRunDOM = document.getElementById("quickRun");
    var colorDOM = document.getElementById("mainColor");
    var autoSetColorDOM = document.getElementById("autoSetColor");
    var submit = document.getElementById("submit");
    var reset = document.getElementById("reset");
    var radios = document.getElementsByName("setOnce");
    var runContentDOM = document.getElementById("RunContent");
    var successTip = document.getElementById("success");

    chrome.storage.sync.get(["color"], function (ret) {
        colorDOM.value = ret["color"];
        radios.forEach((value)=>{
            if(value.value===ret["color"]){
                colorDOM.setAttribute("data-asoul","true");
                value.checked=true;
            }
        });
    });

    chrome.storage.sync.get(["autoSet"], function (ret) {
        autoSetColorDOM.checked = ret["autoSet"];
    });

    chrome.storage.sync.get(["quickSearch"], function (ret) {
        quickSearchDOM.checked = ret["quickSearch"];
    });

    chrome.storage.sync.get(["quickRun"], function (ret) {
        quickRunDOM.checked = ret["quickRun"];
    });

    chrome.storage.sync.get(["runContent"], function (ret) {
        runContentDOM.value = ret["runContent"]||"";
    });

    submit.addEventListener("click", (e) => {
        e.preventDefault();
        var quickSearch = quickSearchDOM.checked;
        var color = colorDOM.value;
        var autoSet = autoSetColorDOM.checked;
        var quickRun = quickRunDOM.checked;
        var runContent = runContentDOM.value.trim()!=""?runContentDOM.value:"asoul";
        chrome.storage.sync.set({ color : color,quickSearch:quickSearch,quickRun:quickRun,runContent:runContent, autoSet:autoSet}, function () {
            console.log('Color is set to ' + color);
            console.log('autoSet is set to ' + autoSet);
            console.log('quickSearch is set to ' + quickSearch);
            console.log('runContent is set to ' + runContent);
            console.log('quickRun is set to ' + quickRun);
        });
        successTip.style.opacity = '0.8';
        successTip.style.display = "block";
        var timeCount = setInterval(() => {
            successTip.style.opacity-=0.05;
            if(successTip.style.opacity<=0){
                successTip.style.display = "none";
                clearInterval(timeCount);
            }
        }, 50);
    });

    radios.forEach((value)=>{
        value.addEventListener("input",()=>{
            color = value.getAttribute("value");
            colorDOM.value = color;
            colorDOM.setAttribute("data-asoul","true");
        });
    });

    colorDOM.addEventListener("input",()=>{
        if((colorDOM.getAttribute("data-asoul"))=="true"){
            colorDOM.setAttribute("data-asoul","false");
            radios.forEach((value)=>{
                if(value.checked==true) value.checked=false;
            });
        }
    });

    reset.addEventListener("click",()=>{
        quickSearchDOM.checked = true;
        autoSetColorDOM.checked = false;
        runContentDOM.value = "";
        quickRunDOM.checked = false;
        colorDOM.value = "#000000";
        radios.forEach((value)=>{
            value.checked = false;
        });
    });
};