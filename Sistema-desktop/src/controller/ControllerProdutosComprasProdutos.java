/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import DAO.DAOProdutosComprasProdutos;
import java.util.ArrayList;
import model.ModelProdutosComprasProdutos;

/**
 *
 * @author andre
 */
public class ControllerProdutosComprasProdutos {
    
    private DAOProdutosComprasProdutos daoProdutosComprasProdutos = new DAOProdutosComprasProdutos();
    
    public ArrayList<ModelProdutosComprasProdutos> getListaProdutosComprasProdutosController(int pCodigoVenda){
        return this.daoProdutosComprasProdutos.getListaProdutosComprasProdutosDAO(pCodigoVenda);        
    }
    
}
