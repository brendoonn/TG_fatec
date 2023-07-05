package DAO;

import model.ModelMarca;
import conexoes.ConexaoMySql;
import java.util.ArrayList;
/**
*
* @author Brendon
*/
public class DAOMarca extends ConexaoMySql {

    /**
    * grava Marca
    * @param pModelMarca
    * @return int
    */
    public int salvarMarcaDAO(ModelMarca pModelMarca){
        try {
            this.conectar();
            return this.insertSQL(
                "INSERT INTO tbl_marca ("
                    + "ID_marca,"
                    + "nome_marca,"
                    + "data_available"
                + ") VALUES ("
                    + "'" + pModelMarca.getID_marca() + "',"
                    + "'" + pModelMarca.getNome_marca() + "',"
                    + "'" + pModelMarca.getData_available() + "'"
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
    * recupera Marca
    * @param pID_marca
    * @return ModelMarca
    */
    public ModelMarca getMarcaDAO(Integer pID_marca){
        ModelMarca modelMarca = new ModelMarca();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "ID_marca,"
                    + "nome_marca,"
                    + "data_available"
                 + " FROM"
                     + " tbl_marca"
                 + " WHERE"
                     + " ID_marca = '" + pID_marca + "'"
                + ";"
            );

            while(this.getResultSet().next()){
                modelMarca.setID_marca(this.getResultSet().getInt(1));
                modelMarca.setNome_marca(this.getResultSet().getString(2));
                modelMarca.setData_available(this.getResultSet().getBoolean(3));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return modelMarca;
    }
    public ModelMarca getMarcaDAO(String pNome_marca){
        ModelMarca modelMarca = new ModelMarca();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "ID_marca,"
                    + "nome_marca,"
                    + "data_available"
                 + " FROM"
                     + " tbl_marca"
                 + " WHERE"
                     + " nome_marca = '" + pNome_marca + "'"
                + ";"
            );

            while(this.getResultSet().next()){
                modelMarca.setID_marca(this.getResultSet().getInt(1));
                modelMarca.setNome_marca(this.getResultSet().getString(2));
                modelMarca.setData_available(this.getResultSet().getBoolean(3));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return modelMarca;
    }
    public Integer getIdMarcaDAO(String pNome_marca){
        ModelMarca modelMarca = new ModelMarca();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "ID_marca"
                 + " FROM"
                     + " tbl_marca"
                 + " WHERE"
                     + " nome_marca = '" + pNome_marca + "'"
                + ";"
            );

            while(this.getResultSet().next()){
                modelMarca.setID_marca(this.getResultSet().getInt(1));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return modelMarca.getID_marca();
    }

    /**
    * recupera uma lista de Marcaf
        * @return ArrayList
    */
    public ArrayList<ModelMarca> getListaMarcaDAO(){
        ArrayList<ModelMarca> listamodelMarca = new ArrayList<>();
        ModelMarca modelMarca = new ModelMarca();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "ID_marca,"
                    + "nome_marca,"
                    + "data_available"
                 + " FROM"
                     + " tbl_marca"
                + ";"
            );

            while(this.getResultSet().next()){
                modelMarca = new ModelMarca();
                modelMarca.setID_marca(this.getResultSet().getInt(1));
                modelMarca.setNome_marca(this.getResultSet().getString(2));
                modelMarca.setData_available(this.getResultSet().getBoolean(3));
                listamodelMarca.add(modelMarca);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return listamodelMarca;
    }

    /**
    * atualiza Marca
    * @param pModelMarca
    * @return boolean
    */
    public boolean atualizarMarcaDAO(ModelMarca pModelMarca){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "UPDATE tbl_marca SET "
                    + "ID_marca = '" + pModelMarca.getID_marca() + "',"
                    + "nome_marca = '" + pModelMarca.getNome_marca() + "',"
                    + "data_available = '" + pModelMarca.getData_available() + "'"
                + " WHERE "
                    + "ID_marca = '" + pModelMarca.getID_marca() + "'"
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
    * exclui Marca
    * @param pID_marca
    * @return boolean
    */
    public boolean excluirMarcaDAO(Integer pID_marca){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "DELETE FROM tbl_marca "
                + " WHERE "
                    + "ID_marca = '" + pID_marca + "'"
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