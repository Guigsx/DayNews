const apiURL = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-USD,BTC-USD,GBP-USD,ETH-USD,XAU-USD,CNY-USD,RUB-USD,XBR-USD,XAGG-USD"

const infosDolar = document.getElementById("infos-dolar")
const infosEuro = document.getElementById("infos-euro")
const infosLibra = document.getElementById("infos-libra")
const infosBTC = document.getElementById("infos-btc")
const infosETH = document.getElementById("infos-eth")
const infosYuan = document.getElementById("infos-yuan")
const infosGold = document.getElementById("infos-gold")
const infosRublo = document.getElementById("infos-rublo")
const infosPrata = document.getElementById("infos-prata")
const infosPetroleo = document.getElementById("infos-petroleo")


const formatarBRL = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor)
}

const formatarHora = (timestamp) => {
    const agora = new Date()
    const evento = new Date(timestamp * 1000)
    const diferenca = Math.floor((agora - evento) / 1000)

    if (diferenca < 60) return `${diferenca} segundos atrás`
    if (diferenca < 3600) return `${Math.floor(diferenca / 60)} minutos atrás`
    if (diferenca < 86400) return `${Math.floor(diferenca / 3600)} horas atrás`

    const dias = Math.floor(diferenca / 86400)
    return dias === 1 ? 'Ontem' : `${dias} dias atrás`
} //3 minutos atrás

async function buscarCotacoes() {
    try {
        const response = await fetch(apiURL)
        if (!response.ok) throw new Error("Erro ao buscar cotações.")

        const data = await response.json()

        // Definindo a cotação do dólar após a requisição
        const cotacaoDolar = data.USDBRL.bid

        const formatarInfo = (moeda) => {
            // Verifica se a moeda contém "USD" e aplica a multiplicação pela cotação do dólar
            let valor = data[moeda].bid
            if (moeda !== 'USDBRL' && moeda.includes('USD')) {
                valor = valor * cotacaoDolar
            }

            return `
                <p>${formatarBRL(valor)}</p>
                <p style="color: ${data[moeda].varBid > 0 ? 'greenyellow' : (data[moeda].varBid < 0 ? 'red' : 'gray')}">
                    ${data[moeda].varBid > 0 ? `+${data[moeda].varBid}` : data[moeda].varBid}
                </p>
                <p class="description">${formatarHora(data[moeda].timestamp)}</p>
            `
        }

        infosDolar.innerHTML = formatarInfo('USDBRL')
        infosEuro.innerHTML = formatarInfo('EURUSD')
        infosLibra.innerHTML = formatarInfo('GBPUSD')
        infosBTC.innerHTML = formatarInfo('BTCUSD')
        infosETH.innerHTML = formatarInfo('ETHUSD')
        infosYuan.innerHTML = formatarInfo('CNYUSD')
        infosRublo.innerHTML = formatarInfo('RUBUSD')
        infosPrata.innerHTML = formatarInfo('XAGGUSD')
        infosPetroleo.innerHTML = formatarInfo('XBRUSD')

        // Cálculo do preço do ouro em BRL
        const oncaParaGramas = 31.1035
        const precoOuroDolares = data['XAUUSD'].bid
        const precoOuroGramas = precoOuroDolares / oncaParaGramas
        const precoOuroBRL = precoOuroGramas * cotacaoDolar

        infosGold.innerHTML = `
            <p>${formatarBRL(precoOuroBRL.toFixed(2))}</p>
            <p style="color: ${data['XAUUSD'].varBid > 0 ? 'greenyellow' : (data['XAUUSD'].varBid < 0 ? 'red' : 'gray')}">
                ${data['XAUUSD'].varBid > 0 ? `+${data['XAUUSD'].varBid}` : data['XAUUSD'].varBid}
            </p>
            <p class="description">${formatarHora(data['XAUUSD'].timestamp)}</p>
        `

    } catch (error) {
        console.error("Erro:", error)
    }
}

buscarCotacoes()