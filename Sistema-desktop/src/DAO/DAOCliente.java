package DAO;

import model.ModelCliente;
import model.ModelPessoa;
import conexoes.ConexaoMySql;
import java.util.ArrayList;
/**
*
* @author andre
*/
public class DAOCliente extends ConexaoMySql {

    /**
    * grava Cliente
    * @param pModelCliente
    * @return int
    */
    public int salvarClienteDAO(ModelCliente pModelCliente){
        try {
            this.conectar();
            return this.insertSQL(
                "INSERT INTO tbl_cliente ("
                    + "cli_nome,"
                    + "cli_endereco,"
                    + "cli_bairro,"
                    + "cli_cidade,"
                    + "cli_uf,"
                    + "cli_cep,"
                    + "cli_telefone"
                + ") VALUES ("
                    + "'" + pModelCliente.getCliNome() + "',"
                    + "'" + pModelCliente.getCliEndereco() + "',"
                    + "'" + pModelCliente.getCliBairro() + "',"
                    + "'" + pModelCliente.getCliCidade() + "',"
                    + "'" + pModelCliente.getCliUf() + "',"
                    + "'" + pModelCliente.getCliCep() + "',"
                    + "'" + pModelCliente.getCliTelefone() + "'"
                + ");"
            );
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }finally{
            this.fecharConexao();
        }
    }

    /**
    * recupera Cliente
    * @param pIdCliente
    * @return ModelCliente
    */
 /*    public ModelPessoa getClienteDAO(String pNomeCliente){
        ModelPessoa modelPessoa = new ModelPessoa();
        try {
            this.conectar();
            this.executarSQL(
                    "SELECT "+
                    "tbl_pessoa.ID_pessoa, "+
                    "nome, "+
                    "sobrenome, "+
                    "cpf, "+
                    "data_nascimento, "+
                    "celular, "+
                    "email, "+
                    "img_perfil, "+
                    "tbl_endereco.ID_endereco, "+
                    "cidade, "+
                    "bairro, "+
                    "rua, "+
                    "uf, "+
                    "numero, "+
                    "referencia, "+
                    "cep, "+
                    "fk_pessoa "+
                    "FROM "+
                    "tbl_pessoa "+
                    "INNER JOIN "+
                    "tbl_endereco ON tbl_pessoa.ID_pessoa = tbl_endereco.fk_pessoa "+
                    "WHERE tbl_pessoa.nome = '" + pNomeCliente + "';"
            );
            while(this.getResultSet().next()){
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
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return modelPessoa;
    } */
    
    /**
    * recupera Cliente
    * @param pNomeCliente 
    * @return ModelCliente
    *//* 
    public ModelCliente getClienteDAO(Integer pIdCliente){
        ModelCliente modelPessoa = new ModelCliente();
        try {
            this.conectar();
            this.executarSQL(
                    "SELECT "+
                    "tbl_pessoa.ID_pessoa, "+
                    "nome, "+
                    "sobrenome, "+
                    "cpf, "+
                    "data_nascimento, "+
                    "celular, "+
                    "email, "+
                    "img_perfil, "+
                    "tbl_endereco.ID_endereco, "+
                    "cidade, "+
                    "bairro, "+
                    "rua, "+
                    "uf, "+
                    "numero, "+
                    "referencia, "+
                    "cep, "+
                    "fk_pessoa "+
                    "FROM "+
                    "tbl_pessoa "+
                    "INNER JOIN "+
                    "tbl_endereco ON tbl_pessoa.ID_pessoa = tbl_endereco.fk_pessoa "+
                    "WHERE tbl_pessoa.ID_pessoa = '" + pIdCliente + "';"
            );
            while(this.getResultSet().next()){
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
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return ModelCliente;
    } */





    
    /**
    * recupera uma lista de Cliente
        * @return ArrayList
    */
    public ArrayList<ModelCliente> getListaClienteDAO(){
        ArrayList<ModelCliente> listamodelCliente = new ArrayList();
        ModelCliente modelCliente = new ModelCliente();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "pk_id_cliente,"
                    + "cli_nome,"
                    + "cli_endereco,"
                    + "cli_bairro,"
                    + "cli_cidade,"
                    + "cli_uf,"
                    + "cli_cep,"
                    + "cli_telefone"
                 + " FROM"
                     + " tbl_cliente"
                + ";"
            );

            while(this.getResultSet().next()){
                modelCliente = new ModelCliente();
                modelCliente.setIdCliente(this.getResultSet().getInt(1));
                modelCliente.setCliNome(this.getResultSet().getString(2));
                modelCliente.setCliEndereco(this.getResultSet().getString(3));
                modelCliente.setCliBairro(this.getResultSet().getString(4));
                modelCliente.setCliCidade(this.getResultSet().getString(5));
                modelCliente.setCliUf(this.getResultSet().getString(6));
                modelCliente.setCliCep(this.getResultSet().getString(7));
                modelCliente.setCliTelefone(this.getResultSet().getString(8));
                listamodelCliente.add(modelCliente);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return listamodelCliente;
    }

    /**
    * atualiza Cliente
    * @param pModelCliente
    * @return boolean
    */
    public boolean atualizarClienteDAO(ModelCliente pModelCliente){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "UPDATE tbl_cliente SET "
                    + "pk_id_cliente = '" + pModelCliente.getIdCliente() + "',"
                    + "cli_nome = '" + pModelCliente.getCliNome() + "',"
                    + "cli_endereco = '" + pModelCliente.getCliEndereco() + "',"
                    + "cli_bairro = '" + pModelCliente.getCliBairro() + "',"
                    + "cli_cidade = '" + pModelCliente.getCliCidade() + "',"
                    + "cli_uf = '" + pModelCliente.getCliUf() + "',"
                    + "cli_cep = '" + pModelCliente.getCliCep() + "',"
                    + "cli_telefone = '" + pModelCliente.getCliTelefone() + "'"
                + " WHERE "
                    + "pk_id_cliente = '" + pModelCliente.getIdCliente() + "'"
                + ";"
            );
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }finally{
            this.fecharConexao();
        }
    }

    /**
    * exclui Cliente
    * @param pIdCliente
    * @return boolean
    */
    public boolean excluirClienteDAO(int pIdCliente){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "DELETE FROM tbl_cliente "
                + " WHERE "
                    + "pk_id_cliente = '" + pIdCliente + "'"
                + ";"
            );
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }finally{
            this.fecharConexao();
        }
    }
}