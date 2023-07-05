/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

/**
 *
 * @author andre
 */
public class ModelProdutosComprasProdutos {
    private ModelProdutos modelProdutos;
    private ModelComprasProdutos modelComprasProdutos;

    /**
     * @return the modelProdutos
     */
    public ModelProdutos getModelProdutos() {
        return modelProdutos;
    }

    /**
     * @param modelProdutos the modelProdutos to set
     */
    public void setModelProdutos(ModelProdutos modelProdutos) {
        this.modelProdutos = modelProdutos;
    }

    /**
     * @return the modelComprasProdutos
     */
    public ModelComprasProdutos getModelComprasProdutos() {
        return modelComprasProdutos;
    }

    /**
     * @param modelComprasProdutos the modelComprasProdutos to set
     */
    public void setModelComprasProdutos(ModelComprasProdutos modelComprasProdutos) {
        this.modelComprasProdutos = modelComprasProdutos;
    }
}
