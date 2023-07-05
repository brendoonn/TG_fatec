package controller;

import model.ModelCompras;
import DAO.DAOCompras;
import java.util.ArrayList;

/**
*
* @author André
*/
public class ControllerCompras {

    private DAOCompras daoCompras = new DAOCompras();

    /**
    * grava Compras
    * @param pModelCompras
    * @return int
    */
    public int salvarComprasController(ModelCompras pModelCompras){
        return this.daoCompras.salvarComprasDAO(pModelCompras);
    }

    /**
    * recupera Compras
    * @param pIdCompra
    * @return ModelCompras
    */
    public ModelCompras getComprasController(int pIdCompra){
        return this.daoCompras.getComprasDAO(pIdCompra);
    }

    /**
    * recupera uma lista deCompras
    * @param pIdCompra
    * @return ArrayList
    */
    public ArrayList<ModelCompras> getListaComprasController(){
        return this.daoCompras.getListaComprasDAO();
    }

    /**
    * atualiza Compras
    * @param pModelCompras
    * @return boolean
    */
    public boolean atualizarComprasController(ModelCompras pModelCompras){
        return this.daoCompras.atualizarComprasDAO(pModelCompras);
    }

    /**
    * exclui Compras
    * @param pIdCompra
    * @return boolean
    */
    public boolean excluirComprasController(int pIdCompra){
        return this.daoCompras.excluirComprasDAO(pIdCompra);
    }
}