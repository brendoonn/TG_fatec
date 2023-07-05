package controller;

import model.ModelMarca;
import DAO.DAOMarca;
import java.util.ArrayList;

/**
*
* @author Brendon
*/
public class ControllerMarca {

    private static DAOMarca daoMarca = new DAOMarca();

    /**
    * grava Marca
    * @param pModelMarca
    * @return int
    */
    public int salvarMarcaController(ModelMarca pModelMarca){
        return this.daoMarca.salvarMarcaDAO(pModelMarca);
    }

    /**
    * recupera Marca
    * @param pID_marca
    * @return ModelMarca
    */
    public ModelMarca getMarcaController(Integer pID_marca){
        return this.daoMarca.getMarcaDAO(pID_marca);
    }
    /**
    * recupera Marca
    * @param pID_marca
    * @return ModelMarca
    */
    public static Integer getMarcaController(String pNome_marca){
        return daoMarca.getIdMarcaDAO(pNome_marca);
    }

    /**
    * recupera uma lista deMarca
    * @param pID_marca
    * @return ArrayList
    */
    public ArrayList<ModelMarca> getListaMarcaController(){
        return this.daoMarca.getListaMarcaDAO();
    }

    /**
    * atualiza Marca
    * @param pModelMarca
    * @return boolean
    */
    public boolean atualizarMarcaController(ModelMarca pModelMarca){
        return this.daoMarca.atualizarMarcaDAO(pModelMarca);
    }

    /**
    * exclui Marca
    * @param pID_marca
    * @return boolean
    */
    public boolean excluirMarcaController(Integer pID_marca){
        return this.daoMarca.excluirMarcaDAO(pID_marca);
    }
}