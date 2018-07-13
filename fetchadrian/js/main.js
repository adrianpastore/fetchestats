const listano = [];
const listacidades = document.querySelector('#lista');
const divselect = document.querySelector('#cidades');
const divgrafico = document.querySelector('#grafico');

let url = 'https://cors-anywhere.herokuapp.com/http://dados.fee.tche.br/ckan-download/fee-2004-mun-servicos-outros-servicos-104591.csv';
fetch(url).then(text).then(process).then(adicionaroption).catch(console.error);
url = 'https://cors-anywhere.herokuapp.com/http://dados.fee.tche.br/ckan-download/fee-2005-mun-servicos-outros-servicos-104591.csv';
fetch(url).then(text).then(process).then(adicionaroption).catch(console.error);
url = 'https://cors-anywhere.herokuapp.com/http://dados.fee.tche.br/ckan-download/fee-2006-mun-servicos-outros-servicos-104591.csv';
fetch(url).then(text).then(process).then(adicionaroption).catch(console.error);
url = 'https://cors-anywhere.herokuapp.com/http://dados.fee.tche.br/ckan-download/fee-2007-mun-servicos-outros-servicos-104591.csv';
fetch(url).then(text).then(process).then(adicionaroption).catch(console.error);
url = 'https://cors-anywhere.herokuapp.com/http://dados.fee.tche.br/ckan-download/fee-2008-mun-servicos-outros-servicos-104591.csv';
fetch(url).then(text).then(process).then(adicionaroption).catch(console.error);

divselect.addEventListener('change', function(e) {
    open(e.target.value);
});
listacidades.addEventListener('click', function(e) {
    if (e.target.tagName === 'H3') {
        close(e.target.style.color, e.target);
    }
});

function text(response) {
    return response.text();
}

function process(text) {
    const records = [];
    const rows = text.split('\n');
    for (let i = 2; i < rows.length - 1; i++) {
        const colunasgraf = rows[i].split(',');
        if ((colunasgraf[0].replace(/"/g, '') !==  'Rio Grande') &&
            (colunasgraf[0].replace(/"/g, '') !==  'Caxias do Sul')) {
            colunasgraf[0] = colunasgraf[0].replace(/"/g, '');
            colunasgraf[1] = colunasgraf[1].replace(/"/g, '');
            colunasgraf[2] = colunasgraf[2].replace(/"/g, '');
            colunasgraf[3] = colunasgraf[3].replace(/"/g, '');
            colunasgraf[4] = colunasgraf[4].replace(/"/g, '');
            const record = {
                municipio: colunasgraf[0],
                ibge: colunasgraf[1],
                lat: colunasgraf[2],
                long: colunasgraf[3],
                taxa: colunasgraf[4]
            };
            records.push(record);
        }
    }
    listano[listano.length] = records;
}

function adicionaroption() {
    for (let c = 1; c < listano[0].length; c++) {
        const option = document.createElement('option');
        option.value = listano[0][c].municipio;
        option.innerText = listano[0][c].municipio;
        divselect.appendChild(option);
    }
}

function open(nome) {
    if (nome !== '') {
        let cor = 'rgb(0, 0, 0)';
        const h3 = postarcidade();
        h3.innerText = nome;
        listacidades.appendChild(h3);
        for (let cyear = 0, cgraph = 1;
            cyear < 5; cyear++,
            cgraph+=2) {
            let nummun = 0;
            const barra = createnewdiv();
            barra.className = 'minibarra';
            if (cyear === 0) {
                cor = createnewcolor();
                barra.style.background = cor;
                h3.style.color = cor;
            } else {
                barra.style.background = cor;
                h3.style.color = cor;
            }
            for (let cmun = 0, aux = 0;
                cmun < listano[cyear].length && aux === 0;
                cmun++) {
                if (listano[cyear][cmun].municipio === nome) {
                    nummun = cmun;
                    aux = 1;
                }
            }
            const taxa = listano[cyear][nummun].taxa;
            barra.style.height = Math.floor(taxa) + 'px';
            divgrafico.childNodes[cgraph].appendChild(barra);
            for (let contlargura = 0;
                contlargura < divgrafico.childNodes[cgraph].
                    childNodes.length;
                contlargura++) {
                const largura =
                100/(divgrafico.childNodes[cgraph].childNodes.length);
                const graphicchild =
                divgrafico.childNodes[cgraph].childNodes[contlargura];
                graphicchild.style.width = largura + '%';
                graphicchild.style.left = contlargura*(largura) + '%';
            }
        }
    }
}

function close(color, h3) {
    h3.remove();
    for (let cyear = 0, cgraph = 1;
        cyear < 5; cyear++,
        cgraph += 2) {
        for (let cnew = 0;
            cnew < divgrafico.childNodes[cgraph].childNodes.length;
            cnew++) {
            if (divgrafico.childNodes[cgraph].
                childNodes[cnew].style.background === color) {
                divgrafico.childNodes[cgraph].childNodes[cnew].remove();
            }
            for (let contlargura = 0;
                contlargura < divgrafico.childNodes[cgraph].
                    childNodes.length;
                contlargura++) {
                const largura =
                    100 / (divgrafico.childNodes[cgraph].
                        childNodes.length);
                const graphicchild =
                    divgrafico.childNodes[cgraph].childNodes[contlargura];
                graphicchild.style.width = largura + '%';
                graphicchild.style.left = contlargura * (largura) + '%';
            }
        }
    }
}

function createnewdiv() {
    const newdiv = document.createElement('div');
    return newdiv;
}

function createnewcolor(number) {
    const a = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const c = Math.floor(Math.random() * 255);
    const color = 'rgb(' + a + ', ' + b +', ' + c + ')';
    return color;
}

function postarcidade(text) {
    const city = document.createElement('h3');
    return city;
}