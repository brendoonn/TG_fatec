const multer = require('multer');
const path = require('path');

// Função para definir o destino do armazenamento das imagens

const caminhoImagemUsuario = path.join(__dirname, '..', '..', '..', 'public', 'Imagens', 'Usuarios');

const destination = (req, file, cb) => {
  const local = req.body.local || caminhoImagemUsuario; // Utiliza o valor do parâmetro "local" enviado na requisição, ou usa './uploads' como padrão caso não seja fornecido
  cb(null, local);
};
// Função para definir o nome do arquivo
const filename = (req, file, cb) => {
  cb(null, Date.now() + '-' + file.originalname);
};
// Configuração do multer
const storage = multer.diskStorage({
  destination,
  filename,
});


// Exporta o middleware de upload configurado
module.exports = multer({ storage });