/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import java.util.ArrayList;

/**
 *
 * @author andre
 */
public class ModelComprasFornecedor {

    /**
     * @return the modelCompras
     */
    public ModelCompras getModelCompras() {
        return modelCompras;
    }

    /**
     * @param modelCompras the modelCompras to set
     */
    public void setModelCompras(ModelCompras modelCompras) {
        this.modelCompras = modelCompras;
    }

    /**
     * @return the modelFornecedor
     */
    public ModelFornecedor getModelFornecedor() {
        return modelFornecedor;
    }

    /**
     * @param modelFornecedor the modelFornecedor to set
     */
    public void setModelFornecedor(ModelFornecedor modelFornecedor) {
        this.modelFornecedor = modelFornecedor;
    }

    /**
     * @return the listaModelComprasFornecedor
     */
    public ArrayList<ModelComprasFornecedor> getListaModelComprasFornecedor() {
        return listaModelComprasFornecedor;
    }

    /**
     * @param listaModelComprasFornecedor the listaModelComprasFornecedor to set
     */
    public void setListaModelComprasFornecedor(ArrayList<ModelComprasFornecedor> listaModelComprasFornecedor) {
        this.listaModelComprasFornecedor = listaModelComprasFornecedor;
    }
    
    private ModelCompras modelCompras;
    private ModelFornecedor modelFornecedor;
    private ArrayList<ModelComprasFornecedor> listaModelComprasFornecedor;
    
}
