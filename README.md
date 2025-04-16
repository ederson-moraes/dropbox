<h1 align="center">📦 Dropbox Clone</h1>

<p align="center">
  Uma aplicação web moderna inspirada no <strong>Dropbox</strong>, com upload e gerenciamento de arquivos utilizando <code>AWS S3</code> para armazenamento e <code>Render.com</code> para deploy contínuo.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Em%20desenvolvimento-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Deploy-Render.com-4c1?style=for-the-badge&logo=render" />
  <img src="https://img.shields.io/badge/AWS-S3-orange?style=for-the-badge&logo=amazon-aws" />
</p>

---

## 🚀 Funcionalidades

- ✅ Upload de arquivos com visualização na interface
- ✅ Armazenamento seguro usando AWS S3
- ✅ Interface responsiva e moderna
- ✅ Deploy automático com Render.com
- ✅ Organização em pastas
- ✅ Barra de progresso no upload

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React / TailwindCSS
- **Backend**: Node.js / Express
- **Storage**: AWS S3
- **Deploy**: Render.com
- **Outros**: dotenv, multer, aws-sdk

---

## 🌐 Demonstração

> 🔗 Em breve: [https://dropbox-clone.render.com](https://dropbox-clone.render.com)

---

## ⚙️ Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/seuusuario/dropbox-clone.git

# Acesse a pasta
cd dropbox-clone

# Instale as dependências do backend
cd backend
npm install

# Configure o arquivo .env com suas credenciais AWS
cp .env.example .env

# Suba o servidor
npm run dev

# Em outro terminal, inicie o frontend
cd ../frontend
npm install
npm run dev
```

🔐 Variáveis de Ambiente
Crie um arquivo .env com as seguintes variáveis no backend:


```AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
S3_BUCKET_NAME=your_bucket_name
```
---
📸 Capturas de Tela
<p float="left"> <img src="https://via.placeholder.com/400x250.png?text=Tela+de+Login" width="45%" /> <img src="https://via.placeholder.com/400x250.png?text=Dashboard+de+Arquivos" width="45%" /> </p>

---

📦 Deploy no Render [render.com](url)

* Conecte o GitHub ao Render.com

* Configure variáveis de ambiente no painel da aplicação

* O deploy será automático a cada novo push na main

---

🧠 Próximos Passos

<select id="storage-select">
  <option value="s3"></optio n>
  <option value="gcs"></option>
  <option value="azure">Autenticação de usuários</option>
   <option value="azure">Integração com WebDAV</option>
</select>


- [ ] Autenticação de usuários
- [ ] Compartilhamento de arquivos via link
- [ ] Histórico de versões
- [ ] Integração com WebDAV
---

👨‍💻 Autor
Feito com 💙 por Ederson Moraes
Entre em contato: emoraes@youtech.pt

📄 Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---
<p align="center"> Feito com 💾 e ☁️ </p> 



