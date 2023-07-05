package controller;

import model.ModelCategoria;
import DAO.DAOCategoria;
import java.util.ArrayList;

/**
*
* @author Brendon
*/
public class ControllerCategoria {

    private static DAOCategoria daoCategoria = new DAOCategoria();

    /**
    * grava Categoria
    * @param pModelCategoria
    * @return int
    */
    public int salvarCategoriaController(ModelCategoria pModelCategoria){
        return this.daoCategoria.salvarCategoriaDAO(pModelCategoria);
    }

    /**
    * recupera Categoria
    * @param pID_categoria
    * @return ModelCategoria
    */
    public ModelCategoria getCategoriaController(Integer pID_categoria){
        return this.daoCategoria.getCategoriaDAO(pID_categoria);
    }
    
    /**
    * recupera Categoria
    * @param pCategoria
    * @return ModelCategoria
    */
    public static Integer getCategoriaController(String pCategoria){
        return daoCategoria.getCategoriaDAO(pCategoria);
    }

    /**
    * recupera uma lista deCategoria
    * @param pID_categoria
    * @return ArrayList
    */
    public ArrayList<ModelCategoria> getListaCategoriaController(){
        return this.daoCategoria.getListaCategoriaDAO();
    }

    /**
    * atualiza Categoria
    * @param pModelCategoria
    * @return boolean
    */
    public boolean atualizarCategoriaController(ModelCategoria pModelCategoria){
        return this.daoCategoria.atualizarCategoriaDAO(pModelCategoria);
    }

    /**
    * exclui Categoria
    * @param pID_categoria
    * @return boolean
    */
    public boolean excluirCategoriaController(Integer pID_categoria){
        return this.daoCategoria.excluirCategoriaDAO(pID_categoria);
    }
}