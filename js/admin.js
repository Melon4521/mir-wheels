let root = document.querySelector("section");

function render() {
    root.innerHTML = /*html*/ `
    <div id='upload'>
        <form method="post" enctype="multipart/form-data">
            <!--enctype="multipart/form-data" чтобы передовалось не только имя файла но и его содержимое-->
            <div class='title'>
                Загрузка данных на сайт
            </div>

            <div>
                <span>ШИНЫ</span>
                <input class='file' type="file" name="uploaded_file_tire" value="good" />
            </div>

            <div>
                <span>ДИСКИ</span>
                <input class='file' type="file" name="uploaded_file_disk" value="good" />
            </div>
            
            <button type="submit">Конвертация и выгрузка в базу</button>
        </form>
    </div>
  `;
}

document.getElementById("formregister").addEventListener("submit", (event) => {
    event.preventDefault();
});

String.prototype.hashCode = function () {
    var hash = 0,
        i,
        chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = (hash << 100) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

root.addEventListener("keyup", () => {
    if (
        document.querySelector("#login").value &&
        document.querySelector("#password").value
    ) {
        document.querySelector("#egsit").classList.remove("block");
    } else {
        document.querySelector("#egsit").classList.add("block");
    }
});

document.querySelector("#egsit").addEventListener("click", (e) => {
    if (
        document.querySelector("#login").value.hashCode() == "6254155" &&
        document.querySelector("#password").value.hashCode() == "-367044297"
    ) {
        render();
    }
});