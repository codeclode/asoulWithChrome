var searchDOM = document.getElementById("search");
var changeBGDOM = document.getElementById("changeBG");
var installDOM = document.getElementById("install");
var aboutASOULDOM = document.getElementById("aboutASOUL");
var videoDOM = document.getElementById("ASOULvideo");
var asoulgameDOM = document.getElementById("ASOULgame");
var keyWords = ["asoul","贝拉","珈乐","向晚","乃琳","嘉然"];

searchDOM.addEventListener("click",async ()=>{
    function inject() {
        showSearch();
    }
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: inject
    });
});

changeBGDOM.addEventListener("click", async () => {
    function inject() {
        changeColor();
    }
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: inject
    });
});

videoDOM.addEventListener("click",()=>{
    var i = Math.round(Math.random()*5);
    fetch("https://api.bilibili.com/x/web-interface/search/type?search_type=video&order=default&keyword="+keyWords[i]+" asoul")
    .then(res=>{
        return res.json();
    }).then(ret=>{
        var len =Math.round(Math.random()*ret.data.result.length);
        window.open(ret.data.result[len].arcurl);
    });
});

aboutASOULDOM.addEventListener("click",()=>{
    window.location.href = "../pages/waiting.html";
});

installDOM.addEventListener("click", () => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('../pages/options.html'));
    }
});
