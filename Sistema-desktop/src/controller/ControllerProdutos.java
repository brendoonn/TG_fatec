package controller;

import model.ModelProdutos;
import DAO.DAOProdutos;

import java.io.Console;
import java.util.ArrayList;

/**
*
* @author brendon
*/
public class ControllerProdutos {

    private DAOProdutos daoProduto = new DAOProdutos();

    /**
    * grava Produto
    * @param pModelProduto
    * @return int
    */
    public int salvarProdutoController(ModelProdutos pModelProduto){
        return this.daoProduto.salvarProdutoDAO(pModelProduto);
    }

    /**
    * recupera Produto
    * @param pID_produto
    * @return ModelProduto
    */
    public ModelProdutos retornarProdutoController(int pID_produto){
        return this.daoProduto.getProdutoDAO(pID_produto);
    }    
    /**
     * retorna produto pelo nome
     * @param pNomeProduto
     * @return 
     */
    //este aquiiiiiiiiiiiiii
    public ModelProdutos retornarProdutoController(String pNomeProduto){
        return this.daoProduto.retornarProdutoDAO(pNomeProduto);
    }



    /**
    * recupera Produto
    * @return ModelProduto
    */
    public ModelProdutos retornarListaProdutoController(Integer pID_produto){
        return this.daoProduto.getProdutoDAO(pID_produto);
    }    
    
    /**
    * recupera Produto
    * @param pNome
    * @return ModelProduto
    */
    public ModelProdutos retornarNomeProdutoController(String pNome ){
        return this.daoProduto.getNomeProdutoDAO(pNome);
    }

    /**
    * recupera uma lista deProduto
    * @param pID_produto
    * @return ArrayList
    */
    public ArrayList<ModelProdutos> retornarListaProdutoController(){
        return this.daoProduto.getListaProdutoDAO();
    }


    public ArrayList<ModelProdutos> getListaProdutoController(){
        return this.daoProduto.getListaProdutoDAO();
    }

    /**
    * atualiza Produto
    * @param pModelProduto
    * @return boolean
    */
    public boolean alterarProdutoController(ModelProdutos pModelProduto){
        return this.daoProduto.atualizarProdutoDAO(pModelProduto);
    }

    /**
    * exclui Produto
    * @param pID_produto
    * @return boolean
    */
    public boolean excluirProdutoController(Integer pID_produto){
        return this.daoProduto.excluirProdutoDAO(pID_produto);
    }

/**
     * Alterar lista de produtos no banco
     * @param plistaModelProdutos
     * @return 
     */
    public boolean alterarEstoqueProdutoController(ArrayList<ModelProdutos> plistaModelProdutos) {
        return this.daoProduto.alterarEstoqueProdutosDAO(plistaModelProdutos);
    }

}