package DAO;

import model.ModelEmpresa;
import conexoes.ConexaoMySql;
import java.util.ArrayList;
/**
*
* @author BRUNO
*/
public class DAOEmpresa extends ConexaoMySql {

    /**
    * grava Empresa
    * @param pModelEmpresa
    * @return int
    */
    public int salvarEmpresaDAO(ModelEmpresa pModelEmpresa){
        try {
            this.conectar();
            return this.insertSQL(
                "INSERT INTO tbl_empresa ("
                    + "ID_empresa,"
                    + "emp_cnpj,"
                    + "emp_ie,"
                    + "emp_im,"
                    + "emp_nome,"
                    + "emp_nome_fantasia,"
                    + "emp_data,"
                    + "emp_logradouro,"
                    + "emp_numero,"
                    + "emp_complemento,"
                    + "emp_cep,"
                    + "emp_bairro,"
                    + "emp_municipio,"
                    + "emp_uf,"
                    + "emp_telefone,"
                    + "emp_imagem,"
                    + "emp_logomarca_claro"
                + ") VALUES ("
                    + "'" + pModelEmpresa.getID_empresa() + "',"
                    + "'" + pModelEmpresa.getEmp_cnpj() + "',"
                    + "'" + pModelEmpresa.getEmp_ie() + "',"
                    + "'" + pModelEmpresa.getEmp_im() + "',"
                    + "'" + pModelEmpresa.getEmp_nome() + "',"
                    + "'" + pModelEmpresa.getEmp_nome_fantasia() + "',"
                    + "'" + pModelEmpresa.getEmp_data() + "',"
                    + "'" + pModelEmpresa.getEmp_logradouro() + "',"
                    + "'" + pModelEmpresa.getEmp_numero() + "',"
                    + "'" + pModelEmpresa.getEmp_complemento() + "',"
                    + "'" + pModelEmpresa.getEmp_cep() + "',"
                    + "'" + pModelEmpresa.getEmp_bairro() + "',"
                    + "'" + pModelEmpresa.getEmp_municipio() + "',"
                    + "'" + pModelEmpresa.getEmp_uf() + "',"
                    + "'" + pModelEmpresa.getEmp_telefone() + "',"
                    + "'" + pModelEmpresa.getEmp_imagem() + "',"
                    + "'" + pModelEmpresa.getEmp_logomarca_claro() + "'"
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
    * recupera Empresa
    * @param pID_empresa
    * @return ModelEmpresa
    */
    public ModelEmpresa getEmpresaDAO(int pID_empresa){
        ModelEmpresa modelEmpresa = new ModelEmpresa();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "ID_empresa,"
                    + "emp_cnpj,"
                    + "emp_ie,"
                    + "emp_im,"
                    + "emp_nome,"
                    + "emp_nome_fantasia,"
                    + "emp_data,"
                    + "emp_logradouro,"
                    + "emp_numero,"
                    + "emp_complemento,"
                    + "emp_cep,"
                    + "emp_bairro,"
                    + "emp_municipio,"
                    + "emp_uf,"
                    + "emp_telefone,"
                    + "emp_imagem,"
                    + "emp_logomarca_claro"
                 + " FROM"
                     + " tbl_empresa"
                 + " WHERE"
                     + " ID_empresa = '" + pID_empresa + "'"
                + ";"
            );

            while(this.getResultSet().next()){
                modelEmpresa.setID_empresa(this.getResultSet().getInt(1));
                modelEmpresa.setEmp_cnpj(this.getResultSet().getString(2));
                modelEmpresa.setEmp_ie(this.getResultSet().getString(3));
                modelEmpresa.setEmp_im(this.getResultSet().getString(4));
                modelEmpresa.setEmp_nome(this.getResultSet().getString(5));
                modelEmpresa.setEmp_nome_fantasia(this.getResultSet().getString(6));
                modelEmpresa.setEmp_data(this.getResultSet().getDate(7));
                modelEmpresa.setEmp_logradouro(this.getResultSet().getString(8));
                modelEmpresa.setEmp_numero(this.getResultSet().getString(9));
                modelEmpresa.setEmp_complemento(this.getResultSet().getString(10));
                modelEmpresa.setEmp_cep(this.getResultSet().getString(11));
                modelEmpresa.setEmp_bairro(this.getResultSet().getString(12));
                modelEmpresa.setEmp_municipio(this.getResultSet().getString(13));
                modelEmpresa.setEmp_uf(this.getResultSet().getString(14));
                modelEmpresa.setEmp_telefone(this.getResultSet().getString(15));
                modelEmpresa.setEmp_imagem(this.getResultSet().getString(16));
                modelEmpresa.setEmp_logomarca_claro(this.getResultSet().getString(17));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        System.out.println(modelEmpresa);
        return modelEmpresa;
    }

    /**
    * recupera uma lista de Empresa
        * @return ArrayList
    */
    public ArrayList<ModelEmpresa> getListaEmpresaDAO(){
        ArrayList<ModelEmpresa> listamodelEmpresa = new ArrayList<>();
        ModelEmpresa modelEmpresa = new ModelEmpresa();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "ID_empresa,"
                    + "emp_cnpj,"
                    + "emp_ie,"
                    + "emp_im,"
                    + "emp_nome,"
                    + "emp_nome_fantasia,"
                    + "emp_data,"
                    + "emp_logradouro,"
                    + "emp_numero,"
                    + "emp_complemento,"
                    + "emp_cep,"
                    + "emp_bairro,"
                    + "emp_municipio,"
                    + "emp_uf,"
                    + "emp_telefone,"
                    + "emp_imagem,"
                    + "emp_logomarca_claro"
                 + " FROM"
                     + " tbl_empresa"
                + ";"
            );

            while(this.getResultSet().next()){
                modelEmpresa = new ModelEmpresa();
                modelEmpresa.setID_empresa(this.getResultSet().getInt(1));
                modelEmpresa.setEmp_cnpj(this.getResultSet().getString(2));
                modelEmpresa.setEmp_ie(this.getResultSet().getString(3));
                modelEmpresa.setEmp_im(this.getResultSet().getString(4));
                modelEmpresa.setEmp_nome(this.getResultSet().getString(5));
                modelEmpresa.setEmp_nome_fantasia(this.getResultSet().getString(6));
                modelEmpresa.setEmp_data(this.getResultSet().getDate(7));
                modelEmpresa.setEmp_logradouro(this.getResultSet().getString(8));
                modelEmpresa.setEmp_numero(this.getResultSet().getString(9));
                modelEmpresa.setEmp_complemento(this.getResultSet().getString(10));
                modelEmpresa.setEmp_cep(this.getResultSet().getString(11));
                modelEmpresa.setEmp_bairro(this.getResultSet().getString(12));
                modelEmpresa.setEmp_municipio(this.getResultSet().getString(13));
                modelEmpresa.setEmp_uf(this.getResultSet().getString(14));
                modelEmpresa.setEmp_telefone(this.getResultSet().getString(15));
                modelEmpresa.setEmp_imagem(this.getResultSet().getString(16));
                modelEmpresa.setEmp_logomarca_claro(this.getResultSet().getString(17));
                listamodelEmpresa.add(modelEmpresa);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return listamodelEmpresa;
    }

    /**
    * atualiza Empresa
    * @param pModelEmpresa
    * @return boolean
    */
    public boolean atualizarEmpresaDAO(ModelEmpresa pModelEmpresa){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "UPDATE tbl_empresa SET "
                    + "ID_empresa = '" + 1 + "',"
                    + "emp_cnpj = '" + pModelEmpresa.getEmp_cnpj() + "',"
                    + "emp_ie = '" + pModelEmpresa.getEmp_ie() + "',"
                    + "emp_im = '" + pModelEmpresa.getEmp_im() + "',"
                    + "emp_nome = '" + pModelEmpresa.getEmp_nome() + "',"
                    + "emp_nome_fantasia = '" + pModelEmpresa.getEmp_nome_fantasia() + "',"
                    + "emp_data = '" + pModelEmpresa.getEmp_data() + "',"
                    + "emp_logradouro = '" + pModelEmpresa.getEmp_logradouro() + "',"
                    + "emp_numero = '" + pModelEmpresa.getEmp_numero() + "',"
                    + "emp_complemento = '" + pModelEmpresa.getEmp_complemento() + "',"
                    + "emp_cep = '" + pModelEmpresa.getEmp_cep() + "',"
                    + "emp_bairro = '" + pModelEmpresa.getEmp_bairro() + "',"
                    + "emp_municipio = '" + pModelEmpresa.getEmp_municipio() + "',"
                    + "emp_uf = '" + pModelEmpresa.getEmp_uf() + "',"
                    + "emp_telefone = '" + pModelEmpresa.getEmp_telefone() + "',"
                    + "emp_imagem = '" + pModelEmpresa.getEmp_imagem() + "',"
                    + "emp_logomarca_claro = '" + pModelEmpresa.getEmp_logomarca_claro() + "'"
                + " WHERE "
                    + "ID_empresa = '" + pModelEmpresa.getID_empresa() + "'"
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
    * exclui Empresa
    * @param pID_empresa
    * @return boolean
    */
    public boolean excluirEmpresaDAO(int pID_empresa){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "DELETE FROM tbl_empresa "
                + " WHERE "
                    + "ID_empresa = '" + pID_empresa + "'"
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