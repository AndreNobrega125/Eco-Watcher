# Eco-Watcher

App web (PWA) de monitoramento de consumo de energia da casa. Mostra os dispositivos de cada cômodo, quanto cada um consome agora, o fluxo de energia e alertas. Dentro do app a marca se chama **EnergyFlow**.

> Protótipo de front-end com **dados de exemplo**. Não conecta a dispositivos reais.

**Demo:** [stunning-sunshine-c918ca.netlify.app](https://stunning-sunshine-c918ca.netlify.app/) (pode travar no navegador, veja as limitações abaixo).

## O que o app faz

- **Dispositivos por cômodo:** lista os aparelhos (TV, geladeira, ar-condicionado, computador...), com filtro por cômodo e botão para ligar e desligar cada um.
- **Consumo em tempo (quase) real:** a potência de cada aparelho ligado varia a cada 3 segundos, simulando a leitura de um medidor.
- **Resumo de energia:** potência ativa, consumo diário, custo mensal estimado e aparelhos online.
- **Gráficos e fluxo de energia:** visualização do consumo e um diagrama de como a energia circula pela casa.
- **Central de notificações:** alertas como uso de energia alto.
- **PWA:** pode ser instalado no celular ou no computador, tem manifesto, service worker e indicador de conexão.
- Layout responsivo, com navegação própria para celular.

## Tecnologias

React 18, TypeScript, Vite, Tailwind CSS e ícones Lucide. Nada de back-end: os dados vêm de um arquivo de exemplo em `src/data/mockData.ts`.

## Como rodar

Precisa de Node.js 18 ou mais novo.

```bash
npm install
npm run dev
```

Para gerar a versão de produção: `npm run build`.

## Estrutura

```
src/
  components/   DeviceCard, EnergyFlowDiagram, EnergyVisualization,
                Header, MobileNavigation, NotificationCenter,
                OfflineIndicator, PWAInstallPrompt, ResponsiveChart, RoomFilter
  data/         mockData.ts (dispositivos e cômodos de exemplo)
  hooks/        useDevices.ts (estado e simulação), usePWA.ts (instalação, conexão, notificações)
  types/        tipos de Device, Room e EnergyStats
public/         manifest.json e sw.js (service worker)
```

## Limitações conhecidas

- Todos os dados são fictícios: não há integração com tomadas ou medidores inteligentes, nem banco de dados.
- O modo offline é parcial: o app mostra quando está sem conexão, mas o service worker ainda precisa de ajuste para guardar os arquivos do build do Vite.
- Os ícones e as capturas de tela citados no manifesto ainda não foram adicionados à pasta `public`.
- Na tela de configurações os botões são só visuais.
- A demo no Netlify pode travar em alguns navegadores.

## Próximos passos

- Corrigir o service worker e adicionar os ícones do PWA.
- Ler dados reais de medidores (por exemplo via MQTT, como no meu projeto [esp32-ai-agents](https://github.com/AndreNobrega125/esp32-ai-agents)).
- Guardar o histórico de consumo em um banco de dados.
