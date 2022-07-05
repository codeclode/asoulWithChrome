var searchId = chrome.runtime.getURL("").replaceAll("/", "").replaceAll(":", "");

var changeColor = function () {
    if (document.getElementById(chrome.runtime.getURL("") + "mask")) {
        document.getElementById(chrome.runtime.getURL("") + "mask").remove();
    } else {
        chrome.storage.sync.get("color", (ret) => {
            var color = ret["color"];
            var mask = document.createElement("div");
            mask.style.backgroundColor = color;
            mask.style.position = "fixed";
            mask.style.height = "100vh";
            mask.style.width = "100vw";
            mask.style.left = 0;
            mask.style.top = 0;
            mask.style.opacity = 0.2;
            mask.style.pointerEvents = "none";
            mask.style.zIndex = 9999;
            mask.setAttribute("id", chrome.runtime.getURL("") + "mask");
            document.body.append(mask);
        });
    }
};

var addSearchListener = function () {

    var searchApp = document.getElementById(searchId);
    var searchInputDOM = document.getElementById("searchExtension");
    var searchWays = document.getElementsByName("searchWay");
    var btn = document.getElementById("btnToCloseSearch");
    var way = "baidu";

    setTimeout(() => {
        try {
            searchInputDOM.focus();
        } catch (e) { }
    }, 200);
    searchInputDOM.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            if (searchInputDOM.value.trim() !== "") {
                searchWays.forEach((value) => {
                    if (value.checked == true) {
                        way = value.getAttribute("value");
                    }
                });
                var value = searchInputDOM.value;
                switch (way) {
                    case "google": {
                        window.open("https://www.google.com/search?q=" + value);
                        break;
                    }
                    case "baidu": {
                        window.open("https://www.baidu.com/s?wd=" + value);
                        break;
                    }
                    case "bilibili": {
                        window.open("https://search.bilibili.com/all?keyword=" + value);
                        break;
                    }
                }
            }
        }
    });

    btn.addEventListener("click", () => {
        searchApp.remove();
    });
};

var showSearch = function () {

    if (document.getElementById(searchId)) {
        return;
    }
    var searchApp = document.createElement("div");
    var style = document.createElement("style");

    style.setAttribute("id", searchId + "style");
    searchApp.setAttribute("id", searchId);
    searchApp.innerHTML = `
    <div id="searchCon">
        <input type="text" placeholder="asoul搜🔍" id="searchExtension">
        <div id="setASOULSearch">
            <label class="radioGroup">
                <input type="radio" value="baidu" checked name="searchWay">
                <span>百度</span> 
            </label>
            <label class="radioGroup">
                <input type="radio" value="google" name="searchWay">
                <span>谷歌</span> 
            </label>
            <label class="radioGroup">
                <input type="radio" value="bilibili" name="searchWay">
                <span>哔哩哔哩</span> 
            </label>
            <button id="btnToCloseSearch">关闭</button>
        </div>
    </div>`;
    style.innerHTML = `

    #${searchId} #searchCon {
        z-index: 9999;
        position: fixed;
        left: 50%;
        top: 30%;
        transform: translateX(-50%);
        opacity: 0.8;
    }
    
    #${searchId} #searchCon #searchExtension {
        width: 70vw;
        height: 10vh;
        font-size: 6vh;
        border: 1px solid rgb(252, 191, 233);
        outline-style: none;
        box-shadow: 0 0 20px rgb(252, 191, 233);
        border-radius: 4px 4px 0 0;
    }
    
    #${searchId} #searchCon input[type="radio"] {
        width: 3vw;
        height: 3vw;
        pointer-events: none;
    }
    
    #${searchId} #setASOULSearch{
        display: flex;
        justify-content: space-between;
    }
    
    #${searchId} .radioGroup {
        background-color: rgb(252, 193, 235);
        box-shadow: 0 0 20px rgb(252, 191, 233);
        border-radius: 0 0 4px 4px;
        font-size: 3vw;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
    }
    
    #${searchId} #btnToCloseSearch {
        background-color: #fff;
        box-shadow: 0 0 20px rgb(252, 191, 233);
        border-radius: 0 0 4px 4px;
        float: right;
        outline-style: none;
        border: 0;
        cursor: pointer;
        font-size: 3vw;
        transition: all 0.3s ease;
    }
    
    #${searchId} #btnToCloseSearch:hover {
        background-color: rgb(252, 193, 235);
        outline-style: none;
        border: 0;
        cursor: pointer;
        color:white;
    }`;
    document.body.appendChild(searchApp);
    searchApp.focus();
    if (!document.getElementById(searchId + "style")) {
        document.head.appendChild(style);
    }
    addSearchListener();
};

chrome.storage.sync.get(["autoSet"], async (ret) => {
    if (ret["autoSet"] == true) {
        changeColor();
    }
});

chrome.storage.sync.get(["quickSearch"], async (ret) => {
    if (ret["quickSearch"] == true) {
        document.addEventListener("keydown", (e) => {
            if (e.shiftKey && (e.key == "s" || e.key == "S")) {
                if (document.getElementById(searchId)) {
                    if (document.getElementById(searchId) !== document.activeElement)
                        document.getElementById(searchId).remove();
                } else {
                    showSearch();
                }
            }
        });
    }
});