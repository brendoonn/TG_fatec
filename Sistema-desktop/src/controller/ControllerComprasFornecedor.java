/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import DAO.DAOComprasFornecedor;
import java.util.ArrayList;
import model.ModelComprasFornecedor;

/**
 *
 * @author andre
 */
public class ControllerComprasFornecedor {
    
    private DAOComprasFornecedor dAOComprasFornecedor = new DAOComprasFornecedor();

    public ArrayList<ModelComprasFornecedor> getListaComprasFornecedorController() {
        return this.dAOComprasFornecedor.getListaComprasFornecedorDAO();
    }
    
}
