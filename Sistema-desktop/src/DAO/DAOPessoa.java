package DAO;

import model.ModelPessoa;
import model.ModelProdutos;
import util.BLDatas;
import conexoes.ConexaoMySql;
import java.sql.PreparedStatement;

import java.util.Calendar;

import java.io.Console;
import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author Brendon
 */
public class DAOPessoa extends ConexaoMySql {

    /**
     * grava Pessoa
     * 
     * @param pModelPessoa
     * @return int
     */
    public int salvarPessoaDAO(ModelPessoa pModelPessoa) {
        try {
            this.conectar();
            // Insere os dados na tabela tbl_pessoa
            int idPessoa = this.insertSQL(
                    "INSERT INTO tbl_pessoa ("
                            + "nome,"
                            + "sobrenome,"
                            + "cpf,"
                            + "data_nascimento,"
                            + "celular,"
                            + "email,"
                            + "img_perfil, "
                            + "data_available"
                            + ") VALUES ("
                            + "'" + pModelPessoa.getNome() + "',"
                            + "'" + pModelPessoa.getSobrenome() + "',"
                            + "'" + pModelPessoa.getCpf() + "',"
                            + "'" + pModelPessoa.getData_nascimento() + "',"
                            + "'" + pModelPessoa.getCelular() + "',"
                            + "'" + pModelPessoa.getEmail() + "',"
                            + "'" + null + "',"
                            + "true"
                            + ");");

            // Insere os dados na tabela tbl_endereco utilizando o ID da pessoa inserida
            if (idPessoa > 0) {
                int idEndereco = this.insertSQL(
                        "INSERT INTO tbl_endereco ("
                                + "cidade,"
                                + "bairro,"
                                + "rua,"
                                + "uf,"
                                + "numero,"
                                + "referencia,"
                                + "cep,"
                                + "FK_pessoa,"
                                + "data_available"
                                + ") VALUES ("
                                + "'" + pModelPessoa.getCidade() + "',"
                                + "'" + pModelPessoa.getBairro() + "',"
                                + "'" + pModelPessoa.getRua() + "',"
                                + "'" + pModelPessoa.getUf() + "',"
                                + "'" + pModelPessoa.getNumero() + "',"
                                + "'" + pModelPessoa.getReferencia() + "',"
                                + "'" + pModelPessoa.getCep() + "',"
                                + "'" + idPessoa + "',"
                                + "true"
                                + ");");
                if (idEndereco > 0) {
                }
            }
            return idPessoa;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        } finally {
            this.fecharConexao();
        }
    }

