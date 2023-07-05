package DAO;

import model.ModelCategoria;
import conexoes.ConexaoMySql;
import java.util.ArrayList;
/**
*
* @author Brendon
*/
public class DAOCategoria extends ConexaoMySql {

    /**
    * grava Categoria
    * @param pModelCategoria
    * @return int
    */
    public int salvarCategoriaDAO(ModelCategoria pModelCategoria){
        try {
            this.conectar();
            return this.insertSQL(
                "INSERT INTO tbl_categoria ("
                    + "ID_categoria,"
                    + "categoria,"
                    + "desc_categoria,"
                    + "data_available"
                + ") VALUES ("
                    + "'" + pModelCategoria.getID_categoria() + "',"
                    + "'" + pModelCategoria.getCategoria() + "',"
                    + "'" + pModelCategoria.getDesc_categoria() + "',"
                    + "'" + pModelCategoria.getData_available() + "'"
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
    * recupera Categoria
    * @param pID_categoria
    * @return ModelCategoria
    */
    public ModelCategoria getCategoriaDAO(Integer pID_categoria){
        ModelCategoria modelCategoria = new ModelCategoria();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "ID_categoria,"
                    + "categoria,"
                    + "desc_categoria,"
                    + "data_available"
                 + " FROM"
                     + " tbl_categoria"
                 + " WHERE"
                     + " ID_categoria = '" + pID_categoria + "'"
                + ";"
            );

            while(this.getResultSet().next()){
                modelCategoria.setID_categoria(this.getResultSet().getInt(1));
                modelCategoria.setCategoria(this.getResultSet().getString(2));
                modelCategoria.setDesc_categoria(this.getResultSet().getString(3));
                modelCategoria.setData_available(this.getResultSet().getBoolean(4));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return modelCategoria;
    }

    /**
    * recupera Categoria
    * @param pID_categoria
    * @return ModelCategoria
    */
    public Integer getCategoriaDAO(String pNome_categoria){
        ModelCategoria modelCategoria = new ModelCategoria();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "ID_categoria "
                 + " FROM "
                     + "tbl_categoria "
                 + "WHERE "
                     + "categoria = '" + pNome_categoria + "'"
                + ";"
            );

            while(this.getResultSet().next()){
                modelCategoria.setID_categoria(this.getResultSet().getInt(1));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return modelCategoria.getID_categoria();
    }


    /**
    * recupera uma lista de Categoria
        * @return ArrayList
    */
    public ArrayList<ModelCategoria> getListaCategoriaDAO(){
        ArrayList<ModelCategoria> listamodelCategoria = new ArrayList<>();
        ModelCategoria modelCategoria = new ModelCategoria();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "ID_categoria,"
                    + "categoria,"
                    + "desc_categoria,"
                    + "data_available"
                 + " FROM"
                     + " tbl_categoria"
                + ";"
            );

            while(this.getResultSet().next()){
                modelCategoria = new ModelCategoria();
                modelCategoria.setID_categoria(this.getResultSet().getInt(1));
                modelCategoria.setCategoria(this.getResultSet().getString(2));
                modelCategoria.setDesc_categoria(this.getResultSet().getString(3));
                modelCategoria.setData_available(this.getResultSet().getBoolean(4));
                listamodelCategoria.add(modelCategoria);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return listamodelCategoria;
    }

    /**
    * atualiza Categoria
    * @param pModelCategoria
    * @return boolean
    */
    public boolean atualizarCategoriaDAO(ModelCategoria pModelCategoria){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "UPDATE tbl_categoria SET "
                    + "ID_categoria = '" + pModelCategoria.getID_categoria() + "',"
                    + "categoria = '" + pModelCategoria.getCategoria() + "',"
                    + "desc_categoria = '" + pModelCategoria.getDesc_categoria() + "',"
                    + "data_available = '" + pModelCategoria.getData_available() + "'"
                + " WHERE "
                    + "ID_categoria = '" + pModelCategoria.getID_categoria() + "'"
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
    * exclui Categoria
    * @param pID_categoria
    * @return boolean
    */
    public boolean excluirCategoriaDAO(Integer pID_categoria){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "DELETE FROM tbl_categoria "
                + " WHERE "
                    + "ID_categoria = '" + pID_categoria + "'"
                + ";"
            );
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }finally{
            this.fecharConexao();
        }
    }

    /* public ModelCategoria getCategoriaDAO(String pCategoria) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    } */
}