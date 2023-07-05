package DAO;

import model.ModelFornecedor;
import conexoes.ConexaoMySql;
import java.util.ArrayList;
/**
*
* @author André
*/
public class DAOFornecedor extends ConexaoMySql {

    /**
    * grava Fornecedor
    * @param pModelFornecedor
    * @return int
    */
    public int salvarFornecedorDAO(ModelFornecedor pModelFornecedor){
        try {
            this.conectar();
            return this.insertSQL(
                "INSERT INTO tbl_fornecedor ("
                    + "for_cnpj,"
                    + "for_nome,"
                    + "for_endereco,"
                    + "for_bairro,"
                    + "for_cidade,"
                    + "for_uf,"
                    + "for_cep,"
                    + "for_telefone"
                + ") VALUES ("
                    + "'" + pModelFornecedor.getForCnpj() + "',"
                    + "'" + pModelFornecedor.getForNome() + "',"
                    + "'" + pModelFornecedor.getForEndereco() + "',"
                    + "'" + pModelFornecedor.getForBairro() + "',"
                    + "'" + pModelFornecedor.getForCidade() + "',"
                    + "'" + pModelFornecedor.getForUf() + "',"
                    + "'" + pModelFornecedor.getForCep() + "',"
                    + "'" + pModelFornecedor.getForTelefone() + "'"
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
    * recupera Fornecedor
    * @param pIdFornecedor
    * @return ModelFornecedor
    */
    public ModelFornecedor getFornecedorDAO(int pIdFornecedor){
        ModelFornecedor modelFornecedor = new ModelFornecedor();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "pk_id_fornecedor,"
                    + "for_cnpj,"
                    + "for_nome,"
                    + "for_endereco,"
                    + "for_bairro,"
                    + "for_cidade,"
                    + "for_uf,"
                    + "for_cep,"
                    + "for_telefone"
                 + " FROM"
                     + " tbl_fornecedor"
                 + " WHERE"
                     + " pk_id_fornecedor = '" + pIdFornecedor + "'"
                + ";"
            );

            while(this.getResultSet().next()){
                modelFornecedor.setIdFornecedor(this.getResultSet().getInt(1));
                modelFornecedor.setForCnpj(this.getResultSet().getString(2));
                modelFornecedor.setForNome(this.getResultSet().getString(3));
                modelFornecedor.setForEndereco(this.getResultSet().getString(4));
                modelFornecedor.setForBairro(this.getResultSet().getString(5));
                modelFornecedor.setForCidade(this.getResultSet().getString(6));
                modelFornecedor.setForUf(this.getResultSet().getString(7));
                modelFornecedor.setForCep(this.getResultSet().getString(8));
                modelFornecedor.setForTelefone(this.getResultSet().getString(9));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return modelFornecedor;
    }
    
    /**
    * recupera Fornecedor
    * @param pNomeFornecedor
    * @return ModelFornecedor
    */
    public ModelFornecedor getFornecedorDAO(String pNomeFornecedor){
        ModelFornecedor modelFornecedor = new ModelFornecedor();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "pk_id_fornecedor,"
                    + "for_cnpj,"
                    + "for_nome,"
                    + "for_endereco,"
                    + "for_bairro,"
                    + "for_cidade,"
                    + "for_uf,"
                    + "for_cep,"
                    + "for_telefone"
                 + " FROM"
                     + " tbl_fornecedor"
                 + " WHERE"
                     + " for_nome = '" + pNomeFornecedor + "'"
                + ";"
            );

            while(this.getResultSet().next()){
                modelFornecedor.setIdFornecedor(this.getResultSet().getInt(1));
                modelFornecedor.setForCnpj(this.getResultSet().getString(2));
                modelFornecedor.setForNome(this.getResultSet().getString(3));
                modelFornecedor.setForEndereco(this.getResultSet().getString(4));
                modelFornecedor.setForBairro(this.getResultSet().getString(5));
                modelFornecedor.setForCidade(this.getResultSet().getString(6));
                modelFornecedor.setForUf(this.getResultSet().getString(7));
                modelFornecedor.setForCep(this.getResultSet().getString(8));
                modelFornecedor.setForTelefone(this.getResultSet().getString(9));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return modelFornecedor;
    }

    /**
    * recupera uma lista de Fornecedor
        * @return ArrayList
    */
    public ArrayList<ModelFornecedor> getListaFornecedorDAO(){
        ArrayList<ModelFornecedor> listamodelFornecedor = new ArrayList();
        ModelFornecedor modelFornecedor = new ModelFornecedor();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "pk_id_fornecedor,"
                    + "for_cnpj,"
                    + "for_nome,"
                    + "for_endereco,"
                    + "for_bairro,"
                    + "for_cidade,"
                    + "for_uf,"
                    + "for_cep,"
                    + "for_telefone"
                 + " FROM"
                     + " tbl_fornecedor"
                + ";"
            );

            while(this.getResultSet().next()){
                modelFornecedor = new ModelFornecedor();
                modelFornecedor.setIdFornecedor(this.getResultSet().getInt(1));
                modelFornecedor.setForCnpj(this.getResultSet().getString(2));
                modelFornecedor.setForNome(this.getResultSet().getString(3));
                modelFornecedor.setForEndereco(this.getResultSet().getString(4));
                modelFornecedor.setForBairro(this.getResultSet().getString(5));
                modelFornecedor.setForCidade(this.getResultSet().getString(6));
                modelFornecedor.setForUf(this.getResultSet().getString(7));
                modelFornecedor.setForCep(this.getResultSet().getString(8));
                modelFornecedor.setForTelefone(this.getResultSet().getString(9));
                listamodelFornecedor.add(modelFornecedor);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return listamodelFornecedor;
    }

    /**
    * atualiza Fornecedor
    * @param pModelFornecedor
    * @return boolean
    */
    public boolean atualizarFornecedorDAO(ModelFornecedor pModelFornecedor){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "UPDATE tbl_fornecedor SET "
                    + "pk_id_fornecedor = '" + pModelFornecedor.getIdFornecedor() + "',"
                    + "for_cnpj = '" + pModelFornecedor.getForCnpj() + "',"
                    + "for_nome = '" + pModelFornecedor.getForNome() + "',"
                    + "for_endereco = '" + pModelFornecedor.getForEndereco() + "',"
                    + "for_bairro = '" + pModelFornecedor.getForBairro() + "',"
                    + "for_cidade = '" + pModelFornecedor.getForCidade() + "',"
                    + "for_uf = '" + pModelFornecedor.getForUf() + "',"
                    + "for_cep = '" + pModelFornecedor.getForCep() + "',"
                    + "for_telefone = '" + pModelFornecedor.getForTelefone() + "'"
                + " WHERE "
                    + "pk_id_fornecedor = '" + pModelFornecedor.getIdFornecedor() + "'"
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
    * exclui Fornecedor
    * @param pIdFornecedor
    * @return boolean
    */
    public boolean excluirFornecedorDAO(int pIdFornecedor){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "DELETE FROM tbl_fornecedor "
                + " WHERE "
                    + "pk_id_fornecedor = '" + pIdFornecedor + "'"
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