    /**
     * recupera Cliente
     * 
     * @param pIdCliente
     * @return ModelCliente
     */
    public ModelPessoa retornarListaPessoaDAO(String pNomePessoa) {
        ModelPessoa modelPessoa = new ModelPessoa();
        try {
            this.conectar();
            this.executarSQL(
                    "SELECT " +
                            "tbl_pessoa.ID_pessoa, " +
                            "nome, " +
                            "sobrenome, " +
                            "cpf, " +
                            "data_nascimento, " +
                            "celular, " +
                            "email, " +
                            "img_perfil, " +
                            "tbl_endereco.ID_endereco, " +
                            "cidade, " +
                            "bairro, " +
                            "rua, " +
                            "uf, " +
                            "numero, " +
                            "referencia, " +
                            "cep, " +
                            "fk_pessoa " +
                            "FROM " +
                            "tbl_pessoa " +
                            "INNER JOIN " +
                            "tbl_endereco ON tbl_pessoa.ID_pessoa = tbl_endereco.fk_pessoa " +
                            "WHERE tbl_pessoa.nome = '" + pNomePessoa + "';");
            while (this.getResultSet().next()) {
                modelPessoa.setID_pessoa(this.getResultSet().getInt(1));
                modelPessoa.setNome(this.getResultSet().getString(2));
                modelPessoa.setSobrenome(this.getResultSet().getString(3));
                modelPessoa.setCpf(this.getResultSet().getString(4));
                modelPessoa.setData_nascimento(this.getResultSet().getDate(5));
                modelPessoa.setCelular(this.getResultSet().getString(6));
                modelPessoa.setEmail(this.getResultSet().getString(7));
                modelPessoa.setImg_perfil(this.getResultSet().getString(8));
                modelPessoa.setID_endereco(this.getResultSet().getInt(9));
                modelPessoa.setCidade(this.getResultSet().getString(10));
                modelPessoa.setBairro(this.getResultSet().getString(11));
                modelPessoa.setRua(this.getResultSet().getString(12));
                modelPessoa.setUf(this.getResultSet().getString(13));
                modelPessoa.setNumero(this.getResultSet().getInt(14));
                modelPessoa.setReferencia(this.getResultSet().getString(15));
                modelPessoa.setCep(this.getResultSet().getString(16));
                modelPessoa.setFK_pessoa(this.getResultSet().getInt(17));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            this.fecharConexao();
        }
        return modelPessoa;
    }

    /**
     * recupera Cliente
     * 
     * @param pIdCliente
     * @return ModelCliente
     */
    public ModelPessoa getPessoaDAO(String pNomePessoa) {
        ModelPessoa modelPessoa = new ModelPessoa();
        try {
            this.conectar();
            this.executarSQL(
                    "SELECT " +
                            "tbl_pessoa.ID_pessoa, " +
                            "nome, " +
                            "sobrenome, " +
                            "cpf, " +
                            "data_nascimento, " +
                            "celular, " +
                            "email, " +
                            "img_perfil, " +
                            "tbl_endereco.ID_endereco, " +
                            "cidade, " +
                            "bairro, " +
                            "rua, " +
                            "uf, " +
                            "numero, " +
                            "referencia, " +
                            "cep, " +
                            "fk_pessoa " +
                            "FROM " +
                            "tbl_pessoa " +
                            "INNER JOIN " +
                            "tbl_endereco ON tbl_pessoa.ID_pessoa = tbl_endereco.fk_pessoa " +
                            "WHERE tbl_pessoa.nome = '" + pNomePessoa + "';");
            while (this.getResultSet().next()) {
                modelPessoa.setID_pessoa(this.getResultSet().getInt(1));
                modelPessoa.setNome(this.getResultSet().getString(2));
                modelPessoa.setSobrenome(this.getResultSet().getString(3));
                modelPessoa.setCpf(this.getResultSet().getString(4));
                modelPessoa.setData_nascimento(this.getResultSet().getDate(5));
                modelPessoa.setCelular(this.getResultSet().getString(6));
                modelPessoa.setEmail(this.getResultSet().getString(7));
                modelPessoa.setImg_perfil(this.getResultSet().getString(8));
                modelPessoa.setID_endereco(this.getResultSet().getInt(9));
                modelPessoa.setCidade(this.getResultSet().getString(10));
                modelPessoa.setBairro(this.getResultSet().getString(11));
                modelPessoa.setRua(this.getResultSet().getString(12));
                modelPessoa.setUf(this.getResultSet().getString(13));
                modelPessoa.setNumero(this.getResultSet().getInt(14));
                modelPessoa.setReferencia(this.getResultSet().getString(15));
                modelPessoa.setCep(this.getResultSet().getString(16));
                modelPessoa.setFK_pessoa(this.getResultSet().getInt(17));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            this.fecharConexao();
        }
        return modelPessoa;
    }

    /**
     * recupera Cliente
     * 
     * @param pNomeCliente
     * @return ModelCliente
     */
    public ModelPessoa getPessoaDAO(Integer pIdCliente) {
        ModelPessoa modelPessoa = new ModelPessoa();
        try {
            this.conectar();
            this.executarSQL(
                    "SELECT " +
                            "tbl_pessoa.ID_pessoa, " +
                            "nome, " +
                            "sobrenome, " +
                            "cpf, " +
                            "data_nascimento, " +
                            "celular, " +
                            "email, " +
                            "img_perfil, " +
                            "tbl_endereco.ID_endereco, " +
                            "cidade, " +
                            "bairro, " +
                            "rua, " +
                            "uf, " +
                            "numero, " +
                            "referencia, " +
                            "cep, " +
                            "fk_pessoa " +
                            "FROM " +
                            "tbl_pessoa " +
                            "INNER JOIN " +
                            "tbl_endereco ON tbl_pessoa.ID_pessoa = tbl_endereco.fk_pessoa " +
                            "WHERE tbl_pessoa.ID_pessoa = '" + pIdCliente + "';");
            while (this.getResultSet().next()) {
                modelPessoa.setID_pessoa(this.getResultSet().getInt(1));
                modelPessoa.setNome(this.getResultSet().getString(2));
                modelPessoa.setSobrenome(this.getResultSet().getString(3));
                modelPessoa.setCpf(this.getResultSet().getString(4));
                modelPessoa.setData_nascimento(this.getResultSet().getDate(5));
                modelPessoa.setCelular(this.getResultSet().getString(6));
                modelPessoa.setEmail(this.getResultSet().getString(7));
                modelPessoa.setImg_perfil(this.getResultSet().getString(8));
                modelPessoa.setID_endereco(this.getResultSet().getInt(9));
                modelPessoa.setCidade(this.getResultSet().getString(10));
                modelPessoa.setBairro(this.getResultSet().getString(11));
                modelPessoa.setRua(this.getResultSet().getString(12));
                modelPessoa.setUf(this.getResultSet().getString(13));
                modelPessoa.setNumero(this.getResultSet().getInt(14));
                modelPessoa.setReferencia(this.getResultSet().getString(15));
                modelPessoa.setCep(this.getResultSet().getString(16));
                modelPessoa.setFK_pessoa(this.getResultSet().getInt(17));

            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            this.fecharConexao();
        }
        return modelPessoa;
    }

    /**
     * recupera uma lista de Pessoa
     * 
     * @return ArrayList
     */
    public ArrayList<ModelPessoa> getListaPessoaDAO() {
        ArrayList<ModelPessoa> listamodelPessoa = new ArrayList<>();
        ModelPessoa modelPessoa = new ModelPessoa();
        try {
            this.conectar();
            this.executarSQL(
                    "SELECT "
                            + "ID_pessoa,"
                            + "nome,"
                            + "sobrenome,"
                            + "cpf,"
                            + "data_nascimento,"
                            + "celular,"
                            + "email,"
                            + "img_perfil,"
                            + "ID_endereco,"
                            + "cidade,"
                            + "bairro,"
                            + "rua,"
                            + "uf,"
                            + "numero,"
                            + "referencia,"
                            + "cep,"
                            + "fk_pessoa "
                            + "FROM tbl_pessoa "
                            + "JOIN tbl_endereco ON tbl_pessoa.ID_pessoa = tbl_endereco.FK_pessoa "
                            + "WHERE tbl_pessoa.data_available = true"
                            + ";");
            while (this.getResultSet().next()) {
                modelPessoa = new ModelPessoa();
                modelPessoa.setID_pessoa(this.getResultSet().getInt(1));
                modelPessoa.setNome(this.getResultSet().getString(2));
                modelPessoa.setSobrenome(this.getResultSet().getString(3));
                modelPessoa.setCpf(this.getResultSet().getString(4));
                modelPessoa.setData_nascimento(null);
                modelPessoa.setCelular(this.getResultSet().getString(6));
                modelPessoa.setEmail(this.getResultSet().getString(7));
                modelPessoa.setImg_perfil(this.getResultSet().getString(8));
                modelPessoa.setID_endereco(this.getResultSet().getInt(9));
                modelPessoa.setCidade(this.getResultSet().getString(10));
                modelPessoa.setBairro(this.getResultSet().getString(11));
                modelPessoa.setRua(this.getResultSet().getString(12));
                modelPessoa.setUf(this.getResultSet().getString(13));
                modelPessoa.setNumero(this.getResultSet().getInt(14));
                modelPessoa.setReferencia(this.getResultSet().getString(15));
                modelPessoa.setCep(this.getResultSet().getString(16));
                modelPessoa.setFK_pessoa(this.getResultSet().getInt(17));

                listamodelPessoa.add(modelPessoa);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            this.fecharConexao();
        }
        return listamodelPessoa;
    }

    /**
     * atualiza Pessoa
     * 
     * @param pModelPessoa
     * @return boolean
     */
    public boolean atualizarPessoaDAO(ModelPessoa pModelPessoa) {
        java.util.Date utilDate = pModelPessoa.getData_nascimento();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(utilDate);
        java.sql.Date sqlDate = new java.sql.Date(calendar.getTime().getTime());
        try {
            this.conectar();
            String sql = "UPDATE tbl_pessoa SET "
                    + "nome = ?,"
                    + "sobrenome = ?,"
                    + "cpf = ?,"
                    + "data_nascimento = ?,"
                    + "celular = ?,"
                    + "email = ?,"
                    + "img_perfil = ?"
                    + " WHERE ID_pessoa = ?;";
            PreparedStatement stmt = getCon().prepareStatement(sql);
            stmt.setString(1, pModelPessoa.getNome());
            stmt.setString(2, pModelPessoa.getSobrenome());
            stmt.setString(3, pModelPessoa.getCpf());
            stmt.setDate(4, sqlDate);
            stmt.setString(5, pModelPessoa.getCelular());
            stmt.setString(6, pModelPessoa.getEmail());
            stmt.setString(7, pModelPessoa.getImg_perfil());
            stmt.setInt(8, pModelPessoa.getID_pessoa());
            int rowsAffected = stmt.executeUpdate();
            stmt.close();

            if (rowsAffected > 0) {
                // Atualização da tabela tbl_endereco
                sql = "UPDATE tbl_endereco SET "
                        + "cidade = ?,"
                        + "bairro = ?,"
                        + "rua = ?,"
                        + "uf = ?,"
                        + "numero = ?,"
                        + "referencia = ?,"
                        + "cep = ?"
                        + " WHERE fk_pessoa = ?;";

                stmt = getCon().prepareStatement(sql);
                stmt.setString(1, pModelPessoa.getCidade());
                stmt.setString(2, pModelPessoa.getBairro());
                stmt.setString(3, pModelPessoa.getRua());
                stmt.setString(4, pModelPessoa.getUf());
                stmt.setInt(5, pModelPessoa.getNumero());
                stmt.setString(6, pModelPessoa.getReferencia());
                stmt.setString(7, pModelPessoa.getCep());
                stmt.setInt(8, pModelPessoa.getID_pessoa());
                rowsAffected = stmt.executeUpdate();
                stmt.close();

                return rowsAffected > 0;
            } else {
                return false;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        } finally {
            this.fecharConexao();
        }
    }

    /**
     * exclui Pessoa
     * 
     * @param pID_pessoa
     * @return boolean
     */
    public boolean excluirPessoaDAO(Integer pID_pessoa) {
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                    "UPDATE tbl_pessoa "
                            + " SET "
                            + "data_available = false"
                            + " WHERE "
                            + "ID_pessoa = " + pID_pessoa + ";");
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            this.fecharConexao();
        }
    }
}