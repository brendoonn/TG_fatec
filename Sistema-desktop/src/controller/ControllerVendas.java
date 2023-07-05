package controller;

import model.ModelVendas;
import DAO.DAOVendas;
import java.util.ArrayList;

/**
*
* @author andre
*/
public class ControllerVendas {

    private DAOVendas daoVendas = new DAOVendas();

    /**
    * grava Vendas
    * @param pModelVendas
    * @return int
    */
    public int salvarVendasProdutosDAO(ModelVendas pModelVendas){;
        return this.daoVendas.salvarVendasDAO(pModelVendas);
    }


    /**
    * grava Vendas
    * @param pModelVendas
    * @return int
    */
    /* public int atualizaEstoqueController(ModelVendas pModelVendas){;
        return this.daoVendas.realizaVenda(pModelVendas);
    } */

    /**
    * recupera Vendas
    * @param pIdVenda
    * @return ModelVendas
    */
    public ModelVendas getVendasController(int pIdVenda){
        return this.daoVendas.getVendasDAO(pIdVenda);
    }

    /**
    * recupera uma lista deVendas
    * @param pIdVenda
    * @return ArrayList
    */
    public ArrayList<ModelVendas> getListaVendasController(){
        return this.daoVendas.getListaVendasDAO();
    }

    /**
    * atualiza Vendas
    * @param pModelVendas
    * @return boolean
    */
    public boolean atualizarVendasController(ModelVendas pModelVendas){
        return this.daoVendas.atualizarVendasDAO(pModelVendas);
    }

    /**
    * exclui Vendas
    * @param pIdVenda
    * @return boolean
    */
    public boolean excluirVendasController(int pIdVenda){
        return this.daoVendas.excluirVendasDAO(pIdVenda);
    }
}