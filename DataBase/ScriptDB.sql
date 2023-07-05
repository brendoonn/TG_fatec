-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema sigpapelaria
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sigpapelaria
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sigpapelaria` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `sigpapelaria` ;

-- -----------------------------------------------------
-- Table `sigpapelaria`.`tbl_cargo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigpapelaria`.`tbl_cargo` (
  `ID_cargo` INT NOT NULL AUTO_INCREMENT,
  `cargo` VARCHAR(255) NULL DEFAULT NULL,
  `data_available` TINYINT(1) NOT NULL,
  PRIMARY KEY (`ID_cargo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sigpapelaria`.`tbl_categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigpapelaria`.`tbl_categoria` (
  `ID_categoria` INT NOT NULL AUTO_INCREMENT,
  `categoria` VARCHAR(45) NOT NULL,
  `desc_categoria` VARCHAR(255) NOT NULL,
  `data_available` TINYINT(1) NOT NULL,
  PRIMARY KEY (`ID_categoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sigpapelaria`.`tbl_marca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigpapelaria`.`tbl_marca` (
  `ID_marca` INT NOT NULL AUTO_INCREMENT,
  `nome_marca` VARCHAR(45) NOT NULL,
  `data_available` TINYINT(1) NOT NULL,
  `nacionalidade` VARCHAR(125) NOT NULL,
  PRIMARY KEY (`ID_marca`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;



-- -----------------------------------------------------
-- Table `sigpapelaria`.`tbl_fornecedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigpapelaria`.`tbl_fornecedor` (
  `ID_fornecedor` INT NOT NULL AUTO_INCREMENT,
  `cnpj` VARCHAR(45) NOT NULL,
  `razao_social` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefone` VARCHAR(45) NOT NULL,
  `data_available` TINYINT(1) NOT NULL,
  PRIMARY KEY (`ID_fornecedor`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;




-- -----------------------------------------------------
-- Table `sigpapelaria`.`tbl_compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigpapelaria`.`tbl_compra` (
  `ID_compra` INT NOT NULL AUTO_INCREMENT,
  `data_compra` DATE NOT NULL,
  `valor_compra` DOUBLE NOT NULL,
  `data_available` TINYINT(1) NOT NULL,
  `FK_fornecedor` INT NOT NULL,
  PRIMARY KEY (`ID_compra`),
  INDEX `FK_fornecedor_idx` (`FK_fornecedor` ASC) VISIBLE,
  CONSTRAINT `FK_fornecedor`
    FOREIGN KEY (`FK_fornecedor`)
    REFERENCES `sigpapelaria`.`tbl_fornecedor` (`ID_fornecedor`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `sigpapelaria`.`tbl_pessoa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigpapelaria`.`tbl_pessoa` (
  `ID_pessoa` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(20) NOT NULL,
  `sobrenome` VARCHAR(50) NOT NULL,
  `cpf` VARCHAR(45) NULL DEFAULT NULL,
  `data_nascimento` DATE NOT NULL,
  `celular` VARCHAR(125) NOT NULL,
  `email` VARCHAR(125) NOT NULL,
  `data_available` TINYINT(1) NOT NULL,
  `img_perfil` VARCHAR(256) NULL DEFAULT NULL,
  PRIMARY KEY (`ID_pessoa`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `sigpapelaria`.`tbl_endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigpapelaria`.`tbl_endereco` (
  `ID_endereco` INT NOT NULL AUTO_INCREMENT,
  `cidade` VARCHAR(50) NOT NULL,
  `bairro` VARCHAR(50) NOT NULL,
  `rua` VARCHAR(50) NOT NULL,
  `uf` VARCHAR(10) NOT NULL,
  `numero` INT NOT NULL,
  `referencia` VARCHAR(200) NOT NULL,
  `cep` VARCHAR(125) NULL DEFAULT NULL,
  `data_available` TINYINT(1) NOT NULL,
  `FK_pessoa` INT NULL DEFAULT NULL,
  `FK_fornecedor` INT NULL DEFAULT NULL,
  PRIMARY KEY (`ID_endereco`),
  INDEX `FK_pessoa_end` (`FK_pessoa` ASC) VISIBLE,
  INDEX `FK_fornecedor_end` (`FK_fornecedor` ASC) VISIBLE,
  CONSTRAINT `FK_fornecedor_end`
    FOREIGN KEY (`FK_fornecedor`)
    REFERENCES `sigpapelaria`.`tbl_fornecedor` (`ID_fornecedor`),
  CONSTRAINT `FK_pessoa_end`
    FOREIGN KEY (`FK_pessoa`)
    REFERENCES `sigpapelaria`.`tbl_pessoa` (`ID_pessoa`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;




-- -----------------------------------------------------
-- Table `sigpapelaria`.`tbl_produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigpapelaria`.`tbl_produto` (
  `ID_produto` INT NOT NULL,
  `nome` VARCHAR(125) NOT NULL,
  `valor_uni` DOUBLE NOT NULL,
  `min_recomendado` DOUBLE,
  `peso` DOUBLE NULL DEFAULT NULL,
  `descricao` VARCHAR(500) NULL DEFAULT NULL,
  `FK_categoria` INT NOT NULL,
  `FK_marca` INT NOT NULL,
  `data_available` TINYINT(1) NOT NULL,
  PRIMARY KEY (`ID_produto`),
  INDEX `categoria_idx` (`FK_categoria` ASC) VISIBLE,
  INDEX `marca_idx` (`FK_marca` ASC) VISIBLE,
  CONSTRAINT `categoria`
    FOREIGN KEY (`FK_categoria`)
    REFERENCES `sigpapelaria`.`tbl_categoria` (`ID_categoria`),
  CONSTRAINT `marca`
    FOREIGN KEY (`FK_marca`)
    REFERENCES `sigpapelaria`.`tbl_marca` (`ID_marca`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `sigpapelaria`.`tbl_estoque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigpapelaria`.`tbl_estoque` (
  `ID_estoque` INT NOT NULL AUTO_INCREMENT,
  `FK_produto` INT NOT NULL,
  `FK_compra` INT NOT NULL,
  `quantidade_inicial` INT NOT NULL,
  `quantidade_atual` INT NOT NULL,
  `valor_uni_compra` DOUBLE NOT NULL,
  `data_validade_lote` DATE NULL DEFAULT NULL,
  `data_available` TINYINT(1) NOT NULL,
  PRIMARY KEY (`ID_estoque`),
  INDEX `FK_produto` (`FK_produto` ASC) VISIBLE,
  INDEX `forncedor_idx` (`FK_compra` ASC) VISIBLE,
  CONSTRAINT `FK_compra`
    FOREIGN KEY (`FK_compra`)
    REFERENCES `sigpapelaria`.`tbl_compra` (`ID_compra`),
  CONSTRAINT `FK_produto`
    FOREIGN KEY (`FK_produto`)
    REFERENCES `sigpapelaria`.`tbl_produto` (`ID_produto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `sigpapelaria`.`tbl_forma_pagamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigpapelaria`.`tbl_forma_pagamento` (
  `ID_forma_pagamento` INT NOT NULL AUTO_INCREMENT,
  `forma_pag` VARCHAR(125) NOT NULL,
  `data_available` TINYINT(1) NOT NULL,
  PRIMARY KEY (`ID_forma_pagamento`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `sigpapelaria`.`tbl_funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigpapelaria`.`tbl_funcionario` (
  `ID_funcionario` INT NOT NULL AUTO_INCREMENT,
  `FK_pessoa` INT NOT NULL,
  `FK_cargo` INT NOT NULL,
  `data_adminissao` DATE NOT NULL,
  `status_conta` TINYINT NOT NULL,
  `data_available` TINYINT(1) NOT NULL,
  `senha` VARCHAR(250) NOT NULL,
  `login` VARCHAR(250) NOT NULL,
  `nivel_acesso` VARCHAR(250) NULL DEFAULT NULL,
  `configuracoes` VARCHAR(250) NULL DEFAULT NULL,
  PRIMARY KEY (`ID_funcionario`),
  INDEX `FK_pessoa` (`FK_pessoa` ASC) VISIBLE,
  INDEX `cargo_idx` (`FK_cargo` ASC) VISIBLE,
  CONSTRAINT `cargo`
    FOREIGN KEY (`FK_cargo`)
    REFERENCES `sigpapelaria`.`tbl_cargo` (`ID_cargo`),
  CONSTRAINT `PK_cpf`
    FOREIGN KEY (`FK_pessoa`)
    REFERENCES `sigpapelaria`.`tbl_pessoa` (`ID_pessoa`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `sigpapelaria`.`tbl_venda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigpapelaria`.`tbl_venda` (
  `ID_venda` INT NOT NULL AUTO_INCREMENT,
  `FK_pessoa` INT DEFAULT NULL,
  `FK_funcionario` INT NOT NULL,
  `FK_forma_pagamento` INT DEFAULT NULL,
  `data_venda` DATE NOT NULL,
  `valor_liquido` DOUBLE DEFAULT NULL,
  `valor_bruto` DOUBLE DEFAULT NULL,
  `desconto` DOUBLE DEFAULT NULL,
  `descricao` VARCHAR(500) NULL DEFAULT NULL,
  `data_available` TINYINT(1) NOT NULL,
  PRIMARY KEY (`ID_venda`),
  INDEX `FK_pessoa_idx` (`FK_pessoa` ASC) VISIBLE,
  INDEX `FK_funcionario_idx` (`FK_funcionario` ASC) VISIBLE,
  CONSTRAINT `FK_funcionario`
    FOREIGN KEY (`FK_funcionario`)
    REFERENCES `sigpapelaria`.`tbl_funcionario` (`ID_funcionario`),
  CONSTRAINT `FK_pessoa`
    FOREIGN KEY (`FK_pessoa`)
    REFERENCES `sigpapelaria`.`tbl_pessoa` (`ID_pessoa`),
CONSTRAINT `FK_forma_pagamento`
    FOREIGN KEY (`FK_forma_pagamento`)
    REFERENCES `sigpapelaria`.`tbl_forma_pagamento` (`ID_forma_pagamento`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `sigpapelaria`.`tbl_venda_produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigpapelaria`.`tbl_venda_produto` (
  `ID_venda_produto` INT NOT NULL AUTO_INCREMENT,
  `FK_venda` INT NOT NULL,
  `FK_estoque` INT NOT NULL,
  `quantidade` INT NOT NULL,
  `valor_venda_uni` double NOT NULL,
  `data_available` TINYINT(1) NOT NULL,
  PRIMARY KEY (`ID_venda_produto`),
  INDEX `venda_idx` (`FK_venda` ASC) VISIBLE,
  INDEX `estoque_idx` (`FK_estoque` ASC) VISIBLE,
  CONSTRAINT `estoque`
    FOREIGN KEY (`FK_estoque`)
    REFERENCES `sigpapelaria`.`tbl_estoque` (`ID_estoque`),
  CONSTRAINT `venda`
    FOREIGN KEY (`FK_venda`)
    REFERENCES `sigpapelaria`.`tbl_venda` (`ID_venda`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;



CREATE TABLE IF NOT EXISTS `sigpapelaria`.`tbl_empresa` (
		`ID_empresa` INT NOT NULL AUTO_INCREMENT ,
		`emp_cnpj` varchar(18) NOT NULL,
		`emp_ie` varchar(18) NOT NULL,
		`emp_im` varchar(18) NOT NULL,
		`emp_nome` varchar(200) NOT NULL,
		`emp_nome_fantasia` varchar(200) NOT NULL,
		`emp_data` date NOT NULL,
		`emp_logradouro` varchar(200) NOT NULL,
		`emp_numero` varchar(6) NOT NULL,
		`emp_complemento` varchar(200) NOT NULL,
		`emp_cep` varchar(9) NOT NULL,
		`emp_bairro` varchar(200) NOT NULL,
		`emp_municipio` varchar(200) NOT NULL,
		`emp_uf` varchar(2) NOT NULL,
		`emp_telefone` varchar(20) NOT NULL,
		`emp_imagem` varchar(200) DEFAULT NULL,
		`emp_logomarca_claro` varchar(200) DEFAULT NULL ,
		`emp_logomarca_escuro` varchar(200) DEFAULT NULL ,
  PRIMARY KEY (`ID_empresa`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
 
 
              
 

 
