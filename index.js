const apiURL = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL,ETH-BRL"

const infosDolar = document.getElementById("infos-dolar")
const infosEuro = document.getElementById("infos-euro")
const infosLibra = document.getElementById("infos-libra")
const infosBTC = document.getElementById("infos-btc")
const infosETH = document.getElementById("infos-eth")

const formatarBRL = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor)
}

const formatarHora = (timestamp) => {
    const data = new Date(timestamp * 1000)
    const horas = String(data.getHours()).padStart(2, '0')
    const minutos = String(data.getMinutes()).padStart(2, '0')

    return `Hoje às ${horas}:${minutos}`
}

async function buscarCotacoes() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("Erro ao buscar cotações.");

        const data = await response.json();

        infosDolar.innerHTML = `
            <p>${formatarBRL(data.USDBRL.high)}</p>
            <p style="color: ${data.USDBRL.varBid > 0 ? 'greenyellow' : (data.USDBRL.varBid < 0 ? 'red' : 'gray')};">${data.USDBRL.varBid > 0 ? `+${data.USDBRL.varBid}` : data.USDBRL.varBid}</p>
            <p style="font-size: 12px; color: gray;">${formatarHora(data.USDBRL.timestamp)}</p>
        `;

        infosEuro.innerHTML = `
            <p>${formatarBRL(data.EURBRL.high)}</p>
            <p style="color: ${data.EURBRL.varBid > 0 ? 'greenyellow' : (data.EURBRL.varBid < 0 ? 'red' : 'gray')};">${data.EURBRL.varBid > 0 ? `+${data.EURBRL.varBid}` : data.EURBRL.varBid}</p>
            <p style="font-size: 12px; color: gray;">${formatarHora(data.EURBRL.timestamp)}</p>
        `;

        infosLibra.innerHTML = `
            <p>${formatarBRL(data.GBPBRL.high)}</p>
            <p style="color: ${data.GBPBRL.varBid > 0 ? 'greenyellow' : (data.GBPBRL.varBid < 0 ? 'red' : 'gray')};">${data.GBPBRL.varBid > 0 ? `+${data.GBPBRL.varBid}` : data.GBPBRL.varBid}</p>
            <p style="font-size: 12px; color: gray;">${formatarHora(data.GBPBRL.timestamp)}</p>
        `;

        infosBTC.innerHTML = `
            <p>${formatarBRL(data.BTCBRL.high)}</p>
            <p style="color: ${data.BTCBRL.varBid > 0 ? 'greenyellow' : (data.BTCBRL.varBid < 0 ? 'red' : 'gray')};">${data.BTCBRL.varBid > 0 ? `+${data.BTCBRL.varBid}` : data.BTCBRL.varBid}</p>
            <p style="font-size: 12px; color: gray;">${formatarHora(data.BTCBRL.timestamp)}</p>
        `;

        infosETH.innerHTML = `
            <p>${formatarBRL(data.ETHBRL.high)}</p>
            <p style="color: ${data.ETHBRL.varBid > 0 ? 'greenyellow' : (data.ETHBRL.varBid < 0 ? 'red' : 'gray')};">${data.ETHBRL.varBid > 0 ? `+${data.ETHBRL.varBid}` : data.ETHBRL.varBid}</p>
            <p style="font-size: 12px; color: gray;">${formatarHora(data.ETHBRL.timestamp)}</p>
        `;

    } catch (error) {
        console.error("Erro:", error)
    }
}

buscarCotacoes()