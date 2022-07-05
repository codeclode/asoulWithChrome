chrome.commands.onCommand.addListener((command) => {
    if (command === "quickRun") {
        chrome.storage.sync.get(["quickRun"], async (ret) => {
            if (ret["quickRun"] == true) {
                var page = Math.round(Math.random() * 3) + 1;
                chrome.storage.sync.get(["runContent"], function (ret) {
                    value = ret["runContent"];
                    fetch(`https://api.bilibili.com/x/web-interface/search/type?search_type=video&order=default&keyword=${value}&page=${page}`)
                        .then(res => {
                            return res.json();
                        }).then(ret => {
                            var len = Math.round(Math.random() * ret.data.result.length);
                            console.log(ret.data.result[len].arcurl);
                            chrome.tabs.create({
                                url: ret.data.result[len].arcurl
                            });
                        });
                });
            }
        });
    }
});