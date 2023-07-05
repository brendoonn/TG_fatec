# Sistema de gerenciamento de estoque

Este é o repositório do projeto "Sistema de gerenciamento de estoque". Aqui estão as instruções para baixar e instalar todas as dependências necessárias e executar o projeto em seu ambiente local.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Java Development Kit (JDK) (versão X.X.X)
- Apache Maven (versão X.X.X)
- MySQL (versão X.X.X)

## Instalação

Siga as etapas abaixo para configurar e executar o projeto:

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/brendoonn/TG_fatec 
$ cd TG_fatec/Sistema-desktop
```

Execute o comando a seguir para compilar o projeto e gerar o arquivo JAR:
```bash
# Isso irá baixar as dependências do projeto, compilar o código-fonte e gerar o arquivo JAR na pasta target.
$ mvn clean install
```
## Configure a conexão MySQL:

Configure o banco de dados MySQL:

Certifique-se de ter o MySQL instalado e configurado corretamente em seu sistema, conforme as instruções fornecidas na seção "Instalação e Configuração do MySQL" do README.
Crie um banco de dados vazio no MySQL para o projeto.
Configure as propriedades do banco de dados:

No diretório do projeto, localize o arquivo ConexaoMySql.java em TG_fatec\Sistema-desktop\src\conexoes (ou um arquivo de configuração semelhante) e abra-o em um editor de texto.
Preencha as informações de conexão do banco de dados, como URL, nome do banco de dados, nome de usuário e senha. Certifique-se de atualizar as informações corretamente.


Execute o projeto:

Inicie o projeto de acordo com a opção que sua IDE (ambiente de desenvolvimento integrado) disponibilizar

Isso iniciará o projeto Java e você poderá acessá-lo através do navegador ou de outra ferramenta apropriada, dependendo da aplicação em questão.

## Contribuição

Se você quiser contribuir para este projeto, siga as etapas abaixo:

1. Crie um fork deste repositório.
2. Crie um branch com a sua feature/correção: `git checkout -b minha-feature`.
3. Faça as alterações desejadas e faça commit delas: `git commit -m 'Minha nova feature'`.
4. Envie as alterações para o seu fork: `git push origin minha-feature`.
5. Abra um Pull Request neste repositório.
