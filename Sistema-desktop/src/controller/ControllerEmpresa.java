package controller;

import model.ModelEmpresa;
import DAO.DAOEmpresa;
import java.util.ArrayList;

/**
*
* @author BRUNO
*/

public class ControllerEmpresa {

    private DAOEmpresa daoEmpresa = new DAOEmpresa();

    /**
    * grava Empresa
    * @param pModelEmpresa
    * @return int
    */
    public int salvarEmpresaController(ModelEmpresa pModelEmpresa){
        return this.daoEmpresa.salvarEmpresaDAO(pModelEmpresa);
    }

    /**
    * recupera Empresa
    * @param pPk_emp_codigo
    * @return ModelEmpresa
    */
    public ModelEmpresa getEmpresaController(int pPk_emp_codigo){
        return this.daoEmpresa.getEmpresaDAO(pPk_emp_codigo);
    }

    /**
    * recupera uma lista deEmpresa
    * @param pPk_emp_codigo
    * @return ArrayList
    */
    public ArrayList<ModelEmpresa> getListaEmpresaController(){
        return this.daoEmpresa.getListaEmpresaDAO();
    }

    /**
    * atualiza Empresa
    * @param pModelEmpresa
    * @return boolean
    */
    public boolean atualizarEmpresaController(ModelEmpresa pModelEmpresa){
        return this.daoEmpresa.atualizarEmpresaDAO(pModelEmpresa);
    }

    /**
    * exclui Empresa
    * @param pPk_emp_codigo
    * @return boolean
    */
    public boolean excluirEmpresaController(int pPk_emp_codigo){
        return this.daoEmpresa.excluirEmpresaDAO(pPk_emp_codigo);
    }
}