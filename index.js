var btn = document.getElementById('btn');
var listBox = document.getElementById('listBox');
var selectPref;
const text = document.getElementById('text')
const research = document.getElementById('res')
var script = document.createElement('script');

//「検索ボタン」クリック時にJSONデータ読み込み
btn.addEventListener('click', function () {
    var selected = document.getElementsByName('pref_name')[0];

    listBox.textContent = "データを検索中…";
    script.src = "http://linkdata.org/api/1/rdf1s2861i/roadside_station_rdf.json?callback=jsonData";
    document.body.appendChild(script);
    document.body.removeChild(script);

    //選択された都道府県を取得
    selectPref = selected.options[selected.selectedIndex].value;
});

research.addEventListener('click', () => {
    script.src = "http://linkdata.org/api/1/rdf1s2861i/roadside_station_rdf.json?callback=jsonData";
    document.body.appendChild(script);
    document.body.removeChild(script);
})

var pref = "http://imi.ipa.go.jp/ns/core/rdf#都道府県";
var spot = "http://imi.ipa.go.jp/ns/core/rdf#名称";

//コールバックされたJSONデータを取得
function jsonData(data) {
    console.log(data)
    //必要なデータURLをあらかじめ取得

    listBox.textContent = "";
    for (var item in data) {

        //選択された都道府県と一致するデータのみ抽出
        if (data[item][pref][0].value === selectPref) {
            var li = document.createElement('li');

            li.textContent = data[item][spot][0].value;
            listBox.appendChild(li);
        }
        if (data[item][spot][0].value.indexOf(text.value) > -1) {
            const list = document.createElement('li')
            list.textContent = data[item][spot][0].value;
            listBox.appendChild(list)
        }
    }

}



/* research.addEventListener('click', () => {
    console.log(text.value)
}) */