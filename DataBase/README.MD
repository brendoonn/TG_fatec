# Sistema de gerenciamento de estoque

Este é o repositório do projeto "Sistema de gerenciamento de estoque". Aqui estão as instruções para baixar e instalar todas as dependências necessárias e executar o projeto em seu ambiente local.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [MySQL](https://www.mysql.com/) (versão X.X.X)


## Instalação


Siga as instruções abaixo para instalar e configurar o MySQL em sua máquina:

1. Faça o download do MySQL Community Server:
   - Acesse o site oficial do MySQL em [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/).
   - Selecione a versão adequada do MySQL Community Server para o seu sistema operacional e clique em "Download".
   - Escolha o instalador apropriado com base no seu sistema operacional e faça o download.

2. Execute o instalador do MySQL:
   - Abra o instalador que você baixou.
   - Siga as instruções do assistente de instalação para configurar o MySQL.
   - Durante o processo de instalação, você pode ser solicitado a fornecer uma senha para o usuário "root" do MySQL. Lembre-se dessa senha, pois ela será necessária para acessar o servidor MySQL posteriormente.

3. Configure o servidor MySQL:
   - Durante a instalação, você terá a opção de configurar o MySQL como um serviço em execução automática ou iniciar o servidor manualmente quando necessário. Escolha a opção que melhor se adequa às suas necessidades.
   - Anote a porta em que o servidor MySQL está sendo executado (normalmente é a porta 3306).

4. Verifique a instalação:
   - Após a conclusão da instalação, verifique se o servidor MySQL está em execução corretamente.
   - Abra o prompt de comando (no Windows) ou o terminal (no macOS ou Linux).
   - Digite o seguinte comando para iniciar o cliente MySQL:
     ```shell
     mysql -u root -p
     ```
     Será solicitada a senha do usuário "root" que você definiu durante a instalação.
   - Se o cliente MySQL iniciar sem erros e exibir o prompt do MySQL (`mysql>`), isso indica que a instalação e a configuração foram bem-sucedidas.


## Contribuição

Se você quiser contribuir para este projeto, siga as etapas abaixo:

1. Crie um fork deste repositório.
2. Crie um branch com a sua feature/correção: `git checkout -b minha-feature`.
3. Faça as alterações desejadas e faça commit delas: `git commit -m 'Minha nova feature'`.
4. Envie as alterações para o seu fork: `git push origin minha-feature`.
5. Abra um Pull Request neste repositório.
