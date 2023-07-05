package controller;

import model.ModelFormaPagamento;
import DAO.DAOFormaPagamento;
import java.util.ArrayList;

/**
*
* @author andre
*/
public class ControllerFormaPagamento {

    private DAOFormaPagamento daoFormaPagamento = new DAOFormaPagamento();


    /**
    * recupera FormaPagamento
    * @param pIdForPag
    * @return ModelFormaPagamento
    */
    public ModelFormaPagamento getFormaPagamentoController(int pIdForPag){
        return this.daoFormaPagamento.getFormaPagamentoDAO(pIdForPag);
    }

    /**
    * recupera uma lista deFormaPagamento
    * @param pIdForPag
    * @return ArrayList
    */
    public ArrayList<ModelFormaPagamento> getListaFormaPagamentoController(){
        return this.daoFormaPagamento.getListaFormaPagamentoDAO();
    }

    /**
    * exclui FormaPagamento
    * @param pIdForPag
    * @return boolean
    */
    public boolean excluirFormaPagamentoController(int pIdForPag){
        return this.daoFormaPagamento.excluirFormaPagamentoDAO(pIdForPag);
    }
}