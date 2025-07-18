# 📱 Configuração Mobile Android - TerraSense Field Watch

Este guia explica como transformar o aplicativo web em um aplicativo móvel Android usando Capacitor.

## 🚀 Configuração Inicial

O projeto já está configurado com Capacitor. Para executar em um dispositivo físico ou emulador:

### 1. Exportar para GitHub
- Clique no botão "Export to Github" no Lovable
- Clone o repositório em sua máquina local

### 2. Instalar Dependências
```bash
npm install
```

### 3. Adicionar Plataforma Android
```bash
npx cap add android
```

### 4. Atualizar Dependências
```bash
npx cap update android
```

### 5. Build do Projeto
```bash
npm run build
```

### 6. Sincronizar com Capacitor
```bash
npx cap sync
```

### 7. Executar no Android
```bash
npx cap run android
```

## 📋 Pré-requisitos

- **Android Studio** instalado com Android SDK
- **Java Development Kit (JDK)** 8 ou superior
- **Node.js** 16 ou superior

## 🔧 Configurações do Projeto

### App ID
```
app.lovable.18e6f379f6e94ddfa9fe0a57be48b744
```

### App Name
```
terrasense-field-watch
```

### Hot Reload
O projeto está configurado para hot reload durante o desenvolvimento, conectando-se diretamente ao servidor Lovable.

## 📱 Características Mobile

A interface foi otimizada para dispositivos móveis com:

- **Layout Responsivo**: Adaptação automática para diferentes tamanhos de tela
- **Touch Friendly**: Botões e elementos otimizados para toque
- **Navegação Mobile**: Menu lateral otimizado para dispositivos móveis
- **Cards Responsivos**: Layout de cards que se adapta ao tamanho da tela
- **Formulários Mobile**: Campos de entrada otimizados para teclado mobile

## 🛠 Funcionalidades Implementadas

- ✅ Visualização de plantações
- ✅ Edição de dados das plantações
- ✅ Interface responsiva
- ✅ Menu lateral otimizado
- ✅ Cards com informações detalhadas
- ✅ Conexão com banco de dados Supabase

## 📖 Documentação Adicional

Para mais informações sobre desenvolvimento mobile com Capacitor, consulte:
[Blog Lovable - Mobile Development](https://lovable.dev/blogs/TODO)

## 🔄 Sincronização

Sempre que fizer mudanças no código via Git, execute:
```bash
npx cap sync
```

## 🚨 Troubleshooting

Se encontrar problemas:
1. Verifique se o Android Studio está instalado corretamente
2. Confirme que o Android SDK está configurado
3. Execute `npx cap doctor` para diagnóstico
4. Certifique-se de que todas as dependências estão instaladas

---

🌱 **TerraSense Field Watch** - Monitoramento inteligente de culturas na palma da sua mão!