package controller;

import model.ModelComprasProdutos;
import DAO.DAOComprasProdutos;
import java.util.ArrayList;

/**
*
* @author André
*/
public class ControllerComprasProdutos {

    private DAOComprasProdutos daoComprasProdutos = new DAOComprasProdutos();

    /**
    * grava ComprasProdutos
    * @param pModelComprasProdutos
    * @return int
    */
    public int salvarComprasProdutosController(ModelComprasProdutos pModelComprasProdutos){
        return this.daoComprasProdutos.salvarComprasProdutosDAO(pModelComprasProdutos);
    }

    /**
    * recupera ComprasProdutos
    * @param pIdCompraProduto
    * @return ModelComprasProdutos
    */
    public ModelComprasProdutos getComprasProdutosController(int pIdCompraProduto){
        return this.daoComprasProdutos.getComprasProdutosDAO(pIdCompraProduto);
    }

    /**
    * recupera uma lista deComprasProdutos
    * @param pIdCompraProduto
    * @return ArrayList
    */
    public ArrayList<ModelComprasProdutos> getListaComprasProdutosController(){
        return this.daoComprasProdutos.getListaComprasProdutosDAO();
    }

    /**
    * atualiza ComprasProdutos
    * @param pModelComprasProdutos
    * @return boolean
    */
    public boolean atualizarComprasProdutosController(ModelComprasProdutos pModelComprasProdutos){
        return this.daoComprasProdutos.atualizarComprasProdutosDAO(pModelComprasProdutos);
    }

    /**
    * exclui ComprasProdutos
    * @param pIdCompraProduto
    * @return boolean
    */
    public boolean excluirComprasProdutosController(int pIdCompraProduto){
        return this.daoComprasProdutos.excluirComprasProdutosDAO(pIdCompraProduto);
    }
    
    /**
     * Salvar uma lista de produtos da compra
     * @param pListaModelComprasProdutos
     * @return 
     */
    public boolean salvarComprasProdutosController(ArrayList<ModelComprasProdutos> pListaModelComprasProdutos){
        return this.daoComprasProdutos.salvarComprasProdutosDAO(pListaModelComprasProdutos);
    }
}